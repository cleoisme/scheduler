import React from "react";
import Classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { selected, spots, setDay, name } = props;

  const formatSpots = function(spots) {
    if (!spots) return "no spots remaining";
    if (spots === 1) return "1 spot remaining";
    return `${spots} spots remaining`;
  };
  let dayClass = Classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
  });
  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
