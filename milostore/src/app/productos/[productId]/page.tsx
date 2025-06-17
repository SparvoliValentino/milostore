import { fetchingProductByID } from "@/helpers/productHelper";
import ProductDetail from "@/components/ProductDetail/ProductDetail";

interface ProductPageProps {
    params: Promise<{ productId: string }>; // Asegurar que params es una promesa
}

const ProductDetailPage = async ({ params }: ProductPageProps) => {
    const { productId } = await params; 
    if (!productId) {
        return <p className="text-red-500">Error: ID del producto no encontrado.</p>;
    }

    try {
        const productByID = await fetchingProductByID(productId);

        return (
            <div className="w-full bg-white dark:bg-white min-h-[700px] mx-auto  pt-[80px] md:pt-[120px]">
                <ProductDetail product={productByID} />
            </div>

        );
    } catch (error) {
        console.log(error)
        return <p className="text-red-500">Error al cargar el producto.</p>;
    }
};

export default ProductDetailPage;

