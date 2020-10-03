
function getAppointmentsForDay(state, day) {
  const days = state.days.find(days =>  days.name === day);
  if (!days || !days.appointments || days.appointments.length === 0) {
    return [];
  }
  return days.appointments.map(appointmentsId => state.appointments[appointmentsId]);
  // return appointments;
}

  //... returns an array of appointments for that day
//   const days = state.days.filter((dayName)  => dayName.name === day);
//   let returnArr = [];

//   if(days.length > 0){
//     const appointmentsForDay = days[0].appointments;
//     if(appointmentsForDay){
//       for(const appointment of appointmentsForDay){
//         for (const appointments in state.appointments){
//           if(Number(appointments) === appointment){
//             // returnArr.push(state.appointments[appointments]);
//             returnArr = returnArr.concat([ state.appointments[appointments]]);
//         }
//         }
//     }
//     return returnArr;
//     }
//   }
//   return returnArr;
// }

function getInterviewersForDay(state, day) {
  const days = state.days.find(dayName => day === dayName.name);
  // const days = state.days.filter((dayName)  => dayName.name === day);
  if(!days || !days.interviewers || days.interviewers.length === 0){
    return [];
  }
  return days.interviewers.map(interviewer => state.interviewers[interviewer]);
  // return interviewers;
}


function getInterview (state, interview) {
  // get the interviewer data(id name and avatar) insted of id only 
  const interviewerObj = {...interview} 
  if (interview){
    for ( const interviewerId in state.interviewers){
      if (Number(interviewerId) === Number(interview.interviewer)){
        interviewerObj.interviewer = state.interviewers[interviewerId];
      }
    }
  return interviewerObj;
  }
  return null;
}
export {getAppointmentsForDay, getInterview, getInterviewersForDay}