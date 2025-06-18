// ── RAIZ DA ÁREA ALUNO ─────────────────────────────────────────────────────────

//renderiza  a navegação principal
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WorkoutProvider from './components/WorkoutProvider';
import AlunoTabNavigator from './navigators/AlunoTabNavigator';

export default function AlunoPage({ route }) {
  return (
    <SafeAreaProvider>
      <WorkoutProvider>
        <AlunoTabNavigator route={route} />
      </WorkoutProvider>
    </SafeAreaProvider>
  );
}
