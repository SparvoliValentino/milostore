"use client";
import { IProducto } from "@/interfaces/IProduct";
import { useEffect, useState } from "react";
import ProductHomeCard from "../ProductHomeCard/ProductHomeCard";
import { fetchingProducts } from "@/helpers/productHelper";

const RandomProductHome = () => {
  const [randomProducts, setRandomProducts] = useState<IProducto[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Función para obtener productos aleatorios (crea una copia del array antes de ordenarlo)
  const getRandomProducts = (array: IProducto[], count: number): IProducto[] => {
    if (array.length === 0) return []; // Evita problemas si el array está vacío
    return [...array].sort(() => Math.random() - 0.5).slice(0, count);
  };

  useEffect(() => {
    setIsClient(true);

    const loadProducts = async () => {
      try {
        const productosData = await fetchingProducts();

        // Filtrar productos que sí tienen stock
        const disponibles = productosData.filter((producto) => producto.stock);

        if (disponibles.length > 0) {
          const aleatorios = getRandomProducts(disponibles, 4);
          setRandomProducts(aleatorios);
          console.log("Productos aleatorios seleccionados:", aleatorios);
        }

      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    loadProducts();
  }, []);

  if (!isClient) return <p className="text-center text-gray-500">Cargando...</p>;

  return (
    <div className="flex flex-wrap md:gap-4 justify-center">
      {randomProducts.map((product, index) => (
        <ProductHomeCard
          key={`${product.id}-${index}`} // Asegura que cada carta tiene una key única
          id={product.id}
          productName={product.productName}
          price={product.price}
          images={product.images} // Tomamos solo la primera imagen
          stock={product.stock ? product.stock : false}
        />
      ))}
    </div>
  );
};

export default RandomProductHome;