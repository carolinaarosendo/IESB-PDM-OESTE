import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ despesas, periodo }) {
  const total = despesas.reduce((acumulador, item) => acumulador + item.amount, 0);
  const ultrapassouLimite = total > 200;

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={styles.quantidade}>
        {despesas.length} {despesas.length === 1 ? 'despesa' : 'despesas'}
      </Text>
      <Text style={[styles.total, ultrapassouLimite && styles.totalAlerta]}>
        R$ {total.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#eef2ff', padding: 14, borderRadius: 8, marginBottom: 8 },
  periodo: { color: '#555', fontSize: 13 },
  quantidade: { color: '#777', fontSize: 12, marginTop: 2 },
  total: { color: '#1c1c1c', fontSize: 22, fontWeight: 'bold', marginTop: 4 },
  totalAlerta: { color: '#d32f2f' },
});