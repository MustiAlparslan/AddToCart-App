import React, { Component } from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class CategoryList extends Component {
  state = {
    // STATIC DATA
    categories: [],
    // categories: [
    //   {catId: 1, catName: "Action "},
    //   {catId: 2, catName: "Comedy "}
    // ],
    // currentCategory: ""
  }

  componentDidMount(){
    this.getCategories();
  }
  
  // GET CATEGORIES FROM API 
  getCategories = () => {
    fetch("http://localhost:3000/categories")
    .then(res => res.json())
    .then(res => this.setState({categories:res}))
  }

  // changeCategory = (cat) => {
  //   this.setState({currentCategory:cat.catName})
  // }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <ListGroup>
          {
              this.state.categories.map((cat) => (
                <ListGroupItem  
                  active={cat.categoryName === this.props.currentCategory ? true : false} 
                  onClick={() => this.props.changeCategory(cat) }
                  key={cat.id}> {cat.categoryName}
                </ListGroupItem>
              ))      
          }
        </ListGroup>
        {/* <h4>{this.props.currentCategory}</h4> */}
      </div>
    );
  }
}

