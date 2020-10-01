import React, { useState , useEffect } from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
const axios = require('axios');

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Dalia",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Hala",
      interviewer: {
        id: 1,
        name: "Jiji",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Hoda",
      interviewer: {
        id: 1,
        name: "Jojo",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }
];
export default function Application(props) {
  const [day, setDay] = useState (" Monday");
  const [days, setDays] = useState([]);
  useEffect(() => {
    const daysURL = `http://localhost:8080/api/days`;
    axios.get(daysURL).then(response => {
      setDays([...response.data]);
    }).catch((error) => {
      // 404 need to be add 
      console.log(error.response.status);
    });
  }, [days]);
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
            days={days}
            day={day}
            setDay={setDay} 
          />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
      {appointments.map((appointment) => {
            return (
              <Appointment key={appointment.id} {...appointment} />
            );
          })
          }
          {<Appointment key="last" time="5pm" />}
      </section>
    </main>
  );
}
