import React from "react";
import Draggable from 'react-draggable';
import Text from "./components/text.component";
import Dictaphone from "./components/Dictaphone";
import "./App.css";

const DATA = () => {
  let id = Math.floor(Math.random() * 10000);
  console.log(id);
  return {
    componentName: "text",
    data: "Hello",
    id: id
  };
};

const components = {
  text: Text
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loadedComponents: [],
      idToRemove: 0
    };

    this.handleId = this.handleId.bind(this);
  }

  handleId(event) {
    this.setState({ idToRemove: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <Dictaphone />
        <button
          onClick={() => {
            const newComponent = DATA();
            this.setState({
              loadedComponents: this.state.loadedComponents.concat(newComponent)
            });
          }}
        >
          Hello
        </button>
        <button
          onClick={() => {
            const last = this.state.loadedComponents;
            last.pop();
            this.setState({
              loadedComponents: last
            });
          }}
        >
          Remove
        </button>
        <input type="number" onChange={this.handleId} />
        <button
          onClick={() => {
            console.log(this.state.idToRemove);
            console.log();
            this.setState({
              loadedComponents: this.state.loadedComponents.filter(
                c => parseInt(c.id) !== parseInt(this.state.idToRemove)
              )
            });
          }}
        >
          Remove
        </button>
        {this.state.loadedComponents.map(
          ({ id, componentName, ...otherProps }) => {
            const ComponentName = components[componentName];
            return (<Draggable key={id}> 
            <div> 
            <ComponentName  id={id} {...otherProps} />
            </div>
            </Draggable>
            )
          }
        )}
      </div>
    );
  }
}

export default App;
