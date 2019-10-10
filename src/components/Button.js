import React from "react";
import Classnames from "classnames";

import "components/Button.scss";
import { render } from "@testing-library/react";

export default function Button(props) {
  let buttonClass = Classnames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={buttonClass}
    >
      {props.children}
    </button>
  );
}
