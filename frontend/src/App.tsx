import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountsDashboardPage from './pages/AccountsDashboardPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/*
            Define a route for the root path ('/') that renders the AccountsDashboardPage.
            In a larger application, you might have multiple routes for different sections
            (e.g., /settings, /transactions, etc.).
          */}
          <Route path="/" element={<AccountsDashboardPage />} />

          {/*
            You can add more routes here for other pages as your application grows.
            For example:
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          */}

          {/*
            Optionally, add a catch-all route for 404 Not Found pages.
            <Route path="*" element={<NotFoundPage />} />
          */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;