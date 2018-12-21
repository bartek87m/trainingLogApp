import React from 'react';
import {connect} from 'react-redux';
import { searchTraining } from '../actions/searchTraining';
import { sortByDate } from '../actions/filters';

class TrainingListFilter extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            searchData: "",
            sortBy: ""
        }
    }

    searchInTrainings = (e) => {
        const searchData = e.target.value;
        this.setState({searchData}, () => {
            this.props.searchTrainingData(searchData);
        });
    }

    sortTraining = (e) => {
        const sortBy = e.target.value;
        this.setState({sortBy}, () => {
            this.props.sortTraining(sortBy);
        });
        
    }


    render(){
        return (
 
            <div>
                <div className="list-title">
                    Amount: {this.props.training.length}
                </div>
                <div className="list-search">
                    <input className="text-input"
                        type='text' 
                        placeholder='Search'    
                        value={this.state.searchData}
                        onChange={this.searchInTrainings}
                    />
                </div>    
                <div className="list-select">
                    <select className="select" value={this.state.sortBy} onChange={this.sortTraining}>
                        <option value='dateUp'>Date up</option>
                        <option value='dateDown'>Date down</option>                       
                    </select>    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        training: state.training
    };
}

const mapDispatchToProps = (dispatch) => ({
    searchTrainingData: (searchData) => dispatch(searchTraining(searchData)),
    sortTraining: (sortBy) => dispatch(sortByDate(sortBy))
});

export default connect(mapStateToProps ,mapDispatchToProps)(TrainingListFilter);