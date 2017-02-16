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
  selectedID?: ?string;
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

    let deleteClick = (id: string) => {
      /*eslint-disable no-alert, no-console*/
      let wantDelete = confirm(`Are you sure want to delete this product?`);
      /*eslint-enable no-alert*/
      if (wantDelete) {
        let options = {
          method: 'DELETE',
        };
        fetch(`http://127.0.0.1:8000/products/delete/${id}`, options)
        .then((response) => response.json())
        .then(() => this.componentWillMount())
        .catch((error) => console.error(error));
      }
    };

    let saveEdit = (id, oldObj, tempObj) => {
      if (Object.keys(tempObj).length !== 0) {
        tempObj['id'] = id;
        if (!tempObj.hasOwnProperty('name')) {
          tempObj['name'] = oldObj.name;
        }
        if (!tempObj.hasOwnProperty('desc')) {
          tempObj['desc'] = oldObj.desc;
        }
        if (!tempObj.hasOwnProperty('price')) {
          tempObj['price'] = oldObj.price;
        }
        let options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tempObj),
        };
        fetch(`http://127.0.0.1:8000/products/change`, options)
        .then((response) => response.json())
        .then(() => {
          this.componentWillMount();
          cancel();
        })
        .catch((error) => console.error(error));
      } else {
        cancel();
      }
    };

    let saveNewProduct = (tempObj) => {
      if (tempObj.name) {
        let options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tempObj),
        };
        fetch(`http://127.0.0.1:8000/products/create`, options)
        .then(() => {
          this.componentWillMount();
          cancel();
        })
        .catch((error) => console.error(error));
      } else {
        /*eslint-disable no-alert, no-console*/
        alert('Product name cannot empty..!!');
        /*eslint-enable no-alert*/
      }
    };

    let clickEdit = () => {
      this.setState({
        isEdit: true,
        isAdd: false,
      });
    };

    let clickProduct = (id: string) => {
      if (!this.state.isAdd) {
        this.setState({selectedID: id});
      }
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
              deleteClick={deleteClick}
              saveEdit={saveEdit}
              saveNewProduct={saveNewProduct}
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
      if (!this.state.isEdit) {
        this.setState({
          isAdd: true,
          isEdit: false,
          selectedID: null,
        });
      }
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
