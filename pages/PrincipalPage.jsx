import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { api } from './utils/api';
import * as Network from 'expo-network';

const { width, height } = Dimensions.get('window');

const PrincipalPage = ({ navigation }) => {
  const [connectionStatus, setConnectionStatus] = useState('Verificando conexão...');
  
  // Referências para animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoPosition = useRef(new Animated.Value(-50)).current;
  const headerPosition = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(0)).current;
  const buttonPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const checkNetwork = async () => {
      const { ipAddress } = await Network.getIpAddressAsync();
      console.log("IP do Celular:", ipAddress);
    };

    const checkApiConnection = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
  
        const response = await fetch(`${api}/health`, {
          signal: controller.signal
        });
  
        clearTimeout(timeoutId);
  
        setConnectionStatus(response.ok ? '✅ Conectado' : '❌ Erro na API');
      } catch (error) {
        setConnectionStatus(`❌ Falha: ${error.message}`);
      }
    };
  
    checkApiConnection();
    checkNetwork();
    
    // Sequência de animações
    Animated.sequence([
      // Animação do logo: desce e escala
      Animated.parallel([
        Animated.timing(logoPosition, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.back(1.7)),
          useNativeDriver: true
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.elastic(1)),
          useNativeDriver: true
        })
      ]),
      
      // Animação do cabeçalho: sobe e fade-in
      Animated.parallel([
        Animated.timing(headerPosition, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true
        })
      ]),
      
      // Animação do botão: escala e pulso
      Animated.parallel([
        Animated.spring(buttonScale, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(buttonPulse, {
              toValue: 1.03,
              duration: 800,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true
            }),
            Animated.timing(buttonPulse, {
              toValue: 1,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true
            })
          ])
        )
      ])
    ]).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient 
        colors={['#8A0B36', '#5E0825']} 
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Logo animada */}
        <Animated.View style={{ 
          transform: [
            { translateY: logoPosition },
            { scale: logoScale }
          ] 
        }}>
          <Image 
            source={require('../assets/icon copy.png')} 
            style={styles.logo}
            resizeMode="contain" 
          />
        </Animated.View>

        {/* Cabeçalho animado */}
        <Animated.View style={[styles.header, { 
          opacity: fadeAnim,
          transform: [{ translateY: headerPosition }]
        }]}>
          <Text style={styles.title}>MUNDOFIT</Text>
          <Text style={styles.tagline}>Transforme seu estilo de vida</Text>
          
          {/* Removido o status de conexão da interface */}
          <View style={styles.divider} />
        </Animated.View>

        {/* Botões animados */}
        <Animated.View style={[styles.buttonContainer, {
          opacity: fadeAnim,
          transform: [
            { scale: buttonScale },
            { scale: buttonPulse }
          ]
        }]}>
          <TouchableOpacity 
            style={[styles.button, styles.mainButton]} 
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>ENTRAR</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.registerLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 120,
    height: 120,
    tintColor: '#FFFFFF',
    marginBottom: 10,
  },
  header: {
    alignItems: 'center',
    marginVertical: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
    letterSpacing: 0.5,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    width: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: 15,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 30,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  mainButton: {
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#8A0B36',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  registerLink: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    letterSpacing: 0.5,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 20,
  },
  // Removido o style connectionStatusText pois não será mais usado
});

export default PrincipalPage;