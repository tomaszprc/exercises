import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from "../actions/people";

class Filter extends Component {

  handleChange = e => {
    this.props.changeQuery(e.target.value.toLowerCase());
  }

  render() {
    return (
      <div className='App-box'>
         <input type="text" placeholder="Your text" onChange={this.handleChange}/>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  people: state.people
});

const mapDispatchToProps = dispatch => ({
  changeQuery: (query) => dispatch(actions.changeQuery(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
