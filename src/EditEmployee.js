import React from 'react';
import './App.css';
import { withRouter } from "react-router";
import axios from "axios";

class EditEmployee extends React.Component{
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
            data: [],
            Employee:[]
        };

        this.nameChange = this.nameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.birthdayChange = this.birthdayChange.bind(this);
        this.salaryChange = this.salaryChange.bind(this);
        this.getData=this.getData.bind(this);
    }
    getData = async () => {
        let res = await axios.get("http://localhost:3285/api/Employees/"+this.props.match.params.employeeNum);
        let { data } = res;
        let { birthday } = data
        data.birthday = new Date(Date.parse(birthday))
        data.birthday =`${data.birthday.getFullYear()}-${data.birthday.getMonth() + 1 < 10 ?
            `0${data.birthday.getMonth() + 1}`
            : `${data.birthday.getMonth() + 1}`}-${data.birthday.getDate() < 10 
                ?`0${data.birthday.getDate()}`
                :`${data.birthday.getDate()}`}`;
        this.setState({ 
            name: data.name,
            email: data.email,
            birthday: data.birthday,
            salary: data.salary
        });
    }
    componentDidMount(){
        this.getData();
    }
    
    editEmployee = async () => {
        let dataJ = JSON.stringify({
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
        await axios.put('http://localhost:3285/api/Employees/'+this.props.match.params.employeeNum, dataJ, config);
        const { history } = this.props;
        history.push('/employees');
    }
    cancelEditing(){
        const { history } = this.props;
        history.push('/employees');
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
                    <button onClick={this.editEmployee.bind(this)}>Save</button>
                    <button onClick={this.cancelEditing.bind(this)}>Cancel</button> 
                </p>
            </div>
        );
    }
}

export default withRouter(EditEmployee)