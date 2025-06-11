import Cart from "@/components/Cart/Cart";
import { Archivo_Black } from "next/font/google";

const archivoBlack = Archivo_Black({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-archivo-black',
});

const carrito = ()=>{

    return(
        <div className="w-full max-w-[1500px] mx-auto flex flex-col items-center justify-start min-h-[500px] md:min-h-[700px] pt-[80px] md:pt-[120px]">
            <div className="w-full max-w-[90%] border-b-2 border-black text-center mb-4">
                <h2 className={`${archivoBlack.className}text-black text-[50px] font-bold`}>Tu carrito</h2>
            </div>
            <Cart/>
        </div>
    )
}

export default carrito;