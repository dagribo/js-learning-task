import React from 'react';
import './App.css';
import Reactable from 'reactable';
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import AddEmployee from './AddEmployee';

export default class Req extends React.Component {
    constructor(props){
        super(props);
        this.state={
            Inform: [],
        }
        
        this.deleteEmployee=this.deleteEmployee.bind(this);
        this.editEmployee=this.editEmployee.bind(this);
    }
    state = {
       Inform: []
    };
    componentDidMount() {
       this.getData();
       console.log('Did mount')
    }
    getData = async () => {
        let res = await axios.get("http://localhost:3285/api/Employees");
        let { data } = res;
        console.log(data);
        this.setState({ Inform: data });
        this.props.onDataChange(this.state.Inform);
    };
    deleteEmployee = async (id) => {
        let res = await axios.delete(`http://localhost:3285/api/Employees/`+id);
        let {data}=res;
        this.setState({Inform: data});
        this.props.onDataChange(this.state.Inform);
    }
    editEmployee(id) {
      this.props.setId(id);
    }
    
    render() {
       return (
          <div> 
            <h1 align="center">Employees</h1>
            <p>
              <Link to="/add">Add</Link>
            </p>      
            {this.state.Inform.length === 0 ? (
              <div>Loading...</div>
            ) : (
              <table border="1" width="90%" cellPadding="5" align="center" cellSpacing="5">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Birthday</th>
                    <th>Salary</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.state.Inform.map(empl => {
                    return <tr key={empl.id}>
                      <td>{empl.name}</td>
                      <td>{empl.email}</td>
                      <td>{empl.birth}</td>
                      <td>{empl.salary}</td>
                      <td><Link to={`/employees/${empl.id}`} onClick={this.editEmployee.bind(this, empl.id)}>Edit</Link></td>  
                      <td><Link to="/" onClick={this.deleteEmployee.bind(this, empl.id)}>Delete</Link></td>   
                    </tr>;
                    })
                }
                </tbody>
              </table>
              )}           
          </div>
       );
     }
}