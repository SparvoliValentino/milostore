import FilteredProducts from "@/components/FormFilter/FormFilter";
// import { Poppins } from 'next/font/google';
type Props = {
  params: Promise<{
    category: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

// import { Anton } from 'next/font/google';
import { Archivo_Black } from 'next/font/google';

const archivoBlack = Archivo_Black({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-archivo-black',
});


const CategoriaPage = async ({ params }: Props) => {
  const { category: encodedCategory } = await params;
  const category = decodeURIComponent(encodedCategory);


  return (
    <div className="min-h-screen bg-white pt-[80px] md:pt-[120px]">
      <div className="w-full max-w-[1500px] mx-auto flex flex-col justify-center items-center">
        <div className="w-full max-w-[90%] mx-auto flex justify-center items-center border-b-2 border-gray-700 mb-5">
          <h2 className={`${archivoBlack.className} font-black text-center text-black text-4xl my-6 text-outline-black`}>
            {category}
          </h2>
        </div>
        <div className="flex w-full gap-6 px-4">
          <FilteredProducts categoria={category} />
        </div>
      </div>
    </div>
  );
};

export default CategoriaPage;
