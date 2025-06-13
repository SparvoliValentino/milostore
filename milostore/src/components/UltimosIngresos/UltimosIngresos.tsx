'use client';
import { useEffect, useState } from 'react';
import { fetchingProducts } from '@/helpers/productHelper';
import { IProducto } from '@/interfaces/IProduct';
import ProductHomeCard from '@/components/ProductHomeCard/ProductHomeCard';
import { Archivo_Black } from 'next/font/google';

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black',
});

const UltimosIngresos = () => {
  const [ultimos, setUltimos] = useState<IProducto[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const productos = await fetchingProducts();
      const ordenados = [...productos]
        .sort((a, b) => (a.id < b.id ? 1 : -1)) // Podés cambiar por createdAt si tenés
        .slice(0, 30);
      setUltimos(ordenados);
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex-grow flex flex-wrap gap-4 md:gap-4 justify-center md:justify-center">
        {ultimos.map((prod) => (
          <ProductHomeCard
            key={prod.id}
            id={prod.id}
            productName={prod.productName}
            price={prod.price}
            images={prod.images}
            stock={!!prod.stock}
          />
        ))}
      </div>
    </div>
  );
};

export default UltimosIngresos;
