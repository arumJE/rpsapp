import React, { Component } from 'react';
import { Grid, Row, Col, Badge, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import {admin} from '../firebase.js';
import TableauReport from 'tableau-react';
import axios from 'axios';

import Dashes from '../Dashboards.json';
import SubHeader from './SubHeader.js';

// Initialize firestore
let db = admin.firestore();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

class Dashboards extends Component {
    constructor(props) {
        super(props);

        this.state = {
          redirect: false,
          userEmail: '',
          modalIsOpen: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetEmail = this.resetEmail.bind(this);

        this.loadData = this.loadData.bind(this);

        // this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleChange(e) {
      let target = e.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      let name = target.name;

      this.setState({
        [name]: value,
      });
    }

    componentDidMount(){
      var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK/tracks?offset=0&limit=2';
      // Send the stored forms to the server
      fetch(targetUrl, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Request-Method": "*",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
      })
      .then(function(response){
        //console.log(response);
        return response.json();
      })
      .then(function(data){
        console.log(data);
      })
      .catch(function(err){
        console.log(err);
      });

      admin.auth().onAuthStateChanged((user) => {
        if(user === null) {
          this.setState({redirect: true});
        }
      this.setState({userEmail: user.email});
        var data = {
          name: user.displayName,
          email: user.email,
          dashboards: 'IT'
        };

        // Add a new document in collection "cities" with ID 'LA'
        var userRef = db.collection('users').doc(user.uid);

        var setWithOptions = userRef.set(data, {merge: true});

        // if the team of the individual is of a certain type, render a certain group of Dashboards
        var getDoc = userRef.get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
            } else {
              // console.log('Document data:', doc.data().team);
              // While user's 'team' matches the doc, render it
              for (var i = 0; i < Dashes.dashboards.length; i++) {
                // console.log(Dashes.dashboards[i].url);
                // if (Dashes.dashboards[i].group === doc.data().team) {
                //
                // }
              }
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
      });
    }

    loadData() {
      console.log('clicked');

    }

    // reset email
    resetEmail() {
      console.log('reset email is: ', this.state.userEmail);
      admin.auth().sendPasswordResetEmail(this.state.userEmail).then(function() {
        // Email sent.
        alert('A password reset email has been sent');
      }).catch(function(error) {
        // An error happened.
      });
      // console.log('useremail is: ', this.state.userEmail);
    }

    openModal() {
      this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = '#f00';
    }

    closeModal() {
      this.setState({modalIsOpen: false});
    }

    componentWillMount() {

    }
    componentWillUnmount() {

    }

    handleSubmit(e) {
      e.preventDefault();
      //on submit, set data in firebase equal to this new data
    }

    render() {
      if(this.state.redirect === true) {
        return <Redirect to='/login' />
      }
        return (
          <div>
            <h1 className="page-header">Dashboard</h1>
            <SubHeader />
            <br/><br/>
            <div className="listgroup">
              <ListGroup>
                <ListGroupItem header="Total Surveys">
                  <Badge>700</Badge>
                </ListGroupItem>
                <ListGroupItem header="Surveys Today">
                  <Badge>43</Badge>
                </ListGroupItem>
                <ListGroupItem header="Total Leads">
                  <Badge>277</Badge>
                </ListGroupItem>
                <ListGroupItem header="Leads Today">
                  <Badge>15</Badge>
                </ListGroupItem>
                <Link to="/lastten">
                  <ListGroupItem header="Last 10 Leads">
                    <Badge>Click to see more</Badge>
                  </ListGroupItem>
                </Link>
              </ListGroup>
            </div>
            <div className="tableau-dashes">
            </div>
          </div>
        );
    }
}
export default Dashboards;
