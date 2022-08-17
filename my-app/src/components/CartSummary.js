import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavLink,
  NavItem,
} from "reactstrap";

export default class CartSummary extends Component {
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Your Cart{" "}
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((item) => (
            <DropdownItem style={{display: "flex", justifyContent: "space-between"}} key={item.product.id}>
                <Badge  color="danger" onClick={() => this.props.removeFromCart(item.product)}>X</Badge>
                    {item.product.productName}
                <Badge  color="success">{item.quantity}</Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
  
  renderEmptyCart(){
    return(
        <NavItem>
            <NavLink>Cart is Empty</NavLink>
        </NavItem>
    )
  }

  render() {
    return <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmptyCart()}
    </div>;
  }
}
