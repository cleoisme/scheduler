import React from "react";
import Classnames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  const { confirm, danger, disabled, onClick, children } = props;

  let buttonClass = Classnames("button", {
    "button--confirm": confirm,
    "button--danger": danger
  });
  return (
    <button disabled={disabled} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
