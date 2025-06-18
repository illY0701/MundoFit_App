import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthLoading from './pages/Auth/AuthLoading'; // 🔑 novo!
import PrincipalPage from './pages/PrincipalPage';
import Login from './pages/Auth/Login';
import Cadastro from './pages/Auth/Cadastro';
import RecuperarSenha from './pages/Auth/RecuperarSenha';
import RedefinirSenha from './pages/Auth/RedefinirSenha';

import AlunoPage from './pages/Aluno/AlunoPage';
import ProfessorPage from './pages/Instrutor/ProfessorPage';
import TreinoDetalhes from './pages/Aluno/screens/TreinoDetalhes';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="AuthLoading" // 🔄 inicia com a verificação de sessão
      >
        <Stack.Screen name="AuthLoading" component={AuthLoading} />
        <Stack.Screen name="Principal" component={PrincipalPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
        <Stack.Screen name="RedefinirSenha" component={RedefinirSenha} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="AlunoPage" component={AlunoPage} />
        <Stack.Screen name="ProfessorPage" component={ProfessorPage} />
        <Stack.Screen name="TreinoDetalhes" component={TreinoDetalhes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
