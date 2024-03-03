import React from 'react';
import './CalculatorApp.css';
import { ICalcAppProps, ICalcAppState } from './ICalcApp';
import { Link, Navigate } from 'react-router-dom';

class CalculatorApp extends React.Component<ICalcAppProps, ICalcAppState> {
  constructor(props: any){
    super(props);
    this.state = {
      result: "0",
      display: "0",
      history: []
    };
  }

  insertSequence = (value: string) => {
    const lastOperator = this.state.display[this.state.display.length - 1];
  
    if((lastOperator === "/" || lastOperator === "x" || lastOperator === "-" || lastOperator === "+") && (value === "/" || value === "x" || value === "-" || value === "+")){
      if(value == "x"){
        this.setState({result: this.state.result.slice(0, -1) + "*"})
        this.setState({display: this.state.display.slice(0, -1) + value})
      }
      else {
        this.setState({result: this.state.result.slice(0, -1) + value})
        this.setState({display: this.state.display.slice(0, -1) + value})
      }
    }
    else {
      if(this.state.result == "0" && (value >= '0' && value <= '9')){
        this.setState({result: value})
        this.setState({display: value})
      }
      else if(this.state.result == "Err" && (value >= '0' && value <= '9')){
        this.setState({result: value})
        this.setState({display: value})
      }
      else if(this.state.result == "Err" && (value == "/" || value == "x" || value == "-" || value == "+")){
        if(value == "x"){
          this.setState({result: "0*"})
          this.setState({display: "0" + value})
        }
        else {
          this.setState({result: "0" + value})
          this.setState({display: "0" + value})
        }
      }
      else if(this.state.result == "0" && (value == "/" || value == "x" || value == "-" || value == "+")){
        if(value == "x"){
          this.setState({result: this.state.result + "*"})
          this.setState({display: this.state.display + value})
        }
        else {
          this.setState({result: this.state.result + value})
          this.setState({display: this.state.display + value})
        }
      }
      else if(value === "x"){
        this.setState({result: this.state.result + "*"})
        this.setState({display: this.state.display + value})
      }
      else {
        this.setState({result: this.state.result + value})
        this.setState({display: this.state.display + value})
      }
    }
  }

  clearSequence = () => {
    this.setState({result: "0"})
    this.setState({display: "0"})
  }

  deleteSequence = () => {
    this.setState({result: this.state.result.slice(0, -1)})
    this.setState({display: this.state.display.slice(0, -1)})
    if(!this.state.result[1]){
      this.setState({result: "0"})
      this.setState({display: "0"})
    }
  }

  calculateSequence = () => {
    try {
      for(let i = 0; i < this.state.result.length; i++){
        if(this.state.result[i] == "/" || this.state.result[i] == "*" || this.state.result[i] == "-" || this.state.result[i] == "+"){

          if((this.state.result[i-1] >= '0' && this.state.result[i-1] <= '9') && (this.state.result[i+1] >= '0' && this.state.result[i+1] <= '9')){

            const lastOperator = this.state.display[this.state.display.length - 1];
  
            if(lastOperator === "/" || lastOperator === "x" || lastOperator === "-" || lastOperator === "+"){
          
              this.setState({result: (eval(this.state.result.slice(0, -1)).toString() === "Infinity" || eval(this.state.result.slice(0, -1)).toString() === "NaN") ? "Err" : eval(this.state.result.slice(0, -1)).toString()})
              this.setState({display: (eval(this.state.result.slice(0, -1)).toString() === "Infinity" || eval(this.state.result.slice(0, -1)).toString() === "NaN") ? "Err" : eval(this.state.result.slice(0, -1)).toString()})
              this.setState({history: [...this.state.history, (eval(this.state.result.slice(0, -1)).toString() === "Infinity" || eval(this.state.result.slice(0, -1)).toString() === "NaN") ? "Err" : eval(this.state.result.slice(0, -1)).toString()]})

            }
            else {

              this.setState({result: (eval(this.state.result).toString() === "Infinity" || eval(this.state.result).toString() === "NaN") ? "Err" : eval(this.state.result).toString()})
              this.setState({display: (eval(this.state.result).toString() === "Infinity" || eval(this.state.result).toString() === "NaN") ? "Err" : eval(this.state.result).toString()})
              this.setState({history: [...this.state.history, (eval(this.state.result).toString() === "Infinity" || eval(this.state.result).toString() === "NaN") ? "Err" : eval(this.state.result).toString()]})
              
            }
          }
        }
      }
    } 
    catch (err) {
      this.setState({display: "Err"})
      this.setState({result: "Err"})
      this.setState({history: [...this.state.history, "Err"]})
    }
  }

  render() {
    return (
      <div className="CalculatorApp">
        <div className="container">
          <div className="top-content">
            <div className="history-list">
              {this.state.history.map((item: any) => {
                return (
                  <>
                  <p className="history">{item}</p>
                  </>
                )
              })}
            </div>
            <p className="display">{this.state.display}</p>
          </div>
          <div className="bottom-content">
            <div className="top-buttons">
              <div className="left-buttons">
                <div className="row">
                  <button onClick={() => {this.clearSequence()}}>C</button>
                  <button onClick={() => {this.deleteSequence()}}>DEL</button>
                  <button className="support">
                    <Link to={"/support"} style={{textDecoration: 'none', color: 'white', padding:'18px'}}>?</Link>
                  </button>
                </div>
                <div className="row">
                  <button onClick={() => {this.insertSequence("1")}}>1</button>
                  <button onClick={() => {this.insertSequence("2")}}>2</button>
                  <button onClick={() => {this.insertSequence("3")}}>3</button>
                </div>
                <div className="row">
                  <button onClick={() => {this.insertSequence("4")}}>4</button>
                  <button onClick={() => {this.insertSequence("5")}}>5</button>
                  <button onClick={() => {this.insertSequence("6")}}>6</button>
                </div>
                <div className="row">
                  <button onClick={() => {this.insertSequence("7")}}>7</button>
                  <button onClick={() => {this.insertSequence("8")}}>8</button>
                  <button onClick={() => {this.insertSequence("9")}}>9</button>
                </div>
              </div>
              <div className="right-buttons">
                <button onClick={() => {this.insertSequence("/")}}>/</button>
                <button onClick={() => {this.insertSequence("x")}}>x</button>
                <button onClick={() => {this.insertSequence("-")}}>-</button>
                <button onClick={() => {this.insertSequence("+")}}>+</button>
              </div>
            </div>
            <div className="bottom-buttons">
                <button onClick={() => {this.insertSequence("0")}}>0</button>
                <button onClick={() => {this.calculateSequence()}}>=</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CalculatorApp;
