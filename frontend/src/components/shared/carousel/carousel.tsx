"use client";

import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import CarouselCard from "./carouselCard/carouselCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FAANG_COMPANY = process.env.CROUSAL_COMPANIES?.split(",") || [
  "Amazon",
  "Apple",
  "Google",
];

export function SharedCarousel({ delay = 2000 }: { delay?: number }) {
  return (
    <div className="container mx-auto px-4">
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: delay,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {FAANG_COMPANY.map((companyName, index) => (
            <CarouselItem
              key={`${companyName}-${index}`}
              className="pl-2 md:pl-4 sm:basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card className="h-[400px]">
                  <CarouselCard
                    className="flex items-center justify-evenly flex-col h-full"
                    companyName={companyName}
                  />
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute hidden md:block dark:border-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer" />
        <CarouselNext className="absolute hidden md:block dark:border-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer" />
      </Carousel>
    </div>
  );
}
