import { useReducer, useCallback } from 'react';

const ADD    = 'ADD';
const UPDATE = 'UPDATE';
const REMOVE = 'REMOVE';

function activitiesReducer(state, action) {
  switch (action.type) {
    case ADD:
      return [action.entry, ...state];
    case UPDATE:
      return state.map((entry) =>
        entry.id === action.id ? { ...entry, ...action.patch } : entry
      );
    case REMOVE:
      return state.filter((entry) => entry.id !== action.id);
    default:
      return state;
  }
}

export function useActivities() {
  const [activities, dispatch] = useReducer(activitiesReducer, []);

  const addActivity = useCallback(({ description, timestamp }) => {
    const entry = {
      id: crypto.randomUUID(),
      description: description.trim(),
      timestamp,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: ADD, entry });
    return entry;
  }, []);

  const updateActivity = useCallback((id, patch) => {
    dispatch({
      type: UPDATE,
      id,
      patch: {
        description: patch.description?.trim(),
        timestamp: patch.timestamp,
      },
    });
  }, []);

  const removeActivity = useCallback((id) => {
    dispatch({ type: REMOVE, id });
  }, []);

  return { activities, addActivity, updateActivity, removeActivity };
}
