// ── TELA DE DETALHES DE TREINOS ─────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Animated, ActivityIndicator, StatusBar, TouchableOpacity, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { api } from '../../utils/api';
import { WorkoutContext } from '../components/WorkoutProvider'; 

const TreinoDetalhes = ({ navigation }) => {
  const route = useRoute();
  const { treino } = route.params;
  const context = useContext(WorkoutContext);
  const updateCompletedWorkouts = context?.updateCompletedWorkouts;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const insets = useSafeAreaInsets();
  const [completedExercises, setCompletedExercises] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!treino) {
        setError(true);
      }
      setLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const toggleExerciseCompleted = (exerciseId) => {
    setCompletedExercises(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  const exercicios = treino?.exercicios ?? [];

  const handleCompleteWorkout = async () => {
    const today = new Date().toISOString().split('T')[0];
    
    try {
      // Atualiza o estado global (calendário)
      if (updateCompletedWorkouts) {
        updateCompletedWorkouts(today);
      }

      // Envia para o backend
      const body = {
        cd_fk_aluno: treino.cd_fk_aluno,
        cd_fk_treino: treino.id || null,
        dt_treino_realizado: today,
        cd_fk_peso: null,
        ds_comentarios: `Treino concluído em ${formatTime(seconds)}`
      };

      const res = await fetch(`${api}/historicos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error('Falha no servidor');

      setIsTimerRunning(false);
      setIsCompleted(true);
      Alert.alert('Treino Concluído!', `Tempo total: ${formatTime(seconds)}`);
      
    } catch (e) {
      Alert.alert('Erro ao concluir treino', e.message);
    }
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const MetaInfoItem = ({ icon, title, value }) => (
    <View style={styles.metaItem}>
      <View style={styles.metaIconContainer}>
        <Ionicons name={icon} size={20} color="#FFFFFF" />
      </View>
      <View>
        <Text style={styles.metaTitle}>{title}</Text>
        <Text style={styles.metaValue}>{value}</Text>
      </View>
    </View>
  );

  const ExerciseCard = ({ exercise, index }) => (
    <View style={[
      styles.exerciseCard,
      completedExercises[exercise.id] && styles.completedExercise
    ]}>
      <View style={styles.exerciseNumberContainer}>
        <Text style={styles.exerciseNumber}>{index + 1}</Text>
      </View>
      <View style={styles.exerciseContent}>
        <Text style={styles.exerciseName}>{exercise.nome}</Text>
        <View style={styles.exerciseDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="repeat" size={16} color="#8A0B36" />
            <Text style={styles.detailText}>3x {exercise.series || 12}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={16} color="#8A0B36" />
            <Text style={styles.detailText}>{exercise.descanso || '60s'}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity 
        onPress={() => toggleExerciseCompleted(exercise.id)}
        style={styles.checkbox}
      >
        <Ionicons 
          name={completedExercises[exercise.id] ? "checkbox" : "square-outline"} 
          size={24} 
          color={completedExercises[exercise.id] ? "#C70039" : "#555"} 
        />
      </TouchableOpacity>
    </View>
  );

  const SectionTitle = ({ children }) => (
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{children}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C70039" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={50} color="#C70039" />
        <Text style={styles.errorText}>Erro ao carregar o treino</Text>
      </SafeAreaView>
    );
  }

  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      
      {/* Header */}
      <LinearGradient
        colors={['#0A0A0A', '#0A0A0A']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="#8A0B36" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{treino.nm_treino}</Text>
      </LinearGradient>

      {/* Conteúdo principal */}
      <Animated.ScrollView
        style={{ opacity: fadeAnim }}
        contentContainerStyle={[styles.contentContainer, {
          paddingBottom: insets.bottom + 120
        }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.metaContainer}>
          <MetaInfoItem
            icon="calendar"
            title="Data do Treino"
            value={treino.dataFormatada}
          />
          <MetaInfoItem
            icon="time"
            title="Dia da Semana"
            value={treino.diaSemana}
          />
        </View>

        <SectionTitle>Objetivo Principal</SectionTitle>
        <View style={styles.objectiveContainer}>
          <Text style={styles.objectiveText}>{treino.ds_objetivo}</Text>
        </View>
        
        {treino.ds_observacao && (
  <>
    <SectionTitle>Observação</SectionTitle>
    <View style={styles.objectiveContainer}>
      <Text style={styles.objectiveText}>{treino.ds_observacao}</Text>
    </View>
  </>
)}

<SectionTitle>Intensidade do Treino</SectionTitle>
<View style={styles.objectiveContainer}>
  <Text style={styles.objectiveText}>
    {treino.qtd_carga === 'leve' && 'Leve'}
    {treino.qtd_carga === 'intermediaria' && 'Intermediária'}
    {treino.qtd_carga === 'pesada' && 'Pesada'}
    {!['leve', 'intermediaria', 'pesada'].includes(treino.qtd_carga) && 'Não especificada'}
  </Text>
</View>
        <SectionTitle>Exercícios ({exercicios.length})</SectionTitle>

        {exercicios.map((exercise, index) => (
          <ExerciseCard
            key={`exercise-${exercise.id}-${index}`}
            exercise={exercise}
            index={index}
          />
        ))}

      </Animated.ScrollView>
      
      {/* Footer */}
      <LinearGradient
        colors={['#0A0A0A', '#1A1A1A']}
        style={[styles.footer, {
          paddingBottom: insets.bottom + 16,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: '#820917'
        }]}
      >
        <View style={styles.timerContainer}>
          <Ionicons name="time" size={24} color="#8A0B36" />
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        </View>
        
        <View style={styles.buttonGroup}>
          {!isCompleted && (
            <TouchableOpacity
              style={[
                styles.controlButton,
                isTimerRunning ? styles.stopButton : styles.startButton
              ]}
              onPress={toggleTimer}
            >
              <Ionicons 
                name={isTimerRunning ? "stop" : "play"} 
                size={24} 
                color="#FFF" 
              />
              <Text style={styles.buttonText}>
                {isTimerRunning ? 'PARAR' : 'INICIAR'}
              </Text>
            </TouchableOpacity>
          )}

          {!isTimerRunning && seconds > 0 && !isCompleted && (
            <TouchableOpacity
              style={[styles.controlButton, styles.completeButton]}
              onPress={handleCompleteWorkout}
            >
              <Ionicons name="checkmark-done" size={24} color="#FFF" />
              <Text style={styles.buttonText}>CONCLUIR</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

TreinoDetalhes.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      treino: PropTypes.shape({
        id: PropTypes.string.isRequired,
        nm_treino: PropTypes.string.isRequired,
        diaSemana: PropTypes.string.isRequired,
        ds_objetivo: PropTypes.string.isRequired,
        ds_observacao: PropTypes.string.isRequired,
        qtd_carga: PropTypes.string.isRequired,
        dataFormatada: PropTypes.string.isRequired,
        exercicios: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            nome: PropTypes.string.isRequired,
          })
        ).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#0A0A0A',
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: '#FF5C5C',
    fontWeight: '500',
  },
  contentContainer: {
    padding: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  metaIconContainer: {
    marginRight: 10,
    backgroundColor: '#8A0B36',
    borderRadius: 20,
    padding: 6,
  },
  metaTitle: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  metaValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sectionTitleContainer: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8A0B36',
  },
  objectiveContainer: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  objectiveText: {
    color: '#DDDDDD',
    fontSize: 15,
    lineHeight: 22,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  completedExercise: {
    backgroundColor: '#263238',
    opacity: 0.6,
  },
  exerciseNumberContainer: {
    backgroundColor: '#8A0B36',
    borderRadius: 50,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseNumber: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  exerciseDetails: {
    flexDirection: 'row',
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    color: '#CCCCCC',
    fontSize: 13,
  },
  checkbox: {
    paddingHorizontal: 6,
  },
  footer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingVertical: 14,
  backgroundColor: '#1A1A1A',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: -2 },
  shadowRadius: 6,
  elevation: 6,
},
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timerText: {
    fontSize: 18,
    color: '#FFFF',
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#5E0825',
  },
  completeButton: {
    backgroundColor: '#8A0B36',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});


export default TreinoDetalhes;