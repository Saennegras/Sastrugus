import Image from 'next/image';
import HeroSection from './_components/HeroSection';

export default function Home() {
  const heroHeadline = (
    <>
      <h1>Join the Sastrugus</h1>
      <h1>Workshop Community</h1>
    </>
  )
  return (
    <main>
      <HeroSection headline={heroHeadline}/>
    </main>
  )
}
