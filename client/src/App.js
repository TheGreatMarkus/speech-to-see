import React from "react";
import Draggable from "react-draggable";
import Text from "./components/text.component";
import CustomImage from "./components/custom-image.component";
import Dictaphone from "./components/Dictaphone";
import "./App.css";

const DATA = (component, content) => {
  let id = Math.floor(Math.random() * 10000);
  console.log(id);
  return {
    componentName: component,
    data: content,
    id: id
  };
};

const IMAGE = (component, content) => {
  let id = Math.floor(Math.random() * 10000);
  console.log(id);
  return {
    componentName: component,
    src: content,
    id: id
  };
};

const components = {
  text: Text,
  image: CustomImage
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loadedComponents: [],
      idToRemove: 0,
      data: {}
    };

    this.handleId = this.handleId.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleId(event) {
    this.setState({ idToRemove: event.target.value });
  }

  handleQuery(obj) {
    if (obj.content === null) return;
    console.log(obj);
    let newComponent;
    if (obj.object === "image") newComponent = IMAGE(obj.object, obj.content);
    else newComponent = DATA(obj.object, obj.content);
    this.setState({
      loadedComponents: this.state.loadedComponents.concat(newComponent)
    });
  }

  render() {
    return (
      <div className="App">
        <Dictaphone onQuery={this.handleQuery} />
        {/* <button
          onClick={() => {
            const last = this.state.loadedComponents;
            last.pop();
            this.setState({
              loadedComponents: last
            });
          }}
        >
          Remove
        </button> */}
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
            return (
              <Draggable key={id} style>
                <div>
                  <ComponentName id={id} {...otherProps} />
                </div>
              </Draggable>
            );
          }
        )}
      </div>
    );
  }
}

export default App;
