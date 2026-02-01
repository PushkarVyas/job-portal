import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer",
];

const CategoryCarousel = () => {
  return (
    <Carousel className="w-full max-w-xl mx-auto my-20 relative">
      <CarouselContent>
        {category.map((cat, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3 flex justify-center"
          >
            <Button variant="outline" className="rounded-full">{cat}</Button>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CategoryCarousel;
