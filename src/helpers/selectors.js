export function getAppointmentsForDay(state, day) {
  if (!state.days || !state.appointments) return [];

  let IDs = [];
  let appointments = [];

  state.days.forEach(item => {
    if (item.name === day) {
      IDs = item.appointments;
    }
  });

  for (let id of IDs) {
    if (state.appointments[id]) appointments.push(state.appointments[id]);
  }
  return appointments;
}
