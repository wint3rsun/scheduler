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

  function bookInterview(id, interview) {
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

          setState({
            ...state,
            appointments
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

          setState({
            ...state,
            appointments
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