import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas }) {
  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DespesaItem item={item} />}
      ListEmptyComponent={<Text style={styles.vazio}>Nenhuma despesa nessa categoria.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  vazio: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});