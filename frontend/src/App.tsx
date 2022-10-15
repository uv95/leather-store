import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Router from './components/Router';

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Header />
        <Router />
        <Footer />
      </main>
    </BrowserRouter>
  );
};

export default App;
