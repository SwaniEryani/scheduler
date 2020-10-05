import React, { useState } from "react";
// import Error from './Error';

import "components/Appointment/styles.scss";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }
  function savenow (){
    if(name && interviewer){
      props.onSave(name,interviewer);
    } 
    // return(<Error message='Missing data,👎 Could not Save your appointment. Please try again later.👍' onClose={cancel()}/>)
    
    
  }


  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder={name ? name: "Enter Student Name"}
            value={(name ? name: "")}
            onChange={(event) => setName(event.target.value)}
            
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange = {setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick = {savenow}>Save</Button>
        </section>
      </section>
    </main>
  )
}