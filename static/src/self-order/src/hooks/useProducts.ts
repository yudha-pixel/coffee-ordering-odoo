import { useState, useEffect } from 'react';
import { ProductCategory } from '@/types';

export const useProducts = () => {
    const [productGroups, setProductGroups] = useState<ProductCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                // Fetch data from your Odoo endpoint
                const response = await fetch('/self_order/app/products');
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status}`);
                }
                const data: ProductCategory[] = await response.json();
                setProductGroups(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, []); // Empty dependency array makes it run once on mount

    return { productGroups, loading, error };
};