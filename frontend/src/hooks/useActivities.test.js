import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useActivities } from './useActivities.js';

describe('useActivities', () => {
  it('initialises with an empty list', () => {
    const { result } = renderHook(() => useActivities());
    expect(result.current.activities).toEqual([]);
  });

  it('addActivity creates an entry with id, description, timestamp, createdAt', () => {
    const { result } = renderHook(() => useActivities());
    act(() => { result.current.addActivity({ description: 'Wrote tests', timestamp: '2024-07-04T10:00' }); });
    expect(result.current.activities).toHaveLength(1);
    const entry = result.current.activities[0];
    expect(entry.id).toBeTruthy();
    expect(entry.description).toBe('Wrote tests');
    expect(entry.timestamp).toBe('2024-07-04T10:00');
    expect(entry.createdAt).toBeTruthy();
  });

  it('addActivity trims whitespace from description', () => {
    const { result } = renderHook(() => useActivities());
    act(() => { result.current.addActivity({ description: '  Stand-up  ', timestamp: '2024-07-04T09:00' }); });
    expect(result.current.activities[0].description).toBe('Stand-up');
  });

  it('addActivity prepends new entries (newest first)', () => {
    const { result } = renderHook(() => useActivities());
    act(() => result.current.addActivity({ description: 'First', timestamp: '2024-07-04T08:00' }));
    act(() => result.current.addActivity({ description: 'Second', timestamp: '2024-07-04T09:00' }));
    expect(result.current.activities[0].description).toBe('Second');
    expect(result.current.activities[1].description).toBe('First');
  });

  it('updateActivity updates the correct entry', () => {
    const { result } = renderHook(() => useActivities());
    act(() => result.current.addActivity({ description: 'Old desc', timestamp: '2024-07-04T08:00' }));
    const id = result.current.activities[0].id;
    act(() => result.current.updateActivity(id, { description: 'New desc', timestamp: '2024-07-04T09:00' }));
    const updated = result.current.activities.find((a) => a.id === id);
    expect(updated.description).toBe('New desc');
  });

  it('updateActivity does not affect other entries', () => {
    const { result } = renderHook(() => useActivities());
    act(() => result.current.addActivity({ description: 'A', timestamp: '2024-07-04T08:00' }));
    act(() => result.current.addActivity({ description: 'B', timestamp: '2024-07-04T09:00' }));
    const idA = result.current.activities.find((a) => a.description === 'A').id;
    act(() => result.current.updateActivity(idA, { description: 'A-updated', timestamp: '2024-07-04T08:00' }));
    const unchanged = result.current.activities.find((a) => a.description === 'B');
    expect(unchanged).toBeTruthy();
  });

  it('removeActivity removes the correct entry', () => {
    const { result } = renderHook(() => useActivities());
    act(() => result.current.addActivity({ description: 'Keep me', timestamp: '2024-07-04T08:00' }));
    act(() => result.current.addActivity({ description: 'Delete me', timestamp: '2024-07-04T09:00' }));
    const deleteId = result.current.activities.find((a) => a.description === 'Delete me').id;
    act(() => result.current.removeActivity(deleteId));
    expect(result.current.activities).toHaveLength(1);
    expect(result.current.activities[0].description).toBe('Keep me');
  });

  it('removeActivity with unknown id does nothing', () => {
    const { result } = renderHook(() => useActivities());
    act(() => result.current.addActivity({ description: 'Stays', timestamp: '2024-07-04T08:00' }));
    act(() => result.current.removeActivity('non-existent-id'));
    expect(result.current.activities).toHaveLength(1);
  });
});
