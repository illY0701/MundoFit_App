import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';


function PerguntasFrequentesScreen({ navigation }) {
  const faqData = 
[
  {
    pergunta: "1. Login e Cadastro",
    resposta: "Como faço para me cadastrar no aplicativo?\nAcesse a tela de login, clique em \"Cadastro\" e preencha os campos obrigatórios (nome, e-mail, senha e tipo de usuário).\n\nO que fazer se esquecer minha senha?\nClique em \"Esqueci minha senha\" na tela de login e siga as instruções enviadas por e-mail.\n\nPosso usar o mesmo e-mail para cadastrar como aluno e instrutor?\nNão. Cada e-mail só pode ser vinculado a uma única conta (aluno ou instrutor).\n\nQual o tamanho mínimo da senha?\nA senha deve ter pelo menos 6 caracteres.\n\nPor que não consigo fazer login?\nVerifique se:\n- Seu e-mail e senha estão corretos.\n- Você já possui cadastro (caso contrário, faça-o primeiro).\n- Os campos obrigatórios estão preenchidos."
  },
  {
    pergunta: "2. Cadastro de Treinos (Instrutor)",
    resposta: "Quantos treinos posso cadastrar para um aluno?\nCada aluno pode ter no máximo 5 treinos ativos ao mesmo tempo.\n\nO que acontece se eu não preencher todos os campos ao criar um treino?\nO sistema exibirá um erro e destacará os campos obrigatórios faltantes.\n\nPosso cadastrar um treino sem exercícios?\nNão. Todo treino deve ter pelo menos um exercício registrado.\n\nE se a internet cair durante o cadastro?\nO sistema não salvará o treino. Recomendamos preencher os dados novamente após reconectar."
  },
  {
    pergunta: "3. Visualização de Treinos (Aluno/Instrutor)",
    resposta: "Por que não consigo ver os treinos do meu aluno?\nVerifique se você é o instrutor vinculado a esse aluno. Apenas ele e seu instrutor têm acesso.\n\nO que significa a mensagem \"Nenhum treino disponível\"?\nOu o aluno não tem treinos cadastrados ou houve um erro de carregamento (tente atualizar a página).\n\nOs treinos estão demorando para carregar. O que fazer?\nVerifique sua conexão com a internet e clique em \"Tentar novamente\"."
  },
  {
    pergunta: "4. Histórico de Desempenho (Aluno)",
    resposta: "O que aparece no meu histórico?\nSeus treinos finalizados, com gráficos ou tabelas de desempenho (carga, tempo, frequência).\n\nPor que meu histórico está vazio?\nVocê ainda não completou treinos registrados ou não há dados suficientes (mínimo de 4 semanas).\n\nPosso comparar meu desempenho ao longo do tempo?\nSim. O histórico mostra sua evolução com base nos treinos concluídos."
  },
  {
    pergunta: "5. Problemas Gerais",
    resposta: "O aplicativo funciona sem internet?\nNão. É necessário conexão ativa para todas as funcionalidades.\n\nComo entro em contato com o suporte?\nEnvie um e-mail para suporte@apptreino.com com detalhes do problema."
  }
];


  return (
    <SafeAreaView style={styles.faqContainer}>
      <View style={styles.faqHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#5E0825" />
        </TouchableOpacity>
        <Text style={styles.faqTitle}>Perguntas Frequentes</Text>
      </View>

      <FlatList
        data={faqData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{item.pergunta}</Text>
            <Text style={styles.faqAnswer}>{item.resposta}</Text>
          </View>
        )}
        contentContainerStyle={styles.faqList}
      />
    </SafeAreaView>
  );
}


export default PerguntasFrequentesScreen;
