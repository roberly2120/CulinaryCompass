import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Compass from './components/Compass';
import MyRecipes from './components/MyRecipes';
import About from './components/About';
import { AppProvider } from './state/context';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/compass' element={<Compass />} />
          <Route path='/my-recipes' element={<MyRecipes />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
