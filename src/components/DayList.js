import React from "react";
import DayListItem from "./DayListItem";

// this component takes in
// three attributes (name, spots, selected) and one action (setDay) as props
export default function DayList(props) {
  return props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });
}