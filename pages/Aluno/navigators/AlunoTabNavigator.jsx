// ── WORKOUT PROVIDER ─────────────────────────────────────────────────────────

// Navegador principal com abas para o perfil do aluno.
// Controla a navegação entre: Início, Treinos, Desempenho e Perfil.
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MainScreen from '../screens/MainScreen';
import TreinoStackNavigator from './TreinoStackNavigator';
import DesempenhoScreen from '../screens/DesempenhoScreen';
import PerfilStackNavigator from './PerfilStackNavigator';

const Tab = createBottomTabNavigator();

const AlunoTabNavigator = ({ route }) => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            'Início': 'home',
            'Treinos': 'barbell',
            'Desempenho': 'stats-chart',
            'Perfil': 'person',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#45051a',
        tabBarInactiveTintColor: '#FFC1C1',
        tabBarStyle: {
          backgroundColor: '#8A0B36',
          borderTopWidth: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Início">{(props) => <MainScreen {...props} route={route} />}</Tab.Screen>
      <Tab.Screen name="Treinos">{(props) => <TreinoStackNavigator {...props} route={route} />}</Tab.Screen>
      <Tab.Screen name="Desempenho">{(props) => <DesempenhoScreen {...props} route={route} />}</Tab.Screen>
      <Tab.Screen name="Perfil">{(props) => <PerfilStackNavigator {...props} route={route} />}</Tab.Screen>
    </Tab.Navigator>
  );
};

export default AlunoTabNavigator;
