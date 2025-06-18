import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Alert, TouchableOpacity, ScrollView, BackHandler
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styles from '../styles';
import { api } from '../../utils/api';
import { useWorkoutContext } from '../components/WorkoutProvider';
import Calendar from '../components/Calendar';
import { Loading, Message } from '../components/Helpers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native';

function MainScreen({ route, navigation }) {
  const isFocused = useIsFocused();
  const alunoId = route.params.aluno?.id || route.params.usuario?.id;

  const [aluno, setAluno] = useState({});
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const insets = useSafeAreaInsets();

  const { completedWorkouts, updateCompletedWorkouts } = useWorkoutContext();

  const getCurrentWeek = (date) => {
    const days = [];
    const firstDay = new Date(date);
    firstDay.setDate(date.getDate() - date.getDay());
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(firstDay);
      d.setDate(firstDay.getDate() + i);
      days.push(d);
    }
    
    return days;
  };

useEffect(() => {
  const backAction = () => {
    return true;
  };

  if (isFocused) {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }
}, [isFocused]);


  useEffect(() => {
    setCurrentWeek(getCurrentWeek(currentDate));
  }, [currentDate]);

  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const goToPrevWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  const fetchAluno = async () => {
    if (!alunoId) return;

    try {
      const res = await fetch(`${api}/alunos/${alunoId}`);
      if (!res.ok) throw new Error('Erro ao buscar aluno');
      const data = await res.json();
      setAluno(data);

      const historicoRes = await fetch(`${api}/historicos?alunoId=${alunoId}`);
      if (!historicoRes.ok) return;

      const historico = await historicoRes.json();
      const realizados = {};

      historico.forEach(item => {
        if (item.dt_treino_realizado) {
          const date = item.dt_treino_realizado._seconds
            ? new Date(item.dt_treino_realizado._seconds * 1000)
            : new Date(item.dt_treino_realizado);
          const key = date.toISOString().split('T')[0];
          if (item.cd_fk_treino !== null) {
            realizados[key] = true;
          }
        }
      });

      updateCompletedWorkouts(realizados);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar dados do aluno');
    }
  };

  const fetchTreinos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/treinos?alunoId=${aluno.id}`);
      const treinosBrutos = await res.json();

      const treinosAgrupados = treinosBrutos.reduce((acc, cur) => {
        const key = cur.nm_treino + cur.nm_dia_semana;
        if (!acc[key]) {
          acc[key] = {
            id: cur.id,
            nm_treino: cur.nm_treino,
            diaSemana: cur.nm_dia_semana,
            ds_objetivo: cur.ds_objetivo,
            ds_observacao: cur.ds_observacao,
            qtd_carga: cur.qtd_carga,
            dt_treino: cur.dt_treino,
            dataFormatada: new Date(cur.dt_treino).toLocaleDateString('pt-BR'),
            cd_fk_aluno: cur.cd_fk_aluno,
            exercicios: []
          };
        }

        acc[key].exercicios.push({
          id: cur.cd_fk_exercicio || Date.now(),
          nome: cur.nm_fk_exercicio,
          series: cur.qt_series,
          repeticoes: cur.qt_repeticoes,
          descanso: cur.tmp_descanso
        });

        return acc;
      }, {});

      setTreinos(Object.values(treinosAgrupados));
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar treinos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused && alunoId) fetchAluno();
  }, [isFocused, alunoId]);

  useEffect(() => {
    if (aluno.id) fetchTreinos(); 
    else setLoading(false);
  }, [aluno.id]);

  const toggleDate = (key) => {
    updateCompletedWorkouts(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (loading) return <Loading />;
  if (!aluno.id) return <Message text="Aluno não identificado." />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Bem-vindo(a) <Text style={styles.userName}>{aluno.nm_aluno}</Text>
            </Text>
          </View>
        </View>

        <View>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>Calendário de Treinos</Text>
          </View>
          <Calendar
            week={currentWeek}
            selected={completedWorkouts}
            onToggle={toggleDate}
            completedWorkouts={completedWorkouts}
            onNextWeek={goToNextWeek}
            onPrevWeek={goToPrevWeek}
          />
        </View>

        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Treinos Ativos</Text>
          </View>

          {treinos.map((item) => (
            <View key={item.id.toString()} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.nm_treino}</Text>
                <Text style={styles.cardDate}>
                  {new Date(item.dt_treino).toLocaleDateString('pt-BR')}
                </Text>
              </View>

              <Text style={styles.cardText}>{item.ds_objetivo}</Text>

              <View style={styles.cardFooter}>
                <View style={styles.cardStatus} />
                <TouchableOpacity
                  style={styles.cardButton}
                  onPress={() => navigation.navigate('TreinoDetalhes', {
                    treino: item
                  })}
                >
                  <Text style={styles.cardButtonText}>Ver Detalhes</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MainScreen;
