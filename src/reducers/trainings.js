
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

        // case 'EDIT TRAINING':
        //     let newState = state;
        //     for(let value in newState){
        //         if(state[value].id === action.id){
        //             newState[value].training_title = "action.training_title";
        //             newState[value].training_body = "action.training_body";
        //         }   
        //     }
        //     console.log("newState", newState);
        //     return newState;
            
        case 'EDIT TRAINING':
            console.log(action);
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

        case 'SET TRAINING':
            return action.training;   
                  
        default:
            return state;
    }
}

