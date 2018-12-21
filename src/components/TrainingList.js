import React from 'react';
import {connect} from 'react-redux';
import TrainingListItem from './TrainningListItem';
import sort from '../selectors/sort';
import searchInTraining from '../selectors/searchTraining';



class TrainingList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            sidebarOpen: true
          };
          this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }
   

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

     render(){
        const uuid = require('uuid');
        return (
             <div>
                 <div className="list-training">
                {
                    this.props.train.length > 0 ? (
                        this.props.train.map((value) =>{                                
                            return <TrainingListItem key={uuid()} {...value} hideToolbar={this.props.hideToolbar} />
                        })
                    ) :(<div>No Training</div>)           
                }
                </div>       
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    if(!!state.searchTraining.searchTraining){ 
        const sortedAndSearchedData = sort((
            searchInTraining(state.training,state.searchTraining.searchTraining)),
            state.filters.sortBy);
            
        console.log(sortedAndSearchedData);
        return {
            train: sortedAndSearchedData
        };
    }else{
        const sortedData = sort(state.training,state.filters.sortBy);
             
        return {
            train: sortedData
        };
    }
    // return {
    //    data: state.searchTraining.searchTraining
    // }
    
}

export default connect(mapStateToProps)(TrainingList); //łączymy komponent z żeczami, które chcemy dostać ze store

