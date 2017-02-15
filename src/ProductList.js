//@flow
import React from 'react';
import View from './coreUI/View';

type Props = {
  products: Array<Object>;
  clickProduct: (string) => void;
};

function ProductList(props: Props) {
  let {products, clickProduct} = props;

  let listProducts = products.map((product) => {
    return (<View key={product.id} onClick={() => clickProduct(product.id)}>{product.name}</View>);
  });
  return (<View>{listProducts}</View>);
}

export default ProductList;
