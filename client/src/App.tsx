import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationStack from './components/NavigationStack';

function App() {
  return (
    <Router>
      <NavigationStack />
    </Router>
  );
}

export default App;
