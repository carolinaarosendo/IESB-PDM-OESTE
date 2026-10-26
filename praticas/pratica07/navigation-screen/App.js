import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodasDespesas from './screens/TodasDespesas';
import DespesasRecentes from './screens/DespesasRecentes';
import GerenciarDespesa from './screens/GerenciarDespesa';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const Tab = createBottomTabNavigator();

  function BottonTabScreen() {
    return (
      <Tab.Navigator>
        <Tab.Screen name='DespesasRecentes' component={DespesasRecentes} />
        <Tab.Screen name='TodasDespesas' component={TodasDespesas} />
      </Tab.Navigator>
    )
  }
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Despesas' component={BottonTabScreen} />
        <Stack.Screen name='GerenciarDespesa' component={GerenciarDespesa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
