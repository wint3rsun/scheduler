import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});

  function updateSpot (mode) {
    const days = state.days.map((day) => {
      if(day.name === state.day && mode === "remove-spot") {
        day.spots--;
      }
      if(day.name === state.day && mode === "add-spot") {
        day.spots++;
      }
      return day;
    });
    return days;
  }

  function bookInterview(id, interview) {
    const mode = (state.appointments[id].interview ? null : "remove-spot");

    return (
      axios
        .put((`/api/appointments/${id}`), { interview })
        .then((response) => {
        
          const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
          };

          const appointments = {
            ...state.appointments,
            [id]: appointment
          };
          
          const days = updateSpot(mode);

          setState({
            ...state,
            appointments,
            days
          });

        })
    )
  };

  function cancelInterview(id) {
    return (
      axios
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

          const days = updateSpot("add-spot");

          setState({
            ...state,
            appointments,
            days
          });
        })
    )
  }

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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}