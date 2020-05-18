import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "components/DayList";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";




// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];

export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState({...state, days});

  // const [days, setDays] = useState([]);

  function bookInterview(id, interview) {
    // console.log("Enter function", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // console.log("Appointment: ",appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // console.log("Appointments: ", appointments);
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
    // console.log("Enter function", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    console.log("Appointment: ", appointment);

    // console.log("Appointment: ",appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // console.log("Appointments: ", appointments);
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(res => {
        setState({
          ...state,
          appointments
        })
    });

  };



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

  const appointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        bookInterview={bookInterview}
        interviewers = {interviewers}
        cancelInterview = {cancelInterview}
      />
    );
  });

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

  <DayList days={state.days} day={state.day} setDay={setDay} />

</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
      <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}

