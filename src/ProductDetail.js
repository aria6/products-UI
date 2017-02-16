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
  deleteClick: (string) => void;
  saveEdit: (string, Object, Object) => void;
  saveNewProduct: (Object) => void;
  componentWillMount: () => void;
};

let tempObj = {};

let onTextChange = (string, idText) => {
  tempObj[idText] = string;
};

function ProductDetail(props: Props) {
  let {selectedID, detailProduct, componentWillMount, clickEdit,
  isEdit, isAdd, cancel, deleteClick, saveEdit, saveNewProduct} = props;
  let result;

  if (isAdd) {
    return CreateProduct(cancel, componentWillMount, saveNewProduct);
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

  if (detailProduct) {
    if (selectedID) {
      let product = detailProduct;
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
              onClick={(isEdit) ? () => {
                saveEdit(id, product, tempObj);
                tempObj = {};
              } : clickEdit}
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

function CreateProduct(cancel: () => void, componentWillMount: () => void, saveNewProduct: (Object) => void) {

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
          onClick={() => {
            saveNewProduct(tempObj);
            tempObj = {};
          }}
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
