import React from "react";
import Classnames from "classnames";

import "components/DayListItem.scss";

// this component takes in
// three attributes (name, spots, selected) and one action (setDay) as props
export default function DayListItem(props) {
  let dayClass = Classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}
