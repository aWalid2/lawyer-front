import React from "react";

type ImageHeroProps = {
  src: string;
  alt: string;
};

const ImageHero: React.FC<ImageHeroProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};

export default ImageHero;
