import React, { useState , useEffect } from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
const axios = require('axios');


export default function Application(props) {
 

  const setDay = (day) => {
    setState({...state , day})
  }

  const [state, setState] = useState (
    {
      day: 'Monday',
      days: [],
      appointments: {},
      interviewers: {}
    }
  );

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        console.log(response)
        setState(prev => ({ ...prev, appointments }));
      }).catch(e => console.log(e));
  }
  
  function cancelInterview(id) {
    const appointment = { 
      ...state.appointments[id], 
      interview: null };
      
    const appointments = { 
      ...state.appointments, 
      [id]: appointment };

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({ ...prev, appointments }));
      })
  }

  const dailyAppointments = getAppointmentsForDay(state,state.day)
  const interviewersOfDay = getInterviewersForDay(state, state.day);

  useEffect(()=>{
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
      .catch(err => {
        console.log(err)
      })
  }, []);
  const schedule = dailyAppointments.map((appointment)=> 
  <Appointment 
    key={appointment.id} 
    id= {appointment.id} 
    time={appointment.time} 
    interviewers= {interviewersOfDay} 
    interview={getInterview(state,appointment.interview)} 
    bookInterview={bookInterview}
    cancelInterview = {cancelInterview}
  />);
  return (
    <main className="layout">
      <section className="sidebar">
        {
        <>
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered"
        /> 
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        </>
        }
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}