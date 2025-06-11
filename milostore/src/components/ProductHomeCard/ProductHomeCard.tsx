import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { useCart } from "@/context/CartContext";

const ProductHomeCard = ({
  id,
  productName,
  price,
  images,
  stock,
}: {
  id: string;
  productName: string;
  price: number;
  images: string[];
  stock: boolean;
}) => {
  const { addToCart } = useCart();
  const imageUrl = images.length > 0 ? images[0] : "/placeholder.png";

  const handleAddToCart = () => {
    if (!stock) return;

    Swal.fire({
      title: "Vas a añadir este producto a tu carrito",
      text: "¿Estás seguro?",
      icon: "warning",
      confirmButtonColor: "#D78DB4",
    }).then((result) => {
      if (result.isConfirmed) {
        addToCart({ id, productName, price, images });
        Swal.fire("Añadido", "El producto fue añadido al carrito.", "success");
      }
    });
  };

  return (
    <div
      className="relative w-[160px] md:w-[240px] bg-[#FFFDFE] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      key={id}
    >
      {/* Overlay si no hay stock */}
      {!stock && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-30 flex items-center justify-center pointer-events-none">
          <p className="text-white font-bold text-lg">Sin stock</p>
        </div>
      )}

      <Link href={`/productos/${id}`} className="z-0 block">
        {/* Imagen del Producto */}
        <div className="relative w-full h-[160px] md:h-[200px] bg-gray-100 flex items-center justify-center p-2">
          <Image
            src={imageUrl}
            alt="Producto"
            fill
            className="object-contain"
          />
        </div>

        {/* Información del Producto */}
        <div className="p-4 flex flex-col justify-between h-[160px]">
          <h3 className="text-[#1A1A1A] font-semibold text-[15px] md:text-[16px] uppercase leading-tight tracking-wide mb-1">
            {productName}
          </h3>
          <p className="text-[#D78DB4] font-bold text-xl">${price}</p>

          <button
            onClick={handleAddToCart}
            disabled={!stock}
            className={`mt-4 w-full py-2 rounded-xl text-white font-medium transition ${
              stock
                ? "bg-[#2C2C2C] hover:bg-black"
                : "bg-gray-400 cursor-not-allowed opacity-70"
            }`}
          >
            Añadir al carrito
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductHomeCard;



// import Image from "next/image";
// import Link from "next/link";
// import Swal from "sweetalert2";
// import { useCart } from "@/context/CartContext";

// const ProductHomeCard = ({
//   id,
//   productName,
//   price,
//   images,
//   stock,
// }: {
//   id: string;
//   productName: string;
//   price: number;
//   images: string[];
//   stock: boolean;
// }) => {
//   const { addToCart } = useCart();
//   const imageUrl = images.length > 0 ? images[0] : "/placeholder.png";

//   const handleAddToCart = () => {
//     if (!stock) return;

//     Swal.fire({
//       title: "Vas a añadir este producto a tu carrito",
//       text: "¿Estás seguro?",
//       icon: "warning",
//       confirmButtonColor: "#3085d6",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         addToCart({ id, productName, price, images });
//         Swal.fire("Añadido", "El producto fue añadido al carrito.", "success");
//       }
//     });
//   };

//   return (
//     <div className="relative w-[150px] md:w-[250px] bg-white md:rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:bg-gray-400/50 transition" key={id} >
//       {/* Overlay si no hay stock */}
//       {!stock && (
//         <div className="absolute inset-0 bg-gray-300/40 backdrop-blur-[2px] z-30 flex items-center justify-center pointer-events-none rounded-lg">
//           <p className="text-white font-bold text-xl drop-shadow">Sin stock</p>
//         </div>

//       )}

//       <Link href={`/productos/${id}`} className="z-0 ">
//         {/* Imagen del Producto */}
//         <div className="relative w-full h-[140px] md:h-[180px] flex items-center justify-center bg-gray-100">
//           <Image
//             src={imageUrl}
//             alt="Producto"
//             fill
//             className="object-cover"
//           />
//         </div>

//         {/* Información del Producto */}
//         <div className="p-4 ">
//           <h3 className="text-gray-800 font-semibold text-lg">
//             {productName}
//           </h3>
//           <div className="flex items-center space-x-2">
//             <p className="text-black font-bold text-xl">${price}</p>
//           </div>

//           {/* Botón de agregar al carrito */}
//           <button
//             onClick={handleAddToCart}
//             className={`mt-3 w-full py-2 rounded-lg flex items-center justify-center space-x-2 text-white font-semibold transition
//               ${stock
//                 ? "bg-black hover:bg-gray-800"
//                 : "bg-gray-400 cursor-not-allowed opacity-60"
//               }`}
//             disabled={!stock}
//           >
//             Añadir al carrito
//           </button>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductHomeCard;
