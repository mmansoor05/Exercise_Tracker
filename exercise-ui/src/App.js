// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components, styles, media
import Navigation from './components/Nav';
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import CreateExercise from './pages/CreateExercise';
import EditExercise from './pages/EditExercise';

function App() {  

  const [exerciseToEdit, setExerciseToEdit] = useState([]);
  return (
    
      <Router>
      <header>
            <h1>Exercise Tracker</h1>
            <p >Fullstack MERN App.</p>
          </header>

          <Navigation />

          <main>
            <Route path="/" exact>
              <HomePage setExerciseToEdit={setExerciseToEdit} />
            </Route>

            <Route path="/create">
              <CreateExercise />
            </Route>
            
            <Route path="/edit-exercise">
              <EditExercise exerciseToEdit={exerciseToEdit} />
            </Route>
          </main>

        <footer>
          <cite>&copy; 2022 Mahnoor Mansoor</cite>
        </footer>
      </Router>
   
  );
}

export default App;
