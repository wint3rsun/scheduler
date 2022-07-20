import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Form from "./Form";
import Confirm from "./Confirm";

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {

  const {mode, transition, back} = useVisualMode(props.interview? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }

  const remove = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={()=>{transition(CREATE)}} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = {() => {transition(CONFIRM)}}
          onEdit = {() => console.log("edit form")}
        />
      )}
      {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save}/>)}
      {mode === SAVING && (<Status message={"Saving"}/>)}
      {mode === DELETING && (<Status message={"Deleting"}/>)}
      {mode === CONFIRM && (<Confirm message={"Are you sure you would like to delete?"} onCancel={() => transition(SHOW)} onConfirm={remove} />)}
    </article>
  );
}