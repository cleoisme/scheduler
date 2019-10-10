import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  return props.interviewers.map(interviewer => {
    return (
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            selected={interviewer.name === props.interviewer}
            setInterviewer={props.setInterviewer}
          />
        </ul>
      </section>
    );
  });
}
