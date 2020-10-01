
export function getAppointmentsForDay(state, day) {
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
