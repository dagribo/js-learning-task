import React from 'react';
import './App.css';
import Req from './Requests';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import { createBrowserHistory } from 'history';
import Login from './Login';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.setEmployeeId=this.setEmployeeId.bind(this);
    this.getEmployeeId=this.getEmployeeId.bind(this);
    this.state = {mainData: '',employeeNum:0};
    this.hist = createBrowserHistory();
  }

  handleDataChange(data){
    this.setState({mainData:data});
  }

  setEmployeeId(num){
    this.setState({employeeNum:num});
    console.log(this.state.employeeNum)
  }

  getEmployeeId(){
    return this.state.employeeNum;
  }
  
  state = {
    username: "",
    password: ""
  }

  render(){
    return (
      <Router>
        <Switch>
          <Route exact path='/employees' render={props => <Req data={this.state.mainData} onDataChange={this.handleDataChange} setId={this.setEmployeeId} {...props} />} />
          <Route path='/add' render={props => <AddEmployee data={this.state.mainData} onDataChange={this.handleDataChange} {...props} />}/>
          <Route path='/employee/:employeeNum' render={props => <EditEmployee data={this.state.mainData} onDataChange={this.handleDataChange} {...props} />}/>
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;

