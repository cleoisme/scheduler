import React from "react";
import Classnames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { selected, setInterviewer, avatar, name } = props;
  let interviewClass = Classnames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  return (
    // set element id somewhere here
    <li className={interviewClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
