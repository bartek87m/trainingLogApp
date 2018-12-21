import database from '../firebase/firebase'
import { showSelectedWorkout, deleteSelectedWorkout } from '../actions/selectedTraining';
import { sortByDate } from '../actions/filters';

export const addTraining = (training) =>({
    type: 'ADD TRAINING',
    training
});

export const startAddTraining = (trainingData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/training`)
            .push(trainingData).then((ref) => {
                dispatch(addTraining({
                    id: ref.key,    
                    ...trainingData
                }))
                dispatch(showSelectedWorkout(ref.key));
            })
    }
};

export const removeTraining = (id) => ({
    type: 'REMOVE TRAINING',
    id
});

export const startRemoveTraining = (id) => {
    return(dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/training/${id}`).remove().then(() => {
            dispatch(removeTraining(id));
            dispatch(deleteSelectedWorkout(id));
        })
    }
}

export const getTrainingData = (trainings) => ({
    type: 'GET TRAINING',
    trainings
});

export const startGeTrainingData = () => {
    return(dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/training/`).once('value').then((snapshot) => {
            const trainingData = [];
            snapshot.forEach((snap) => {
                trainingData.push({
                    id: snap.key,
                    ...snap.val()
                })
            })
            dispatch(getTrainingData(trainingData));
            dispatch(sortByDate("dateUp"));
        })
    }
}

export const editTraining = (updates) => ({
    type: 'EDIT TRAINING',
    updates
});

export const startEditTraining = (updates) => {
    return(dispatch, getState) => {
        const uid = getState().auth.uid;
        const id = updates.id;
        delete updates.id;
        return database.ref(`users/${uid}/training/${id}`).update(updates).then((snapshot) => {
            dispatch(editTraining({
                id,
                ...updates
            }));
        });
    }
};

