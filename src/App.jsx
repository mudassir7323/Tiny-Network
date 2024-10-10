import React from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      {/* The Outlet will render the matching child route */}
        <Outlet />
    </div>
  );
};

export default App;
