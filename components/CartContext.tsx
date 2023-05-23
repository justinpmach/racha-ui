import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const local = typeof window !== 'undefined' ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      local.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (local && local.getItem('cart')) {
      setCartProducts(JSON.parse(local.getItem('cart')));
    }
  }, []);
  function addProduct(productId) {
    setCartProducts(prev => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts(prev => {
      // prev is an array of ids
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }

  function clearCart() {
    console.log('cartProducts Before: ', cartProducts);
    setCartProducts([]);
    console.log('cartProducts After: ', cartProducts);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
