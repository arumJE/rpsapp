import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Row, Col } from 'react-bootstrap';
import {admin} from '../firebase.js';
import * as moment from 'moment';


// Initialize firestore
let db = admin.firestore();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      userEmail: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(e.target.getAttribute('keyprop'));
    this.setState({ selectedEvent: e.target.getAttribute('keyprop') });
    console.log(moment().format('YYYY-MM-DD'));
    this.getElement();

    // let startDate = moment(e.target.getAttribute('startdate')).format('YYYY-MM-DD');
    // let endDate = moment(e.target.getAttribute('enddate')).format('YYYY-MM-DD');
    // let currentDate = moment();
    // console.log(currentDate.isBetween(startDate, endDate));
  }

  componentDidMount() {
    admin.auth().onAuthStateChanged((user) => {
      if(user === null) {
        this.setState({redirect: true});
      }
    });
    //this.getElement();
  }

  getElement() {
    let node = document.getElementsByClassName('home-col-ev');
    for(var i=0; i<node.length; i++) {
      let start = node[i].attributes.startdate.nodeValue;
      let end = node[i].attributes.enddate.nodeValue;

      if(this.dateBetween(start, end)) {
        console.log('this event:');
      }
    }
    //const element = node();
    //console.log('there are this many items:',node);
  }

  dateBetween(start, end) {

    // let startDate = moment(e.target.getAttribute('startdate')).format('YYYY-MM-DD');
    // let endDate = moment(e.target.getAttribute('enddate')).format('YYYY-MM-DD');
    let currentDate = moment();
    return currentDate.isBetween(start, end);
  }

  render() {
    if(this.state.redirect === true) {
      return <Redirect to='/login' />
    }

    return (
      <div className="home-page">
        <h1 className="page-header">Live Events</h1>
        <div className="eventItems">
          <div className="home-inner">
            <Link to="/dashboards"><Col className="home-col" xs={2}><div className="col-height">DASHBOARD</div></Col></Link>
            <Link to="/events"><Col className="home-col" xs={2}><div className="col-height">EVENTS</div></Col></Link>
            <Link to="#"><Col className="home-col" xs={2}><div className="col-height">TBD</div></Col></Link>
            <Link to="#"><Col className="home-col" xs={2}><div className="col-height">TBD</div></Col></Link>
            <Link to="#"><Col className="home-col" xs={2}><div className="col-height">TBD</div></Col></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default home;
