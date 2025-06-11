import Image from "next/image";
import imageBackground from '../../public/heroBanner1.svg'
import imageBackground2 from '../../public/heroBanner2.svg'
import RandomProductHome from "@/components/RandomizerProductHome/RandomizerProductHome";
import Link from "next/link";
import CarrouselHeroBanner from "@/components/CarrouselHeroBanner/CarrouselHeroBanner";

// const poppins = Poppins({ weight: '900', subsets: ['latin'], });

export default function Home() {
  return (
    <div className="min-h-screen pt-[80px] md:pt-[120px]" >
      <CarrouselHeroBanner/>

      <div className="w-full max-w-[1500px] mx-auto flex flex-col items-center gap-4 justify-center my-7">
        <h2 style={{ fontFamily: 'Cheque, sans-serif' }} className="text-3xl text-center md:text-5xl font-bold text-[#1A1A1A] tracking-widest">Nuestros productos</h2>
        <RandomProductHome />
      </div>
    </div>
  );
}


