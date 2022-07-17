export function getAppointmentsForDay(state, day) {
  const appointmentsArr = [];
  const {days, appointments} = state;

  for (const d of days) {
    if (d.name === day && d.appointments.length > 0) {
      for (const id of d.appointments) {
        appointmentsArr.push(appointments[id]);
      }
      break;
    }
  }

  return appointmentsArr;
}