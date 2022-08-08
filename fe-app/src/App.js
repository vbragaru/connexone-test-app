import './App.css';
import Timer from './components/time/Time'
import Metrics from './components/metrics/Metrics'

function App() {
  return (
    <div className="App">
      <div>
        <Timer></Timer>
      </div>
      <div>
        <Metrics></Metrics>
      </div>
    </div>
  );
}

export default App;
