import React, { Component } from 'react';

const styles = {
  cell: {
    display: 'table-cell',
    width: '200px',
    height: '200px',
    backgroundColor: 'white',
    border: '1px solid #cacaca',
    margin: 0,
    padding: 0,
    color: '#3d3d3d',
    textAlign: 'center',
    fontSize: '8.5em',
    verticalAlign: 'middle',
  },
}

export default class Cell extends Component {

  state = {
    content: this.props.content
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      content: nextProps.content
    })
  }

  render() {
    return (
      <div style={styles.cell} onClick={this.props.onClick}>
        {this.state.content}
      </div>
    )
  }
}