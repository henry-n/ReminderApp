import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators } from 'redux';
import {addReminder,deleteReminder,clearReminders} from '../actions';
import moment from 'moment';

//store is global object that holds application state/variable

//action is object while function returns action/object

class App extends Component{
  //defualt constructor
  constructor(props){
    super(props);
    this.state = {
      text:'',
      dueDate:''
    }
  }

  addReminder(){
    //console.log('this', this);
    console.log('this.state.dueDate', this.state.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id){
    //console.log('deleting in application', id);
    //console.log('this.props',this.props);
    this.props.deleteReminder(id);
  }

  renderReminders(){
    const{reminders} = this.props;
    //console.log('reminders', reminders);
    return(
      <ul className = "list-group col-sm-4">
      {
        reminders.map(reminder=>{
          return(
          <li key={reminder.id} className = "list-group-item">
            <div className="list-item">
              <div>{reminder.text}</div>
              <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
            </div>
            <div className="list-item delete-button"
            onClick={()=> this.deleteReminder(reminder.id)}
            >&#x2715;</div>
          </li>
          )
        })
      }
      </ul>
    )
  }

  render(){
    //console.log('this.props', this.props)
    return(
      <div className = "App">
        <div className = "title">
          Reminder Pro
        </div>

        <div className="form-inline reminder-form">
          <div className = "form-group">

            <input
              className = "form-control"
              //Input Textbox Message
              placeholder = "I have too..."
              onChange = {event => this.setState({text:event.target.value})}
              />

              <input
                className="form-control"
                type="datetime-local"
                onChange = {event => this.setState({dueDate: event.target.value})}
              />
          </div>
          <button type="button" className = "btn btn-sucess" onClick={()=> this.addReminder()}>
            Add Reminder
          </button>

        </div>
        {this.renderReminders()}
        <div
          className="btn btn-danger"
          onClick={() => this.props.clearReminders()}
          >
          Clear Reminders
        </div>
      </div>
    )
  }
}
/*
function mapDispatchToProps(dispatch){
  return bindActionCreators({addReminder},dispatch);
}
*/
//define mapStateToProps to recognize redux setState
//1st parameter in connect function

function mapStateToProps(state){
  //console.log('state',state);
  return{
    reminders:state
  }
}
export default connect(mapStateToProps,{addReminder, deleteReminder, clearReminders})(App);
