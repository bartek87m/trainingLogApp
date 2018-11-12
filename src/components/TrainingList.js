import React from 'react';
import {connect} from 'react-redux';
import TrainingListItem from './TrainningListItem';

export class TrainingList extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            id:this.props.training.id,
            training_title:this.props.training.training_title,
            training_body: this.props.training.training_body
        }
    }

    componentDidUpdate = () => {
        alert("updated");
    }

    render(){
        const uuid = require('uuid');
        return (
            <div>
                {
                    this.props.training.length > 0 ? (
                        this.props.training.map((training) => {
                            return <TrainingListItem key={uuid()} {...training} />
                        })
                    ) :(<div>No Training</div>)
                }         
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    return {
        training: state.training
    };
}

export default connect(mapStateToProps)(TrainingList); //łączymy komponent z żeczami, które chcemy dostać ze store

