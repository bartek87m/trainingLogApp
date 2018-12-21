import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { startRemoveTraining, deleteSelectedWorkout} from '../actions/training';
import { showSelectedWorkout } from '../actions/selectedTraining';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class TrainingListItem extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            selected: "list-item",
        }
    }
    showWorkout = () => {
        const id = this.props.id;
        this.props.showSelectedTrainingData(id);
        this.props.hideToolbar();
    }

    removeWorkout = () => {
        const id = this.props.id;
        this.props.startRemoveTraining(id);
    }

    stripHtml(html){
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }

    render(){
        return(
            <div className={this.props.listItem} onClick={this.showWorkout}>
                <div className="list-item--content" >
                    <p className="list-item-title"> 
                        {
                            this.props.training_title.length < 20 ? 
                                this.props.training_title : 
                                    this.props.training_title.substring(0,30) + "..."      
                        }
                    </p>
                    <p className="list-item-body">
                        {                   
                            this.props.training_body.length < 30 ? 
                                this.stripHtml(this.props.training_body):
                                    this.stripHtml(this.props.training_body).substring(0,30) +  "..." 
                        }
                    </p>
                    <p className="list-item-date">{moment(this.props.createdAt).format("LLL")}</p>
                </div>
                <div>
                    {/* <button className="button--list-item-icon" onClick={this.showWorkout}><FontAwesomeIcon icon="eye"/></button> */}
                    <button className="button--list-item-icon" onClick={this.removeWorkout}><FontAwesomeIcon icon="trash"/></button>         
                </div>
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