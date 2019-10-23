export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  if (!days || !appointments) return [];
  // console.log(state.interviewers);
  let IDs = [];
  let appointmentsArr = [];

  for (let item of days) {
    if (item.name === day) IDs = item.appointments;
  }

  for (let id of IDs) {
    if (appointments[id]) appointmentsArr.push(appointments[id]);
  }

  return appointmentsArr;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const { interviewers } = state;
  const { student, interviewer } = interview;

  return {
    interviewer: interviewers[interviewer],
    student: student
  };
}
