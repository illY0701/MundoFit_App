// ── WORKOUT PROVIDER ─────────────────────────────────────────────────────────

// Navegador interno para a aba de Treinos.
// Permite navegar da lista de treinos para os detalhes de um treino específico.
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TreinoScreen from '../screens/TreinoScreen';
import TreinoDetalhes from '../screens/TreinoDetalhes';

const TreinoStack = createStackNavigator();

const TreinoStackNavigator = ({ route }) => (
  <TreinoStack.Navigator screenOptions={{ headerShown: false }}>
    <TreinoStack.Screen name="TreinoList" component={TreinoScreen} initialParams={route.params} />
    <TreinoStack.Screen name="TreinoDetalhes" component={TreinoDetalhes} />
  </TreinoStack.Navigator>
);

export default TreinoStackNavigator;
