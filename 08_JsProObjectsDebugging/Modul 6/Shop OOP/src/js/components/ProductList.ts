import { Component } from "./Component";
import { ProductItem } from "./ProductItem";
import { CartContext, Product } from "../contexts/CartContext";

interface ProductListProps {
  cartContext: CartContext;
}

export class ProductList extends Component<ProductListProps> {
  state: { products: Product[] };

  constructor(props: ProductListProps) {
    super(props);
    this.state = { products: [] };
  }

  mount(container: Element) {
    fetch(`https://fakestoreapi.com/products`);
    fetch("./products.json")
      .then((response) => response.json() as Promise<Product[]>)
      .then((data) => {
        this.state.products = data;
        container.appendChild(this.render());
        // console.log(data)
      })
      .catch((err) => console.error(err));
  }

  render(): HTMLElement {
    const productList = document.createElement("div");
    productList.className =
      "row gx-3 gx-lg-3 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center  product-list";

    this.state.products.forEach((product) => {
      const productItem = new ProductItem({
        product,
        cartContext: this.props.cartContext,
      });
      // console.log(productItem.render());

      productList.appendChild(productItem.render());
    });

    return productList;
  }
}
