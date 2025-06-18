import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { api } from '../utils/api';

const RedefinirSenha = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Informe seu e-mail');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Erro', 'E-mail inválido');
      return;
    }

    if (novaSenha.length < 6) {
      Alert.alert('Erro', 'Senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${api}/alunos/redefinir-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          novaSenha
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', data.mensagem || 'Erro ao redefinir senha');
      }

    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#8A0B36', '#5E0825']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>REDEFINIR SENHA</Text>

        <TextInput
          placeholder="Seu e-mail"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="rgba(255,255,255,0.6)"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Nova senha"
          style={styles.input}
          secureTextEntry
          value={novaSenha}
          onChangeText={setNovaSenha}
          placeholderTextColor="rgba(255,255,255,0.6)"
        />

        <TextInput
          placeholder="Confirmar nova senha"
          style={styles.input}
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          placeholderTextColor="rgba(255,255,255,0.6)"
        />

        <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#8A0B36" />
          ) : (
            <Text style={styles.buttonText}>REDEFINIR SENHA</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Voltar para o login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 20,
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  button: {
    backgroundColor: '#FFF',
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#8A0B36',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backText: {
    color: '#FFC1C1',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default RedefinirSenha;
