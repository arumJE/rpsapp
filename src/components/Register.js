import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { admin } from '../firebase.js';

// Initialize firestore
let db = admin.firestore();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

// const timestamp = snapshot.get('created_at');
// const date = timestamp.toDate();
const options = ['Event', 'Marketing', 'Research', 'IT'];

class Register extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            fname: '',
            lname: '',
            team: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signup = this.signup.bind(this);
        this.addCollection = this.addCollection.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value,
        });
        // this.setState({team});
    }

    addCollection(){
      db.collection('userData').doc(this.state.email).set({
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        team: this.state.team
      })
      .then(function(){
        console.log('Document successfully written.');
      })
      .catch(function(error){
        console.error('Error writing document: ', error);
      });
    }

    signup(e){
      e.preventDefault();
      this.addCollection();

      admin.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(function(user) {
        window.location = "/profile";
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
         alert('The password is too weak.');
       } else {
         alert(errorMessage);
       }
       console.log(error);
      });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.signup(e)
        console.log('The form was submitted with the following data:');
    }

    render() {
      const {team} = this.state;
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="fname">First Name</label>
                <input type="text" id="fname" className="FormField__Input" placeholder="Enter your first name" name="fname" value={this.state.fname} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">Last Name</label>
                <input type="text" id="lname" className="FormField__Input" placeholder="Enter your last name" name="lname" value={this.state.lname} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="team">Team</label>
                <Select
                  value={team}
                  onChange={this.handleChange}
                  options={options}
                  name="team"
                />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Email</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign Up</button> <Link to="/login" className="FormField__Link">I'm already member</Link>
              </div>
            </form>
          </div>
        );
    }
}
export default Register;
