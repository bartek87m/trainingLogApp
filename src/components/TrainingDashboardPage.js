import React from 'react';
import AddTrainingPage from './AddTrainingPage';
import TrainingList from './TrainingList';

const TrainingDashboardPage = () => (
    <div className="content-container">
        <div className="container-right"><AddTrainingPage/></div>
        <div className="container-left"><TrainingList/></div>
        
        
    </div>
);

export default TrainingDashboardPage;