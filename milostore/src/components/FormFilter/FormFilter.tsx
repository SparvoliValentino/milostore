"use client";
import { useEffect, useState } from "react";
import { IProducto } from "@/interfaces/IProduct";
import { fetchingProducts } from "@/helpers/productHelper";
import ProductCard from "../ProductHomeCard/ProductHomeCard"; // Componente para mostrar productos

const PRODUCTS_PER_PAGE = 8;

const FilteredProducts = ({ categoria }: { categoria: string }) => {
  // const [products, setProducts] = useState<IProducto[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProducto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await fetchingProducts();
      // setProducts(fetchedProducts);

      let filtered = fetchedProducts;
      if (categoria && categoria !== "all" && categoria !== "Todo") {
        filtered = fetchedProducts.filter(
          (product) =>
            typeof product.category === "string" &&
            product.category.toLowerCase() === categoria.toLowerCase()
        );
      }

      const ordered = filtered.sort((a, b) => {
        const stockA = Number(a.stock ?? 0);
        const stockB = Number(b.stock ?? 0);
        return stockB - stockA;
      });

      setFilteredProducts(ordered);
      setCurrentPage(1); // Reinicia a la primera página si cambia la categoría
    };

    fetchData();
  }, [categoria]);

  const getPaginationRange = (current: number, total: number) => {
    const delta = 1; // Páginas alrededor de la actual
    const range = [];
    // const rangeWithDots: (number | string)[] = [];

    let left = current - delta;
    let right = current + delta;

    // Asegura que esté dentro del rango válido
    left = Math.max(2, left);
    right = Math.min(total - 1, right);

    // Siempre mostrar la primera página
    range.push(1);

    // Agrega "..." si hay separación entre 1 y el bloque izquierdo
    if (left > 2) {
      range.push("...");
    }

    // Agrega las páginas cercanas a la actual
    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    // Agrega "..." si hay separación entre el bloque derecho y la última
    if (right < total - 1) {
      range.push("...");
    }

    // Siempre mostrar la última página
    if (total > 1) {
      range.push(total);
    }

    return range;
  };

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex-grow flex flex-wrap gap-4 md:gap-4 justify-center md:justify-center">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              productName={product.productName}
              price={product.price}
              images={Array.isArray(product.images) ? product.images : ["/placeholder.png"]}
              stock={product.stock ? product.stock : false}
            />
          ))
        ) : (
          <p className="text-gray-500">No hay productos en esta categoría.</p>
        )}
      </div>

      {/* Paginador estilo Google */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2 mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="text-pink-600 disabled:opacity-50"
          >
            &lt; Atras
          </button>

          {getPaginationRange(currentPage, totalPages).map((page, idx) =>
            page === "..." ? (
              <span key={idx} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => setCurrentPage(Number(page))}
                className={`px-2 text-sm ${currentPage === page ? "font-bold text-black" : "text-pink-600"
                  }`}
              >
                {page}
              </button>
            )
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="text-pink-600 disabled:opacity-50"
          >
            Siguiente &gt;
          </button>
        </div>
      )}

    </div>
  );
};

export default FilteredProducts;
