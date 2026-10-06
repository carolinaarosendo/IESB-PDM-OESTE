import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.valor, 0);
  const ultrapassouLimite = somaDespesas > 200; // desafio extra

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.total, ultrapassouLimite && styles.totalAlerta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eef2ff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
  },
  periodo: {
    color: '#555',
    fontSize: 13,
  },
  total: {
    color: '#1c1c1c',
    fontSize: 22,
    fontWeight: 'bold',
  },
  totalAlerta: {
    color: '#d32f2f', // vermelho quando a soma passa de R$ 200
  },
});