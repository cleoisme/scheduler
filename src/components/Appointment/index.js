import "./style.scss";
import useVisualMode from "../../hooks/useVisualMode";

import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const { interviewers } = props;
  let interviewersArr = [];
  for (let i in interviewers) {
    interviewersArr.push(interviewers[i]);
  }

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition("SAVING");
    props.bookInterview(props.id, interview).then(() => transition("SHOW"));
  };

  const remove = () => {
    transition("DELETING");
    props.cancelInterview(props.id).then(() => {
      transition("EMPTY");
    });
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            transition(CONFIRM);
          }}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CREATE && (
        <Form interviewers={interviewersArr} onSave={save} onCancel={back} />
      )}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Remove the appointment?"}
          onConfirm={remove}
          onCancel={back}
        />
      )}
    </article>
  );
}
