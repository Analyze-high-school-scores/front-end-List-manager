import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import CRUDMain from './components/CRUD/CRUDMain';
import Create from './components/CRUD/Create';
import Read from './components/CRUD/Read';
import Update from './components/CRUD/Update';
import Delete from './components/CRUD/Delete';
import History from './components/CRUD/History';

function AppContent() {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/');
  const navigateToCreate = () => navigate('/crud/create');
  const navigateToRead = () => navigate('/crud/read');
  const navigateToUpdate = () => navigate('/crud/update');
  const navigateToDelete = () => navigate('/crud/delete');
  const navigateToHistory = () => navigate('/crud/history');
  const navigateBack = () => navigate('/crud');

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/crud"
        element={
          <CRUDMain
            navigateToCreate={navigateToCreate}
            navigateToRead={navigateToRead}
            navigateToUpdate={navigateToUpdate}
            navigateToDelete={navigateToDelete}
            navigateToHistory={navigateToHistory}
            navigateToHome={navigateToHome}
          />
        }
      />
      <Route
        path="/crud/create"
        element={<Create navigateBack={navigateBack} navigateHome={navigateToHome} />}
      />
      <Route
        path="/crud/read"
        element={<Read navigateBack={navigateBack} navigateHome={navigateToHome} />}
      />
      <Route
        path="/crud/update"
        element={<Update navigateBack={navigateBack} navigateHome={navigateToHome} />}
      />
      <Route
        path="/crud/delete"
        element={<Delete navigateBack={navigateBack} navigateHome={navigateToHome} />}
      />
      <Route
        path="/crud/history"
        element={<History navigateBack={navigateBack} navigateHome={navigateToHome} />}
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App; 