'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchingProducts } from '@/helpers/productHelper';

const CategoryFilter = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const productos = await fetchingProducts();
      const categorias = productos
        .map(p => p.category)
        .filter((c): c is string => typeof c === "string");
      const unique = [...new Set(categorias)];
      setCategories(unique);
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoria = e.target.value;
    if (categoria === 'Todo') {
      router.push('/productos');
    } else {
      router.push(`/productos/categoria/${encodeURIComponent(categoria)}`);
    }
  };

  return (
    <div className="w-[260px] h-auto bg-[#FFFDFE] p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4 tracking-wide">
        Filtrar por categoría
      </h2>
      <select
        onChange={handleChange}
        className="w-full px-4 py-2 border-2 border-[#D78DB4] rounded-full text-[#1A1A1A] bg-white focus:outline-none focus:ring-2 focus:ring-[#D78DB4] transition"
      >
        <option value="Todo">Todo</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;

