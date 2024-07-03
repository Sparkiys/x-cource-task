import { useState } from "react";
import notFoundImage from "../components/images/imageNotFound.png";

export function useImage({ book }) {
  const initialImage = book && book.image ? book.image : "";
  const [imageSrc, setImageSrc] = useState(initialImage);

  const handleImageError = () => {
    if (imageSrc !== notFoundImage) {
      setImageSrc(notFoundImage);
    }
  };

  return {
    imageSrc,
    handleImageError,
  };
}
