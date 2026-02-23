import React from "react";

type HeroDescriptionProps = {
  title: string;
  descritption: string;
};

const HeroDescription: React.FC<HeroDescriptionProps> = ({
  title,
  descritption,
}) => {
  return (
    <div>
      <div>
        <h2>{title}</h2>
        <p>{descritption}</p>
      </div>
    </div>
  );
};

export default HeroDescription;
