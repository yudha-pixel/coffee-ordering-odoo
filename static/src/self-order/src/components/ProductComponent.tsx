import {Product} from "@/types";
import LazyImage from "@/components/LazyImage.tsx";
import { Plus } from "lucide-react";
import NewMenu from "@/assets/NewMenu.png?inline";
import Recommend from "@/assets/Recommend.png?inline";


interface ProductComponentProps {
    product: Product;
}

export default function ProductComponent({ product }: ProductComponentProps) {
    return (
        <div key={product.id} className="w-full bg-white border-b flex pb-3">
            <div className="w-full flex gap-3">
                <div className="w-50 h-30 flex bg-gray-700 dark:bg-gray-700 rounded-xl overflow-hidden">
                    <LazyImage
                        src={product.image_url}
                        alt={product.name}
                        className="w-full object-cover"
                    />
                </div>

                <div className="flex flex-col justify-between w-full h-full">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                            <div className="flex-1">
                                <h3 className="flex gap-2 font-semibold text-gray-900 dark:text-gray-100 text-base">
                                    {product.name}
                                    {product.isRecommend && (
                                        <img src={Recommend} alt="New"/>
                                    )}
                                    {product.isNew && (
                                        <img src={NewMenu} alt="New"/>
                                    )}
                                </h3>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-end mb-2">
                        <div className="flex justify-between items-center mt-3">
                            <div className="space-y-1">
                                <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                                    Rp {product.price.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <div className="border border-[#84482b] text-white px-2 py-2 rounded-sm shadow-sm
                                relative transition-colors duration-200 flex items-center space-x-2">
                            <Plus className="w-4 h-4 text-[#84482b]"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}