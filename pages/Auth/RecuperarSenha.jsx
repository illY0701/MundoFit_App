import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { api } from '../utils/api';

const RecuperarSenha = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecovery = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, informe seu e-mail');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Erro', 'Por favor, informe um e-mail válido');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${api}/alunos/recuperar-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await response.json();
      if (response.ok) {
        navigation.navigate('RedefinirSenha', {
          email: email.trim().toLowerCase(),
          alunoId: data.alunoId,
        });
      } else {
        Alert.alert('Erro', data.mensagem || 'Falha ao enviar código');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#8A0B36', '#5E0825']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>RECUPERAR SENHA</Text>

        <TextInput
          placeholder="Digite seu e-mail"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="rgba(255,255,255,0.6)"
          autoCapitalize="none"
          keyboardType="email-address"
          autoFocus
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRecovery}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#8A0B36" />
          ) : (
            <Text style={styles.buttonText}>CONTINUAR</Text>
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
    marginTop: 20,
    marginBottom: 30,
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

export default RecuperarSenha;
