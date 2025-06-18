import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card"; // Example usage of shadcn Card

export interface CarouselSlide {
  id: string | number;
  content?: React.ReactNode; // For complex content
  imageUrl?: string;
  altText?: string;
  title?: string;
  description?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplayOptions?: Parameters<typeof Autoplay>[0];
  slideClassName?: string;
  aspectRatio?: string; // e.g., 'aspect-video', 'aspect-[2/1]'
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  autoplayOptions = { delay: 4000, stopOnInteraction: false },
  slideClassName = "flex-[0_0_100%]",
  aspectRatio = "aspect-video", // Default to 16:9
}) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

  console.log("Rendering Carousel with slides:", slides.length);

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className="embla overflow-hidden relative group" ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slide) => (
          <div className={`embla__slide ${slideClassName} min-w-0`} key={slide.id}>
            {slide.content ? (
              slide.content
            ) : (
              <Card className="m-1 md:m-2 shadow-none border-none bg-transparent">
                <CardContent className={`flex items-center justify-center p-0 ${aspectRatio} overflow-hidden rounded-lg`}>
                  {slide.imageUrl ? (
                    <img
                      src={slide.imageUrl}
                      alt={slide.altText || slide.title || `Slide ${slide.id}`}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center">
                      <span className="text-xl font-semibold">{slide.title || 'Promotional Slide'}</span>
                      {slide.description && <p className="text-sm text-gray-600 mt-1">{slide.description}</p>}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
      {/* Optional: Add Prev/Next buttons and Dots here, styled to appear on hover */}
    </div>
  );
};

export default Carousel;