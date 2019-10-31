import { useState, useEffect } from "react";
import Axios from "axios";

export default function useApplicationData() {
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
  function bookInterview(id, interview) {
    console.log(id);
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
  }

  function cancelInterview(id) {
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
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
