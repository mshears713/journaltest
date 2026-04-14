import React, { useState } from 'react';
import { formatTimestamp } from '../utils/validation.js';
import ActivityEntryForm from './ActivityEntryForm.jsx';
import './ActivityItem.css';

export default function ActivityItem({ entry, onUpdate, onDelete, onFeedback }) {
  const [editMode, setEditMode]           = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleEditSubmit = (fields) => {
    onUpdate(entry.id, fields);
    setEditMode(false);
    onFeedback?.('Activity updated.', 'success');
  };

  const handleDeleteConfirm = () => {
    onDelete(entry.id);
    onFeedback?.('Activity deleted.', 'success');
  };

  if (editMode) {
    return (
      <li className="activity-item activity-item--editing">
        <ActivityEntryForm
          initialValues={{ description: entry.description, timestamp: entry.timestamp }}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditMode(false)}
          isEditing
        />
      </li>
    );
  }

  return (
    <li className="activity-item" data-testid="activity-item">
      <div className="activity-item__body">
        <p className="activity-item__description">{entry.description}</p>
        <time className="activity-item__timestamp" dateTime={entry.timestamp} title={entry.timestamp}>
          {formatTimestamp(entry.timestamp)}
        </time>
      </div>
      <div className="activity-item__controls">
        <button className="btn btn--icon" aria-label="Edit activity" onClick={() => { setConfirmDelete(false); setEditMode(true); }} title="Edit">✏️</button>
        {confirmDelete ? (
          <span className="activity-item__confirm">
            <span className="activity-item__confirm-text">Delete?</span>
            <button className="btn btn--danger btn--sm" onClick={handleDeleteConfirm} aria-label="Confirm delete">Yes</button>
            <button className="btn btn--ghost btn--sm" onClick={() => setConfirmDelete(false)} aria-label="Cancel delete">No</button>
          </span>
        ) : (
          <button className="btn btn--icon" aria-label="Delete activity" onClick={() => setConfirmDelete(true)} title="Delete">🗑️</button>
        )}
      </div>
    </li>
  );
}
