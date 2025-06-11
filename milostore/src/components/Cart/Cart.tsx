"use client";

import { useCart } from "@/context/CartContext";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { Poppins } from 'next/font/google';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

import { Archivo_Black } from "next/font/google";

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black',
});



const Cart = () => {
  const { cart, removeFromCart, updateCantidad } = useCart();

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const total = cart.reduce(
    (acc, curr) => acc + curr.price * (curr.cantidad ?? 1),
    0
  );

  const whatsappMessage = useMemo(() => {
    if (cart.length === 0) return "";

    const message = cart
      .map((product, index) => {
        const cantidad = product.cantidad ?? 1;
        const subtotal = product.price * cantidad;
        return `Producto ${index + 1}:\n- Nombre: ${product.productName}\n- Precio unitario: $${product.price}\n- Cantidad: ${cantidad}\n- Subtotal: $${subtotal}\n`;
      })
      .join("\n");

    return `¡Hola! Quisiera finalizar mi compra con los siguientes productos:\n\n${message}\nTotal: $${total}`;
  }, [cart]);

  const generateWhatsAppLink = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[1000px] mx-auto">
      {cart.length === 0 ? (
        <div className="w-full max-w-[80%] mx-auto flex flex-col justify-evenly items-center h-[300px]">
          <h2 className="text-gray-400 text-xl text-center">
            Tu carrito se encuentra vacío! Es momento de comenzar tu búsqueda
          </h2>
          <Link
            href={"/productos"}
            className="bg-[#2C2C2C] hover:bg-black rounded-2xl p-3 text-white font-bold"
          >
            Explorá nuestros productos
          </Link>
        </div>
      ) : (
        cart.map((product) => {
          const cantidad = product.cantidad ?? 1;

          return (
            <div
              key={product.id}
              className="bg-[#FFFDFE] flex items-center justify-between w-full max-w-[90%] mx-auto h-auto rounded-xl shadow-md p-4 gap-3"
            >
              {/* Imagen */}
              <Image
                src={product.images[0]}
                alt={product.productName}
                width={60}
                height={60}
                className="rounded-lg object-contain w-[60px] h-[60px]"
              />

              {/* Nombre + Precio */}
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-sm font-semibold text-[#1A1A1A]">{product.productName}</h2>
                <p className="text-[#D78DB4] font-bold">${product.price}</p>
              </div>

              {/* Cantidad */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (cantidad > 1) {
                      updateCantidad(product.id, cantidad - 1);
                    }
                  }}
                  className="w-8 h-8 rounded-full bg-gray-300 text-black font-bold hover:bg-gray-400 disabled:opacity-50"
                  disabled={cantidad === 1}
                >
                  −
                </button>
                <span className="font-semibold text-[#1A1A1A]">{cantidad}</span>
                <button
                  onClick={() => updateCantidad(product.id, cantidad + 1)}
                  className="w-8 h-8 rounded-full bg-gray-300 text-black font-bold hover:bg-gray-400"
                >
                  +
                </button>
              </div>

              {/* Botón eliminar */}
              <button
                className="w-8 h-8 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center"
                onClick={() => removeFromCart(product.id)}
              >
                <FontAwesomeIcon icon={faX} className="text-white text-sm" />
              </button>
            </div>

          );
        })
      )}

      {cart.length > 0 && (
        <>
          <div className="w-full md:max-w-[500px] flex flex-col justify-center items-center border-t-2 max-w-[90%] mx-auto border-gray-300 pt-4">
            <div className="flex gap-3">
              <h2 className={`${archivoBlack.className} text-outline text-xl md:text-2xl font-bold text-black`}>TOTAL :</h2>
              <p className="text-xl font-bold text-black md:text-3xl">${total}</p>

            </div>
            <p className="text-gray-500 text-center text-[12px] max-w-[90%] mx-auto">
              Tené en cuenta que este monto no incluye el envío. Podés consultarlo por WhatsApp al finalizar tu pedido.
            </p>
          </div>
          <div className="my-5 flex justify-center items-center w-full">
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-green-600 text-white text-center py-3 px-6 rounded-lg hover:bg-green-700 transition"
            >
              Finalizar compra por WhatsApp
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
