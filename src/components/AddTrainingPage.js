import React from 'react';
import {connect} from 'react-redux';
import TrainingLogForm from './TrainingLogForm';
import {addTraining, editTraining} from '../actions/training';

class AddTraining extends React.Component{

  addEditNewWorkout = (training) => {
    console.log(training);
    if(training.edited === true){
      this.props.editTraining(training);
    }
    else{
      this.props.addTraining(training);
    }
      // this.props.addTraining(training);
      // this.props.editTraining(training.id);
    // } 
  }

  render(){
    return(
      <div>
        <TrainingLogForm onSubmit={this.addEditNewWorkout}/>
      </div>
    )
  }

};

const mapStateToProps = (state) => {
  return{
    selectedTrainingId: state.selectedTraining.selectedWorkout
  }
}

const mapDispatchToProps = (dispatch) => ({ //pozwala zwrócić dispatch poza komponentem
  addTraining: (training) => dispatch(addTraining(training)),
  editTraining: (id) => dispatch(editTraining(id))
  
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTraining);
