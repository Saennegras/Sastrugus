const Video = ({ video, reversed = false }) => {
  const reversedClass = reversed ? "lg:flex-row-reverse" : "";

  // YouTube linkből az iframe URL előállítása
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    const videoIdMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
    );
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
  };

  const embedUrl = getYouTubeEmbedUrl(video);

  return (
    <div className={`flex flex-col items-center my-6 ${reversedClass}`}>
      <div className="w-full max-w-4xl mx-auto p-2">
        {embedUrl ? (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-soft">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={embedUrl}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-72 bg-gray-200 rounded-2xl shadow-soft">
            <p className="text-gray-500">Nincs elérhető videó</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;
