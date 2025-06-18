import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  // ================================
  // ESTILOS GERAIS (Compartilhados)
  // ================================
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#0A0A0A'
  },
  container: { 
    flex: 1,
    backgroundColor: '#0A0A0A',
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  },
  messageContainer: {
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#C70039'
  },
  messageText: {
    color: '#FFC1C1',
    fontSize: 16,
    textAlign: 'center'
  },

  
  // ================================
  // MAIN SCREEN (MainScreen.jsx)
  // ================================
  headerContainer: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2D0D0D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  welcomeContainer: {
    marginBottom: 8,
  },
  welcomeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
  },
  userName: {
    color: '#8A0B36',
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  calendarTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400'
  },
  calendarScroll: {
    maxHeight: 90,
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2D0D0D',
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  dayContainer: {
    backgroundColor: '#1A1A1A',
    width: 42,
    height: 42,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedDay: {
    backgroundColor: '#8A0B36',
    borderColor: '#FF5A78',
  },
  weekDayText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 2
  },
  dayText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700'
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400'
  },
  viewAllButton: {
    padding: 5,
  },
  viewAllText: {
    color: '#820917',
    fontSize: 14,
    fontWeight: '500'
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    overflow: 'hidden',
    borderLeftWidth: 5,
    borderLeftColor: '#8A0B36',
    shadowColor: '#FF3864',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  cardDate: {
    color: '#FFC1C1',
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: 'rgba(138, 11, 54, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  cardText: {
    color: '#8A0B36',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  cardStatus: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    marginRight: 8
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500'
  },
  cardButton: {
    backgroundColor: '#8A0B36',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 15
  },
  cardButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600'
  },

  weekNavigation: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
  paddingHorizontal: 20,
},
weekTitle: {
  color: '#8A0B36',
  fontSize: 14,
  fontWeight: '500',
},
navButton: {
  backgroundColor: '#1A1A1A',
  width: 30,
  height: 30,
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
},
navButtonText: {
  color: '#C70039',
  fontSize: 16,
  fontWeight: 'bold',
},
completedWorkoutDay: {
  backgroundColor: '#4CAF50',
},
completedWorkoutDayText: {
  color: '#FFFFFF',
},
  // ================================
  // TREINO SCREEN (TreinoScreen.jsx)
  // ================================
  screenHeader: {
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2D0D0D',
  },
  screenTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'left',
    marginBottom: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#2D0D0D',
  },
  searchInput: {
    flex: 1,
    color: '#FFD1DC',
    fontSize: 16,
    marginLeft: 12,
  },
  daysFilterContainer: {
    marginBottom: 5,
    paddingBottom: 10,
  },
  daysLabel: {
    color: '#ab0518',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 5,
  },
  daysRow: {
    flexDirection: 'row',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2D0D0D',
  },
  daysScroll: {
    paddingBottom: 5,
  },
  dayButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  selectedDayButton: {
    backgroundColor: '#8A0B36',
    borderColor: '#8A0B36',
  },
  dayButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedDayButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  workoutsContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  cardTouchable: {
    marginBottom: 16,
  },
  treinoCard: { // Renomeado para evitar conflito
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 18,
    overflow: 'hidden',
    borderLeftWidth: 4,
    borderLeftColor: '#8A0B36',
    marginBottom: 20,
  },
  treinoCardHeader: { // Renomeado
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
    lineHeight: 22,
  },
  treinoMeta: {
    flexDirection: 'row',
    gap: 10,
  },
  treinoDay: {
    color: '#FFC1C1',
    fontSize: 13,
    fontWeight: '600',
    backgroundColor: 'rgba(138, 11, 54, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  treinoDate: {
    color: '#FFC1C1',
    fontSize: 13,
    fontWeight: '600',
    backgroundColor: 'rgba(138, 11, 54, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  exerciciosContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 193, 193, 0.2)',
  },
  exerciciosTitle: {
    color: '#FFC1C1',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  exerciseIcon: {
    marginRight: 10,
  },
  exerciseName: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    marginTop: 20,
  },
  emptyIcon: {
    marginBottom: 15,
    opacity: 0.6,
  },
  emptyText: {
    color: '#8A0B36',
    fontSize: 14,
    textAlign: 'center',
    justifyContent: 'center',
    maxWidth: '85%',
    lineHeight: 20,
    marginTop: 10,
  },

  // ================================
  // TREINO DETALHES (TreinoDetalhes.jsx)
  // ================================
  // (Adicionar estilos específicos quando necessário)

  // ================================
  // DESEMPENHO (DesempenhoScreen.jsx)
  // ================================
  dashboardContainer: {
    flexGrow: 1,
    backgroundColor: '#0A0A0A',
  },
  performanceHeader: {
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D0D0D',
    alignItems: 'left',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'left',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8A0B36',
    textAlign: 'left',
    marginTop: 4,
  },
  treinoConcluidoCard: {
    backgroundColor: 'rgba(138, 11, 54, 0.2)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  statValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 13,
    color: '#A0A0A0',
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonGroupHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginVertical: 12,
  },
  recordButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#8A0B36',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  recordButtonText: {
    color: '#FFC1C1',
    fontSize: 14,
    fontWeight: '600',
  },
