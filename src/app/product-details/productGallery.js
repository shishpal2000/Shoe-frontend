import { useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import styles from "../../styles/productGallery.module.css";

const Product = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className={styles.product}>
      <div className={styles.mainImage}>
        <InnerImageZoom src={mainImage} zoomSrc={mainImage} />
      </div>
      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            onClick={() => setMainImage(image)}
            className={mainImage === image ? styles.active : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;
