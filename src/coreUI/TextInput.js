//@flow
import React from 'react';

type Props = {
  isMultiline: boolean;
  onTextChange: (text: string) => void;
  otherAttr?: Object;
};

function TextInput(props: Props) {
  let {isMultiline, onTextChange, otherAttr} = props;

  let onChange = (event: {target: {value: string}}) => {
    onTextChange(event.target.value);
  };

  if (isMultiline) {
    return <textarea type="text" onChange={onChange} {...otherAttr} />;
  } else {
    return <input type="text" onChange={onChange} {...otherAttr} />;
  }
}

export default TextInput;
