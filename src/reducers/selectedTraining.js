export default (state = {}, action) => {
    switch (action.type) {
        case 'SHOW WORKOUT':
            return {
            selectedWorkout: action.id
        }
        case 'DELETE WORKOUT':
            return []
        default:
            return state;
    }
}