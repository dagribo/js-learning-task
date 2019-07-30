import React from 'react';
import './App.css';
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Reactable from "reactable"

var Table = Reactable.Table,
    Thead = Reactable.Thead,
    Th = Reactable.Th,
    Tr = Reactable.Tr,
    Td = Reactable.Td;

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
        for(let empl of data)
        {
          let {birthday} = empl
          empl.birthday = new Date(Date.parse(birthday))
        }
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
    
  /* Create a new instance of the 'AuthHelperMethods' compoenent*/
  state = {
    username: "",
    password: ""
  }

/* Here will want to add a method to log the user out upon clicking 'Logout' */
  _handleLogout = () => {
    
    
    this.props.history.replace('/login');
  }
    
    render() {
      let name = null;
      //This will be null until we set up authentication...
    if (this.props.confirm) {
      name = this.props.confirm.username;
    }
       return (
          <div> 
            <h1 align="center">Employees</h1>
            <p>
              <Link to="/add">Add</Link>
            </p>   
            <p>
              <button onClick={this._handleLogout}>LOGOUT</button>
            </p>   
            {this.state.Inform.length === 0 ? (
              <div>Loading...</div>
            ) : (
              <Table itemsPerPage={10} pageButtonLimit={5} sortable={true} defaultSort={{column: 'name', direction: 'asc'}} border="1" width="90%" cellPadding="5" align="center" cellSpacing="5">
                <Thead>
                    <Th column="name">Name</Th>
                    <Th column="email">Email</Th>
                    <Th column="birthday">Birthday</Th>
                    <Th column="salary">Salary</Th>
                    <Th column="edit">Edit</Th>
                    <Th column="delete">Delete</Th>
                </Thead>
                {
                  this.state.Inform.map(empl => {
                    return <Tr>
                      <Td column="name">{empl.name}</Td>
                      <Td column="email">{empl.email}</Td>
                      <Td column="birthday">{`${empl.birthday.getFullYear()}-${empl.birthday.getMonth()}-${empl.birthday.getDate()}`}</Td>
                      <Td column="salary">{empl.salary}</Td>
                      <Td column="edit"><Link to={`/employees/${empl.id}`} onClick={this.editEmployee.bind(this, empl.id)}>Edit</Link></Td>  
                      <Td column="delete"><Link to="/" onClick={this.deleteEmployee.bind(this, empl.id)}>Delete</Link></Td>   
                    </Tr>;
                    })
                }
              </Table>
              )}           
          </div>
       );
     }
}