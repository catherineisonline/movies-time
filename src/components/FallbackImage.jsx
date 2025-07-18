export const FallbackImage = ({ src, alt, fallback }) => {
    const validSrc = src ? src : fallback;
    return (
        <img
            alt={alt}
            src={validSrc}
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallback;
            }}
        />
    );
};
