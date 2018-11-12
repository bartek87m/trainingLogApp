export const addTraining = (training) =>({
    type: 'ADD TRAINING',
    training
});

export const StartAddTraining = (training) => {

};

export const removeTraining = (id) => ({
    type: 'REMOVE TRAINING',
    id
});

export const startRemoveTraining = (id) => ({
    
});

export const getTrainingData = (id) => ({
    type: 'GET TRAINING',
    id
});

export const editTraining = (updates) => ({
    type: 'EDIT TRAINING',
    updates
});