
function getAppointmentsForDay(state, day) {
  for (let item of state.days) {
    if (item.name === day) {  
      let returnArray = [];
      for (let appointment of item.appointments) {
        returnArray.push(state.appointments[appointment]);
      }
      return returnArray;
    }
  }
  return [];
}


function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const newInterviewObject = {
    student: interview.student
  };
  newInterviewObject.interviewer = state.interviewers[interview.interviewer];
  return newInterviewObject;
}



function getInterviewersForDay(state, day) {
  let interviewersArray = [];
  for (let item of state.days) {
    if (item.name === day) {  
      for (let interviewer of item.interviewers) {
        interviewersArray.push(state.interviewers[interviewer]);

      }
    }
  }
  
  return interviewersArray;

}

export { getInterview, getAppointmentsForDay, getInterviewersForDay }