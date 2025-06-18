import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Alert, Modal, ActivityIndicator, ScrollView,
  SafeAreaView, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { api } from '../../utils/api';
import styles from '../styles';
import TreinoModal from '../components/TreinoModal';


// ── AlunoDetalhesScreen ───────────────────────────────────────────────────────
function AlunoDetalhesScreen({ navigation, route }) {
  const { aluno, usuario, refreshAlunos } = route.params;
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTreino, setEditingTreino] = useState(null);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [confirmDeleteTreinoVisible, setConfirmDeleteTreinoVisible] = useState(false);
const [treinoToDelete, setTreinoToDelete] = useState(null);

  useEffect(() => {
const fetchTreinos = async () => {
  try {
    console.log('Buscando treinos para aluno ID:', aluno.id);
    const res = await fetch(`${api}/treinos?alunoId=${aluno.id}`);
    const data = await res.json();
    console.log('Dados brutos recebidos:', data);

    const treinosMap = new Map();
    
    data.forEach(treino => {
      if (!treinosMap.has(treino.nm_treino)) {
        treinosMap.set(treino.nm_treino, {
          id: treino.id,
          nm_treino: treino.nm_treino,
          exercicios: [],
          qtd_carga: treino.qtd_carga,
          cd_serie: treino.cd_serie,
          qtd_repeticoes: treino.qtd_repeticoes,
          ds_objetivo: treino.ds_objetivo,
          ds_observacao: treino.ds_observacao,
          dt_treino: treino.dt_treino
        });
      }
      
      const current = treinosMap.get(treino.nm_treino);
      current.exercicios.push({
        id: treino.cd_fk_exercicio,
        nm_exercicio: treino.nm_fk_exercicio
      });
    });

    setTreinos(Array.from(treinosMap.values()));
    
  } catch (error) {
    console.error('Erro detalhado:', error);
    Alert.alert('Erro', 'Falha ao carregar treinos');
  } finally {
    setLoading(false);
  }
};

    fetchTreinos();
  }, [aluno.id]);

  const refreshTreinos = async () => {
    setLoading(true);
    try {
const res = await fetch(`${api}/treinos?alunoId=${aluno.id}`);
      const data = await res.json();
      console.log('DEBUG - Dados recebidos:', data); // Verifique isto no console

      // ▼▼▼▼▼ CORREÇÃO ESSENCIAL AQUI ▼▼▼▼▼
     // ProfessorPage.jsx - AlunoDetalhesScreen
// ProfessorPage.jsx - refreshTreinos
const groupedTreinos = data.reduce((acc, curr) => {
  if (curr.cd_fk_aluno !== aluno.id) return acc;

  const existing = acc.find(t => t.nm_treino === curr.nm_treino);
  if (existing) {
    existing.exercicios.push({
      id: curr.cd_fk_exercicio,
      nm_exercicio: curr.nm_fk_exercicio
    });
    // ▼▼▼ ATUALIZE OS CAMPOS ▼▼▼
    existing.qtd_carga = curr.qtd_carga;
    existing.cd_serie = curr.cd_serie;
    existing.qtd_repeticoes = curr.qtd_repeticoes;
  } else {
    acc.push({
      id: curr.id,
      nm_treino: curr.nm_treino,
      ds_objetivo: curr.ds_objetivo,
      ds_observacao: curr.ds_observacao,
      dt_treino: curr.dt_treino,
      // ▼▼▼ INCLUA OS NOVOS CAMPOS ▼▼▼
      qtd_carga: curr.qtd_carga,
      cd_serie: curr.cd_serie,
      qtd_repeticoes: curr.qtd_repeticoes,
      exercicios: [{
        id: curr.cd_fk_exercicio,
        nm_exercicio: curr.nm_fk_exercicio
      }]
    });
  }
  return acc;
}, []);
      // ▲▲▲▲▲ FIM DA CORREÇÃO ▲▲▲▲▲

      setTreinos([]); // Força reset do estado
      setTreinos(groupedTreinos);
      
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar os treinos');
      console.error('Erro detalhado:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteTreino = async (treinoNome) => {
  try {
    const res = await fetch(
      `${api}/treinos?treinoNome=${encodeURIComponent(treinoNome)}&alunoId=${aluno.id}`
    );
    const treinosParaExcluir = await res.json();
    
    const treinosDoAluno = treinosParaExcluir.filter(
      t => t.cd_fk_aluno === aluno.id && t.nm_treino === treinoNome
    );

    await Promise.all(
      treinosDoAluno.map(async (treino) => {
        await fetch(`${api}/treinos/${treino.id}`, { method: 'DELETE' });
      })
    );
    
    refreshTreinos();
    Alert.alert('Sucesso', 'Treino excluído com sucesso');
  } catch {
    Alert.alert('Erro', 'Não foi possível excluir o treino');
  } finally {
    setTreinoToDelete(null);
  }
};

  const handleDeleteAluno = async () => {
    try {
      const resTreinos = await fetch(`${api}/treinos?alunoId=${aluno.id}`);
      const treinosParaExcluir = await resTreinos.json();
      
      await Promise.all(
        treinosParaExcluir.map(async (treino) => {
          await fetch(`${api}/treinos/${treino.id}`, { method: 'DELETE' });
        })
      );

      const res = await fetch(`${api}/alunos/${aluno.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      
      Alert.alert('Sucesso', 'Aluno excluído com sucesso', [{
        text: 'OK',
        onPress: () => {
          refreshAlunos();
          navigation.goBack();
        }
      }]);
    } catch {
      Alert.alert('Erro', 'Não foi possível excluir o aluno');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#C70039" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <LinearGradient 
          colors={['#8A0B36', '#5E0825']}
          style={[styles.alunoHeader, { 
            paddingTop: 40,
            marginTop: -28,
          }]}
        >
          <Text style={styles.alunoNome}>{aluno.nm_aluno}</Text>
          <Text style={styles.alunoInfo}>Peso: {aluno.cd_peso} kg | Altura: {aluno.cd_altura} cm</Text>
        </LinearGradient>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#8A0B36' }]}
          onPress={() => {
            setEditingTreino(null);
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Adicionar Treino</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#5E0825' }]}
          onPress={() => setConfirmDeleteVisible(true)}
        >
          <Text style={styles.buttonText}>Excluir Aluno</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={treinos}
        keyExtractor={item => `${item.nm_treino}-${item.dt_treino}`}
        renderItem={({ item }) => (
          <View style={styles.treinoCard}>
  <View style={styles.treinoHeader}>
    <Text style={styles.treinoTitle}>{item.nm_treino}</Text>
    <View style={styles.treinoActions}>
      <TouchableOpacity onPress={() => {
        setEditingTreino(item);
        setModalVisible(true);
      }}>
        <Ionicons name="create" size={24} color="#8A0B36" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setTreinoToDelete(item.nm_treino);
        setConfirmDeleteTreinoVisible(true);
      }}>
        <Ionicons name="trash" size={24} color="#5E0825" />
      </TouchableOpacity>
    </View>
  </View>
  
  <FlatList
    data={item.exercicios}
    keyExtractor={(ex, index) => `${item.id}-${index}`}
    renderItem={({ item: ex }) => (
      <Text style={styles.treinoText}>
        <Ionicons name="barbell-outline" size={16} color="#C70039" style={styles.exerciseIcon} />  
        {ex.nm_exercicio}
      </Text>
    )}
  />
  
  {/* Seção de detalhes do treino - Reorganizada */}
  <View style={styles.treinoDetailsContainer}>
    <View style={styles.treinoStatsRow}>
      <View style={styles.treinoStat}>
        <Text style={styles.treinoStatLabel}>Carga:</Text>
        <Text style={styles.treinoStatValue}>
          {item.qtd_carga === 'leve' ? 'Leve' : 
           item.qtd_carga === 'intermediaria' ? 'Intermediária' : 
           item.qtd_carga === 'pesada' ? 'Pesada' : 
           `${item.qtd_carga} kg`}
        </Text>
      </View>
      
      <View style={styles.treinoStat}>
        <Text style={styles.treinoStatLabel}>Séries:</Text>
        <Text style={styles.treinoStatValue}>{item.cd_serie}</Text>
      </View>
      
      <View style={styles.treinoStat}>
        <Text style={styles.treinoStatLabel}>Repetições:</Text>
        <Text style={styles.treinoStatValue}>{item.qtd_repeticoes}</Text>
      </View>
    </View>
    
    {item.ds_objetivo && (
      <View style={styles.treinoInfo}>
        <Text style={styles.treinoInfoLabel}>Objetivo:</Text>
        <Text style={styles.treinoInfoText}>{item.ds_objetivo}</Text>
      </View>
    )}
    
    {item.ds_observacao && (
      <View style={styles.treinoInfo}>
        <Text style={styles.treinoInfoLabel}>Observação:</Text>
        <Text style={styles.treinoInfoText}>{item.ds_observacao}</Text>
      </View>
    )}
  </View>
  
  <Text style={styles.treinoDate}>Criado em: {new Date(item.dt_treino).toLocaleDateString()}</Text>
</View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum treino cadastrado para este aluno</Text>
        }
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TreinoModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          alunoId={aluno.id}
          usuario={usuario}
          refreshTreinos={refreshTreinos}
          treino={editingTreino}
          aluno={aluno}
        />
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmDeleteVisible}
        onRequestClose={() => setConfirmDeleteVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Tem certeza que deseja excluir este aluno permanentemente?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleDeleteAluno}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setConfirmDeleteVisible(false)}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
  animationType="fade"
  transparent={true}
  visible={confirmDeleteTreinoVisible}
  onRequestClose={() => setConfirmDeleteTreinoVisible(false)}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={styles.modalText}>Tem certeza que deseja excluir este treino permanentemente?</Text>
      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => {
            setConfirmDeleteTreinoVisible(false);
            handleDeleteTreino(treinoToDelete);
          }}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalButton, styles.cancelButton]}
          onPress={() => {
            setConfirmDeleteTreinoVisible(false);
            setTreinoToDelete(null);
          }}
        >
          <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
}

export default AlunoDetalhesScreen;
