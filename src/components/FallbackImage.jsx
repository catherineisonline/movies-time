export const FallbackImage = ({ src, alt, fallback }) => {
  const validSrc = src ? src : fallback;
  return (
    <img
      className="movie-cover"
      alt={alt}
      src={validSrc}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = fallback;
      }}
    />
  );
};
