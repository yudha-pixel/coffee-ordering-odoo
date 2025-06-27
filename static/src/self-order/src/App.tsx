import MainMenuPage from "@/pages/MainMenuPage.tsx";
import {useState} from "react";
import Logo from "@/components/Logo.tsx";
import { Menu, Search } from "lucide-react";
import {useProducts} from "@/hooks/useProducts.ts";


export default function App() {
    const [isDarkMode] = useState(false);
    const { productGroups, loading, error } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState<string | number>('all');
    const allProducts = productGroups.flatMap(
        g => g.products.map(p => ({...p, category: g.name})));
    const filterCategories = [
        { id: 'all', name: 'All' },
        { id: 'isNew', name: 'New' },
        { id: 'isRecommend', name: 'Recommended' },
        { id: 'mostOrder', name: 'Most Ordered' },
        ...productGroups.map(pg => ({ id: pg.id, name: pg.name }))
    ];

    return (
        <div className={`relative w-full h-screen bg-white flex flex-col ${isDarkMode ? 'dark' : ''}`}>
            {/*Header*/}
            <div className="bg-white dark:bg-gray-900 dark:border-gray-800 flex-shrink-0 z-10">
                <div className="size-auto flex items-center px-5 py-4">
                    <div className="flex justify-start">
                        <button
                            className="relative w-8 h-8 rounded-lg duration-200 flex items-center justify-center">
                            <Menu className="text-[#84482b]" />
                        </button>
                    </div>

                    <div className="flex-1 flex justify-center">
                        <Logo />
                    </div>
                </div>

                {/*Filter*/}
                <div className="col py-4 pb-2">
                    <div className="flex relative px-5">

                        {/*Search*/}
                        <div className="absolute inset-y-0 left-5 pl-4 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-gray-300 dark:bg-gray-800"/>
                        </div>
                        <input type="text" placeholder="Search for items..."
                              className="w-full pl-12 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300
                              dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#84482b]
                              focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100"/>

                    </div>
                    <div className="flex overflow-x-auto py-3 px-5">
                        {filterCategories.map(group => (
                            <button
                                key={'group_' + group.id}
                                onClick={() => setSelectedCategory(group.id)}
                                className={`px-4 py-2 mx-1 rounded-lg whitespace-nowrap transition-colors duration-200 text-sm font-light ${
                                    selectedCategory === group.id
                                        ? 'bg-[#84482b] text-white shadow'
                                        : 'bg-white dark:bg-gray-800 ' 
                                        + 'text-gray-300 dark:text-gray-200 '
                                        + 'border border-gray-300 dark:border-gray-700'
                                }`}
                            >
                                {group.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <MainMenuPage productGroups={allProducts} loading={loading} error={error}/>
            </div>
        </div>
    );
}
