"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

// Reducer para manejar las acciones del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id && item.color === action.payload.color,
      )

      if (existingItemIndex >= 0) {
        // El item ya existe, incrementar cantidad
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        }
        return { ...state, items: updatedItems }
      } else {
        // Nuevo item
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        }
      }
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => !(item.id === action.payload.id && item.color === action.payload.color)),
      }
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        // Si la cantidad es 0 o menos, eliminar el item
        return {
          ...state,
          items: state.items.filter((item) => !(item.id === action.payload.id && item.color === action.payload.color)),
        }
      }

      // Actualizar la cantidad
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id && item.color === action.payload.color
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      }
    }

    case "CLEAR_CART": {
      return { ...state, items: [] }
    }

    case "SET_ITEMS": {
      return { ...state, items: action.payload, isLoading: false }
    }

    default:
      return state
  }
}

// Crear el contexto
const CartContext = createContext(undefined)

// Proveedor del contexto
export const CartProvider = ({children}) => {
  const initialState = {
    items: [],
    isLoading: true,
  }

  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
          dispatch({ type: "SET_ITEMS", payload: JSON.parse(savedCart) })
        } else {
          dispatch({ type: "SET_ITEMS", payload: [] })
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
        dispatch({ type: "SET_ITEMS", payload: [] })
      }
    }

    loadCart()
  }, [])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem("cart", JSON.stringify(state.items))
    }
  }, [state.items, state.isLoading])

  // Funciones para manipular el carrito
  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeItem = (id, color) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, color } })
  }

  const updateQuantity = (id, color, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, color, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const value = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

