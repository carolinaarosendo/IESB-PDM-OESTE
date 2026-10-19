import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas, onSelecionar, numColumns = 1 }) {
  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      key={numColumns}
      renderItem={({ item }) => <DespesaItem despesa={item} onPress={onSelecionar} />}
      ListEmptyComponent={
        <View style={styles.vazioContainer}>
          <Ionicons name="receipt-outline" size={48} color="#aaa" />
          <Text style={styles.vazioTexto}>Nenhuma despesa. Toque em + para adicionar.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  vazioContainer: { alignItems: 'center', marginTop: 60 },
  vazioTexto: { marginTop: 12, color: '#888', textAlign: 'center', paddingHorizontal: 40 },
});