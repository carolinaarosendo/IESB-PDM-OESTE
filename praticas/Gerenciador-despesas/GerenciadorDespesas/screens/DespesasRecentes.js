import React from 'react';
import { View, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes({ despesas }) {
  const recentes = [...despesas]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 5);

  return (
    <View style={styles.container}>
      <DespesaSaida despesas={recentes} periodo="Recentes" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});