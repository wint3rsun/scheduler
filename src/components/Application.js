import React, { useState, useEffect } from "react";

import axios from "axios";

import DayList from "./DayList";
import Appointment from "./Appointment";

import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = [];

  const setDay = day => setState({...state, day});

  useEffect(() => {
    const daysUrl = "/api/days";
    const appointUrl = "/api/appointments";

    Promise.all([
      axios.get(daysUrl),
      axios.get(appointUrl)
    ]).then((all) => {
      console.log(all[0].data);
      console.log(all[1].data);
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data
      }));
    })
  },[])

  const appointmentList = dailyAppointments.map((appointment) => {
    return(<Appointment key={appointment.id} {...appointment} />);
  })

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
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
