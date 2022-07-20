import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    return axios
    .put((`/api/appointments/${id}`), {interview})
    .then((response) => {
      const appointment = {
        ...state.appointments[id],
        interview: {...interview}
      };
      
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      setState({
        ...state,
        appointments
      });
    })
    .catch(err => console.log(err));
  };

  function cancelInterview(id) {
    console.log("I will remove: ", id);

    return axios
    .delete(`/api/appointments/${id}`)
    .then((response) => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      setState({
        ...state,
        appointments
      });
    })
    .catch(err => console.log(err));
  }

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return(
    <Appointment
      key={appointment.id}
      {...appointment}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
    );
  })

  const setDay = day => setState({...state, day});

  useEffect(() => {
    const daysUrl = "/api/days";
    const appointUrl = "/api/appointments";
    const interviewUrl = "/api/interviewers";

    Promise.all([
      axios.get(daysUrl),
      axios.get(appointUrl),
      axios.get(interviewUrl)
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
  },[]);

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
  <DayList
    days={state.days}
    value={state.day}
    onChange={setDay}
  />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
