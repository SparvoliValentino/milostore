"use client"
import { useState } from "react";
import imageBackground from "../../../public/heroBanner1.svg"
import imageBackground2 from "../../../public/heroBanner2.svg"
import Image from "next/image";
import Link from "next/link";

const CarrouselHeroBanner = () => {
  const slides = [
    {
      src: imageBackground,
      text: 'Ver productos',
      href: '/productos/carteras',
    },
    {
      src: imageBackground2,
      text: 'Explorar ingresos',
      href: '/productos/billeteras',
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full aspect-[16/9] md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <Image
          key={index}
          src={slide.src}
          alt={`Slide ${index}`}
          fill
          priority
          className={`
            absolute top-0 left-0 w-full h-full scale-[100%] object-cover transition-opacity duration-1000 ease-in-out
            ${index === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0'}
          `}
        />
      ))}

      {/* Botón con texto dinámico */}
      <div className="absolute top-[60%] md:top-[70%] inset-0 flex flex-col items-center justify-center z-20">
        <Link
          href={slides[currentImageIndex].href}
          className="text-white text-[20px] md:text-[26px] font-bold bg-[#2C2C2C] text-center flex justify-center items-center w-[200px] h-[50px] md:w-[300px] md:h-[70px] rounded-xl transition duration-500"
        >
          {slides[currentImageIndex].text}
        </Link>
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-[#1a1a1a80] text-white px-4 py-2 rounded-full"
      >
        ◀
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-[#1a1a1a80] text-white px-4 py-2 rounded-full"
      >
        ▶
      </button>
    </div>
  );
};

export default CarrouselHeroBanner;
