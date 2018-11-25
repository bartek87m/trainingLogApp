import React from 'react';
import { connect } from 'react-redux';
import { showSelectedWorkout } from '../actions/selectedTraining';
import { editTraining } from '../actions/training';

export class TrainingLogForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            // id:"",
            training_title: props.training_data ? props.training_data.training_title:'',
            training_body: props.training_data ? props.training_data.training_body:'',
            error_no_title: "",
            error_no_body: "",
            selectedWorkoutId: ""
        }
    }

    componentDidUpdate = (prevState) => {
        
        if(this.state.selectedWorkoutId !== this.props.selectedWorkoutId){
            // const selectedWorkoutId = this.props.selectedWorkoutId;
            const training_title = this.props.selectedWorkoutTitle;
            const training_body = this.props.selectedWorkoutBody;

            this.setState({selectedWorkoutId, training_title, training_body});
        } 
        
        if(this.props.selectedWorkoutId !== prevState.selectedWorkoutId){
            // const selectedWorkoutId = "";
            const training_title = "";
            const training_body = "";

            this.setState({selectedWorkoutId, training_title, training_body});
        }
    }

    onTitleChange = (e) => {   
        const training_title = e.target.value;
        this.setState({training_title}, () => {
            if(!!training_title){
                this.setState(() => ({error_no_title:""}))
            }
        });    
    }

    onWorkoutChange = (e) => {
        const training_body = e.target.value;
        this.setState({training_body}, () => {
            if(!!training_body){
                this.setState(() => ({error_no_body:""}))
            } 
        });
    }

    addEditNewWorkout = (edited) => {
        // e.preventDefault();
        const uuid = require('uuid');
        console.log(uuid());

        if(!this.state.training_title) {
            const error_no_title = "Wpisz tytuł";
            this.setState(() => ({error_no_title}));
        } 

        if(!this.state.training_body) {
            const error_no_body = "Wpisz trening";
            this.setState(() => ({error_no_body}));
        }

        if(!!this.state.training_title & !!this.state.training_body ){
            this.setState(() => (
                edited ?  {id: this.state.selectedWorkoutId} : {id:uuid()}
                ), () => {
                    this.props.onSubmit({
                        edited,
                        id: this.state.id,
                        training_body: this.state.training_body,
                        training_title: this.state.training_title
                });
                const id = this.state.id;
                this.props.showSelectedTrainingData(id);
            })            
        }
    }

    saveWorkout = () => {
        this.addEditNewWorkout(true);
    }

    addNewWorkout = () => {
        this.addEditNewWorkout(false);
    }

    render(){
            return (
                <div className="form" onSubmit={this.onSubmit}>
                    {this.state.error_no_title}                  
                    <input 
                        type='text' 
                        placeholder='tytuł'    
                        value={this.state.training_title}
                        onChange={this.onTitleChange}
                    />
                    {this.state.error_no_body}
                    <textarea 
                        rows='10' 
                        cols='20' 
                        placeholder='Wpisz swój trening'
                        value={this.state.training_body}
                        onChange={this.onWorkoutChange}
                        ></textarea>
                    <button onClick={this.saveWorkout}>Save</button>    
                    <button onClick={this.addNewWorkout}>Add New</button>  
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    
    let zmienna = state.training.filter((value) => value.id === state.selectedTraining.selectedWorkout );
    console.log("zmienna"+zmienna[0]);
    if(zmienna.length > 0){
        return {
            selectedWorkoutId: zmienna[0].id, 
            selectedWorkoutTitle: zmienna[0].training_title,
            selectedWorkoutBody: zmienna[0].training_body
        };
    }
    else{
        return {
            selectedWorkoutId: ""
        };
    }
};

const mapDispatchToProps = (dispatch) => ({
    showSelectedTrainingData: (id) => dispatch(showSelectedWorkout(id)),
    editSelectedWorkout: (id) => dispatch(editTraining(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TrainingLogForm);