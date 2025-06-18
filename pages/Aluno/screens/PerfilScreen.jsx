import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity,
  Alert, Animated, Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import styles from '../styles';
import { api } from '../../utils/api';
import { Loading, Message } from '../components/Helpers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function PerfilScreen({ route, navigation }) {
  const aluno = route.params.aluno || route.params.usuario || {};
  const isFocused = useIsFocused();
  const [dados, setDados] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const fetchPerfil = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${api}/alunos/${aluno.id}`);
      const data = await r.json();

      if (data.dt_cadastro) {
        const date = new Date(data.dt_cadastro);
        data.dt_cadastro = date.toLocaleDateString('pt-BR');
      }

      setDados(data);
    } catch (e) {
      console.error('Erro ao carregar perfil:', e);
      Alert.alert('Erro', 'Não foi possível carregar o perfil');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused && aluno.id) fetchPerfil();
  }, [isFocused, aluno.id]);

  const handleUpdate = async () => {
    if (!dados.nm_aluno || !dados.cd_peso || !dados.cd_altura) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    try {
      const res = await fetch(`${api}/alunos/${dados.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dados,
          cd_peso: Number(dados.cd_peso),
          cd_altura: Number(dados.cd_altura)
        })
      });

      if (!res.ok) throw new Error();

      setEdit(false);
      setShow(true);
      setShowSuccessModal(true);

      Animated.sequence([
        Animated.timing(scale, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.delay(1000),
        Animated.timing(scale, { toValue: 0, duration: 300, useNativeDriver: true })
      ]).start(() => setShow(false));
    } catch {
      Alert.alert('Erro', 'Falha ao atualizar perfil');
    }
  };

  
  const handleLogout = () => {
    setShowLogoutModal(false);
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  if (loading) return <Loading />;
  if (!dados) return <Message text="Perfil não encontrado." color="#690202" />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.profileHeader, { paddingTop: insets.top }]}>
          <View style={styles.profileIcon}>
            <Ionicons name="person-circle" size={42} color="#FFF5F5" />
          </View>
          <View>
            <Text style={styles.profileTitle}>{dados.nm_aluno}</Text>
            <Text style={styles.profileSubtitle}>Perfil do Aluno</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nome completo</Text>
          {edit ? (
            <TextInput
              style={styles.inputField}
              value={dados.nm_aluno}
              onChangeText={t => setDados({ ...dados, nm_aluno: t })}
            />
          ) : (
            <Text style={[styles.inputField, styles.readonlyField]}>
              {dados.nm_aluno}
            </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Altura (cm)</Text>
          {edit ? (
            <TextInput
              style={styles.inputField}
              value={dados.cd_altura.toString()}
              keyboardType="numeric"
              onChangeText={t =>
                setDados({ ...dados, cd_altura: t.replace(/[^0-9]/g, '') })
              }
            />
          ) : (
            <Text style={[styles.inputField, styles.readonlyField]}>
              {dados.cd_altura} cm
            </Text>
          )}
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.editButton, edit && styles.saveButton]}
            onPress={edit ? handleUpdate : () => setEdit(true)}
          >
            <Ionicons name={edit ? 'save' : 'create'} size={24} color="#FFF" />
            <Text style={styles.buttonText}>
              {edit ? 'SALVAR ALTERAÇÕES' : 'EDITAR PERFIL'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.editButton, styles.logoutButton]}
            onPress={() => setShowLogoutModal(true)}
          >
            <Ionicons name="exit" size={24} color="#8A0B36" />
            <Text style={[styles.buttonText, styles.logoutText]}>SAIR</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.faqLink}
            onPress={() => navigation.navigate('PerguntasFrequentes')}
          >
            <View style={styles.faqContent}>
              <Ionicons
                name="help-circle"
                size={20}
                color="#5E0825"
                style={styles.faqIcon}
              />
              <Text style={styles.faqLinkText}>
                Precisa de ajuda? Acesse as perguntas frequentes
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Perfil atualizado com sucesso!</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowSuccessModal(false)}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>FECHAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showLogoutModal}
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Tem certeza que deseja sair da sua conta?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default PerfilScreen;
