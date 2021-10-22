import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const TestimonialSection = () => {
  return (
    <section className="text-center w-full py-16 bg-primary">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={25}
        totalSlides={3}
        infinite={true}
      >
        <Slider>
          <Slide index={0}>I am the first Slide.</Slide>
          <Slide index={1}>I am the second Slide.</Slide>
          <Slide index={2}>I am the third Slide.</Slide>
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    </section>
  );
};

export default TestimonialSection;
