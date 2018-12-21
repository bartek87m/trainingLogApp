import React from 'react';
import {connect} from 'react-redux';
import TrainingLogForm from './TrainingLogForm';
import {startAddTraining, startEditTraining} from '../actions/training';

class AddTraining extends React.Component{

  addEditNewWorkout = (training) => {
    if(training.edited === true){
      delete training.edited;
      this.props.startEditTraining(training);
    }
    else{
      delete training.edited;
      delete training.id;
      this.props.startAddTraining(training);
    }
  }

  render(){
    return(
      <div>
        <TrainingLogForm onSubmit={this.addEditNewWorkout}/>
      </div>
    )
  }

};

const mapDispatchToProps = (dispatch) => ({ //pozwala zwrócić dispatch poza komponentem
  startAddTraining: (training) => dispatch(startAddTraining(training)),
  startEditTraining: (training) => dispatch(startEditTraining(training))
  
})

export default connect(undefined, mapDispatchToProps)(AddTraining);
