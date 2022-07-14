import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss"

//{ id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },

export default function(props) {
  const items = props.interviewers.map((interviewerItem) => {
    return (
      <InterviewerListItem
        id={interviewerItem.id}
        name={interviewerItem.name}
        avatar={interviewerItem.avatar}
        selected={interviewerItem.id === props.interviewer}
        setInterviewer={props.setInterviewer}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {items}
      </ul>
    </section>
  );
}