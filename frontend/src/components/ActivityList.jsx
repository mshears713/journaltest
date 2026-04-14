import React from 'react';
import ActivityItem from './ActivityItem.jsx';
import './ActivityList.css';

export default function ActivityList({ activities, onUpdate, onDelete, onFeedback }) {
  if (activities.length === 0) {
    return (
      <div className="activity-list__empty" aria-live="polite">
        <span className="activity-list__empty-icon" aria-hidden="true">📋</span>
        <p>No activities logged yet.</p>
        <p className="activity-list__empty-sub">Use the form above to add your first entry.</p>
      </div>
    );
  }

  return (
    <section className="activity-list" aria-label="Logged activities">
      <header className="activity-list__header">
        <h2 className="activity-list__title">Today's Activities</h2>
        <span className="activity-list__count">
          {activities.length} {activities.length === 1 ? 'entry' : 'entries'}
        </span>
      </header>
      <ul className="activity-list__items" aria-live="polite">
        {activities.map((entry) => (
          <ActivityItem
            key={entry.id}
            entry={entry}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onFeedback={onFeedback}
          />
        ))}
      </ul>
    </section>
  );
}
