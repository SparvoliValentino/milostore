import Image from "next/image"
import imageBackground from "../../../public/heroBanner3.jpeg"

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

import { Archivo_Black } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const archivoBlack = Archivo_Black({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-archivo-black',
});

const nosotros = () => {

    const generateWhatsAppLink = () => {
        const encodedMessage = encodeURIComponent('Hola! Quisieras hacerles una consulta!');
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    };


    return (
        <div className="min-h-screen bg-white dark:bg-white pt-[80px] md:pt-[120px]">
            <div className="relative w-full h-[400px] md:h-[600px]">
                {/* Imagen de fondo */}
                <Image
                    src={imageBackground}
                    alt="Fondo"
                    className="w-full h-full object-cover blur-xs mask-image"
                    fill
                    priority
                />

                {/* Capa de opacidad gris */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-transparent opacity-70"></div>

                {/* Texto centrado */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-7">
                    <h1 style={{ fontFamily: 'Cheque, sans-serif' }} className={`${archivoBlack.className} text-8xl md:text-9xl font-bold text-white`}>MILO</h1>
                    <h2 className="text-center text-white font-bold italic text-2xl">Carteras, billeteras y detalles pensados para acompañarte en cada paso</h2>
                </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row w-full max-w-[1500px] mx-auto justify-center items-center gap-4 p-5 md:gap-0">
                <div className="w-full md:w-1/2 flex items-center flex-col border-r-0 md:border-r-2 border-white">
                    <h2 style={{ fontFamily: 'Cheque, sans-serif' }} className={`${archivoBlack.className} text-3xl md:text-8xl font-bold text-black`}>Contactanos</h2>
                    <ul className="w-full my-3 flex gap-5 justify-evenly items-start">
                        <li className="text-white flex flex-col justify-center items-center bg-pink-400 p-5 rounded-full">
                            <a href={generateWhatsAppLink()} target="_black" rel="noopener noreferrer" className="text-white text-center ">
                                <FontAwesomeIcon icon={faWhatsapp} className="text-2xl mx-3" />
                                Whastapp
                            </a>
                        </li>
                        <li className="text-white flex flex-col justify-center items-center bg-pink-400 p-5 rounded-full">
                            <a href="https://www.instagram.com/milos_store1/" className="text-white text-center ">
                                <FontAwesomeIcon icon={faInstagram} className="text-2xl mx-3" />
                                Instagram
                            </a>
                        </li>
                    </ul>
                    <div className="w-full flex justify-center items-center p-3">
                        <p className={`text-xl text-center font-semibold text-black`}>Recorda estar siempre pendiente a todas nuestras redes para no perderte de nada</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default nosotros