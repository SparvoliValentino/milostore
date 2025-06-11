"use client";
import { useEffect, useState, useRef } from "react";
import { IProducto } from "@/interfaces/IProduct";
import ProductCard from "../ProductHomeCard/ProductHomeCard";
import { fetchingProducts } from "@/helpers/productHelper";

interface Props {
  currentProductId: string;
  category: string;
}

import { Archivo_Black } from "next/font/google";

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black',
});

const RecommendedProductsCarousel = ({ currentProductId, category }: Props) => {
  const [recommended, setRecommended] = useState<IProducto[]>([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 260; // ancho estimado de cada card con márgenes
  const VISIBLE_CARDS = 4;

  useEffect(() => {
    const fetch = async () => {
      const allProducts = await fetchingProducts();
      const filtered = allProducts
        .filter(
          (p) =>
            p.category &&
            p.category.toLowerCase() === category.toLowerCase() &&
            p.id !== currentProductId
        )
        .slice(0, 20); // limitar por si hay muchos
      setRecommended(filtered);
    };
    fetch();
  }, [category, currentProductId]);

  const scrollLeft = () => {
    if (scrollIndex > 0) {
      setScrollIndex((prev) => prev - 1);
    }
  };

  const scrollRight = () => {
    if (scrollIndex < recommended.length - VISIBLE_CARDS) {
      setScrollIndex((prev) => prev + 1);
    }
  };

  if (recommended.length === 0) {
    return (
      <div className="mt-12 px-4 w-full text-center">
        <h3 className={`${archivoBlack.className} text-2xl uppercase font-semibold text-[#2C2C2C]`}>
          No se encuentran productos relacionados por el momento
        </h3>
      </div>
    );
  }

  return (
    <div className="mt-12 px-4 w-full relative">
      <h3 className={`${archivoBlack.className} text-2xl uppercase font-semibold text-center mb-6 text-[#2C2C2C]`}>
        Productos relacionados
      </h3>

      {/* Contenedor externo */}
      <div className="relative">
        {/* Botón izquierdo */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-3 md:p-2 z-10"
        >
          ◀
        </button>

        {/* Carrusel deslizable */}
        <div
          ref={containerRef}
          className="overflow-hidden w-full"
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${scrollIndex * CARD_WIDTH}px)`,
              width: `${recommended.length * CARD_WIDTH}px`,
            }}
          >
            {recommended.map((product) => (
              <div
                key={product.id}
                className="max-w-[260px] md:min-w-[240px] md:max-w-[260px] mx-2 md:mx-15 flex-shrink-0 "
              >
                <ProductCard
                  id={product.id}
                  productName={product.productName}
                  price={product.price}
                  images={product.images}
                  stock={!!product.stock}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Botón derecho */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-3 md:p-2 z-10"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default RecommendedProductsCarousel;

