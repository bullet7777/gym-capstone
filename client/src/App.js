import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { Header } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

function App() {
  return (
    <div className="App">
      <Header>
          Testing semantic UI
      </Header>
      <Button primary>Click Me</Button>
    </div>
  );
}

export default App;
