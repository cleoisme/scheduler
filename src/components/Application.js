import React, { Fragment, useState, useEffect } from "react";
import Axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

import { getAppointmentsForDay } from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: []
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([Axios.get("/api/days"), Axios.get("/api/appointments")]).then(
      ([{ data: days }, { data: appointments }]) => {
        setState(prev => ({ ...prev, days, appointments }));
      }
    );
  }, []);

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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* common pattern is for a component to return a list of children. Take this example React snippet: */}
        <>
          {getAppointmentsForDay(state, state.day).map(appointment => (
            <Appointment key={appointment.id} {...appointment} />
          ))}
          <Appointment key={"last"} time={"12pm"} />
        </>
      </section>
    </main>
  );
}
