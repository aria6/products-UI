//@flow
import React from 'react';
import View from './coreUI/View';
import Button from './coreUI/Button';
import TextInput from './coreUI/TextInput';

import type {ProductDetailType} from './types/ProductDetail';

import {blockDetailStyle, blockNameStyle, blockDCStyle, blockItemStyle} from './ProductDetail-styles';

type Props = {
  detailProduct: ?ProductDetailType;
  selectedID: ?string;
  clickEdit: () => void;
  isEdit: boolean;
  isAdd: boolean;
  cancel: () => void;
  componentWillMount: () => void;
};

let tempObj = {};

let onTextChange = (string, idText) => {
  tempObj[idText] = string;
};

function ProductDetail(props: Props) {
  let {selectedID, detailProduct, componentWillMount, clickEdit, isEdit, isAdd, cancel} = props;
  let result;

  if (isAdd) {
    return CreateProduct(cancel, componentWillMount);
  }

  let inputOrData = (textValue: string, idText: string) => {
    if (isEdit) {
      return <TextInput
        isMultiline={false}
        onTextChange={(string) => onTextChange(string, idText)}
        otherAttr={{defaultValue: textValue}}
      />;
    } else {
      return textValue;
    }
  };
  let deleteClick = (id: string) => {
    /*eslint-disable no-alert, no-console*/
    let wantDelete = confirm(`Are you sure want to delete this product?`);
    /*eslint-enable no-alert*/
    if (wantDelete) {
      let options = {
        method: 'DELETE',
      };
      fetch(`http://127.0.0.1:8000/products/delete/${id}`, options).then((response) => response.json()).then(() => componentWillMount());
    }
  };

  let saveEdit = (id) => {
    tempObj['id'] = id;
    let options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tempObj),
    };
    fetch(`http://127.0.0.1:8000/products/change`, options);
  };

  if (detailProduct) {
    if (selectedID) {
      let name = detailProduct.name;
      let id = detailProduct.id;
      result = (
        <View>
          <View style={blockDetailStyle}>
            <View style={blockNameStyle}>Name</View>
            <View style={blockDCStyle}>:</View>
            <View style={blockItemStyle}>{inputOrData(name, 'name')}</View>
          </View>
          <View style={blockDetailStyle}>
            <View style={blockNameStyle}>Description</View>
            <View style={blockDCStyle}>:</View>
            <View style={blockItemStyle}>{inputOrData(detailProduct.desc, 'desc')}</View>
          </View>
          <View style={blockDetailStyle}>
            <View style={blockNameStyle}>Price</View>
            <View style={blockDCStyle}>:</View>
            <View style={blockItemStyle}>{inputOrData(detailProduct.price, 'price')}</View>
          </View>
          <View>
            <Button
              nameButton={(isEdit) ? 'Save' : 'Edit'}
              onClick={(isEdit) ? () => saveEdit(id) : clickEdit}
            />
            <Button
              nameButton={(isEdit) ? 'Cancel' : 'Delete'}
              onClick={(isEdit) ? cancel : () => deleteClick(id)}
            />
          </View>
        </View>
      );
    } else {
      result = null;
    }
  } else {
    result = null;
  }

  return result;
}

function CreateProduct(cancel: () => void, componentWillMount: () => void) {

  let saveNewProduct = () => {
    if (tempObj.name) {
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempObj),
      };
      console.log(options);
      fetch(`http://127.0.0.1:8000/products/create`, options).then((data) => {
        if (data.ok) {
          componentWillMount();
        } else {
          console.log(data);
        }
      });
    } else {
      /*eslint-disable no-alert, no-console*/
      alert('Product name cannot empty..!!');
      /*eslint-enable no-alert*/
    }
  };

  return (
    <View>
      <View style={blockDetailStyle}>
        <View style={blockNameStyle}>Name</View>
        <View style={blockDCStyle}>:</View>
        <View style={blockItemStyle}>
          <TextInput
            isMultiline={false}
            onTextChange={(string) => onTextChange(string, 'name')}
            otherAttr={{placeholder: 'Name Product'}}
          />
        </View>
      </View>
      <View style={blockDetailStyle}>
        <View style={blockNameStyle}>Description</View>
        <View style={blockDCStyle}>:</View>
        <View style={blockItemStyle}>
          <TextInput
            isMultiline={false}
            onTextChange={(string) => onTextChange(string, 'desc')}
            otherAttr={{placeholder: 'Description Product'}}
          />
        </View>
      </View>
      <View style={blockDetailStyle}>
        <View style={blockNameStyle}>Price</View>
        <View style={blockDCStyle}>:</View>
        <View style={blockItemStyle}>
          <TextInput
            isMultiline={false}
            onTextChange={(string) => onTextChange(string, 'price')}
            otherAttr={{placeholder: 'Price Product'}}
          />
        </View>
      </View>
      <View>
        <Button
          nameButton="Save"
          onClick={saveNewProduct}
        />
        <Button
          nameButton="Cancel"
          onClick={cancel}
        />
      </View>
    </View>
  );
}

export default ProductDetail;
