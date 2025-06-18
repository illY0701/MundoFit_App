import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, ActivityIndicator, TextInput, TouchableOpacity, Alert, BackHandler
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { api } from '../../utils/api';
import styles from '../styles';
import { useIsFocused } from '@react-navigation/native';




// ── AlunosListScreen ──────────────────────────────────────────────────────────
function AlunosListScreen({ navigation, route }) {
  const { usuario } = route.params;
  const [alunos, setAlunos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();


useEffect(() => {
const fetchAlunos = async () => {
  try {
    const res = await fetch(`${api}/alunos`);
    const data = await res.json();
    

    const alunosArray = Array.isArray(data) ? data : data?.alunos || [];
    setAlunos(alunosArray);
    console.log('Resposta da API:', data); 

  } catch {
    Alert.alert('Erro', 'Não foi possível carregar os alunos');
    setAlunos([]);
  } finally {
    setLoading(false);
  }
};

    fetchAlunos();
  }, []);

useEffect(() => {
  const backAction = () => {
    return true; // Bloqueia botão voltar
  };

  if (isFocused) {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove(); // Remove quando desfoca
  }
}, [isFocused]);



 const refreshAlunos = async () => {
  setLoading(true);
  try {
    const res = await fetch(`${api}/alunos`);
    const data = await res.json();
    setAlunos(Array.isArray(data) ? data : []);
  } catch {
    Alert.alert('Erro', 'Não foi possível atualizar a lista de alunos');
    setAlunos([]);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#C70039" />
      </View>
    );
  }

  const filtered = alunos
  .filter(a => a.nm_aluno.toLowerCase().includes(searchQuery.toLowerCase()))
  .sort((a, b) => a.nm_aluno.localeCompare(b.nm_aluno)); // Ordenação alfabética

  return (
    <View style={styles.container}>
      <View style={styles.searchInput}>
        <Ionicons name="search-outline" size={20} color="#C70039" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Buscar aluno..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ flex: 1, color: 'white' }}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id ? String(item.id) : `temp-${item.nm_aluno}`} 
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('AlunoDetalhes', {
                aluno: item,
                usuario,
                refreshAlunos
              })
            }
          >
            <LinearGradient colors={['#8A0B36', '#5E0825']} style={styles.cardInner}>
              <Text style={styles.cardTitle}>{item.nm_aluno}</Text>
              <Text style={styles.cardText}>Peso: {item.cd_peso} kg</Text>
              <Text style={styles.cardText}>Altura: {item.cd_altura} cm</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default AlunosListScreen;