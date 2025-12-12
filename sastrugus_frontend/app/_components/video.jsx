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
    <div className={`flex flex-col lg:flex-row items-center my-4 ${reversedClass}`}>
      <div className="w-full lg:w-1/2 p-2">
        {embedUrl ? (
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              src={embedUrl}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-64 bg-gray-200 rounded-lg shadow-lg">
            <p className="text-gray-500">Nincs elérhető videó</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;