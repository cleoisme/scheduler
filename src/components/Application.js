import React, { Fragment, useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0
  }
];
const appointments = [
  {
    id: 1,
    time: "12pm"
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 2,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Lydia A",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer A",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Lydia B",
      interviewer: {
        id: 4,
        name: "4",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 5,
    time: "6pm",
    interview: {
      student: "",
      interviewer: {
        id: 5,
        name: "",
        avatar: ""
      }
    }
  }
];

export default function Application(props) {
  let [day, setDay] = useState("Monday");
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* common pattern is for a component to return a list of children. Take this example React snippet: */}
        <Fragment>
          {appointments.map(appointment => (
            <Appointment key={appointment.id} {...appointment} />
          ))}
          <Appointment key={"last"} time={"12pm"} />
        </Fragment>
      </section>
    </main>
  );
}
