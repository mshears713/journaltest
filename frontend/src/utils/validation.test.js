import { describe, it, expect } from 'vitest';
import { validateActivity, formatTimestamp } from './validation.js';

describe('validateActivity', () => {
  const validFields = { description: 'Reviewed pull requests', timestamp: '2024-07-04T09:30' };

  it('returns valid=true for correct fields', () => {
    const { valid, errors } = validateActivity(validFields);
    expect(valid).toBe(true);
    expect(errors).toEqual({});
  });

  it('returns error when description is empty', () => {
    const { valid, errors } = validateActivity({ ...validFields, description: '' });
    expect(valid).toBe(false);
    expect(errors.description).toBeTruthy();
  });

  it('returns error when description is whitespace only', () => {
    const { valid, errors } = validateActivity({ ...validFields, description: '   ' });
    expect(valid).toBe(false);
    expect(errors.description).toBeTruthy();
  });

  it('returns error when description exceeds 500 chars', () => {
    const { valid, errors } = validateActivity({ ...validFields, description: 'a'.repeat(501) });
    expect(valid).toBe(false);
    expect(errors.description).toMatch(/500/);
  });

  it('accepts a description of exactly 500 chars', () => {
    const { valid } = validateActivity({ ...validFields, description: 'a'.repeat(500) });
    expect(valid).toBe(true);
  });

  it('returns error when timestamp is missing', () => {
    const { valid, errors } = validateActivity({ ...validFields, timestamp: '' });
    expect(valid).toBe(false);
    expect(errors.timestamp).toBeTruthy();
  });

  it('returns error for an invalid timestamp string', () => {
    const { valid, errors } = validateActivity({ ...validFields, timestamp: 'not-a-date' });
    expect(valid).toBe(false);
    expect(errors.timestamp).toBeTruthy();
  });

  it('returns multiple errors when both fields are invalid', () => {
    const { valid, errors } = validateActivity({ description: '', timestamp: '' });
    expect(valid).toBe(false);
    expect(errors.description).toBeTruthy();
    expect(errors.timestamp).toBeTruthy();
  });
});

describe('formatTimestamp', () => {
  it('returns a non-empty string for a valid ISO string', () => {
    const result = formatTimestamp('2024-07-04T09:30');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('returns the original string for an invalid date', () => {
    const result = formatTimestamp('not-a-date');
    expect(result).toBe('not-a-date');
  });
});
