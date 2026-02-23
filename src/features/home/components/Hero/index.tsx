import React from "react";
import ImageHero from "./componets/ImageHero";
import HeroDescription from "./componets/HeroDescription";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="container">
      <ImageHero src={"dkkkkkkkd"} alt={"ldskfjsdal"} />
      <HeroDescription title={"dfd"} descritption={"dslkfjdslkfljkdsf"} />
      <Button className="bg-primary">hasan</Button>
      <p className="text-primary">sldkfjdslkjf</p>
    </div>
  );
};

export default Hero;
