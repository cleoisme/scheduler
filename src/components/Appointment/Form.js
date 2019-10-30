import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const { interviewers, onSave, onCancel, interview } = props;
  console.log(props);

  const [name, setName] = useState(interview || "");
  const [interviewer, setInterviewer] = useState(interview || null);

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={name.student}
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer.interviewer.id}
          onChange={event => {
            setInterviewer(event.target.value);
          }}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            cancel
          </Button>
          <Button
            confirm
            onClick={() => {
              onSave(name.student, interviewer.interviewer.id);
            }}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
