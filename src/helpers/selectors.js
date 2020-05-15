// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     "1": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };


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
  let appointmentArray = [];
  for (let item of state.days) {
    if (item.name === day) {  
      for (let appointment of item.appointments) {
        appointmentArray.push(state.appointments[appointment]);
      }
    }
  }

  let interviewerArray = [];
  for (let appointment of appointmentArray) {
    if (appointment.interview !== null) {
      let interviewObject = appointment.interview;
      let interviewerId = interviewObject.interviewer;
      interviewerArray.push(state.interviewers[interviewerId]);
    }
  }
  
  return interviewerArray;

}


// console.log(getInterviewersForDay(state, "Monday"));

export { getInterview, getAppointmentsForDay, getInterviewersForDay }