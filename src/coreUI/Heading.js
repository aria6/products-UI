//@flow
import React from 'react';

type Props = {
  numHeading: string;
  value: string;
  otherAttr?: Object;
};

function Heading(props: Props) {
  let {numHeading, otherAttr, value} = props;

  if (numHeading === '1') {
    return (<h1 {...otherAttr} >{value}</h1>);
  } else if (numHeading === '2') {
    return (<h2 {...otherAttr} >{value}</h2>);
  } else if (numHeading === '3') {
    return (<h3 {...otherAttr} >{value}</h3>);
  } else if (numHeading === '4') {
    return (<h4 {...otherAttr} >{value}</h4>);
  } else if (numHeading === '5') {
    return (<h5 {...otherAttr} >{value}</h5>);
  } else {
    return (<h6 {...otherAttr} >{value}</h6>);
  }
}

export default Heading;
