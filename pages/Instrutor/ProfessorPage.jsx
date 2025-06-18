import AlunosListScreen from './screens/AlunosListScreen';
import AlunoDetalhesScreen from './screens/AlunoDetalhesScreen';
import ConfigScreen from './screens/ConfigScreen';
import ProfessorCadastroScreen from './screens/ProfessorCadastroScreen';
import PerguntasFrequentesScreen from './screens/PerguntasFrequentesScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Stack = createStackNavigator();

// ── Navigator ─────────────────────────────────────────────────────────────────
export default function ProfessorPage({ route }) {
  return (
 <Stack.Navigator
  initialRouteName="AlunosList"
  screenOptions={{
    headerStyle: { 
      backgroundColor: '#0A0A0A',
      elevation: 0, 
      shadowOpacity: 0,
      borderBottomWidth: 0
    },
    headerTintColor: '#8A0B36',
    headerTitleStyle: { 
      fontWeight: 'bold',
      fontSize: 18,
      color: '#FFFFFF'
    }
  }}
>
<Stack.Screen
  name="AlunosList"
  component={AlunosListScreen}
  initialParams={route.params}
  options={({ navigation }) => ({
    title: 'MEUS ALUNOS',
    headerBackVisible: false,
    headerLeft: () => null,
    headerTitleAlign: 'left',
    headerStyle: {
      backgroundColor: '#0A0A0A',
      borderBottomWidth: 1,
      borderBottomColor: '#5E0825',
      shadowColor: '#8A0B36',
      elevation: 5,
    },
    headerTitleContainerStyle: {
      left: 20,
      right: 20
    },
    headerTitleStyle: {
      fontFamily: 'Roboto-Bold',
      fontSize: 20,
      color: '#8A0B36',
      textTransform: 'uppercase',
      paddingLeft: 0 
    },
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('ConfigScreen', { usuario: route.params.usuario })}
        style={{ 
          marginRight: 20,
          padding: 5,
          borderRadius: 8,
          backgroundColor: 'rgba(199, 0, 57, 0.1)'
        }}
      >
        <Ionicons 
          name="settings" 
          size={26} 
          color="#8A0B36" 
        />
      </TouchableOpacity>
    )
  })}
/>
      <Stack.Screen
        name="AlunoDetalhes"
        component={AlunoDetalhesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfigScreen"
        component={ConfigScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="PerguntasFrequentes"
        component={PerguntasFrequentesScreen}
        options={{ headerShown: false }}
      />

   
<Stack.Screen
  name="ProfessorCadastro"
  component={ProfessorCadastroScreen}
  options={{ headerShown: false }}
/>

    </Stack.Navigator>
  );
}