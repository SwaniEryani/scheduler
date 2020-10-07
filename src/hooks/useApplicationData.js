import {useState, useEffect} from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const setDay = (day) => {
    setState({...state , day})
  }

  const [state, setState] = useState (
    {
      day: 'Monday',
      days: [],
      appointments: {},
      interviewers: {},
    }
  );
  const newSpots = currState => {
    const state = { ...currState };
    const dayObj = state.days.find(dayId => dayId.name === state.day);
    const appointmentsForDay = dayObj.appointments;
    const noAppointments = appointmentsForDay.filter(id => !state.appointments[id].interview)
    dayObj.spots = noAppointments.length;
    return state.days
  }

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
        setState(prev => ({ ...prev, appointments }));
        setState(prev => ({ ...prev, days: newSpots(prev) }))
      });
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
        setState(prev => ({ ...prev, days: newSpots(prev) }))
      })
  }
  useEffect(()=>{
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
      .catch(err => {
       // console.log(err)
      })
  }, []);

  
    
  

  return { setDay, state, setState, bookInterview, cancelInterview }
}