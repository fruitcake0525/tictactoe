import React from 'react';

const styles = {
  container: {
    width: '50%',
    height: '60px',
    margin: '0 25% 40px',
    display: 'flex'
  },
  activeCell: {
    flex: 1,
    fontSize: '4.5em',
    textAlign: 'center',
    color: 'red',
    textDecoration: 'underline',
  },
  cell: {
    flex: 1,
    fontSize: '4em',
    textAlign: 'center',
  }
}

const CurrentPlayer = ({circle}) => {
  return (
    <div style={styles.container}>
      <div style={circle ? styles.activeCell : styles.cell}>O</div>
      <div style={circle ? styles.cell : styles.activeCell}>X</div>
    </div>
  );

}



export default CurrentPlayer;