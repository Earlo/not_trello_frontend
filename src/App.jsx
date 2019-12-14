import React from 'react';

import ColumnGroup from './components/columnGroup';
import Sidebar from './components/sidebar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Sidebar />
        <ColumnGroup />
      </header>
    </div>
  );
}

export default App;
