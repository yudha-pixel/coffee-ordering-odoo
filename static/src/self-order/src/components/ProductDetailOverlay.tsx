import {useEffect, useMemo, useState} from 'react';
import {Product, ProductVariant} from "@/types";
import {X, Minus, Plus} from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx"
import { Checkbox } from "@/components/ui/checkbox"

import LazyImage from "@/components/LazyImage.tsx";
import AnimatedContent from '@/components/AnimatedContent.tsx'

import RecommendText from "@/assets/RecommendText.png?inline";
import NewMenu from "@/assets/NewMenu.png?inline";

interface ProductDetailOverlayProps {
    item: Product;
    onClose: () => void;
    onAddToCart: (item: Product, quantity: number, variantId: number    ) => void;
}

export default function ProductDetailOverlay({ item, onClose, onAddToCart }:
    ProductDetailOverlayProps
) {
    const [quantity, setQuantity] = useState(1);

    const [selectedOptions, setSelectedOptions] = useState<Record<string, string | string[]>>(() => {
        const initialOptions: Record<string, string | string[]> = {};
        if (item.variants) {
            Object.entries(item.variants).forEach(([key, config]) => {
                if (config.display_type === 'multi') {
                    initialOptions[key] = [];
                } else {
                    if (config.values && typeof config.values === 'object') {
                        const options = Object.keys(config.values);
                        if (options.length > 0) {
                            initialOptions[key] = options[0];
                        }
                    }
                }
            });
        }
        return initialOptions;
    });

    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    useEffect(() => {
        const findVariant = () => {
            if (!item.product_variants) return null;

            return item.product_variants.find(variant => {
                // Get all attribute keys from the selected options to ensure the variant is a potential match
                const selectedKeys = Object.keys(selectedOptions);
                const variantKeys = Object.keys(variant.combination);

                // Basic check: if the number of attributes doesn't match, it's not the right variant.
                if(selectedKeys.length !== variantKeys.length) return false;

                // Check if this variant's combination is a match for the currently selected options
                return selectedKeys.every((key) => {
                    const selectedValue = selectedOptions[key];
                    const variantValue = variant.combination[key];

                    // If variant doesn't have a value for this key, it's not a match.
                    if (variantValue === undefined) return false;

                    if (Array.isArray(selectedValue)) {
                        // For multi-select (checkboxes):
                        // 1. Create a sorted string from the user's selections.
                        const sortedSelectedString = [...selectedValue].sort().join(', ');
                        // 2. Compare it with the value from the variant's combination.
                        return variantValue === sortedSelectedString;
                    } else {
                        // For single-select (radio), it's a direct comparison.
                        return variantValue === selectedValue;
                    }
                });
            });
        };

        const variant = findVariant();
        setSelectedVariant(variant || null);

    }, [selectedOptions, item.product_variants]);


    const handleSingleOptionChange = (attribute: string, value: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            [attribute]: value,
        }));
    };

    const handleMultiOptionChange = (attribute: string, value: string, checked: boolean) => {
        setSelectedOptions(prev => {
            const currentSelection = (prev[attribute] as string[] | undefined) || [];
            const newSelection = checked
                ? [...currentSelection, value]
                : currentSelection.filter(item => item !== value);
            return {
                ...prev,
                [attribute]: newSelection,
            };
        });
    };

    const [isClosing, setIsClosing] = useState(false);
    const handleClose = () => {
        setIsClosing(true);
    };

    const totalPrice = useMemo(() => {
    // 1. Start with the product's main base price.
    let calculatedPrice = item.price;

    // 2. Add the extra cost from ALL selected options.
    if (item.variants) {
        Object.entries(selectedOptions).forEach(([attributeKey, selectedValue]) => {
            const attributeConfig = item.variants![attributeKey];
            // Ensure config and values exist before proceeding
            if (!attributeConfig || !attributeConfig.values) return;

            // Handle multi-select arrays (checkboxes)
            if (Array.isArray(selectedValue)) {
                selectedValue.forEach(optionName => {
                    calculatedPrice += attributeConfig.values[optionName] || 0;
                });
            }
            // Handle single-select strings (radio buttons)
            else {
                // Find the default option that is considered part of the base price
                // (Assumes the first option is the default)
                const defaultOption = Object.keys(attributeConfig.values)[0];

                // Add the price of the currently selected option
                calculatedPrice += attributeConfig.values[selectedValue] || 0;

                // Subtract the price of the default option, because its cost
                // is already included in the item's main price.
                calculatedPrice -= attributeConfig.values[defaultOption] || 0;
            }
        });
    }

    // 3. Return the final calculated price multiplied by quantity.
    return calculatedPrice * quantity;
}, [selectedOptions, quantity, item]);

    const handleAddToCartClick = () => {
        if (!selectedVariant) {
            // Optional: Prevent adding to cart if no valid variant is selected
            console.error("No valid product variant selected.");
            return;
        }
        // Pass the specific variant ID to the parent component/handler
        onAddToCart(item, quantity, selectedVariant.id);
        handleClose(); // Use handleClose to trigger the exit animation
    };

    return (
        //TODO: available product, variant, combo
        <div className="fixed w-full inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 z-50 flex items-end">
            <div
                className="absolute inset-0"
                onClick={handleClose}
            />
            <AnimatedContent
              distance={300}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              delay={0}
              isExiting={isClosing}
              onExitComplete={onClose}
            >
                <div className="relative bg-white w-full h-full flex flex-col rounded-t-2xl">
                    {/* Header and Image */}
                    <div className="relative -mx-6 mb-4 shrink-0 h-64">
                        <LazyImage src={item.image_url} alt={item.name} className="size-full flex justify-center items-center" />
                    </div>

                    <button onClick={handleClose}
                            className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md">
                        <X className="w-5 h-5"/>
                    </button>

                    {/* Scrollable Content */}
                    <div className="px-6 overflow-y-auto flex-grow pb-40">
                        {/* Product Info */}
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-2xl font-medium">{item.name}</h2>
                            <div className="text-right">
                                <p className="text-2xl font-medium">Rp {item.price.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Base price</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between items-start mb-20">
                            <div className="flex flex-col w-full gap-2 pb-[25px] border-b-2 border-gray-200">
                                <div className="flex gap-3">
                                    {item.isNew &&
                                        <img src={NewMenu} alt="New"/>
                                    }
                                    {item.isRecommend &&
                                        <img src={RecommendText} alt="Recommend"/>
                                    }
                                </div>
                                <div className="flex gap-3">
                                    <p className="text-gray-400 mb-6">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full">
                                {item.variants && Object.entries(item.variants).map(([attribute, config]) => (
                                    <div key={attribute} className="w-full py-[25px] border-b-2 border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-lg font-semibold mb-3">{attribute}</Label>
                                            {config.display_type === 'multi' ?
                                                <Badge className="bg-[#FAF7F4] text-[#A67B66] inline-flex items-center px-2.5 py-1 rounded justify-center relative">
                                                      Opsional
                                                </Badge>
                                                :
                                                <Badge className="bg-[#EFE7DA] text-[#84482B] inline-flex items-center px-2.5 py-1 rounded justify-center relative">
                                                      Pick 1
                                                </Badge>
                                            }
                                        </div>
                                        {config.display_type !== 'multi' ? (
                                            <RadioGroup
                                                value={selectedOptions[attribute] as string}
                                                onValueChange={(value) => handleSingleOptionChange(attribute, value)}
                                                className="space-y-4"
                                            >
                                                {config.values && Object.entries(config.values).map(([value, price_extra]) => (
                                                     <div key={value} className="flex items-center justify-between">
                                                         <div className="flex items-center">
                                                             <RadioGroupItem
                                                                 id={`${attribute}-${value}`}
                                                                 value={value}
                                                                 className="mr-3 h-5 w-5 text-[#84482B] border-[#84482B] focus:ring-[#84482B] focus-visible:ring-[#84482B]/50" />
                                                             <Label className="text-lg" htmlFor={`${attribute}-${value}`}>{value}</Label>
                                                         </div>
                                                         {price_extra > 0 && <span className="text-lg font-medium">+ Rp {price_extra.toLocaleString()}</span>}
                                                     </div>
                                                ))}
                                            </RadioGroup>
                                        ) : (
                                            <div className="space-y-4">
                                                {config.values && Object.entries(config.values).map(([value, price_extra]) => (
                                                    <div key={value} className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <Checkbox
                                                                id={`${attribute}-${value}`}
                                                                checked={(selectedOptions[attribute] as string[]).includes(value)}
                                                                onCheckedChange={(checked) => handleMultiOptionChange(attribute, value, !!checked)}
                                                                className="mr-3 h-5 w-5 text-[#84482B] border-[#84482B]"
                                                            />
                                                            <Label className="text-lg" htmlFor={`${attribute}-${value}`}>{value}</Label>
                                                        </div>
                                                        {price_extra > 0 && <span className="text-lg font-medium">+ Rp {price_extra.toLocaleString()}</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="w-full py-[25px]">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-row justify-between items-center">
                                        <h3 className="font-semibold mb-3">Notes</h3>
                                        <Badge className="bg-[#FAF7F4] text-[#A67B66] inline-flex items-center px-2.5 py-1 rounded justify-center relative">
                                            Optional
                                        </Badge>
                                    </div>
                                    <Textarea className="border-[#84482B] focus-visible:ring-[#84482B]/50" placeholder="Example: Less Ice"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-around m-4 w-full">
                                <Button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="rounded-lg p-2 bg-opacity-75 border-2 border-primary text-primary"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="w-5 h-5" />
                                </Button>
                                <span className="text-xl font-bold">{quantity}</span>
                                <Button onClick={() => setQuantity(q => q + 1)}
                                        className="rounded-lg p-2">
                                    <Plus className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Sticky Footer */}
                    <div className="absolute bottom-0 left-0 w-full bg-white p-6 border-t border-gray-400
                        rounded-t-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.12)]">
                        <Button
                            onClick={handleAddToCartClick}
                            className="w-full h-full bg-[#84482b] hover:bg-[#6d3a23] text-white py-4 text-lg"
                        >
                            Add to Basket - Rp {totalPrice.toLocaleString()}
                        </Button>
                    </div>
                </div>
            </AnimatedContent>
        </div>
    );
}