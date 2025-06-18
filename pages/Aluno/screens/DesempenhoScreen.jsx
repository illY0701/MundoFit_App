// ── TELA DE DESEMPENHO ─────────────────────────────────────────────────────────

import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, ScrollView, RefreshControl,
  Modal, TouchableOpacity, Alert, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { useIsFocused } from '@react-navigation/native';
import styles from '../styles';
import { api } from '../../utils/api';
import { Loading } from '../components/Helpers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const { width } = Dimensions.get('window');

function DesempenhoScreen({ route }) {
  const aluno = route.params.aluno || route.params.usuario || {};
  const isFocused = useIsFocused();
  const [hist, setHist] = useState([]);
  const [totalTreinosConcluidos, setTotalTreinosConcluidos] = useState(0);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMetaVisible, setModalMetaVisible] = useState(false);
  const [peso, setPeso] = useState('');
  const [pesoMeta, setPesoMeta] = useState(perfil?.peso_meta?.toString() || '');
  const [comentario, setComentario] = useState('');
  const insets = useSafeAreaInsets();
  
useEffect(() => {
  if (perfil?.peso_meta) {
    setPesoMeta(perfil.peso_meta.toString());
  }
}, [perfil]);

  // Substitua a função fetchHist existente por:
// Substitua a função fetchHist por:
const fetchHist = async () => {
  setLoading(true);
  try {
    const res = await fetch(`${api}/historicos?alunoId=${aluno.id}`);
    const data = await res.json();

    // Converter datas
    data.forEach(item => {
      if (item.dt_treino_realizado && item.dt_treino_realizado._seconds) {
        item.dt_treino_realizado = new Date(item.dt_treino_realizado._seconds * 1000).toISOString();
      }
    });

    // Filtrar histórico de pesos
    const filteredHist = data.filter(item => 
  item.cd_fk_peso && 
  !item.cd_fk_treino &&
  item.dt_treino_realizado
).sort((a, b) => { // Ordena do mais recente para o mais antigo
  return new Date(b.dt_treino_realizado) - new Date(a.dt_treino_realizado);
});

    // Contar treinos concluídos
    const treinosConcluidos = data.filter(item => 
      item.cd_fk_treino !== null && 
      item.dt_treino_realizado
    ).length;

    setTotalTreinosConcluidos(treinosConcluidos); // Atualiza o estado
    setHist(filteredHist);

  } catch (e) {
    console.error('Erro ao carregar histórico:', e);
    Alert.alert('Erro', 'Não foi possível carregar histórico');
  } finally {
    setLoading(false);
  }
};

// Função para buscar o perfil do aluno após atualização
const fetchPerfil = async () => {
  try {
    const r = await fetch(`${api}/alunos/${aluno.id}`);
    const data = await r.json();
    setPerfil(data);  // Atualiza o perfil com os dados mais recentes
    setPesoMeta(data.peso_meta?.toString() || '');  // Atualiza a meta de peso
    console.log("Perfil atualizado:", data);  // Verifique os dados retornados
  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
  }
};





  useEffect(() => {
    if (isFocused && aluno.id) { 
      fetchHist(); 
      fetchPerfil(); 
    }
  }, [isFocused, aluno.id]);

  const onRefresh = async () => { 
    setRefreshing(true); 
    await fetchHist(); 
    setRefreshing(false); 
  };
