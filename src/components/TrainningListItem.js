import React from 'react';
import { connect } from 'react-redux';
import { removeTraining} from '../actions/training';
import { showSelectedWorkout } from '../actions/selectedTraining';
import { deleteSelectedWorkout } from '../actions/selectedTraining';

export class TrainingListItem extends React.Component {
    
    constructor(props){
        super(props);
    }
    showWorkout = () => {
        const id = this.props.id;
        this.props.showSelectedTrainingData(id);
    }

    removeWorkout = () => {
        const id = this.props.id;
        this.props.removeTrainingData(id);
        // this.props.removeSelectedTraining(id);
    }

    render(){
        return(
            <div className="list-item">
                <p>{this.props.training_title}</p>
                <p>{this.props.training_body}</p>
                <button onClick={this.showWorkout}>Show</button>
                <button onClick={this.removeWorkout}>Delete</button>                
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    
    removeTrainingData: (id) => dispatch(removeTraining(id)),
    showSelectedTrainingData: (id) => dispatch(showSelectedWorkout(id)),
    removeSelectedTraining: (id) => dispatch(deleteSelectedWorkout(id))
        
}); 

export default connect( undefined ,mapDispatchToProps)(TrainingListItem);