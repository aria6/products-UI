//@flow
import React from 'react';

type Props = {
  source: string;
  style: Object;
  otherAttr?: Object;
};

function Image(props: Props) {
  let {source, style, otherAttr} = props;
  return (
    <img src={source} style={style} {...otherAttr} />
  );
}

export default Image;
