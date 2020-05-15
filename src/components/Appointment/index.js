import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";




export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment" data-testid="appointment">
    <Header time={props.time} />

    {/* {mode === EMPTY && <Empty onAdd={props.onAdd} />} */}
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

    {mode === CREATE && <Form 
            interviewers={[]} // interviewers:Array
            // onSave={action("onSave")}              // onSave:Function
            onCancel={() => back()}   
            />}
    

    {mode === SHOW && (
    <Show
      student={props.interview.student}
    interviewer={props.interview.interviewer}
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