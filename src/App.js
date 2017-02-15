//@flow
import React, {Component} from 'react';
import autobind from 'class-autobind';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';

import View from './coreUI/View';
import TextInput from './coreUI/TextInput';
import Heading from './coreUI/Heading';
import Button from './coreUI/Button';

import type {ProductDetailType} from './types/ProductDetail';

import {body, productListStyle, productDetailStyle, headerStyle} from './App-styles';

type State = {
  products: Array<ProductDetailType>;
  isLoading: boolean;
  isEdit: boolean;
  isAdd: boolean;
  selectedID?: string;
  searchText?: string;
};

class App extends Component {
  state: State;

  constructor(...args: any) {
    super(...args);
    this.state = {
      products: [],
      isLoading: true,
      isEdit: false,
      isAdd: false,
    };
    autobind(this);
  }

  componentWillMount() {
    fetch('http://127.0.0.1:8000/products').then((response) => response.json())
    .then((data: Array<ProductDetailType>) => {
      this.setState({
        products: data,
        isLoading: false,
      });
    });
  }

  Header() {
    return (
      <View>
        <Heading
          numHeading= "1"
          value="Product"
        />
      </View>
    );
  }

  Body() {
    let {isLoading, selectedID, products, isEdit, isAdd} = this.state;
    let detailProduct = products.find((product) => {
      if (product.id === selectedID) {
        return product;
      }
    });

    let clickEdit = () => {
      if (this.state.isEdit) {
        this.setState({isEdit: false});
      } else {
        this.setState({isEdit: true});
      }
    };

    let clickProduct = (id: string) => {
      this.setState({selectedID: id});
    };

    let cancel = () => {
      this.setState({
        isAdd: false,
        isEdit: false,
      });
    };

    let searchText = this.state.searchText;
    let productsFilter = this.state.products.filter((product) => {
      if (searchText) {
        if (product.name.toLowerCase().includes(searchText.toLowerCase())) {
          return product;
        }
      } else {
        return product;
      }
    });

    if (isLoading) {
      return <View>Loading</View>;
    } else {
      return (
        <View style={body}>
          <View id="productList" style={productListStyle}>
            <ProductList
              // products={this.state.products}
              products={productsFilter}
              clickProduct={clickProduct}
            />
          </View>
          <View id="productDetail" style={productDetailStyle}>
            <ProductDetail
              detailProduct={detailProduct}
              selectedID={selectedID}
              clickEdit={clickEdit}
              isEdit={isEdit}
              isAdd={isAdd}
              cancel={cancel}
              componentWillMount={this.componentWillMount}
            />
          </View>
        </View>
      );
    }
  }

  render() {
    let searchProduct = (searchText) => {
      this.setState({searchText: searchText});
    };

    let showForm = () => {
      this.setState({isAdd: true});
    };

    return (
      <View>
        <View style={headerStyle}>
          <this.Header />
          <View>
            <Button
              nameButton= "New Product"
              onClick={showForm}
            />
            <TextInput
              isMultiline= {false}
              onTextChange={searchProduct}
              otherAttr={{placeholder: 'Search'}}
            />
          </View>
        </View>
        <View>
          <this.Body />
        </View>
      </View>
    );
  }

}

export default App;