const submitDesempenho = async () => {
  if (!peso) {
    Alert.alert('Erro', 'Informe o peso atual');
    return;
  }

  const todayKey = new Date().toISOString().split('T')[0]; // Obtém a data do dia (ex: 2025-06-03)

  try {
    // Passo 1: Atualizar o peso atual do aluno no perfil
    const resPerfil = await fetch(`${api}/alunos/${aluno.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...perfil, // Preserva as outras informações
        cd_peso_atual: Number(peso)  // Atualiza o peso atual (não o inicial)
      })
    });

    if (!resPerfil.ok) throw new Error('Falha ao atualizar peso atual do aluno');

    console.log('Peso atual do aluno atualizado com sucesso!');

    // Passo 2: Registrar a medição de peso no histórico
    const newBody = {
      cd_fk_aluno: aluno.id,
      cd_fk_treino: null,
      dt_treino_realizado: todayKey,
      cd_fk_peso: Number(peso), // Peso registrado na medição
      ds_comentarios: comentario
    };

    const resHist = await fetch(`${api}/historicos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBody)
    });

    if (!resHist.ok) throw new Error('Falha ao registrar histórico de peso');

    console.log('Histórico de peso registrado com sucesso');

    // Passo 3: Recarregar os dados de perfil após a atualização
    await fetchPerfil();  // Recarregar as informações mais recentes do perfil, incluindo o peso atualizado
    await fetchHist();    // Recarregar o histórico de medições para incluir o novo peso

    // Limpar os campos e fechar o modal
    setPeso(''); // Limpa o campo de peso
    setComentario(''); // Limpa o campo de comentário
    setModalVisible(false); // Fecha o modal de registro de medição

  } catch (e) {
    console.error('Erro ao registrar peso:', e);
    Alert.alert('Erro ao registrar', e.message);
  }
};



  const savePesoMeta = async () => {
    if (!pesoMeta) return;

    try {
      const res = await fetch(`${api}/alunos/${aluno.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...perfil, peso_meta: Number(pesoMeta) })
      });
      if (!res.ok) throw new Error();
      await fetchPerfil();
      setModalMetaVisible(false); // FECHA O MODAL
    } catch {
      Alert.alert('Erro', 'Falha ao salvar peso meta');
    }
  };

if (loading) return <Loading />;

  const initialWeight = perfil?.cd_peso || '-';
// Verificando o peso atual do histórico (deve ser 80 conforme o log)
const currentWeight = perfil?.cd_peso_atual || '-';
console.log("Peso atual:", currentWeight);

// Pegando a altura do perfil e verificando se existe
const alturaString = perfil?.cd_altura;
console.log("Altura do perfil:", alturaString);  // Adicionando log para verificar a altura

// Verificando se a alturaString é uma string válida antes de tentar usar replace
let altura = null;
if (typeof alturaString === 'string' && alturaString.includes('cm')) {
  // Remove " cm" e converte para metros
  altura = parseFloat(alturaString.replace(' cm', '')) / 100;
} else if (typeof alturaString === 'number') {
  // Se já for um número, apenas converte para metros
  altura = alturaString / 100;
}

// Verificando se a altura foi corretamente extraída
if (!altura) {
  console.log("Erro: Altura não encontrada ou não válida no perfil.");
} else {
  console.log("Altura convertida para metros:", altura);
}

// Calculando o IMC apenas se tanto o peso quanto a altura forem válidos
// Substitua todo o bloco de cálculo do IMC por:
const alturaNum = typeof perfil?.cd_altura === 'string' 
  ? parseFloat(perfil.cd_altura.replace(' cm', '')) / 100
  : perfil?.cd_altura / 100 || null;

const bmi = (perfil?.cd_peso_atual && alturaNum) 
  ? (perfil.cd_peso_atual / (alturaNum * alturaNum)).toFixed(1)
  : '-';

console.log("IMC:", bmi);  // Exibindo o resultado do IMC




const chartData = [...hist]
  .sort((a, b) => new Date(a.dt_treino_realizado) - new Date(b.dt_treino_realizado)) // Ordena do mais antigo para o mais novo
  .slice(-5); // Pega os últimos 7 registros

const labels = chartData.map(h => {
  const date = new Date(h.dt_treino_realizado);
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit' 
  });
});

const data = chartData.map(h => Number(h.cd_fk_peso));

  return (
 <View style={[styles.dashboardContainer, { 
    flex: 1,
    backgroundColor: '#0A0A0A',
    paddingTop: insets.top + 15, // Adiciona o paddingTop do estilo + safe area
    paddingBottom: insets.bottom,
    paddingLeft: Math.max(insets.left, 20), // Pega o maior valor entre a safe area e 20
    paddingRight: Math.max(insets.right, 20) // Pega o maior valor entre a safe area e 20
  }]}> 
  <ScrollView
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    contentContainerStyle={[styles.dashboardContainer, { paddingBottom: insets.bottom }]}
    style={{ flex: 1 }} // Adicione esta linha
  >
        <View style={styles.performanceHeader}>
          <Text style={styles.headerTitle}>Evolução Física</Text>
          <Text style={styles.headerSubtitle}>Acompanhe seu progresso detalhadamente</Text>
        </View>

      <View style={styles.treinoConcluidoCard}>
  
  <View>
    <Text style={styles.statValue}><Ionicons name="flame" size={24} color="#C70039" /> {totalTreinosConcluidos}</Text>
    <Text style={styles.statLabel}>Treinos Concluídos</Text>
  </View>
</View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{initialWeight}</Text>
            <Text style={styles.statLabel}>Peso Inicial</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentWeight}</Text>
            <Text style={styles.statLabel}>Peso Atual</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{bmi}</Text>
            <Text style={styles.statLabel}>Índice IMC</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{pesoMeta || '-'}</Text>
            <Text style={styles.statLabel}>Meta Definida</Text>
          </View>
        </View>

        <View style={styles.buttonGroupHorizontal}>
  <TouchableOpacity
    style={styles.recordButton}
    onPress={() => setModalMetaVisible(true)}
  >
    <Ionicons name="flag" size={16} color="#C70039" />
    <Text style={styles.recordButtonText}>Definir Meta</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.recordButton}
    onPress={() => setModalVisible(true)}
  >
    <Ionicons name="fitness" size={16} color="#C70039" />
    <Text style={styles.recordButtonText}>Nova Medição</Text>
  </TouchableOpacity>
</View>

        {data.length > 0 ? (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Histórico de Progresso</Text>
<BarChart
key={`chart-${hist.length}-${Date.now()}`} 
  data={{ 
    labels, 
    datasets: [{ 
      data,
      // Adiciona cores customizadas para cada barra
      colors: data.map(() => (opacity = 1) => `rgba(199, 0, 57, ${opacity})`)
    }] 
  }}
  width={width * 0.9}
  height={240}
  yAxisLabel=""
  yAxisSuffix=" kg"
  fromZero
  withHorizontalLabels={true}
  withVerticalLabels={true}
  showValuesOnTopOfBars={true} // MOSTRA VALORES EM CIMA DAS BARRAS
  withCustomBarColorFromData={true}
  flatColor={true}
  
  chartConfig={{
    backgroundColor: '#1A1A1A',
    backgroundGradientFrom: '#1A1A1A',
    backgroundGradientTo: '#1A1A1A',
    decimalPlaces: 1,
    barPercentage: 0.7,
    color: (opacity = 1) => `rgba(255, 193, 193, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 193, 193, ${opacity})`,
    fillShadowGradient: '#C70039',
    fillShadowGradientOpacity: 1,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#FFC1C1'
    },
    propsForBackgroundLines: {
      stroke: '#2D0D0D',
      strokeWidth: 1
    },
    propsForLabels: {
      fontSize: 11,
      fontWeight: '500'
    },
    // ESTILO DOS VALORES SOBRE AS BARRAS
    formatTopBarValue: (value) => `${value} kg`,
    propsForValuesOnTopOfBars: {
      fontSize: 12,
      fontWeight: 'bold',
      fill: '#FFFFFF', // Cor do texto
      textAnchor: 'middle',
      dy: -10 // Ajusta posição vertical
    }
  }}
  style={{
    marginVertical: 8,
    borderRadius: 16,
    paddingRight: 10,
    paddingTop: 10
  }}
/>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="stats-chart" size={40} color="#C70039" />
            <Text style={styles.emptyText}>Comece registrando suas primeiras medições!</Text>
          </View>
        )}

    {/* Modal Registrar Medição */}
<Modal animationType="fade" transparent visible={modalVisible}>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={[styles.modalText, { fontSize: 18, marginBottom: 20 }]}>
        Registro de Medição
      </Text>

      <TextInput
        style={[styles.modalInput, {
          backgroundColor: '#F8F8F8',
          borderColor: '#E0E0E0',
          color: '#5E0825'
        }]}
        placeholder="Peso atual (kg)"
        placeholderTextColor="#A0A0A0"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={[styles.modalButton, styles.cancelButton]}
          onPress={() => setModalVisible(false)}
        >
          <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.modalButton}
          onPress={submitDesempenho}
        >
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

{/* Modal Meta de Peso */}
<Modal animationType="fade" transparent visible={modalMetaVisible}>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={[styles.modalText, { fontSize: 18, marginBottom: 20 }]}>
        Definir Meta de Peso
      </Text>

      <TextInput
        style={[styles.modalInput, {
          backgroundColor: '#F8F8F8',
          borderColor: '#E0E0E0',
          color: '#5E0825'
        }]}
        placeholder="Peso desejado (kg)"
        placeholderTextColor="#A0A0A0"
        keyboardType="numeric"
        value={pesoMeta}
        onChangeText={setPesoMeta}
      />

      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={[styles.modalButton, styles.cancelButton]}
          onPress={() => setModalMetaVisible(false)}
        >
          <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.modalButton}
          onPress={savePesoMeta}
        >
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

      </ScrollView>
    </View>
  );
}


export default DesempenhoScreen;
