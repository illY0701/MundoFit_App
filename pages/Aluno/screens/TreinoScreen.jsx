import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TextInput, ScrollView, TouchableOpacity, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import styles from '../styles';
import { api } from '../../utils/api';
import { Loading } from '../components/Helpers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native';

function TreinoScreen({ route, navigation }) {
  const aluno = route.params.aluno || route.params.usuario || {};
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const insets = useSafeAreaInsets();

  const diasSemanaMap = {
    'Segunda-feira': 'segunda',
    'Terça-feira': 'terca',
    'Quarta-feira': 'quarta',
    'Quinta-feira': 'quinta',
    'Sexta-feira': 'sexta',
    'Sábado': 'sabado',
    'Domingo': 'domingo'
  };

  const diasSemana = Object.keys(diasSemanaMap);

  const fetchTreinos = async () => {
    setLoading(true);
    try {
      if (!aluno?.id) {
        Alert.alert('Erro', 'Aluno não identificado');
        return;
      }

      const params = new URLSearchParams({
        alunoId: aluno.id,
        ...(selectedDay && { diaSemana: diasSemanaMap[selectedDay] })
      });

      const res = await fetch(`${api}/treinos?${params}`);
      const treinosBrutos = await res.json();

      const treinosAgrupados = treinosBrutos.reduce((acc, cur) => {
        const key = cur.nm_treino + cur.nm_dia_semana;
        if (!acc[key]) {
          acc[key] = {
            id: key,
            firebaseId: cur.id,
            nm_treino: cur.nm_treino,
            diaSemana: cur.nm_dia_semana,
            ds_objetivo: cur.ds_objetivo,
            ds_observacao: cur.ds_observacao,
            qtd_carga: cur.qtd_carga,
            dt_treino: cur.dt_treino,
            dataFormatada: new Date(cur.dt_treino).toLocaleDateString('pt-BR'),
            exercicios: []
          };
        }

        acc[key].exercicios.push({
          id: cur.cd_fk_exercicio || Date.now(),
          nome: cur.nm_fk_exercicio
        });

        return acc;
      }, {});

      setTreinos(Object.values(treinosAgrupados));
    } catch (error) {
      console.error('Erro ao buscar treinos:', error);
      Alert.alert('Erro', 'Não foi possível carregar treinos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (aluno.id) fetchTreinos();
  }, [aluno.id, selectedDay]);

  const filteredTreinos = () => {
    return treinos.filter(t => {
      const matchesSearch =
        t.nm_treino.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.ds_objetivo.toLowerCase().includes(searchTerm.toLowerCase());

      const normalizedSelected = selectedDay?.replace(/-feira/gi, '').trim().toLowerCase();
      const normalizedTreinoDay = t.diaSemana?.replace(/-feira/gi, '').trim().toLowerCase();

      return matchesSearch && (!selectedDay || normalizedTreinoDay === normalizedSelected);
    });
  };

  const renderDayButton = (diaCompleto) => {
    const isSelected = selectedDay === diaCompleto;
    const displayName = diaCompleto.replace('-feira', '').slice(0, 3);

    return (
      <TouchableOpacity
        key={diaCompleto}
        style={[styles.dayButton, isSelected && styles.selectedDayButton]}
        onPress={() => {
          const novoDia = selectedDay === diaCompleto ? null : diaCompleto;
          setSelectedDay(novoDia);
        }}
      >
        <Text style={[styles.dayButtonText, isSelected && styles.selectedDayButtonText]}>
          {displayName}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.screenHeader, { paddingTop: insets.top }]}>
        <Text style={styles.screenTitle}>Treinos {aluno.nm_aluno}</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#C70039" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar treino..."
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <View style={styles.daysFilterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysRow}>
          {diasSemana.map(renderDayButton)}
        </ScrollView>
      </View>

      <View style={styles.workoutsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Treinos Programados</Text>
        </View>
        <FlatList
          data={filteredTreinos()}
          keyExtractor={(item) => item.firebaseId || item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('TreinoDetalhes', {
                  treino: { ...item, cd_fk_aluno: aluno.id }
                })
              }
              activeOpacity={0.9}
              style={styles.cardTouchable}
            >
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.nm_treino}</Text>
                  <Text style={styles.treinoDate}>{item.dataFormatada}</Text>
                </View>

                <Text style={styles.cardText}>{item.ds_objetivo}</Text>

                <View style={styles.exerciciosContainer}>
                  <Text style={styles.exerciciosTitle}>Exercícios:</Text>
                  {item.exercicios.map((ex) => (
                    <View key={ex.id} style={styles.exerciseItem}>
                      <Ionicons name="barbell-outline" size={16} color="#C70039" style={styles.exerciseIcon} />
                      <Text style={styles.exerciseName}>{ex.nome}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="sad-outline" size={50} color="#C70039" style={styles.emptyIcon} />
              <Text style={styles.emptyText}>Nenhum treino encontrado</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default TreinoScreen;
