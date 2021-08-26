import React from "react";
import { BiEuro } from "react-icons/bi";

const Price = (props) => {
  return (
    <div
      style={{
        fontSize: props.fontSize ? props.fontSize : "14px",
        fontWeight: "bold",
        margin: "5px 0",
      }}
    >
      <BiEuro size={props.size} />
      {props.value}
    </div>
  );
};

export default Price;