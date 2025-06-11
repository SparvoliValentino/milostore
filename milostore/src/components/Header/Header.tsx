"use client"
import Image from "next/image"
// import logo from '../../../public/milostoreLogo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link"
import { useCart } from "@/context/CartContext"


// import { Anton } from 'next/font/google';
import { Archivo_Black } from 'next/font/google';
import { useState } from "react";

const archivoBlack = Archivo_Black({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-archivo-black',
});


const Header = () => {
    const { cartCount } = useCart();

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className="w-full bg-[#FFDCF8] min-h-[80px] md:min-h-[120px] fixed top-0 z-50">
            <div className="max-w-[1000px] mx-auto flex flex-row md:flex-col justify-evenly md:justify-center items-center gap-2 p-2">
                <div className="w-full justify-center items-center flex md:block">
                    <Link href="/" className="flex justify-center items-center">
                        <h1 style={{ fontFamily: 'Cheque, sans-serif' }} className="font-cheque text-5xl text-[#1A1A1A]">MILO</h1>
                    </Link>
                </div>
                <div className="hidden md:block w-full">
                    <nav className="w-full">
                        <ul className="w-full flex justify-evenly items-center">
                            <Link href="/nosotros"><h2 className={`${archivoBlack.className} text-outline text-[10px] md:text-[30px] text-[#1A1A1A] hover:border-b-black hover:border-b-2`}>Nosotros</h2></Link>
                            <Link href="/nosotros"><h2 className={`${archivoBlack.className} text-outline text-[10px] md:text-[30px] text-[#1A1A1A] hover:border-b-black hover:border-b-2`}>Ultimos ingresos</h2></Link>
                            <Link href="/productos"><h2 className={`${archivoBlack.className} text-outline text-[10px] md:text-[30px] text-[#1A1A1A] hover:border-b-black hover:border-b-2`}>Productos</h2></Link>
                            <Link href={'/carrito'} className="flex items-center">
                                <FontAwesomeIcon icon={faCartShopping} bounce={cartCount > 0} className="w-[30px] h-[30px] text-black" />
                                {cartCount > 0 && <span className="ml-2 text-sm font-semibold text-black">{cartCount}</span>}
                            </Link>
                        </ul>
                    </nav>
                </div>
                <div className="w-[200px] mt-3 flex justify-center items-center md:hidden">
                    <button
                        className="md:hidden text-white text-4xl"
                        onClick={toggleMenu}
                        aria-label="Abrir menú"
                    >
                        <FontAwesomeIcon icon={faBars} className="text-[#1a1a1a]" />
                    </button>
                </div>
                {menuOpen && (
                    <>
                        {/* Fondo oscuro detrás del menú */}
                        <div
                            className="fixed inset-0 bg-black opacity-70 z-40"
                            onClick={toggleMenu} // para cerrar tocando el fondo
                        ></div>

                        {/* Menú lateral */}
                        <div className="fixed top-0 right-0 w-[250px] h-full bg-[#FFDCF8] shadow-lg p-6 flex flex-col gap-6 z-50 transition-transform duration-300">
                            <button
                                className="text-black text-3xl self-end"
                                onClick={toggleMenu}
                                aria-label="Cerrar menú"
                            >
                                &times;
                            </button>
                            <Link href="/nosotros" className={`${archivoBlack.className} text-outline text-[30px] text-[#1A1A1A] hover:border-b-black hover:border-b-2`} onClick={toggleMenu}>Nosotros</Link>
                            <Link href="/nosotros" className={`${archivoBlack.className} text-outline text-[30px] text-[#1A1A1A] hover:border-b-black hover:border-b-2`} onClick={toggleMenu}>Últimos ingresos</Link>
                            <Link href="/productos" className={`${archivoBlack.className} text-outline text-[30px] text-[#1A1A1A] hover:border-b-black hover:border-b-2`} onClick={toggleMenu}>Productos</Link>
                            <Link href="/carrito" className="flex items-center text-black text-lg" onClick={toggleMenu}>
                                <FontAwesomeIcon icon={faCartShopping} className="w-[20px] h-[20px] mr-2" />
                                Carrito ({cartCount})
                            </Link>
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default Header;