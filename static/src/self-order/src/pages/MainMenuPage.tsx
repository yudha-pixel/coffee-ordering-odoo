import ProductComponent from "@/components/ProductComponent.tsx";
import {Product} from "@/types";

interface MainMenuPageProps {
    productGroups: Product[];
    loading: boolean;
    error: string | null;
}

export default function MainMenuPage({ productGroups, loading, error }: MainMenuPageProps) {

    return (
        <div className="relative bg-white font-sans">
            {/*Content*/}
            <div className="p-8 pt-0">
                {loading && (
                    <p className="text-blue-600">Loading menu, harap tunggu...</p>
                )}
                {error && (
                    <p className="text-red-600">Terjadi kesalahan saat memuat menu: {error}</p>
                )}
                {!loading && !error && (
                    <div className="space-y-4">
                        {productGroups.map(product => (
                            <ProductComponent key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}