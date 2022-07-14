import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss"

//{ id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },

export default function InterviewerList(props) {
  const items = props.interviewers.map((interviewerItem) => {
    return (
      <InterviewerListItem
        key={interviewerItem.id}
        name={interviewerItem.name}
        avatar={interviewerItem.avatar}
        selected={interviewerItem.id === props.value}
        setInterviewer={() => props.onChange(interviewerItem.id)}
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