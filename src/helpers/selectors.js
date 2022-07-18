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

export function getInterview(state, interview) {
  let interviewData = null;
  const interviewerId =  (interview)?interview.interviewer : null;

  if (interviewerId !== null) {
    interviewData = {...interview, interviewer: state.interviewers[interviewerId]};
  }

  return interviewData;
}