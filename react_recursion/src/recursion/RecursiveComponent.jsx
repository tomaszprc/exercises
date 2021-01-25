import React, { Component } from 'react';

export default class RecursiveComponent extends Component {

	recursiveMethod() {
    const components = this.props.components;
    if (components.length > 0)
    {
      const firstComponent = React.createElement('div', {className: 'box'}, [components[0]])

      components.map((component,index) => {
        if (index == 0) return;

        const reactComponent = React.createElement('div', {className: 'first'}, [component]);

        
      })

      //const firstComponent = React.createElement('div', {className: 'first'}, ['hejka']);
      // const secondComponent = React.createElement('div', {className: 'second'}, []);
      // const renderComponents = components.map((component, index) => {
  
      //   const ReactComponent = React.createElement(
      //     'div',
      //     {
      //       className: 'box'
      //     }
      //   )
      //   // return <div key={index} className="box">{component}</div>
        
  
      // })
      // firstComponent.props.children.push(secondComponent);
      //return firstComponent;
    }
  }

  render() {

    return (
      <div>
        {this.recursiveMethod()}
      </div>
    );
  }
};
