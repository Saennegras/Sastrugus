'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();
const USER_STORAGE_KEY = 'cached_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const router = useRouter();

  // Save user to localStorage
  const cacheUser = useCallback((userData) => {
    if (userData) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, []);

  // Get cached user from localStorage
  const getCachedUser = useCallback(() => {
    try {
      const cached = localStorage.getItem(USER_STORAGE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }, []);

  const checkUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();

      if (res.ok && data.user) {
        setUser(data.user);
        cacheUser(data.user);
        setAuthError(null);
        return true;
      }

      if (res.status === 401) {
        setUser(null);
        cacheUser(null);
        setAuthError(null);
        return false;
      }

      // 503 = backend unavailable, keep cached user
      if (res.status === 503) {
        setAuthError('backend_unavailable');
        return !!user; // keep current state
      }

      return false;
    } catch (error) {
      console.error('Auth check failed', error);
      setAuthError('network_error');
      return !!user; // keep current state
    }
  }, [user, cacheUser]);

  // On mount: load cached user immediately, then verify in background
  useEffect(() => {
    const cachedUser = getCachedUser();
    if (cachedUser) {
      setUser(cachedUser);
      setLoading(false);
      // Verify in background
      checkUser();
    } else {
      // No cache, need to wait for backend
      checkUser().finally(() => setLoading(false));
    }
  }, []); 

  const login = async (identifier, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    setUser(data.user);
    cacheUser(data.user);
    router.push('/dashboard');
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    cacheUser(null);
    router.push('/login');
  };

  // Invalidate user (called when API returns 401/403)
  const invalidateUser = useCallback(() => {
    setUser(null);
    cacheUser(null);
  }, [cacheUser]);

  return (
    <AuthContext.Provider value={{ user, loading, authError, login, logout, refreshUser: checkUser, invalidateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Custom fetch that auto-invalidates user on 401/403
export const useAuthFetch = () => {
  const { invalidateUser } = useAuth();

  return useCallback(async (url, options = {}) => {
    const res = await fetch(url, options);

    if (res.headers.get('X-Auth-Invalid') === 'true') {
      invalidateUser();
    }

    return res;
  }, [invalidateUser]);
};