import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(initial) {

  

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios({
        method: "GET",
        url: `/api/days`}),
      axios({
        method: "GET",
        url: `/api/appointments`}),
      axios({
        method: "GET",
        url: `/api/interviewers`})
    ])
      .then((all) => {
        setState({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
        console.log(all);
    })
  }, []);

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(res => {
        setState({
          ...state,
          appointments
        })
    });
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    console.log("Appointment: ", appointment);

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(res => {
        setState({
          ...state,
          appointments
        })
    });
  };

 

  return { state, setDay, bookInterview, cancelInterview };
}