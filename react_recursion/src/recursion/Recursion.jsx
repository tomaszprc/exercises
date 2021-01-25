import React, { Component } from 'react';
import RecursiveComponent from './RecursiveComponent';

// write components here
// const One and so on...

// assign components below
const components = ["One", "Two", "Three"];

export default class Recursion extends Component {
	render() {
  	return (
    	<div className='App-wrapper'>
        <RecursiveComponent components={components} />
      </div>
    );
  }
};
