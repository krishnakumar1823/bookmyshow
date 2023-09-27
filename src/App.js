import './App.css';
import { Provider } from 'react-redux';
import { Store } from './Component/Redux/Store';
import { Router } from './Component/Browserrouter/Router';

function App() {

  return (
    <div className="App">
        <Provider store={Store}>
            <Router/>
        </Provider>
    </div>
  );
}

export default App;
