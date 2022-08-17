import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navi from "./components/Navi";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import alertify from "alertifyjs";

class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: [],
  };

  changeCategory = (cat) => {
    this.setState({ currentCategory: cat.categoryName });
    this.getProducts(cat.id);
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = (id) => {
    let url = "http://localhost:3000/products";
    if (id) {
      url += "?categoryId=" + id;
    }
    fetch(url)
      .then((res) => res.json())
      .then((res) => this.setState({ products: res }));
  };

  addToCart = (product) => {
    // console.log(product.productName)
    let newCart = this.state.cart;

    let isAddedCart = newCart.find(
      (cartItem) => cartItem.product.id === product.id
    );
    if (isAddedCart) {
      isAddedCart.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });

    alertify.success(product.productName + " Added!", 2);
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(
      (cartItem) => cartItem.product.id !== product.id
    );
    this.setState({ cart: newCart });
  };

  render() {
    let productInfo = { title: "Product List" };

    return (
      <div className="App">
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                title="Category List"
              />
            </Col>
            <Col xs="9">
              <ProductList
                currentCategory={this.state.currentCategory}
                info={productInfo}
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
