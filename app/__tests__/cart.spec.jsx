import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useCartStore } from "../hooks/cartStore";
import { useRouter } from "next/navigation";
import { getOrderDate, getRandonNumberOrder } from "../utils/utils";
import { mockCartItems } from "./mocks";
import Cart from "../cart/page";

jest.mock("../hooks/cartStore", () => ({
  useCartStore: jest.fn(() => ({
    items: [],
    removeItem: jest.fn(),
    clearCart: jest.fn(),
  })),
}));

const useRouterMock = {
    push: jest.fn(),
  };
  jest.mock("next/navigation", () => ({
    useRouter: () => useRouterMock,
  }));

jest.mock("../utils/utils", () => ({
  getRandonNumberOrder: jest.fn(() => "12345"),
  getOrderDate: jest.fn(() => "2024-05-03"),
}));

describe("Cart Component", () => {
  beforeEach(() => {
    useCartStore.mockClear();
    useRouterMock.push.mockClear();
  });

  it("debería renderizar los items del carrito", () => {
    useCartStore.mockReturnValue({
      items: mockCartItems,
      removeItem: jest.fn(),
      clearCart: jest.fn(),
    });

    render(<Cart />);

    mockCartItems.forEach((item) => {
      expect(
        screen.getByTestId(`cart-item-name-${item.cartId}`),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`cart-item-details-${item.cartId}`),
      ).toBeInTheDocument();
    });
  });

  it("debería llamar a removeItem al hacer clic en 'Eliminar'", () => {
    const removeItemMock = jest.fn();
    useCartStore.mockReturnValue({
      items: mockCartItems,
      removeItem: removeItemMock,
      clearCart: jest.fn(),
    });

    render(<Cart />);

    const removeButton = screen.getByTestId(`remove-item-1`);
    fireEvent.click(removeButton);

    expect(removeItemMock).toHaveBeenCalledWith("1");
  });

  it("debería llamar a router.push al hacer clic en 'CONTINUA COMPRANDO'", () => {
    useCartStore.mockReturnValue({
      items: mockCartItems,
      removeItem: jest.fn(),
      clearCart: jest.fn(),
    });

    render(<Cart />);

    const continueShoppingButton = screen.getByTestId("continue-shopping");
    fireEvent.click(continueShoppingButton);

    expect(useRouterMock.push).toHaveBeenCalledWith("/");
  });
  

//   it("debería llamar a clearCart y router.push al hacer clic en 'PAY'", async () => {
//     const clearCartMock = jest.fn();

//     useCartStore.mockReturnValue({
//       items: mockCartItems,
//       removeItem: jest.fn(),
//       clearCart: clearCartMock,
//     });

//     render(<Cart />);

//     const payButton = screen.getByTestId("pay-button");
//     fireEvent.click(payButton);

//     expect(clearCartMock).toHaveBeenCalled();

//     await waitFor(() => {
//       expect(useRouterMock.push).toHaveBeenCalledWith("/cart/success");
//     });
//   });

  it("debería mostrar 'PROCSANDO...' mientras se está procesando el pago", () => {
    useCartStore.mockReturnValue({
      items: mockCartItems,
      removeItem: jest.fn(),
      clearCart: jest.fn(),
    });

    render(<Cart />);

    const payButton = screen.getByTestId("pay-button");
    fireEvent.click(payButton);

    expect(payButton).toHaveTextContent("PROCESANDO...");
  });
});
