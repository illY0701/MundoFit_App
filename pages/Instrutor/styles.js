import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  // ─────────────── GERAL ───────────────
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },

  // ─────────────── HEADER ───────────────
  headerWrapper: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 40,
    paddingHorizontal: 20,
    backgroundColor: '#0A0A0A',
  },
  alunoHeader: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    marginBottom: 20,
    shadowColor: '#8A0B36',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  alunoNome: {
    color: '#FFFFFF',
    fontSize: 26,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  alunoInfo: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Roboto-Medium',
  },

  // ─────────────── MODAL DE CONFIRMAÇÃO ───────────────
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    color: '#5E0825',
    fontFamily: 'Roboto-Medium',
    lineHeight: 24,
    marginBottom: 25,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#8A0B36',
  },
  cancelButton: {
    backgroundColor: '#EEEEEE',
  },
  buttonText: {
    color: '#8A0B36',
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.5,
  },
  cancelButtonText: {
    color: '#8A0B36',
  },
  // ─────────────── BUSCA DE ALUNOS (MANTIDO) ───────────────
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },

  // ─────────────── LISTA DE ALUNOS ───────────────
  card: {
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#8A0B36',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  cardInner: {
    padding: 20,
    backgroundColor: '#1A1A1A',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    marginBottom: 8,
  },
  cardText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    opacity: 0.9,
  },

treinoDetailsContainer: {
  marginTop: 10,
  paddingHorizontal: 10,
  borderTopWidth: 1,
  borderTopColor: '#2D2D2D',
  paddingTop: 10,
},
treinoStatsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 12,
},
treinoStat: {
  flex: 1,
  alignItems: 'center',
  padding: 8,
  backgroundColor: 'rgba(94, 8, 37, 0.18)',
  borderRadius: 6,
  marginHorizontal: 3,
},
treinoStatLabel: {
  fontSize: 10,
  color: '#E8B5C7',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
},
treinoStatValue: {
  fontSize: 14,
  color: '#8A0B36',
  fontWeight: 'bold',
  marginTop: 3,
},
treinoInfo: {
  marginBottom: 10,
  backgroundColor: 'rgba(94, 8, 37, 0.18)',
  padding: 10,
  borderRadius: 6,
},
treinoInfoLabel: {
  fontSize: 10,
  color: '#E8B5C7',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
  marginBottom: 3,
},
treinoInfoText: {
  fontSize: 14,
  color: '#FFF',
  lineHeight: 18,
},
treinoDate: {
  fontSize: 11,
  color: '#C79BAE',
  textAlign: 'right',
  marginTop: 5,
  fontStyle: 'italic',
},
treinoCard: {
  backgroundColor: '#1A1A1A',
  borderRadius: 16,
  padding: 20,
  marginHorizontal: 20,
  marginBottom: 15,
  borderLeftWidth: 6,
  borderLeftColor: '#8A0B36',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 6,
},

  treinoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
  },
  treinoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.3,
  },
  treinoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    lineHeight: 22,
    marginBottom: 6,
  },
  treinoDate: {
    color: '#8A0B36',
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    marginTop: 12,
    letterSpacing: 0.5,
  },
  treinoActions: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },

treinoDetails: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 12,
  paddingHorizontal: 10,
},
detailItem: {
  alignItems: 'center',
  flex: 1,
},
detailLabel: {
  color: '#8A0B36',
  fontSize: 12,
  fontFamily: 'Roboto-Bold',
  marginBottom: 4,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
},
detailValue: {
  color: '#FFFFFF',
  fontSize: 14,
  fontFamily: 'Roboto-Bold',
},
  // ─────────────── BOTÕES ───────────────
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 25,
    gap: 15,
  },
  actionButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#8A0B36',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#8A0B36',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.8,
  },

