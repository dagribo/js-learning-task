import React from 'react';
import './App.css';
import Reactable from 'reactable';
import Req from './Requests';
import axios from "axios";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class AddEmployee extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email:'',
            birthday:'',
            salary:0,
            nameValid:true,
            emailValid:true,
            birthdayValid:true,
            salaryValid:true,
        };

        this.nameChange = this.nameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.birthdayChange = this.birthdayChange.bind(this);
        this.salaryChange = this.salaryChange.bind(this);
    }
    
    createEmployee= async () => {
        const dataJ = JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            birthday: this.state.birthday,
            salary:this.state.salary
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
          }
          
        let res = await axios.post('http://localhost:3285/api/Employees', dataJ, config);
        const { history } = this.props;
        history.push('/');
        //this.setState({data:res});
        /*axios({
            method: 'post',
            url: 'http://localhost:3285/api/Employees',
            data: dataJ,
            headers: {'Content-Type': 'application/json' }})
            .then(res => {
                //this.setState({data:res});
            })
        */
        //this.props.onDataChange(this.state.data);
    }
    cancelAdding(){
        const { history } = this.props;
        history.push('/');
    }

    validateName(name){
        return name.length>2;
    }
    validateSalary(sal){
        return sal>0;
    }
    validateEmail(email){
        return email.match(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/);
    }
    nameChange(event) {
        var val = event.target.value;
        var valid = this.validateName(val);
        this.setState({name: val, nameValid: valid});
    }
    emailChange(event) {
        var val = event.target.value;
        var valid = this.validateEmail(val);
        this.setState({email: val, emailValid: valid});
    }
    birthdayChange(event) {
        this.setState({birthday: event.target.value});
    }
    salaryChange(event) {
        var val = event.target.value;
        var valid = this.validateSalary(val);
        this.setState({salary: val, salaryValid: valid});
    }

    render() {
        const {data, match: {params}} = this.props;
        var nameColor = this.state.nameValid===true?"green":"red";
        var emailColor = this.state.emailValid===true?"green":"red";
        var birthdayColor = this.state.birthdayValid===true?"green":"red";
        var salaryColor = this.state.salaryValid===true?"green":"red";
        return (
            <div>
                <form>
                    <p>
                        <label>
                            Name:
                            <input type="text" value={this.state.name} onChange={this.nameChange} style={{borderColor:nameColor}}/>
                        </label>
                    </p>
                    <p>
                        <label>
                            Email:
                            <input type="email" value={this.state.email} onChange={this.emailChange} style={{borderColor:emailColor}}/>
                        </label>
                    </p>
                    <p>
                        <label>
                            Birthday:
                            <input type="date" value={this.state.birthday} onChange={this.birthdayChange} style={{borderColor:birthdayColor}}/>
                        </label>
                    </p>
                    <p>
                    <label>
                        Salary:
                        <input type="number" value={this.state.salary} onChange={this.salaryChange} style={{borderColor:salaryColor}}/>
                    </label>
                    </p>
                </form>
                <p>
                    <button onClick={this.createEmployee.bind(this)}>Create</button> 
                    <button onClick={this.cancelAdding.bind(this)}>Cancel</button>  
                </p>
            </div>
        );
    }
}
export default withRouter(AddEmployee)