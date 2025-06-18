import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert, Animated, Modal, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { api } from '../../utils/api';
import styles from '../styles';



// ── ConfigScreen ──────────────────────────────────────────────────────────────
function ConfigScreen({ navigation, route }) {
  const { usuario } = route.params;
  const [professor, setProfessor] = useState(null);
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // ▲▲▲ Novo estado ▲▲▲
  const successScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${api}/professores/${usuario.id}`);
        setProfessor(await res.json());
      } catch {
        Alert.alert('Erro', 'Não foi possível carregar perfil');
      } finally {
        setLoading(false);
      }
    })();
  }, [usuario.id]);

const handleUpdate = async () => {
  if (
    !professor.nm_professor.trim() ||
    !professor.email_professor.trim() ||
    !professor.ds_especialidade.trim()
  ) {
    Alert.alert('Erro', 'Preencha todos os campos');
    return;
  }
  try {
    const res = await fetch(`${api}/professores/${professor.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nm_professor: professor.nm_professor,
        email_professor: professor.email_professor,
        ds_especialidade: professor.ds_especialidade
      })
    });
    
    if (!res.ok) throw new Error();
      const updated = await res.json();
      setProfessor(prev => ({ ...prev, ...updated }));
      setEditando(false);
      setShowSuccessModal(true); // ▲▲▲ Mostra o modal de sucesso ▲▲▲
      // Removida a animação anterior
    } catch {
      Alert.alert('Erro', 'Falha ao atualizar perfil');
    }
  };

const handleLogout = () => {
  setShowLogoutModal(false); // ▲▲▲ Fecha o modal ▲▲▲
  navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
};

  if (loading || !professor) {
    return <ActivityIndicator size="large" color="#C70039" style={styles.loader} />;
  }

  return (
    <SafeAreaView style={styles.configContainer}>
      <View style={styles.profileHeader}>
        <View style={styles.profileIcon}>
          <Ionicons name="person-circle" size={42} color="#FFF5F5" />
        </View>
        <View>
          <Text style={styles.profileTitle}>{professor.nm_professor}</Text>
          <Text style={styles.profileSubtitle}>Perfil do Professor</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nome completo</Text>
        {editando ? (
          <TextInput
            style={styles.inputField}
            value={professor.nm_professor}
            onChangeText={t => setProfessor(p => ({ ...p, nm_professor: t }))}
          />
        ) : (
          <Text style={[styles.inputField, styles.readonlyField]}>{professor.nm_professor}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-mail</Text>
        {editando ? (
          <TextInput
            style={styles.inputField}
            value={professor.email_professor}
            onChangeText={t => setProfessor(p => ({ ...p, email_professor: t }))}
            keyboardType="email-address"
          />
        ) : (
          <Text style={[styles.inputField, styles.readonlyField]}>{professor.email_professor}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Especialidade</Text>
        {editando ? (
          <TextInput
            style={styles.inputField}
            value={professor.ds_especialidade}
            onChangeText={t => setProfessor(p => ({ ...p, ds_especialidade: t }))}
          />
        ) : (
          <Text style={[styles.inputField, styles.readonlyField]}>{professor.ds_especialidade}</Text>
        )}
      </View>

     {/* Botão EDITAR/SALVAR (agora com destaque maior) */}
      <TouchableOpacity
        style={[styles.editButton, styles.editButton, editando && styles.saveButton]}
        onPress={editando ? handleUpdate : () => setEditando(true)}
      >
        <Ionicons 
          name={editando ? 'save' : 'create'} 
          size={24} 
          color="#FFF" 
        />
        <Text style={styles.buttonText}>
          {editando ? 'SALVAR ALTERAÇÕES' : 'EDITAR PERFIL'}
        </Text>
      </TouchableOpacity>

      {/* Botões secundários em linha */}
      <View style={styles.secondaryButtons}>
        <TouchableOpacity
          style={[styles.smallButton, styles.registerButton]}
          onPress={() => navigation.navigate('ProfessorCadastro')}
        >
          <Ionicons name="person-add" size={18} color="#FFF" />
          <Text style={styles.smallButtonText}>CADASTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.smallButton, styles.logoutButton]}
          onPress={() => setShowLogoutModal(true)}
        >
          <Ionicons name="exit" size={18} color="#8A0B36" />
          <Text style={[styles.smallButtonText, styles.logoutText]}>SAIR</Text>
        </TouchableOpacity>
      </View>

      {/* FAQ como link/texto */}
        <TouchableOpacity 
            style={styles.faqLink}
            onPress={() => navigation.navigate('PerguntasFrequentes')}
            >
            <View style={styles.faqContent}>
                <Ionicons name="help-circle" size={20} color="#5E0825" style={styles.faqIcon} />
                <Text style={styles.faqLinkText}>Precisa de ajuda? Acesse as perguntas frequentes</Text>
            </View>
        </TouchableOpacity>

       {/* ▲▲▲ MODAL DE SUCESSO ▲▲▲ */}
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

export default ConfigScreen;