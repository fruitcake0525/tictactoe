import React, { Component } from 'react';
import CurrentPlayer from './CurrentPlayer';
import Cell from './Cell';
import _ from 'lodash';


const styles = {
  board: {
    width: '600px',
    height: '600px',
    padding: 0,
    display: 'table',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}

const winConditions = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"]
];

const defaultContents = _.range(1, 10).map((item) => item.toString()).reduce((acc, item) => {
  acc[item] = null;
  return acc;
}, {});

export default class GameBoard extends Component {

  state = {
    circle: true,
    contents: defaultContents,
    groupO: [],
    groupX: [],
    O: 0,
    X: 0
  }

  setStep = (position) => {
    let {circle, contents, groupO, groupX} = this.state;
    let step = circle ? "O" : "X"
    let tempContents = Object.assign({}, contents);
    let tempGroupO = [].concat(groupO);
    let tempGroupX = [].concat(groupX);

    // 如果已經有塞資料就不處理
    if (!tempContents[position]) {
      // 自訂cell內容
      tempContents[position] = step;
      // 判斷要加入哪一組
      circle ? tempGroupO.push(position) : tempGroupX.push(position);

      this.setState({
        circle: !this.state.circle,
        contents: tempContents,
        groupO: tempGroupO,
        groupX: tempGroupX
      });
      // 判斷是否勝利
      let result = this.checkWin(tempGroupO, tempGroupX);
      if (result) {
        setTimeout(() => {
          alert(`${result} 贏了!!! 換對手先上`);
          this.setState({
            contents: defaultContents,
            groupO: [],
            groupX: [],
            [result]: this.state[result] + 1,
          });
        }, 0);
        return;
      }
      // 判斷是否結束
      let currentSteps = Object.values(this.state.contents).filter((item) => item !== null).length;
      if (currentSteps >= 8) {
        setTimeout(() => {
          alert('步數已走完！平手，換對手先走');
          this.setState({
            contents: defaultContents,
            groupO: [],
            groupX: [],
          });
        }, 0);
      }
    } else {
      alert("已點選");
    }
  }

  checkWin = (groupO, groupX) => {
    let endGame = null;
    winConditions.forEach((condition) => {
      if (_.intersection(condition, groupO).length >= 3) {
        return endGame = "O";
      }
    });
    winConditions.forEach((condition) => {
      if (_.intersection(condition, groupX).length >= 3) {
        return endGame = "X";
      }
    });
    return endGame;
  }

  generateCell = () => {
    return _.chunk(_.range(1, 10), 3).map((group, index) => {
      return (
        <div key={`group_${index}`} style={{display: 'table-row'}}>
          {
            group.map((item) => (
              <Cell key={`cell_${item}`} onClick={() => this.setStep(item.toString())} content={this.state.contents[item.toString()]} />
            ))
          }
        </div>
      )
    })

  }

  render() {
    return (
      <div className="row" style={{marginTop: 20}}>
        <div className="col s12 m12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title" style={{textAlign: 'center', fontSize: '42px'}}>井字遊戲</span>
              <span className="card-title" style={{textAlign: 'center', fontSize: '28px'}}>
                {this.state.O}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V.S.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.state.X}
              </span>
              {/* 目前進度 */}
              <CurrentPlayer circle={this.state.circle} />
              {/* 內容 */}
              <div style={{width: "100%", margin: '0 auto'}}>
                <div style={styles.board}>
                  {this.generateCell()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
