import React from 'react';
import Routes from './routes'
import LoadingSpinerComponent from './components/LoadingSpinerComponent';

function App() {
  return (    
    <div className="App">
      <Routes />
      <LoadingSpinerComponent/>
    </div>
  );
}

export default App;
