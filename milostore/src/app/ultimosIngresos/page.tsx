import CategoryFilter from "@/components/CategoryFilter/CategoryFilter"
import FilteredProducts from "@/components/FormFilter/FormFilter"
import UltimosIngresos from "@/components/UltimosIngresos/UltimosIngresos"

const Productos = () => {
    return (
        <div className="min-h-screen bg-white  pt-[80px] md:pt-[120px]">
            <div className="w-full max-w-[1500px] mx-auto p-3 flex flex-col justify-center items-center">
                <div className="w-full mx-auto flex justify-center items-center border-b-2 border-gray-700 mb-5">
                    <h2 style={{ fontFamily: 'Cheque, sans-serif' }} className="text-black text-center text-4xl my-6 text-outline-black tracking-widest">Ultimos Ingresos</h2>
                </div>
                <div className="flex items-start gap-7 w-full">
                    <div className="w-full">
                        <UltimosIngresos/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Productos