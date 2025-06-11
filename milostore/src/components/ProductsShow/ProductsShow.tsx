'use client'

import { IProducto } from "@/interfaces/IProduct";
import { useEffect, useState } from "react";
import ProductHomeCard from "../ProductHomeCard/ProductHomeCard";

const ProductosShow = () => {

    const convertirEnlaceGoogleDrive = (url: string): string => {
        if (!url) return "/placeholder.png"; // Imagen por defecto si la URL está vacía

        // Extraer el ID de Google Drive
        const match = url.match(/\/d\/(.*?)\//);
        if (match) {
            return `https://drive.google.com/uc?export=view&id=${match[1]}`;
        }

        // Si el enlace no es válido, mostrar una imagen de respaldo
        return "/placeholder.png";
    };
    const [productos, setProductos] = useState<IProducto[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const fetchProductos = async () => {
            try {
                const response = await fetch(
                    "https://docs.google.com/spreadsheets/d/1E1nTrr3iZGiQH-7FNzJA-7ypaKvYBp5hsk1UTbZnu4M/gviz/tq?tqx=out:json"
                );
                const text = await response.text();
                const jsonData = JSON.parse(text.substring(47, text.length - 2));
                
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const productosData = jsonData.table.rows.map((row: any) => {
                    const id = row.c[0]?.v?.toString() || "ID Desconocido";
                    const nombre = row.c[1]?.v?.toString() || "Sin nombre";
                    const precio = row.c[3]?.v || 0;

                    // **Corrección de conversión de imágenes**
                    const imagenesRaw = row.c[4]?.v ? String(row.c[4].v) : "";
                    const imagenes = imagenesRaw
                        ? imagenesRaw.split(", ").map(convertirEnlaceGoogleDrive)
                        : ["/placeholder.png"];

                    return { id, nombre, precio, imagenes };
                });

                setProductos(productosData);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        fetchProductos();
    }, []);

    // **Evita renderizar en el servidor para evitar Hydration Mismatch**
    if (!isClient) return <p className="text-center text-gray-500">Cargando...</p>;

    return (
        <div className="flex flex-wrap gap-4 justify-center">
            {productos.map((product, index) => (
                <ProductHomeCard
                    key={`${product.id}-${index}`} // Asegura que cada carta tiene una key única
                    id={product.id}
                    productName={product.productName}
                    price={product.price}
                    images={Array.isArray(product.images) ? product.images : ["/placeholder.png"]} // Tomamos solo la primera imagen
                    stock={product.stock ? product.stock:false}
                />
            ))}
        </div>
    )
}

export default ProductosShow