
//Trainings Reducer

const trainingsReducerDefault = [];

export default (state = trainingsReducerDefault, action) => {
    switch (action.type) {

        case 'ADD TRAINING':
            // return state.concat(action.expense) //concat bierze tablice dadaje element i zwraca nową
            return[
                ...state,action.training
            ]
        case 'REMOVE TRAINING':
            return state.filter((value) => value.id !== action.id);
            
        case 'EDIT TRAINING':
            return state.map((training)=>{
                if (training.id === action.updates.id){
                    return{
                        ...training,
                        ...action.updates
                    }
                }
                else{
                    return training;
                }
            });

        case 'GET TRAINING':
            return action.trainings;     
                  
        default:
            return state;
    }
}

