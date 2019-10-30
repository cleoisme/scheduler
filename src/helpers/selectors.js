export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  if (!days || !appointments) return [];

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

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  if (!days || !interviewers) return [];

  let interviewersArr = [];

  for (let item of days) {
    if (item.name === day) interviewersArr = item.interviewers;
  }

  return interviewersArr;
}

export function getInterview(state, interview) {
  // may update the null to other default value with same struct
  if (!interview) return null;
  const { interviewers } = state;
  const { student, interviewer } = interview;

  return {
    interviewer: interviewers[interviewer],
    student: student
  };
}
