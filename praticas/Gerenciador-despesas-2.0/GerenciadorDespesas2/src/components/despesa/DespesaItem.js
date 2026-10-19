import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';

function getDataFormatada(data) {
  const d = new Date(data);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export default function DespesaItem({ despesa, onPress }) {
  return (
    <Pressable
      onPress={() => onPress(despesa.id)}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressionado]}
    >
      <View style={styles.linhaTopo}>
        <Text style={styles.descricao}>{despesa.description}</Text>
        <Text style={styles.valor}>R$ {despesa.amount.toFixed(2)}</Text>
      </View>
      <View style={styles.linhaBase}>
        <Text style={styles.data}>{getDataFormatada(despesa.date)}</Text>
        <View style={styles.tagCategoria}>
          <Text style={styles.textoCategoria}>{despesa.category}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 12,
    margin: 6,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  itemPressionado: { opacity: 0.7 },
  linhaTopo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  descricao: { fontSize: 15, fontWeight: '600' },
  valor: { fontSize: 15 },
  linhaBase: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  data: { fontSize: 12, color: '#666' },
  tagCategoria: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  textoCategoria: { fontSize: 11, color: '#444' },
});