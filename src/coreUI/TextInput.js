//@flow
import React from 'react';

type Props = {
  isMultiline: boolean;
  isUploadFile?: boolean;
  onTextChange?: (text: string) => void;
  onChange?: (Object) => void;
  otherAttr?: Object;
};

function TextInput(props: Props) {
  let {isMultiline, isUploadFile, onTextChange, onChange, otherAttr} = props;

  let onChangeHandler = (event: {target: {value: string}}) => {
    if (onChange != null) {
      onChange(event);
    }
    if (onTextChange != null) {
      onTextChange(event.target.value);
    }
  };

  if (isMultiline) {
    return <textarea type="text" onChange={onChangeHandler} {...otherAttr} />;
  } else {
    if (isUploadFile) {
      return <input type="file" onChange={onChangeHandler} {...otherAttr} />;
    } else {
      return <input type="text" onChange={onChangeHandler} {...otherAttr} />;
    }
  }
}

export default TextInput;
