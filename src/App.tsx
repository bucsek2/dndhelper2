import React from 'react';
import {Button} from 'primereact/button';
import {Character} from './Character';

class App extends React.Component {

  addCharacter() {
    console.log("asd");
  }

  render() {
    return (
      <div className="App">
        <Character></Character>
        <Button label="Click" onClick={this.addCharacter} />
      </div>
    );
  }
}

export default App;
