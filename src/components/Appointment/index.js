import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";




export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

    // console.log("RENDER STUFF",props.interview)

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
  }

  function delInterview(id) {
    transition(CONFIRM);
  }

  function confirmDelete(id) {

    
    let appointment_id = props.id;

    props.cancelInterview(appointment_id);
    transition(EMPTY);
  }


 

  return (
    <article className="appointment" data-testid="appointment">
    <Header time={props.time} />

    {/* {mode === EMPTY && <Empty onAdd={props.onAdd} />} */}
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

    {mode === SAVING && <Status />}

    {mode === CONFIRM && <Confirm 
      message = "Are you sure you want to delete this interview?"
      confirmDelete = {confirmDelete}
    />}

    {mode === CREATE && <Form 
            interviewers={props.interviewers} // interviewers:Array
            onSave={save}              // onSave:Function
            onCancel={() => back()}   
            />}
    

    {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      delInterview={delInterview}
  />
)}


    {/* {props.interview ? (
    <Show
    mode={SHOW}
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onEdit={props.onEdit}
    onDelete={props.onDelete}
    />
    ) : (<Empty onAdd={props.onAdd} />)}    */}
    </article>
  )
}