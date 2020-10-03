
import React from 'react';
import "./styles.scss";


import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const UPDATE = 'UPDATE';
const ERROR_SAVE ='ERROR_SAVE';
const ERROR_DELETE ='ERROR_DELETE';



function Appointment (props)  {
 
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  function removeInterview(){
    if (mode === CONFIRM){
      transition(DELETING, true);
      props
        .cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch(error => transition(ERROR_DELETE, true));
    }
    transition(CONFIRM);
  }
  
  return(
    // <article className="appointment"></article>
    <article className="appointment">
      <Header time ={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === SHOW && ( <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete ={removeInterview} onEdit = {() =>transition(UPDATE)}/> )}
      {mode === SAVING && <Status message ={"Saving"}/>}
      {mode === DELETING && <Status message ={"Deleting"}/>}
      {mode === CONFIRM && <Confirm onConfirm={removeInterview} onCancel ={back}/>}
      {mode === UPDATE && <Form name = {props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={back}/>}
      {mode === ERROR_DELETE && <Error message='Something went wrong,👎 Could not delete your appointment. Please try again later.👍' onClose={back}/>}
      {mode === ERROR_SAVE && <Error message='Something went wrong,👎 Could not save your appointment. Please try again later.👍' onClose={back}/>}
    </article>
  );
}
export default Appointment;