modalContainer: {
  flex: 1,
  backgroundColor: '#0A0A0A',
  paddingHorizontal: 20,
  paddingTop: 10,
},
modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 25,
  paddingBottom: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#2D2D2D',
},
modalTitle: {
  fontSize: 24,
  fontWeight: '800',
  color: '#FFFFFF',
  fontFamily: 'Roboto-Bold',
  letterSpacing: 0.5,
},
recommendationBox: {
  backgroundColor: '#1A1A1A',
  borderRadius: 16,
  padding: 20,
  marginBottom: 20,
  borderLeftWidth: 4,
  borderLeftColor: '#8A0B36',
},
recommendationTitle: {
  color: '#8A0B36',
  fontSize: 16,
  fontFamily: 'Roboto-Bold',
  marginBottom: 10,
},
recommendationText: {
  color: '#CCCCCC',
  fontSize: 14,
  fontFamily: 'Roboto-Regular',
  lineHeight: 22,
},
input: {
  backgroundColor: '#1A1A1A',
  borderRadius: 10,
  padding: 16,
  fontSize: 16,
  color: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#2D2D2D',
  marginBottom: 15,
  fontFamily: 'Roboto-Regular',
  placeholderTextColor: '#888',
},

daysContainer: {
  marginBottom: 20,
},
daysScroll: {
  paddingVertical: 8,
},
dayButton: {
  backgroundColor: '#1A1A1A',
  borderRadius: 20,
  paddingVertical: 12,
  paddingHorizontal: 25,
  borderWidth: 1,
  borderColor: '#2D2D2D',
  marginRight: 10,
},
selectedDayButton: {
  backgroundColor: '#8A0B36',
  borderColor: '#FFFFFF',
},
dayButtonText: {
  color: '#CCCCCC',
  fontFamily: 'Roboto-Medium',
  fontSize: 14,
},
selectedDayText: {
  color: '#FFFFFF',
  fontWeight: '700',
},
sectionTitle: {
  color: '#8A0B36',
  fontSize: 16,
  fontFamily: 'Roboto-Bold',
  marginVertical: 12,
},
exerciseOption: {
  backgroundColor: '#1A1A1A',
  borderRadius: 12,
  padding: 18,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: '#2D2D2D',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
selectedExercise: {
  backgroundColor: '#8A0B36',
  borderColor: '#FFFFFF',
},
exerciseText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontFamily: 'Roboto-Medium',
  flex: 1,
},
customExerciseContainer: {
  flexDirection: 'row',
  gap: 10,
  marginBottom: 15,
},
addButton: {
  backgroundColor: '#8A0B36',
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 12,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  justifyContent: 'center',
  minWidth: 70,
  height: 60,
},
submitButton: {
  backgroundColor: '#8A0B36',
  borderRadius: 14,
  paddingVertical: 18,
  paddingHorizontal: 40,
  alignSelf: 'center',
  marginVertical: 20,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 12,
  shadowColor: '#8A0B36',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.4,
  shadowRadius: 8,
  elevation: 3,
},
disabledButton: {
  opacity: 0.6,
},
customExerciseItem: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#2D2D2D',
  padding: 12,
  borderRadius: 8,
  marginBottom: 8,
},
recommendButton: {
  backgroundColor: '#1A1A1A',
  borderRadius: 12,
  padding: 16,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: '#8A0B36',
},
emptyExerciseText: {
  color: '#888',
  textAlign: 'center',
  padding: 20,
  fontFamily: 'Roboto-Italic',
},
multiline: {
  minHeight: 100,
  textAlignVertical: 'top',
},
inputMargin: {
  marginBottom: 20,
},

selectedExercisesContainer: {
  marginTop: 15,
  marginBottom: 20,
  padding: 15,
  backgroundColor: 'rgba(94, 8, 37, 0.3)',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: 'rgba(138, 11, 54, 0.5)',
},

selectedExerciseItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgba(138, 11, 54, 0.2)',
  borderRadius: 8,
  padding: 12,
  marginBottom: 8,
},

selectedExerciseText: {
  color: '#FFC1C1',
  fontSize: 16,
  flex: 1,
},

removeButton: {
  padding: 4,
  marginLeft: 10,
},

exerciseItem: {
  backgroundColor: '#1A1A1A',
  borderRadius: 8,
  padding: 15,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: '#2D0D0D',
},

