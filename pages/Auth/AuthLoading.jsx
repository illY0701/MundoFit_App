import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthLoading = ({ navigation }) => {
  useEffect(() => {
    const verificarSessao = async () => {
      try {
        const usuario = await AsyncStorage.getItem('@usuario');

        if (usuario) {
          const data = JSON.parse(usuario);

          switch (data.tipoUsuario) {
            case 'professor':
              navigation.replace('ProfessorPage', { usuario: data });
              break;
            case 'aluno':
              navigation.replace('AlunoPage', { usuario: data });
              break;
            default:
              navigation.replace('Principal'); // tipo inválido, volta pro início
          }
        } else {
          navigation.replace('Principal'); // <- Vai pra tela inicial, não mais Login
        }
      } catch (error) {
        navigation.replace('Principal'); // em caso de erro, volta para tela inicial
      }
    };

    verificarSessao();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#8A0B36" />
    </View>
  );
};

export default AuthLoading;
