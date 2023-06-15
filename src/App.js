import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './pages/Header';
import { Longitudinal } from './pages/Longitudinal';
import { Traverse } from './pages/Traverse';
import { Loads } from './pages/Loads';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Longitudinal/>}/>
        <Route path='/Traverse' element={<Traverse/>}/>
        <Route path='/loads' element={<Loads/>}/>
      </Routes>
    </div>
  );
}

export default App;
