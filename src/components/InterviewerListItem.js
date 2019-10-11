import React from "react";
import Classnames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  let interviewClass = Classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    // set element id somewhere here
    <li className={interviewClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
}
