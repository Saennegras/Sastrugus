const Video = ({ video, reversed = false }) => {
  const reversedClass = reversed ? "lg:flex-row-reverse" : "";

  const getYouTubeEmbedUrl = (url) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
    );
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
  };

  const embedUrl = getYouTubeEmbedUrl(video);

  if (!embedUrl) return <p>Érvénytelen YouTube link</p>;

  return (
    <div className={`flex flex-col lg:flex-row items-center my-4 ${reversedClass}`}>
      <div className="w-full lg:w-1/2 p-2">
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
      </div>
    </div>
  );
};

export default Video;