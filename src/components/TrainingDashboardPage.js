import React from 'react';
import AddTrainingPage from './AddTrainingPage';


class TrainingDashboardPage extends React.Component{

    constructor(props){
        super(props);

    }
   
    render(){
        return(
            <div>
            {
                <div className="content-container">
                    <AddTrainingPage/>
                </div>    
            }
            </div>       
        )
    }
};

export default TrainingDashboardPage;