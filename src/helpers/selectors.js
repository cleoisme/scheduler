export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  if (days.length === 0 || appointments.length === 0) return [];

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
