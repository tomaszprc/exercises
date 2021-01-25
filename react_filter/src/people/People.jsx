import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class People extends Component {
  static propTypes = {
    peopleList: PropTypes.array
  };

  render() {
    const filterPeople = (people, text) => {
      return people.filter(person => {
        const personName = person.name.toLowerCase();
        return personName.includes(text);
      })
    }
    
    return (
      <div>
        {filterPeople(this.props.peopleList, this.props.query).map(person => <div className='App-box' key={person.id}>{person.name}</div>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  peopleList: state.people.peopleList,
  query: state.people.filterQuery
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(People);