selectedExercise: {
  backgroundColor: 'rgba(138, 11, 54, 0.3)',
  borderColor: '#8A0B36',
},

exerciseText: {
  color: 'white',
  fontSize: 16,
},

emptyExerciseText: {
  color: '#8A0B36',
  fontSize: 16,
  textAlign: 'center',
  padding: 20,
  fontStyle: 'italic',
},



  // ─────────────── CONFIG SCREEN (MANTIDO) ───────────────
  configContainer: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
    marginBottom: 25,
    marginTop: 10,
  },
  profileIcon: {
    backgroundColor: '#5E0825',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  profileSubtitle: {
    color: '#5E0825',
    fontSize: 14,
    marginTop: 4,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    color: '#5E0825',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
    marginLeft: 5,
  },
  inputField: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  readonlyField: {
    backgroundColor: '#1A1A1A',
    borderColor: '#2D2D2D',
    color: '#CCCCCC',
  },
    // ─────────────── ESTILOS DOS BOTÕES ───────────────
  editButton: {
    backgroundColor: '#8A0B36',
    borderRadius: 14,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  saveButton: {
    backgroundColor: '#5E0825',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
  },
  smallButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '48%',
  },
  registerButton: {
    backgroundColor: '#5E0825',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8A0B36',
  },
  smallButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    color: '#FFFF',
  },
  logoutText: {
    color: '#8A0B36',
  },
faqLink: {
  marginTop: 10,
  paddingVertical: 10,
  alignSelf: 'center',
},
faqContent: {
  flexDirection: 'row',
  alignItems: 'center',
},
faqIcon: {
  marginRight: 8,
},
faqLinkText: {
  color: '#5E0825',
  fontSize: 14,
  fontFamily: 'Roboto-Regular',
  textDecorationLine: 'underline',
  textDecorationColor: '#5E0825',
},
  successOverlay: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: '#0A0A0AEE',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#8A0B36',
  },

  // ─────────────── COMPONENTES COMPARTILHADOS ───────────────
  emptyText: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 16,
    fontFamily: 'Roboto-Italic',
    marginTop: 30,
  },
  divider: {
    height: 1,
    backgroundColor: '#2D2D2D',
    marginVertical: 20,
  },
  icon: {
    color: '#8A0B36',
  },

  inputText: {
  fontSize: 16,
  color: '#FFF',
},

placeholderText: {
  fontSize: 16,
  color: '#888',
},

modalContentFull: {
  backgroundColor: '#5E0825',
  borderRadius: 10,
  padding: 20,
  width: '80%',
  maxHeight: '70%',
},

modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
},

modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FFF',
},

modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.7)',
  justifyContent: 'center',
  alignItems: 'center',
},

modalOption: {
  paddingVertical: 15,
  borderBottomColor: '#8A0B36',
  borderBottomWidth: 1,
},

modalOptionText: {
  color: '#FFF',
  fontSize: 16,
  textAlign: 'center',
},

// ─────────────── FAC (Perguntas Frequentes) ───────────────
  faqContainer: {
  flex: 1,
  backgroundColor: '#0A0A0A',
  padding: 16,
},
faqHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
  paddingTop: 35,
},
faqTitle: {
  fontSize: 22,
  fontWeight: '500',
  color: '#FFFF',
  marginLeft: 15,
},
faqItem: {
  backgroundColor: '#1A1A1A',
  borderRadius: 10,
  padding: 16,
  marginBottom: 15,
  elevation: 2,
},
faqQuestion: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#8A0B36',
  marginBottom: 10,
},
faqAnswer: {
  fontSize: 16,
  color: '#FFFF',
  lineHeight: 22,
},
faqList: {
  paddingBottom: 30,
},

faqButton: {
  backgroundColor: '#5E0825',
  marginTop: 10,
},

cadastroContainer: {
  padding: 20,
  paddingTop: 40,
},
cadastroHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 30,
},
cadastroTitle: {
  fontSize: 24,
  fontWeight: '500',
  color: '#FFFF',
  marginLeft: 15,
},
});