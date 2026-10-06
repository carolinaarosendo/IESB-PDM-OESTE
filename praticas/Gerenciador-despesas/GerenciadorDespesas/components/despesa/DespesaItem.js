import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function getDataFormatada(data) {
  const d = new Date(data);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export default function DespesaItem({ item }) {
  return (
    <View style={styles.item}>
      <View style={styles.linhaTopo}>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <Text style={styles.valor}>R$ {item.valor.toFixed(2)}</Text>
      </View>
      <View style={styles.linhaBase}>
        <Text style={styles.data}>{getDataFormatada(item.data)}</Text>
        <View style={styles.tagCategoria}>
          <Text style={styles.textoCategoria}>{item.categoria}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    margin: 6,
    borderRadius: 8,
  },
  linhaTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  descricao: {
    fontSize: 15,
    fontWeight: '600',
  },
  valor: {
    fontSize: 15,
  },
  linhaBase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  data: {
    fontSize: 12,
    color: '#666',
  },
  tagCategoria: {
    backgroundColor: '#e0e0e0', // tag cinza claro, como pedido no enunciado
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  textoCategoria: {
    fontSize: 11,
    color: '#444',
  },
});