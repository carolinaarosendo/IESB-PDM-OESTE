import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { useAppTheme } from '../store/theme-context';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes({ navigation }) {
  const { expenses } = useExpenses();
  const { theme } = useAppTheme();

  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

  const recentes = expenses.filter((item) => new Date(item.date) >= seteDiasAtras);

  function handleSelecionar(id) {
    navigation.navigate('GerenciarDespesa', { expenseId: id });
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <DespesaSaida despesas={recentes} periodo="Últimos 7 dias" onSelecionar={handleSelecionar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});