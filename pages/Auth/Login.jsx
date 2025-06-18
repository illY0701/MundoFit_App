import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { api } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Novas animações (únicas adições)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animação de entrada suave
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  // SEU CÓDIGO ORIGINAL (100% preservado)
  const handleLogin = async () => {
    try {
      const response = await fetch(`${api}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      console.log('Status:', response.status);
      const data = await response.json();
      console.log('Resposta:', data);

      if (response.ok) {
        await AsyncStorage.setItem('@usuario', JSON.stringify(data));
        switch(data.tipoUsuario) {
          case 'admin':
            navigation.navigate('AdminPage', { 
              usuario: { id: data.id, nome: data.nome }
            });
            break;
          case 'professor':
            navigation.navigate('ProfessorPage', { 
              usuario: {
                id: data.id,
                nm_professor: data.nome,
                ds_especialidade: data.especialidade
              }
            });
            break;
          case 'aluno':
            navigation.navigate('AlunoPage', { 
              usuario: {
                id: data.id,
                nm_aluno: data.nm_aluno,
                cd_peso: data.peso,
                cd_altura: data.altura
              }
            });
            break;
          default:
            Alert.alert('Erro', 'Tipo de usuário desconhecido');
        }
      } else {
        Alert.alert('Erro', data.mensagem || 'Credenciais inválidas');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar com o servidor');
    }
  };

  
  return (
    <LinearGradient 
      colors={['#8A0B36', '#5E0825']} 
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animated.View style={[styles.content, { 
        opacity: fadeAnim,
        transform: [{ translateY: slideUpAnim }] 
      }]}>
        <Text style={styles.title}>ACESSAR CONTA</Text>
        <Text style={styles.subtitle}>Entre com suas credenciais</Text>
        
        <View style={styles.divider} />

        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="E-mail" 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail}
            placeholderTextColor="rgba(255,255,255,0.6)"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Senha" 
            style={styles.input} 
            value={senha} 
            onChangeText={setSenha}
            placeholderTextColor="rgba(255,255,255,0.6)"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <View style={[styles.eyeIcon, !showPassword && styles.eyeIconClosed]}>
              <View style={styles.eyeLine}></View>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.forgotLink}
          onPress={() => navigation.navigate('RedefinirSenha')}
        >
          <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <Animated.View style={{ 
          transform: [{ scale: buttonScale }], 
          width: '100%'
        }}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
          >
            <Text style={styles.buttonText}>ENTRAR</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.footerLink}>Cadastre-se agora</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

// SEUS ESTILOS ORIGINAIS (100% preservados)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    width: width * 0.85,
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
  },
  divider: {
    height: 2,
    width: 80,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 20,
    color: '#FFF',
    fontSize: 16,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#8A0B36',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 12,
    padding: 5,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconClosed: {
    borderColor: 'rgba(255,255,255,0.4)',
  },
  eyeLine: {
    width: 12,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.7)',
    transform: [{ rotate: '-45deg' }],
    position: 'absolute',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  footerLink: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    textDecorationLine: 'underline',
    letterSpacing: 0.5,
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#FFC1C1',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default Login;