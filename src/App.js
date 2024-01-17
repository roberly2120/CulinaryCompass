import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Compass from './components/Compass';
import MyRecipes from './components/MyRecipes';
import About from './components/About';
import LandingPage from './components/LandingPage';
import Logout from './components/Logout';
import TestFirebase from './components/test_components/TestFirebase';
import SavedRecipe from './components/SavedRecipe';
import { AppProvider } from './state/context';
import { Routes, Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const ProtectedRoute = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div>Loading...</div>,
  });
  return <Component />;
}

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<ProtectedRoute component={Home} />} />
          <Route path='/compass' element={<ProtectedRoute component={Compass} />} />
          <Route path='/my-recipes' element={<ProtectedRoute component={MyRecipes} />} />
          <Route path='/about' element={<ProtectedRoute component={About} />} />
          <Route path='/logout' element={<ProtectedRoute component={Logout} />} />
          <Route path='firebase-test' element={<ProtectedRoute component={TestFirebase}/>} />
          <Route path='/saved-recipe/:id' element={<ProtectedRoute component={SavedRecipe}/>} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
