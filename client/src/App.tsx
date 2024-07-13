import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationStack from './components/NavigationStack';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <NavigationStack />
      <Footer/>

    </Router>

  );
}

export default App;
