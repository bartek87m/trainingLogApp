import React from 'react';
import { connect } from 'react-redux';
import { startRemoveTraining, deleteSelectedWorkout} from '../actions/training';
import { showSelectedWorkout } from '../actions/selectedTraining';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class TrainingListItem extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            selected: "list-item"
        }
    }
    showWorkout = () => {
        const id = this.props.id;
        this.props.showSelectedTrainingData(id);
    }

    removeWorkout = () => {
        const id = this.props.id;
        this.props.startRemoveTraining(id);
    }

    render(){
        return(
            <div className={this.props.listItem} >
                <p>{this.props.training_title}</p>
                <p>{this.props.training_body}</p>
                <button className="button" onClick={this.showWorkout}><FontAwesomeIcon icon="eye"/></button>
                <button className="button" onClick={this.removeWorkout}><FontAwesomeIcon icon="trash"/></button>         
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    
    startRemoveTraining: (id) => dispatch(startRemoveTraining(id)),
    showSelectedTrainingData: (id) => dispatch(showSelectedWorkout(id)),
    removeSelectedTraining: (id) => dispatch(deleteSelectedWorkout(id))
        
}); 

const mapStateToProps = (state, props) => {

    const selectedId = state.selectedTraining.selectedWorkout; 
    let listItem = "list-item";
    if(selectedId === props.id){
        listItem = "list-item--selected"
    }
    else{
        listItem = "list-item";
    }

    return {
        listItem
    }
}
export default connect( mapStateToProps, mapDispatchToProps)(TrainingListItem);