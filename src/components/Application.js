import React, { useState, useEffect } from "react";
import Axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers")
    ]).then(
      ([{ data: days }, { data: appointments }, { data: interviewers }]) => {
        setState(prev => ({ ...prev, days, appointments, interviewers }));
      }
    );
  }, []);

  // we should not remove / add the appointment object itself
  // but we need to update the object props
  // ** define state: we are updating the state of the specific appointment component without changing the overview look **
  // after we update the remote data, the state is automatically update
  // so we do not have to re-update the state again
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Axios.put(`/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments }))
      .catch(error => console.log(error));
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments }))
      .catch(error => console.log(error));
  };

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
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={getInterview(state, appointment.interview)}
              interviewers={state.interviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          ))}
          <Appointment key={"last"} time={"12pm"} />
        </>
      </section>
    </main>
  );
}
