import React, { useState, useEffect } from 'react';
import { validateActivity, nowDatetimeLocal } from '../utils/validation.js';
import './ActivityEntryForm.css';

export default function ActivityEntryForm({
  onSubmit,
  initialValues = null,
  onCancel,
  isEditing = false,
}) {
  const [description, setDescription] = useState('');
  const [timestamp, setTimestamp]     = useState(nowDatetimeLocal());
  const [errors, setErrors]           = useState({});
  const [submitting, setSubmitting]   = useState(false);

  useEffect(() => {
    if (initialValues) {
      setDescription(initialValues.description ?? '');
      setTimestamp(initialValues.timestamp ?? nowDatetimeLocal());
      setErrors({});
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = { description, timestamp };
    const { valid, errors: validationErrors } = validateActivity(fields);

    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    onSubmit(fields);

    if (!isEditing) {
      setDescription('');
      setTimestamp(nowDatetimeLocal());
    }
    setErrors({});
    setSubmitting(false);
  };

  const handleCancel = () => {
    setErrors({});
    onCancel?.();
  };

  return (
    <form
      className="entry-form"
      onSubmit={handleSubmit}
      aria-label={isEditing ? 'Edit activity' : 'Log new activity'}
      noValidate
    >
      <h2 className="entry-form__title">
        {isEditing ? '✏️  Edit Activity' : '➕  Log an Activity'}
      </h2>

      <div className="entry-form__field">
        <label htmlFor="description" className="entry-form__label">
          Description <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="description"
          className={`entry-form__textarea${errors.description ? ' entry-form__textarea--error' : ''}`}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
          }}
          placeholder="What did you do?"
          rows={3}
          maxLength={500}
          aria-required="true"
          aria-describedby={errors.description ? 'description-error' : undefined}
        />
        {errors.description && (
          <span id="description-error" className="entry-form__error" role="alert">
            {errors.description}
          </span>
        )}
        <span className="entry-form__char-count">
          {description.length}/500
        </span>
      </div>

      <div className="entry-form__field">
        <label htmlFor="timestamp" className="entry-form__label">
          Date &amp; Time <span aria-hidden="true">*</span>
        </label>
        <input
          id="timestamp"
          type="datetime-local"
          className={`entry-form__input${errors.timestamp ? ' entry-form__input--error' : ''}`}
          value={timestamp}
          onChange={(e) => {
            setTimestamp(e.target.value);
            if (errors.timestamp) setErrors((prev) => ({ ...prev, timestamp: undefined }));
          }}
          aria-required="true"
          aria-describedby={errors.timestamp ? 'timestamp-error' : undefined}
        />
        {errors.timestamp && (
          <span id="timestamp-error" className="entry-form__error" role="alert">
            {errors.timestamp}
          </span>
        )}
      </div>

      <div className="entry-form__actions">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? 'Saving…' : isEditing ? 'Save Changes' : 'Add Activity'}
        </button>

        {isEditing && (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
