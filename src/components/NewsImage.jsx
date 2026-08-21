import "./newsImage.css";

export default function NewsImage({ image, featured = false }) {
  if (!image?.src) {
    return null;
  }

  return (
    <figure className={`news-image${featured ? " news-image--featured" : ""}`}>
      <img src={image.src} alt={image.alt || ""} />
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
}
