import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const { interviewers, onSave, onCancel, interview, id } = props;
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
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
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
              onSave(name, interviewer, id);
            }}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
