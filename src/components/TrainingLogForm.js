import React from 'react';
import ContentEditable from 'react-contenteditable';
import { connect } from 'react-redux';
import { editTraining } from '../actions/training';
import { showSelectedWorkout } from '../actions/selectedTraining';
import { clearInterval } from 'timers';

export class TrainingLogForm extends React.Component {

    constructor(props){
        super(props);
        this.contentEditable = React.createRef();
        this.state = {
            id:"",
            training_title: props.training_data ? props.training_data.training_title:'',
            training_body: props.training_data ? props.training_data.training_body:'',
            createdAt: "",
            error_no_title: "",
            error_no_body: "",
            selectedWorkoutId: "",
            isTimerActive: false
        }
    }


    componentDidMount = (prevState) => {    
       
        if((this.state.selectedWorkoutId === '') & (this.props.selectedWorkoutId !== '')){
            const selectedWorkoutId = this.props.selectedWorkoutId;
            const training_title = this.props.selectedWorkoutTitle;
            const training_body = this.props.selectedWorkoutBody;

            this.setState({selectedWorkoutId, training_title, training_body});
        } 
    }

    componentDidUpdate = (prevState) => {

        if(this.state.selectedWorkoutId !== this.props.selectedWorkoutId){
            const selectedWorkoutId = this.props.selectedWorkoutId;
            const training_title = this.props.selectedWorkoutTitle;
            const training_body = this.props.selectedWorkoutBody;

            this.setState({selectedWorkoutId, training_title, training_body});
        } 
        
        if(this.props.selectedWorkoutId !== prevState.selectedWorkoutId){
            const selectedWorkoutId = "";
            const training_title = "";
            const training_body = "";

            this.setState({selectedWorkoutId, training_title, training_body});
        }
    }

    saveAfterFinishWrite = () => {
        let timer;
        if(this.state.isTimerActive === false){
            timer = setTimeout(this.saveWorkout,2000);
            this.state.isTimerActive = true;
        }  
    }

    onTitleChange = (e) => {   
      
        this.saveAfterFinishWrite();
        let training_title = e.target.value 

        if(!training_title) {
            training_title = "WPISZ TYTUŁ";
        }
        this.setState(() => ({training_title}));
    }

    onWorkoutChange = (e) => {

        this.saveAfterFinishWrite();
        let training_body = e.target.value 

        if(!training_body) {
            training_body = "WPISZ TRENING";
        }
        this.setState(() => ({training_body}));
    }

    addEditNewWorkout = (edited) => {
        const uuid = require('uuid');

        // if(!this.state.training_title) {
        //     const training_title = "WPISZ TYTUŁ";
        //     this.setState(() => ({training_title}));
        // } 

        // if(!this.state.training_body) {
        //     const training_body = "WPISZ TRENING";
        //     this.setState(() => ({training_body}));
        // }

        if(!!this.state.training_title & !!this.state.training_body ){
            var date = Date.now();
            this.props.onSubmit({
                edited,
                id: this.state.selectedWorkoutId,
                training_body: this.state.training_body,
                training_title: this.state.training_title,
                createdAt: date
            });          
        }
    }

    saveWorkout = () => {
        this.addEditNewWorkout(true);
        this.state.isTimerActive = false;
        console.log("Workout saved");
    }

    addNewWorkout = () => {
        this.addEditNewWorkout(false);
    }

    render(){
            return (
                <div className="form" onSubmit={this.onSubmit}>
                    {this.state.error_no_title}                  
                    <input 
                        className="input-group"
                        type='text' 
                        placeholder='tytuł'    
                        value={this.state.training_title}
                        onChange={this.onTitleChange}
                    />
                    {this.state.error_no_body}

                    <ContentEditable className="inputEditable"
                        spellCheck = {false}
                        innerRef={this.contentEditable}
                        html={this.state.training_body} // innerHTML of the editable div
                        disabled={false}       // use true to disable editing
                        onChange={this.onWorkoutChange} // handle innerHTML change
                        tagName='article' // Use a custom HTML tag (uses a div by default)
                    /> 
                    <button onClick={this.addNewWorkout}>Add New</button>  
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    
    let zmienna = state.training.filter((value) => value.id === state.selectedTraining.selectedWorkout );

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
 
    editSelectedWorkout: (id) => dispatch(editTraining(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TrainingLogForm);