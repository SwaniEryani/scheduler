
function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const days = state.days.filter((dayName)  => dayName.name === day);
  const returnArr = [];

  if(days.length > 0){
    const appointmentsForDay = days[0].appointments;
    if(appointmentsForDay){
      for(const appointment of appointmentsForDay){
        for (const appointments in state.appointments){
          if(Number(appointments) === appointment){
            returnArr.push(state.appointments[appointments]);
        }
        }
    }
    return returnArr;
    }
  }
  return returnArr;
}

function getInterview (state, interview) {
  // add the interviewer data(id name and avatar) insted of id only 
  if (interview){
    for ( const interviewerId in state.interviewers){
      if (Number(interviewerId) === Number(interview.interviewer)){
        interview.interviewer = state.interviewers[interviewerId];
      }
    
    }
  return interview;
  }
  return null
}
export {getAppointmentsForDay, getInterview}