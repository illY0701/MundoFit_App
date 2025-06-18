import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Dimensions, 
  ScrollView,
  Animated,
  Easing,
  Modal 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import { api } from '../utils/api';

const { width } = Dimensions.get('window');

// Opções para os seletores
const weightOptions = Array.from({ length: 161 }, (_, i) => ({
  label: `${i + 40} kg`,
  value: (i + 40).toString()
}));

const heightOptions = Array.from({ length: 151 }, (_, i) => ({
  label: `${i + 100} cm`,
  value: (i + 100).toString()
}));

const genderOptions = [
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Feminino', value: 'Feminino' },
  { label: 'Outro', value: 'Outro' }
];

const Cadastro = ({ navigation }) => {
  const [nm_aluno, setNome] = useState('');
  const [email_aluno, setEmail] = useState('');
  const [cd_senha_al, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [cd_peso, setPeso] = useState('');
  const [cd_altura, setAltura] = useState('');
  const [genero, setGenero] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalAltura, setShowModalAltura] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const buttonScale = useState(new Animated.Value(1))[0];
  const buttonOpacity = useState(new Animated.Value(1))[0];
  const pickerAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(pickerAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.elastic(1)),
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(buttonScale, {
        toValue: 0.97,
        friction: 3,
        tension: 40,
        useNativeDriver: true
      }),
      Animated.timing(buttonOpacity, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true
      }),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  };

const handleCadastro = async () => {
  if (!nm_aluno || !email_aluno || !cd_senha_al || !confirmSenha || !cd_peso || !cd_altura || !genero) {
    Alert.alert('Erro', 'Preencha todos os campos');
    return;
  }

  if (cd_senha_al.length < 6) {
    Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres');
    return;
  }

  if (cd_senha_al !== confirmSenha) {
    Alert.alert('Erro', 'As senhas não coincidem');
    return;
  }

  try {
    const emailCheck = await fetch(`${api}/alunos/email-existe?email=${encodeURIComponent(email_aluno)}`);
    const emailData = await emailCheck.json();

    if (emailData.existe) {
      Alert.alert('Erro', 'Este e-mail já está cadastrado');
      return;
    }

    const response = await fetch(`${api}/alunos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nm_aluno,
        email_aluno,
        cd_senha_al,
        cd_peso: Number(cd_peso),
        cd_altura: Number(cd_altura),
        genero,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || 'Erro no cadastro');
    }

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    navigation.navigate('Login');

  } catch (error) {
    console.error('Erro no cadastro:', error);
    Alert.alert('Erro', error.message || 'Erro ao conectar com o servidor');
  }
};


  return (
    <LinearGradient 
      colors={['#8A0B36', '#5E0825']} 
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Animated.Text style={[styles.title, { 
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0]
              })
            }] 
          }]}>
            CRIAR CONTA
          </Animated.Text>
          
          <Animated.Text style={[styles.subtitle, {
            opacity: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })
          }]}>
            Preencha seus dados
          </Animated.Text>
          
          <Animated.View style={[styles.divider, {
            transform: [{
              scaleX: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
              })
            }]
          }]} />

          <Animated.View style={[styles.inputContainer, {
            transform: [{
              translateX: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0]
              })
            }]
          }]}>
            <TextInput
              placeholder="Nome completo"
              style={styles.input}
              value={nm_aluno}
              onChangeText={setNome}
              placeholderTextColor="rgba(255,255,255,0.6)"
              autoCapitalize="words"
            />
          </Animated.View>

          <Animated.View style={[styles.inputContainer, {
            transform: [{
              translateX: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0]
              })
            }]
          }]}>
            <TextInput
              placeholder="E-mail"
              style={styles.input}
              value={email_aluno}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="rgba(255,255,255,0.6)"
              autoCapitalize="none"
            />
          </Animated.View>

          <Animated.View style={[styles.inputContainer, {
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0]
              })
            }]
          }]}>
            <TextInput
              placeholder="Senha"
              style={styles.input}
              value={cd_senha_al}
              onChangeText={setSenha}
              secureTextEntry={!showPassword}
              placeholderTextColor="rgba(255,255,255,0.6)"
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Animated.View style={[styles.eyeIcon, !showPassword && styles.eyeIconClosed, {
                transform: [{
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1]
                  })
                }]
              }]}>
                <View style={styles.eyeLine}></View>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.inputContainer, {
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0]
              })
            }]
          }]}>
            <TextInput
              placeholder="Confirmar Senha"
              style={styles.input}
              value={confirmSenha}
              onChangeText={setConfirmSenha}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="rgba(255,255,255,0.6)"
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Animated.View style={[styles.eyeIcon, !showConfirmPassword && styles.eyeIconClosed, {
                transform: [{
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1]
                  })
                }]
              }]}>
                <View style={styles.eyeLine}></View>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.inputContainer, {
            opacity: fadeAnim,
            transform: [{
              translateX: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0]
              })
            }]
          }]}>
            <TextInput
              placeholder="Peso"
              style={styles.input}
              value={cd_peso}
              onChangeText={setPeso}
              placeholderTextColor="rgba(255,255,255,0.6)"
              autoCapitalize="none"
              keyboardType="numeric"
            />
          </Animated.View>

          {/* Seletor de Altura */}
<TouchableOpacity onPress={() => setShowModalAltura(true)} style={styles.inputContainer}>
  <Text style={{ color: cd_altura ? '#FFF' : 'rgba(255,255,255,0.6)' }}>
    {cd_altura ? `${cd_altura} cm` : 'Selecione sua altura'}
  </Text>
</TouchableOpacity>


<Modal visible={showModalAltura} transparent animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <ScrollView>
        {heightOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.modalOption}
            onPress={() => {
              setAltura(option.value);
              setShowModalAltura(false);
            }}
          >
            <Text style={styles.modalOptionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  </View>
</Modal>


<TouchableOpacity onPress={() => setShowModal(true)} style={styles.inputContainer}>
  <Text style={{ color: genero ? '#FFF' : 'rgba(255,255,255,0.6)' }}>
    {genero || 'Selecione seu gênero'}
  </Text>
</TouchableOpacity>

<Modal visible={showModal} transparent animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      {genderOptions.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.modalOption}
          onPress={() => {
            setGenero(option.value);
            setShowModal(false);
          }}
        >
          <Text style={styles.modalOptionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
</Modal>


          <Animated.View style={{ 
            transform: [{ scale: buttonScale }], 
            opacity: buttonOpacity,
            width: '100%'
          }}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleCadastro}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.9}
            >
              <Text style={styles.buttonText}>CADASTRAR</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.footer, {
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0]
              })
            }]
          }]}>
            <Text style={styles.footerText}>Já tem uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Faça login</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  inputAndroid: {
    fontSize: 16,
    color: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  placeholder: {
    color: 'rgba(255,255,255,0.6)',
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
  
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
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
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  input: {
    color: '#FFF',
    fontSize: 16,
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
    marginTop: 25,
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
  
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.7)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  backgroundColor: '#5E0825',
  borderRadius: 10,
  padding: 20,
  width: '80%',
  maxHeight: '60%',
},
modalOption: {
  paddingVertical: 15,
  borderBottomColor: '#8A0B36',
  borderBottomWidth: 1,
},
modalOptionText: {
  color: '#FFF',
  fontSize: 16,
  textAlign: 'center',
},


});

export default Cadastro;