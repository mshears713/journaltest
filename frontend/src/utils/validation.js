export function validateActivity(fields) {
  const errors = {};
  const desc = (fields.description || '').trim();
  if (!desc) {
    errors.description = 'Activity description is required.';
  } else if (desc.length > 500) {
    errors.description = 'Description must be 500 characters or fewer.';
  }
  const ts = (fields.timestamp || '').trim();
  if (!ts) {
    errors.timestamp = 'Timestamp is required.';
  } else if (isNaN(Date.parse(ts))) {
    errors.timestamp = 'Please provide a valid date and time.';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export function nowDatetimeLocal() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  const local = new Date(now.getTime() - offsetMs);
  return local.toISOString().slice(0, 16);
}

export function formatTimestamp(isoString) {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;
  return date.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });
}
