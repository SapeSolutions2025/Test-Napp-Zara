import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetail from "../components/ProductDetail";
import { mockProduct } from "./mocks";
import { useCartStore } from "../hooks/cartStore";

jest.mock("../hooks/cartStore", () => ({
  useCartStore: jest.fn(() => ({
    addItem: jest.fn(),
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
  })),
}));

describe("ProductDetail Component", () => {
  beforeEach(() => {
    useCartStore.mockClear();
  });

  it("debería renderizar el nombre y precio del producto", () => {
    render(<ProductDetail product={mockProduct} />);

    expect(
      screen.getByTestId(`product-name-${mockProduct.id}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`product-price-${mockProduct.id}`),
    ).toBeInTheDocument();
  });

  it("debería mostrar las opciones de almacenamiento", () => {
    render(<ProductDetail product={mockProduct} />);

    mockProduct.storageOptions.forEach((option) => {
      expect(screen.getByText(option.capacity)).toBeInTheDocument();
    });
  });

  it("debería mostrar las opciones de color", () => {
    render(<ProductDetail product={mockProduct} />);

    mockProduct.colorOptions.forEach((color) => {
      const colorButton = screen.getByTestId(
        `button-color-${color.name.replace(/\s/g, "")}`,
      );
      expect(colorButton).toBeInTheDocument();
    });
  });

  it("debería permitir seleccionar una opción de almacenamiento", () => {
    render(<ProductDetail product={mockProduct} />);

    const storageOption = mockProduct.storageOptions[0];
    const storageButton = screen.getByText(storageOption.capacity);

    fireEvent.click(storageButton);

    expect(storageButton).toHaveClass("storage-option--active");
  });

  it("debería permitir seleccionar una opción de color", () => {
    render(<ProductDetail product={mockProduct} />);

    const colorIndex = 1;
    const colorOption = mockProduct.colorOptions[colorIndex];
    const colorButton = screen.getByTestId(
      `button-color-${colorOption.name.replace(/\s/g, "")}`,
    );

    fireEvent.click(colorButton);

    expect(colorButton.closest("button")).toHaveClass("color-option--active");
  });

  it("debería llamar a addItem del store del carrito al hacer clic en 'AÑADIR'", () => {
    const addItemMock = jest.fn();
    useCartStore.mockReturnValue({ addItem: addItemMock });

    render(<ProductDetail product={mockProduct} />);

    const storageOption = mockProduct.storageOptions[0];
    const storageButton = screen.getByText(storageOption.capacity);
    fireEvent.click(storageButton);

    const colorIndex = 0;
    const colorButton = screen.getByTestId(
      `button-color-${mockProduct.colorOptions[colorIndex].name.replace(
        /\s/g,
        "",
      )}`,
    );
    fireEvent.click(colorButton);

    const addToCartButton = screen.getByText("AÑADIR");
    fireEvent.click(addToCartButton);

    expect(addItemMock).toHaveBeenCalledWith({
      id: mockProduct.id,
      brand: mockProduct.brand,
      name: mockProduct.name,
      price: storageOption.price,
      color: mockProduct.colorOptions[colorIndex].name,
      colorValue: mockProduct.colorOptions[colorIndex].hexCode,
      image: mockProduct.colorOptions[colorIndex].imageUrl,
      storage: storageOption.capacity,
    });
  });

  it("debería mostrar la lista de productos similares si existen", () => {
    render(<ProductDetail product={mockProduct} />);

    const similarProductsTitle = screen.getByText("PRODUCTOS SIMILARES");
    expect(similarProductsTitle).toBeInTheDocument();
    const firstProductName = mockProduct.similarProducts[0].name;
    expect(screen.getByText(firstProductName)).toBeInTheDocument();

  });
});
