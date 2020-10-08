
function getAppointmentsForDay(state, day) {
  const days = state.days.find(days => days.name === day);
  if (!days || !days.appointments || days.appointments.length === 0) {
    return [];
  }
  return days.appointments.map(appointmentsId => state.appointments[appointmentsId]);
}

function getInterviewersForDay(state, day) {
  const days = state.days.find(dayName => day === dayName.name);
  if (!days || !days.interviewers || days.interviewers.length === 0) {
    return [];
  }
  return days.interviewers.map(interviewer => state.interviewers[interviewer]);

}


function getInterview(state, interview) {
  const interviewerObj = { ...interview }
  if (interview) {
    for (const interviewerId in state.interviewers) {
      if (Number(interviewerId) === Number(interview.interviewer)) {
        interviewerObj.interviewer = state.interviewers[interviewerId];
      }
    }
    return interviewerObj;
  }
  return null;
}
export { getAppointmentsForDay, getInterview, getInterviewersForDay }