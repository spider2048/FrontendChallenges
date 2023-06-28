import './App.css'
import React from 'react'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            circles: [],
            undoCircles: []
        }

        this.placeCircleHandler = this.placeCircleHandler.bind(this)
        this.undoChange = this.undoChange.bind(this)
        this.redoChange = this.redoChange.bind(this)
    }
    
    placeCircle(x, y) {
        const circleSize = 100;
        const circleStyle = {
          marginLeft: x - circleSize / 2 + 'px',
          marginTop: y - circleSize / 2 + 'px'
        };
      
        return <div className='circle' style={circleStyle} />
      }
      

    placeCircleHandler(e) {
        const newCircles = [...this.state.circles]
        newCircles.push(this.placeCircle(e.clientX, e.clientY))

        this.setState({
            circles: newCircles,
            undoCircles: []
        })
    }

    undoChange() {
        if (this.state.circles.length == 0) {
            return;
        }

        const newCircles = [...this.state.circles];
        const lastCircle = newCircles.pop();
    
        this.setState(prevState => ({
          circles: newCircles,
          undoCircles: [...prevState.undoCircles, lastCircle]
        }));
      }
    
    redoChange() {
        if (this.state.undoCircles.length == 0) {
            return;
        }

        const newCircles = [...this.state.circles];
        const newUndoCircles = [...this.state.undoCircles];
        newCircles.push(newUndoCircles.pop());

        this.setState({
            circles: newCircles,
            undoCircles: newUndoCircles
        });
    }
    

    render() {
        return (
            <div className='Wrapper'>
                <div className='ButtonWrapper'>
                    <button onClick={this.undoChange}>Undo</button>
                    <button onClick={this.redoChange}>Redo</button>
                </div>
                <div className='App' onMouseDown={this.placeCircleHandler}>
                    {this.state.circles}
                </div>
            </div>
        )
    }
}
