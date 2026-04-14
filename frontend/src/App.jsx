import React, { useState, useCallback } from 'react';
import ActivityEntryForm from './components/ActivityEntryForm.jsx';
import ActivityList from './components/ActivityList.jsx';
import Toast from './components/Toast.jsx';
import { useActivities } from './hooks/useActivities.js';
import './App.css';

export default function App() {
  const { activities, addActivity, updateActivity, removeActivity } = useActivities();
  const [toast, setToast] = useState(null);

  const showFeedback = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const handleAddActivity = (fields) => {
    addActivity(fields);
    showFeedback('Activity logged!', 'success');
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <span className="app-header__logo" aria-hidden="true">📅</span>
          <div>
            <h1 className="app-header__title">Daily Activity Logger</h1>
            <p className="app-header__subtitle">
              Log your day — entries are stored in memory for this session only.
            </p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <ActivityEntryForm onSubmit={handleAddActivity} />
        <ActivityList
          activities={activities}
          onUpdate={updateActivity}
          onDelete={removeActivity}
          onFeedback={showFeedback}
        />
      </main>

      <footer className="app-footer">
        <p>Data is not persisted — refreshing will clear all entries.</p>
      </footer>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
