import React from "react";

import "components/DayListItem.scss";
var classnames = require('classnames');


const formatSpots = function(props) {
  let spots = props.spots;
  if (spots === 1) {
    return "spot remaining";
  } else {
    return "spots remaining";
  }
}

export default function DayListItem(props) {

  const dayClass = classnames("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li onClick={ () => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots || "no"} {formatSpots(props)}</h3>
    </li>
  );
}