import Image from "next/image"
import imageBackground from "../../../public/heroBanner.png"

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
        <div className="min-h-screen  pt-[80px] md:pt-[120px]">
            <div className="relative w-full h-[400px]">
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
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <h1 className={`${archivoBlack.className} text-outline text-3xl md:text-9xl font-bold text-white`}>MOND</h1>
                    <h2 className="text-white font-bold italic text-2xl">Somos calle, estilo y actitud</h2>
                </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row w-full max-w-[1500px] mx-auto justify-center items-center gap-4 md:gap-0">
                <div className="w-1/2 flex items-center flex-col border-r-0 md:border-r-2 border-white">
                    <h2 className={`${archivoBlack.className} text-outline text-3xl md:text-3xl font-bold text-white`}>Contactanos</h2>
                    <ul className="my-3 flex flex-col gap-5 justify-center items-start w-[200px]">
                        <li className="text-white w-full">
                            <a href={generateWhatsAppLink()} target="_black" rel="noopener noreferrer" className="text-white text-center ">
                                <FontAwesomeIcon icon={faWhatsapp} className="text-2xl mx-3" />
                                Whastapp
                            </a>
                        </li>
                        <li className="text-white">
                            <a href="https://www.instagram.com/mond.sn?igsh=eHk4d2luYjhraGpv" className="text-white text-center ">
                                <FontAwesomeIcon icon={faInstagram} className="text-2xl mx-3" />
                                Instagram
                            </a>
                        </li>
                        <li className="text-white">
                            <FontAwesomeIcon icon={faEnvelope} className="text-white text-center " />
                            MondSn@gmail.com
                        </li>
                    </ul>
                </div>
                <div className="w-1/2 flex items-center flex-col p-3 gap-3">
                    <h2 className={`${archivoBlack.className} text-outline text-3xl md:text-3xl font-bold text-white`}>Donde nos encontramos</h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3333.418385151974!2d-60.22316052343996!3d-33.33401779156044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7678e4fb4d6e7%3A0xa81ab24ba4672883!2sChacabuco%207%2C%20B2900%20San%20Nicol%C3%A1s%20de%20Los%20Arroyos%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1743782035860!5m2!1ses!2sar"
                        width="300"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        className="rounded-2xl"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>
    )
}

export default nosotros