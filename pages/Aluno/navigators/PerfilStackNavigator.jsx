// ── WORKOUT PROVIDER ─────────────────────────────────────────────────────────

// Navegador interno para a aba de Perfil do aluno.
// Permite navegar entre a tela principal de perfil e as perguntas frequentes.
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PerfilScreen from '../screens/PerfilScreen';
import PerguntasFrequentesScreen from '../screens/PerguntasFrequentesScreen';

const PerfilStack = createStackNavigator();

const PerfilStackNavigator = ({ route }) => (
  <PerfilStack.Navigator screenOptions={{ headerShown: false }}>
    <PerfilStack.Screen name="PerfilMain" component={PerfilScreen} initialParams={route.params} />
    <PerfilStack.Screen name="PerguntasFrequentes" component={PerguntasFrequentesScreen} />
  </PerfilStack.Navigator>
);

export default PerfilStackNavigator;
