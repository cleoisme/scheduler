import React from "react";
import Classnames from "classnames";

import "components/DayListItem.scss";

// this component takes in
// three attributes (name, spots, selected) and one action (setDay) as props
export default function DayListItem(props) {
  const formatSpots = function(spots) {
    if (!spots) return "no spots remaining";
    if (spots === 1) return "1 spot remaining";
    return `${spots} spots remaining`;
  };
  let dayClass = Classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
