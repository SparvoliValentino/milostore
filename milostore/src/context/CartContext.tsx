'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { IProducto } from '../interfaces/IProduct';

type ProductoEnCarrito = IProducto & {
    cantidad: number;
};


interface CartContextType {
    cart: IProducto[];
    addToCart: (product: IProducto) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    cartCount: number;
    updateCantidad: (productId: string, nuevaCantidad: number) => void; // 👈 agregado
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<ProductoEnCarrito[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCart(storedCart);
        }
    }, []);

    const addToCart = (product: IProducto) => {
        setCart((prevCart) => {
            const existing = prevCart.find(p => p.id === product.id);
            let updatedCart;

            if (existing) {
                updatedCart = prevCart.map(p =>
                    p.id === product.id ? { ...p, cantidad: (p.cantidad || 1) + 1 } : p
                );
            } else {
                updatedCart = [...prevCart, { ...product, cantidad: 1 }];
            }

            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };



    const removeFromCart = (productId: string) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((product) => product.id !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.setItem('cart', '[]');
    };

    const updateCantidad = (productId: string, nuevaCantidad: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.id === productId ? { ...item, cantidad: nuevaCantidad } : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };




    return (
        <CartContext.Provider value={
            {
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                cartCount: cart.length,
                updateCantidad
            }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};