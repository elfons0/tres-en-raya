import logo from './images/tic-tac-toe.png';
import './App.css';
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='App-title'>
          TRES EN RAYA
        </p>
      </header>
      <Board />
    </div>
  );
}

export default App;
