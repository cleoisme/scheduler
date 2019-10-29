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
const EDIT = "EDIT";

export default function Appointment(props) {
  const {
    id,
    time,
    interview,
    interviewers,
    bookInterview,
    cancelInterview
  } = props;

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  let interviewersArr = [];
  for (let i in interviewers) {
    interviewersArr.push(interviewers[i]);
  }

  const save = (name, interviewer, id) => {
    const interview = {
      student: name,
      interviewer
    };
    transition("SAVING");
    bookInterview(id, interview).then(() => transition("SHOW"));
  };

  const remove = () => {
    transition("DELETING");
    cancelInterview(id).then(() => {
      transition("EMPTY");
    });
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          interview={interview}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CREATE && (
        <Form
          interviewers={interviewersArr}
          onSave={save}
          onCancel={back}
          interview={interview}
        />
      )}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Remove the appointment?"}
          onConfirm={remove}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewersArr}
          onSave={save}
          onCancel={back}
          interview={interview}
          id={id}
        />
      )}
    </article>
  );
}
