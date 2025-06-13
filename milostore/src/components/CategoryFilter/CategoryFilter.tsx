'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { fetchingProducts } from '@/helpers/productHelper';

const CategoryFilter = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Todo');
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (categoria: string) => {
    setSelected(categoria);
    setIsOpen(false);
    if (categoria === 'Todo') {
      router.push('/productos');
    } else {
      router.push(`/productos/categoria/${encodeURIComponent(categoria)}`);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-[260px] bg-[#FFFDFE] p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold text-[#1A1A1A] mb-3 tracking-wide">
        Filtrar por categoría
      </h2>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-2 bg-[#FFECF6] border-2 border-[#D78DB4] text-[#1A1A1A] font-medium rounded-full flex justify-between items-center"
      >
        {selected}
        <span className="text-[#D78DB4]">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <ul className="absolute z-50 mt-2 w-full bg-white border border-[#D78DB4] rounded-2xl shadow-lg overflow-hidden">
          {['Todo', ...categories].map((cat) => (
            <li
              key={cat}
              onClick={() => handleSelect(cat)}
              className={`px-4 py-2 cursor-pointer hover:bg-[#FFE1F0] text-[#1A1A1A] transition ${
                selected === cat ? 'bg-[#FFDCF8]' : ''
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryFilter;
