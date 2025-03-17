import { render, screen } from "@testing-library/react";
import ProductList from "../components/ProductList";
import { mockProduct } from "./mocks";

// Ejemplo de test para ProductList
describe("ProductList", () => {
  it("debe renderizar una lista de productos con el número correcto de items", () => {
    render(<ProductList products={mockProduct} />);

    const productLinks = screen.getAllByRole("link");
    expect(productLinks).toHaveLength(mockProduct.length);
  });

  it("should display information of the first product", () => {
    render(<ProductList products={mockProduct} />);

    const firstProduct = mockProduct[0];

    expect(screen.getByTestId(`brand-name-${firstProduct.id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`product-name-${firstProduct.id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`product-price-${firstProduct.id}`)).toBeInTheDocument();
    expect(
      screen.getByText(`${firstProduct.basePrice} EUR`)
    ).toBeInTheDocument();
  });
});
