import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, TextInput, ActivityIndicator, Alert, Modal, KeyboardAvoidingView,
  Platform, Dimensions, ScrollView, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { api } from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';


// ── TreinoModal ───────────────────────────────────────────────────────────────
export function TreinoModal({
  visible,
  onClose,
  alunoId,
  usuario,
  refreshTreinos,
  treino,
  aluno
}) {
  // ▼▼▼ STATES ▼▼▼
  const [nmTreino, setNmTreino] = useState(treino?.nm_treino || '');
  const [objetivo, setObjetivo] = useState(treino?.ds_objetivo || '');
  const [observacao, setObservacao] = useState(treino?.ds_observacao || '');
  const [diaSemana, setDiaSemana] = useState(treino?.nm_dia_semana || '');
  const [filterText, setFilterText] = useState('');
  const [selected, setSelected] = useState(treino?.exercicios?.map(e => e.cd_fk_exercicio) || []);
  const [customExercise, setCustomExercise] = useState('');
  const [exercicios, setExercicios] = useState([]);
  const [loadingExercicios, setLoadingExercicios] = useState(true);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [recomendacao, setRecomendacao] = useState(null);
  const [carga, setCarga] = useState(treino?.qtd_carga || 'leve');
  const [serie, setSerie] = useState(treino?.cd_serie || '');
  const [repeticoes, setRepeticoes] = useState(treino?.qtd_repeticoes || '');
  const [tipoTreino, setTipoTreino] = useState('funcional'); 
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const isMountedRef = useRef(true);
  const controllerRef = useRef(new AbortController());
  const [modalTipoTreinoVisible, setModalTipoTreinoVisible] = useState(false);
const [modalCargaVisible, setModalCargaVisible] = useState(false);

// No TreinoModal, onde os dias são renderizados:
diasDisponiveis = [
  'Segunda-feira', 
  'Terça-feira', 
  'Quarta-feira', 
  'Quinta-feira', 
  'Sexta-feira', 
  'Sábado', 
  'Domingo' // Mantenha o formato
];  const { height } = Dimensions.get('window');
// Dentro do componente TreinoModal, antes do return
const handleAddCustomExercise = () => {
  if (customExercise.trim()) {
    const newExercise = {
      id: `custom-${Date.now()}`,
      name: customExercise,
      isCustom: true
    };
    
    setSelectedExercises(prev => [...prev, newExercise]);
    setCustomExercise('');
  }
};
  // ▼▼▼ FUNÇÃO PARA SALVAR O TREINO ▼▼▼
  const handleSubmit = async () => {
    // Validação do formulário
    if (!validateForm()) return;
  
    setSubmitting(true);
  
    try {
      // Deletar treino antigo se for edição
      if (treino) {
        const res = await fetch(
          `${api}/treinos?treinoNome=${encodeURIComponent(treino.nm_treino)}&alunoId=${alunoId}`
        );
        const treinosAntigos = await res.json();
        
        await Promise.all(
          treinosAntigos.map(async (t) => {
            await fetch(`${api}/treinos/${t.id}`, { method: 'DELETE' });
          })
        );
      }
  
      await Promise.all(
        selected.map(async (id) => {
          const ex = exercicios.find(e => e.cd_exercicio === id) || {
            cd_exercicio: id,
            nm_exercicio: id
          };
  
          await fetch(`${api}/treinos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nm_treino: nmTreino,
              cd_fk_exercicio: ex.cd_exercicio,
              nm_fk_exercicio: ex.nm_exercicio,
              cd_fk_aluno: alunoId,
              cd_fk_professor: usuario.id,
              dt_treino: new Date().toISOString(),
              ds_objetivo: objetivo,
              ds_observacao: observacao,
              nm_dia_semana: diaSemana,
              qtd_carga: carga, // Aqui a carga será uma string com valor selecionado
              cd_serie: Number(serie),
              qtd_repeticoes: Number(repeticoes)
            })
          });
        })
      );
      // Atualização e feedback
      refreshTreinos();
      onClose();
      Alert.alert('Sucesso', treino ? 'Treino atualizado!' : 'Treino cadastrado!');
  
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar treino: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

// Função de validação (já deve existir)
const validateForm = () => {
  const errs = [];
  if (!nmTreino.trim()) errs.push('Nome do treino é obrigatório');
  if (!diaSemana) errs.push('Selecione dia da semana');
  if (selected.length === 0) errs.push('Selecione ao menos um exercício');
  
  if (errs.length) {
    Alert.alert('Erro', errs.join('\n'));
    return false;
  }
  return true;
};


  // ▼▼▼ BUSCA EXERCÍCIOS ▼▼▼
  useEffect(() => {
    const fetchExercicios = async () => {
      try {
        setLoadingExercicios(true);
        const response = await fetch(`${api}/exercicios`);
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setExercicios(data);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os exercícios');
      } finally {
        setLoadingExercicios(false);
      }
    };

    if (visible) fetchExercicios();
  }, [visible]);

  // ▼▼▼ FILTRAGEM DINÂMICA ▼▼▼
  const filteredExercises = exercicios.filter(ex => 
    ex.nm_exercicio.toLowerCase().includes(filterText.toLowerCase())
  );

  // ▼▼▼ SELEÇÃO ▼▼▼
  const toggleSelect = (id) => {
    if (submitting) return;
    setSelected(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // ▼▼▼ RENDER ITEM ▼▼▼
  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.exerciseOption,
        selected.includes(item.cd_exercicio) && styles.selectedExercise,
        submitting && styles.disabledButton
      ]}
      onPress={() => toggleSelect(item.cd_exercicio)}
      disabled={submitting}
    >
      <Text style={styles.exerciseText}>{item.nm_exercicio}</Text>
      {selected.includes(item.cd_exercicio) && (
        <Ionicons name="checkmark" size={20} color="white" />
      )}
    </TouchableOpacity>
  );

  // Dentro do componente TreinoModal, antes do return

// Função para obter token
  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      console.error('Erro ao obter token:', error);
      return null;
    }
  };

  // Obter recomendação de treino (CORRIGIDA)
// ▲▲▲ FUNÇÃO DE RECOMENDAÇÃO COMPATÍVEL (SEM MUDAR O handleSubmit) ▲▲▲
const getRecomendacaoTreino = async () => {
  try {
    setLoadingRecommendation(true);
    
    const dados = {
      userId: aluno.id,
      tipo: tipoTreino || 'funcional',
      nm_aluno: aluno.nm_aluno || 'Aluno'
    };

    const token = await getToken();

    const response = await fetch(`${api}/ml/recomendar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(dados)
    });

    const data = await response.json();
    
    if (!data.sucesso) {
      throw new Error(data.erro || 'Erro ao gerar recomendação');
    }

    const recomendacao = data.recomendacao;
    setRecomendacao(recomendacao);
    
    // 1. Transformar os exercícios recomendados no formato que seu sistema espera
    const novosExercicios = recomendacao.exercicios.map(ex => ({
      cd_exercicio: ex.id || ex.cd_exercicio, // usa id ou cd_exercicio
      nm_exercicio: ex.nome || ex.nm_exercicio || `Exercício ${ex.id}` // tenta vários campos possíveis para o nome
    }));

    // 2. Atualizar o estado selected (que seu handleSubmit usa)
    setSelected(prev => [...novosExercicios.map(ex => ex.cd_exercicio), ...prev]);
    
    // 3. Atualizar a lista visual (se estiver usando selectedExercises)
    if (setSelectedExercises) {
      setSelectedExercises(prev => [
        ...novosExercicios.map(ex => ({ 
          id: ex.cd_exercicio, 
          name: ex.nm_exercicio,
          isCustom: false 
        })),
        ...prev
      ]);
    }
    
    // 4. Atualizar nome e tipo do treino
    setNmTreino(`Treino ${recomendacao.tipo}`);
    setTipoTreino(recomendacao.tipo);
  
    Alert.alert(
      'Recomendação gerada',
      `Treino de ${recomendacao.tipo} com ${novosExercicios.length} exercícios`
    );

  } catch (error) {
    console.error('Erro na recomendação:', error);
    Alert.alert('Erro', error.message || 'Falha ao gerar recomendação');
  } finally {
    setLoadingRecommendation(false);
  }
};

// ▲▲▲ FUNÇÕES PARA ADICIONAR/REMOVER EXERCÍCIOS (COMPATÍVEIS) ▲▲▲
const handleSelectExercise = (exercise) => {
  // Atualiza o estado principal (usado no handleSubmit)
  setSelected(prev => [exercise.cd_exercicio, ...prev]);
  
  // Se estiver usando selectedExercises para exibição
  if (setSelectedExercises) {
    setSelectedExercises(prev => [{
      id: exercise.cd_exercicio,
      name: exercise.nm_exercicio,
      isCustom: false
    }, ...prev]);
  }
};

const removeSelectedExercise = (exercise) => {
  // Remove do estado principal
  setSelected(prev => prev.filter(id => id !== exercise.id));
  
  // Se estiver usando selectedExercises para exibição
  if (setSelectedExercises) {
    setSelectedExercises(prev => prev.filter(e => e.id !== exercise.id));
  }
};
 
 return (
  <SafeAreaView style={styles.modalContainer}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      {/* Lista principal que permite rolagem */}
<FlatList
  data={[]}
  renderItem={null}
  contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }} // Espaço para o botão fixo
  ListHeaderComponent={
    <>
      {/* Cabeçalho */}
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>{treino ? 'Editar Treino' : 'Novo Treino'}</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={28} color="#C70039" />
        </TouchableOpacity>
      </View>

      {/* Botão de Recomendação */}
      <TouchableOpacity
        style={[styles.recommendButton, (loadingRecommendation || submitting) && styles.disabledButton]}
        onPress={getRecomendacaoTreino}
        disabled={loadingRecommendation || submitting}
      >
        {loadingRecommendation ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <Ionicons name="sparkles" size={20} color="#FFD700" />
            <Text style={styles.buttonText}>Recomendação Inteligente</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Sugestão do Sistema */}
      {recomendacao && (
        <View style={styles.recommendationBox}>
          <Text style={styles.recommendationTitle}>Sugestão do Sistema:</Text>
          <Text style={styles.recommendationText}>• Tipo: {recomendacao.tipo}</Text>
          {recomendacao.observacoes?.map((obs, i) => (
            <Text key={`obs-${i}`} style={styles.recommendationText}>• {obs}</Text>
          ))}
        </View>
      )}

      {/* Campos do Formulário */}
      <TextInput
        style={styles.input}
        placeholder="Nome do Treino*"
        placeholderTextColor="#888"
        value={nmTreino}
        onChangeText={setNmTreino}
        editable={!submitting}
      />
      
      {/* Pickers estilizados */}
      <Text style={styles.inputLabel}>Tipo de Treino</Text>
<TouchableOpacity 
  style={styles.input} 
  onPress={() => setModalTipoTreinoVisible(true)}
>
  <Text style={tipoTreino ? styles.inputText : styles.placeholderText}>
    {tipoTreino || 'Selecione o tipo'}
  </Text>
</TouchableOpacity>

<Modal visible={modalTipoTreinoVisible} transparent animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContentFull}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Tipo de Treino</Text>
        <TouchableOpacity onPress={() => setModalTipoTreinoVisible(false)}>
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      {['superiores', 'inferiores', 'core', 'cardio', 'funcional'].map((tipo) => (
        <TouchableOpacity
          key={tipo}
          style={styles.modalOption}
          onPress={() => {
            setTipoTreino(tipo);
            setModalTipoTreinoVisible(false);
          }}
        >
          <Text style={styles.modalOptionText}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
</Modal>

<Text style={styles.inputLabel}>Carga</Text>
<TouchableOpacity 
  style={styles.input} 
  onPress={() => setModalCargaVisible(true)}
>
  <Text style={carga ? styles.inputText : styles.placeholderText}>
    {carga || 'Selecione a carga'}
  </Text>
</TouchableOpacity>

<Modal visible={modalCargaVisible} transparent animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContentFull}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Carga</Text>
        <TouchableOpacity onPress={() => setModalCargaVisible(false)}>
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      {['leve', 'intermediaria', 'pesada'].map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.modalOption}
          onPress={() => {
            setCarga(item);
            setModalCargaVisible(false);
          }}
        >
          <Text style={styles.modalOptionText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
</Modal>


      <TextInput
        style={styles.input}
        placeholder="Séries"
        placeholderTextColor="#888"
        value={serie}
        onChangeText={setSerie}
        keyboardType="numeric"
        editable={!submitting}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Repetições"
        placeholderTextColor="#888"
        value={repeticoes}
        onChangeText={setRepeticoes}
        keyboardType="numeric"
        editable={!submitting}
      />

      {/* Dias da Semana */}
      <View style={styles.daysContainer}>
        <Text style={styles.sectionTitle}>Dia da Semana
          <Text style={{ color: '#C70039' }}>*</Text>
        </Text>
        <ScrollView horizontal style={styles.daysScroll}>
          {diasDisponiveis.map(dia => (
            <TouchableOpacity
              key={dia}
              style={[
                styles.dayButton,
                diaSemana === dia && styles.selectedDayButton,
                submitting && styles.disabledButton
              ]}
              onPress={() => !submitting && setDiaSemana(dia)}
            >
              <Text style={[
                styles.dayButtonText,
                diaSemana === dia && styles.selectedDayText
              ]}>
                {dia}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Campos Objetivo e Observações */}
      <TextInput
        style={[styles.input, styles.inputMargin]}
        placeholder="Objetivo"
        placeholderTextColor="#888"
        value={objetivo}
        onChangeText={setObjetivo}
      />

      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Observações"
        placeholderTextColor="#888"
        multiline
        value={observacao}
        onChangeText={setObservacao}
        editable={!submitting}
      />

      {/* Seção de Exercícios */}
      <Text style={styles.sectionTitle}>
        Exercícios
        <Text style={{ color: '#C70039' }}>*</Text>
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Filtrar exercícios..."
        placeholderTextColor="#888"
        value={filterText}
        onChangeText={setFilterText}
        editable={!submitting}
      />

       {/* Campo Personalizado */}
      <View style={styles.customExerciseContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Digite um exercício personalizado"
          placeholderTextColor="#888"
          value={customExercise}
          onChangeText={setCustomExercise}
          editable={!submitting}
          onSubmitEditing={handleAddCustomExercise}
        />
        <TouchableOpacity
          style={[styles.addButton, (submitting || !customExercise.trim()) && styles.disabledButton]}
          onPress={handleAddCustomExercise}
          disabled={!customExercise.trim() || submitting}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Exercícios Selecionados */}
      {selectedExercises.length > 0 && (
        <View style={styles.selectedExercisesContainer}>
          <Text style={styles.sectionTitle}>Exercícios Selecionados:</Text>
          {selectedExercises.map((exercise, index) => (
            <View key={`selected-${exercise.id}-${index}`} style={styles.selectedExerciseItem}>
              <Text style={styles.selectedExerciseText}>{exercise.name}</Text>
              <TouchableOpacity 
                onPress={() => removeSelectedExercise(exercise)}
                disabled={submitting}
                style={styles.removeButton}
              >
                <Ionicons name="close" size={20} color="#C70039" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </>
  }
  ListFooterComponent={
    <>
      {/* Lista de Exercícios (com scroll interno) */}
      <View style={styles.listContainer}>
       <FlatList
  data={filteredExercises}
  keyExtractor={(item, index) => `exercise-${item.cd_exercicio || index}`} // Usando index como fallback para chave
  renderItem={({ item }) => (
    <TouchableOpacity
      style={[
        styles.exerciseItem,
        selectedExercises.some(e => e.id === item.cd_exercicio) && styles.selectedExercise
      ]}
      onPress={() => handleSelectExercise(item)}
      disabled={submitting}
    >
      <Text style={styles.exerciseText}>{item.nm_exercicio}</Text>
    </TouchableOpacity>
  )}
  scrollEnabled={true}
  nestedScrollEnabled={true}
  initialNumToRender={30}
  ListEmptyComponent={
    <Text style={styles.emptyExerciseText}>
      {loadingExercicios ? 'Carregando...' : 'Nenhum exercício encontrado'}
    </Text>
  }
/>

      </View>
    </>
  }
/>
      {/* Botão Fixo na Parte Inferior */}
      <TouchableOpacity
        style={[styles.submitButton, { position: 'absolute', bottom: 20 }]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>
            {treino ? 'Atualizar Treino' : 'Salvar Treino'}
          </Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  </SafeAreaView>
);}


export default TreinoModal;