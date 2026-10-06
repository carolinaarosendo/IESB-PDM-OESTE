import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import DespesasRecentes from './screens/DespesasRecentes';
import TodasDespesas from './screens/TodasDespesas';
import GerenciarDespesa from './screens/GerenciarDespesa';
import IconButton from './components/IconButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DUMMY_DESPESAS = [
  { id: '1', descricao: 'Conta de luz', valor: 100.99, categoria: 'Contas', data: new Date(2026, 8, 11) },
  { id: '2', descricao: 'Conta de água', valor: 40.99, categoria: 'Contas', data: new Date(2026, 8, 14) },
  { id: '3', descricao: 'Almoço', valor: 32.5, categoria: 'Alimentação', data: new Date(2026, 9, 1) },
  { id: '4', descricao: 'Uber', valor: 18.0, categoria: 'Transporte', data: new Date(2026, 9, 2) },
  { id: '5', descricao: 'Cinema', valor: 45.0, categoria: 'Lazer', data: new Date(2026, 9, 3) },
];

function BottomTabScreen({ navigation, despesas }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        headerRight: () => (
          <IconButton
            icon="add-circle-outline"
            size={28}
            color="#2e6ef7"
            onPress={() => navigation.navigate('GerenciarDespesa')}
          />
        ),
      }}
    >
      <Tab.Screen
        name="DespesasRecentes"
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />,
        }}
      >
        {() => <DespesasRecentes despesas={despesas} />}
      </Tab.Screen>
      <Tab.Screen
        name="TodasDespesas"
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => <Ionicons name="wallet-outline" size={size} color={color} />,
        }}
      >
        {() => <TodasDespesas despesas={despesas} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [despesas, setDespesas] = useState(DUMMY_DESPESAS);

  const handleAdicionar = (novaDespesa) => {
    setDespesas((atuais) => [...atuais, novaDespesa]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Despesas" options={{ headerShown: false }}>
          {(props) => <BottomTabScreen {...props} despesas={despesas} />}
        </Stack.Screen>
        <Stack.Screen name="GerenciarDespesa" options={{ title: 'Gerenciar Despesa' }}>
          {(props) => <GerenciarDespesa {...props} onAdicionar={handleAdicionar} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}