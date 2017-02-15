//@flow
import React from 'react';

type Props = {
  nameButton: string;
  otherAttr?: Object;
  onClick?: () => void;
};

function Button(props: Props) {
  let {otherAttr, nameButton, onClick} = props;

  return (
    <button type="button" onClick={onClick} {...otherAttr} >{nameButton}</button>
  );
}

export default Button;
