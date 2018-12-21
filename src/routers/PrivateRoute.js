import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from "react-sidebar";
import TrainingList from '../components/TrainingList';
import TrainingListFilter from '../components/TrainingListFilter';
// import TrainingDashboardPage
const mql = window.matchMedia(`(min-width: 800px)`);

export class PrivateRoute extends React.Component {

  constructor(props){
    super(props);

    const {
      isAuthenticated,
      component: Component,
      ...rest
    } = this.props

    this.state = {
        sidebarDocked: mql.matches,
        sidebarOpen: false
      };
      this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
      this.hideToolBarWhenSmallScreen = this.hideToolBarWhenSmallScreen.bind(this);
}

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }
 
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  hideToolBarWhenSmallScreen() {
    if(!mql.matches){
      this.onSetSidebarOpen(false);
    }
  }
  
  render(){ 
    const Comp = this.props.component;
    return(
      
      <Route {...this.props.rest} component={() => (
        this.props.isAuthenticated ? (
          <div>
          {
            <Sidebar 
              sidebar=
                {   
                  <div>
                    <TrainingListFilter/>
                    <TrainingList hideToolbar={this.hideToolBarWhenSmallScreen}/>
                  </div>
                  }
                    open={this.state.sidebarOpen}
                    docked={this.state.sidebarDocked}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{ sidebar: { background: "white"} }}
              >
                  <div>
                    <Header showToolbar={this.onSetSidebarOpen}/>
                    <Comp {...this.props} />
                    </div>    
            </Sidebar>
          }
        </div>
        ) : (
            <Redirect to="/" />
          )
      )} />
    )    
  }
}
    
    


const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
