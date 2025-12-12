const Title = ({ title, reversed = false }) => {
  const reversedClass = reversed ? "lg:order-first" : "";

  return (
    <div className={`mt-20 ${reversedClass}`}>
      <div
        className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900"
        dangerouslySetInnerHTML={{ __html: title }}
      ></div>
    </div>
  );
};

export default Title;