chartContainer: {
  backgroundColor: '#1A1A1A',
  borderRadius: 16,
  padding: 16,
  marginTop: 16,
  paddingBottom: 30 // Espaço extra para os labels
},
  chartTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  
  // Adicione isso no seu objeto de estilos
valuesOnTop: {
  fontSize: 12,
  fontWeight: 'bold',
  color: '#FFFFFF',
  textAlign: 'center',
  marginTop: -12
},
  performanceEmptyState: { // Renomeado
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  performanceEmptyIcon: { // Renomeado
    marginBottom: 15,
    opacity: 0.7,
  },
  performanceEmptyText: { // Renomeado
    color: '#8A0B36',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },

  // ================================
  // PERFIL (PerfilScreen.jsx)
  // ================================
    configContainer: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    paddingHorizontal: 20,

  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
    marginBottom: 25,
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
editButton: {
  backgroundColor: '#8A0B36',
  borderRadius: 14,
  paddingVertical: 18,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 15,
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  width: '100%',
},

logoutButton: {
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: '#8A0B36',
  marginBottom: 25, // Aumentei para dar espaço ao divider
},

// Estilo da linha divisória (adicione se não existir)
divider: {
  height: 1,
  backgroundColor: '#2D2D2D',
  marginBottom: 15,
  width: '100%',
},

buttonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '500',
  fontFamily: 'Roboto-Bold',
  letterSpacing: 0.5,
  marginLeft: 10,
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
  alignItems: 'center', // Alinha ícone e texto na mesma linha
},
faqIcon: {
  marginRight: 8, // Espaço entre o ícone e o texto
},
faqLinkText: {
  color: '#5E0825',
  fontSize: 14,
  fontFamily: 'Roboto-Regular',
  textDecorationLine: 'underline', // Sublinhado apenas no texto
  textDecorationColor: '#5E0825', // Cor do sublinhado
},
  // Overlay de sucesso
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
  // ================================
  // PERGUNTAS FREQUENTES (PerguntasFrequentesScreen.jsx)
  // ================================
  faqContainer: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: 16,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  faqTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#FFFF',
    marginLeft: 15,
  },
  faqList: {
    paddingBottom: 30,
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
  faqButton: {
    backgroundColor: '#5E0825',
    marginTop: 10,
  },

  // ================================
  // COMPONENTES COMPARTILHADOS
  // ================================
  // Calendar.jsx
  fullCalendarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  fullCalendarModalContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    maxHeight: Dimensions.get('window').height * 0.8,
    borderWidth: 1,
    borderColor: '#2D0D0D',
  },
  fullCalendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2D0D0D',
  },
  fullCalendarTitle: {
    color: '#FFC1C1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  calendarTheme: {
    backgroundColor: '#1A1A1A',
    calendarBackground: '#1A1A1A',
    textSectionTitleColor: '#FFC1C1',
    selectedDayBackgroundColor: '#8A0B36',
    selectedDayTextColor: '#FFF5F5',
    todayTextColor: '#C70039',
    dayTextColor: '#FFFFFF',
    textDisabledColor: '#555',
    arrowColor: '#FFC1C1',
    monthTextColor: '#FFC1C1',
    indicatorColor: '#FFC1C1',
    textDayFontWeight: '400',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '500',
    textDayFontSize: 14,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 12,
  },
  fullCalendarButtonText: {
    color: '#8A0B36',
    fontSize: 14,
    fontWeight: '500'
  },

  // Modal (Componente compartilhado)
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
  modalButtonText: { // Renomeado
    color: '#FFFF',
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.5,
  },
  cancelButtonText: {
    color: '#8A0B36',
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    fontSize: 16,
    
  },
  selectedWorkoutDay: {
    backgroundColor: '#3CB371',
    borderRadius: 8,
    padding: 6
  },
  selectedWorkoutDayText: {
    color: '#fff',
    fontWeight: 'bold'
  },
});