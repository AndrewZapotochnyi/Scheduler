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
        setState({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
        // console.log(all);
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
        return axios.get(`http://localhost:8001/api/days`)
      })
      .then(res => {
        const days = res.data;
        setState({
          ...state,
          appointments,
          days
        })
    });
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    // console.log("Current state: ", state);

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(res => {
        return axios.get(`http://localhost:8001/api/days`)
      })
      .then(response => {
        const days = response.data;
        setState({
          ...state,
          appointments,
          days
        })
      })
  };

 

  return { state, setDay, bookInterview, cancelInterview };
}