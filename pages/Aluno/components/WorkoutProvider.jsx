// ── WORKOUT PROVIDER ─────────────────────────────────────────────────────────
// contexto global de treinos
import React, { createContext, useState, useContext } from 'react';

export const WorkoutContext = createContext();

const WorkoutProvider = ({ children }) => {
  const [completedWorkouts, setCompletedWorkouts] = useState({});

  const updateCompletedWorkouts = (updates) => {
    setCompletedWorkouts((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <WorkoutContext.Provider value={{ completedWorkouts, updateCompletedWorkouts }}>
      {children}
    </WorkoutContext.Provider>
  );
};

// Exportando o hook para usar o contexto em outros componentes
export const useWorkoutContext = () => useContext(WorkoutContext);

export default WorkoutProvider;
