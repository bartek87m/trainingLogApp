export default (state = [], action) => {
    switch(action.type){
        case 'SHOW WORKOUT':
            return {
                selectedWorkout: action.id
            }
        case 'DELETE WORKOUT':
            return selectedWorkout.filter((value) => value.id !== action.id)
        default:
            return state;
  }
    
}