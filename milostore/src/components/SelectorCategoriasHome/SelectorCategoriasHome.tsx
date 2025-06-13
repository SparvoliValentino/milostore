'use client';

import { useRouter } from 'next/navigation';

const categoryData = [
  { name: 'Mini Bag', label: 'Mini Bag' },
  { name: 'Cuadernos', label: 'Cuadernos' },
  { name: 'Carteras', label: 'Carteras' },
  { name: 'Botellas', label: 'Botellas' },
  { name: 'Billetera', label: 'Billetera' },
  // Agregá más si querés
];

const CategorySelector = () => {
  const router = useRouter();

  const handleClick = (category: string) => {
    router.push(`/productos/categoria/${encodeURIComponent(category)}`);
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {categoryData.map((cat) => (
          <button
            key={cat.name}
            onClick={() => handleClick(cat.name)}
            className="bg-[#FFECF6] hover:bg-[#FFDCF8] text-[#1A1A1A] font-semibold px-6 py-4 rounded-2xl shadow-md transition text-lg min-w-[140px]"
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
