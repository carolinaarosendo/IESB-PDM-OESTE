import React from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';

export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return <Text style={styles.vazio}>Nenhuma meta cadastrada ainda.</Text>;
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Pressable style={styles.textoArea} onPress={() => onToggle(item.id)}>
            <Text style={[styles.texto, item.concluida && styles.textoConcluido]}>
              {item.texto}
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.remover, pressed && styles.removerPressionado]}
            android_ripple={{ color: '#ffffff55' }}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.removerTexto}>Remover</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  vazio: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 12,
    margin: 6,
    borderRadius: 6,
  },
  textoArea: {
    flex: 1,
  },
  texto: {
    fontSize: 15,
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  remover: {
    backgroundColor: '#e33',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  removerPressionado: {
    opacity: 0.6,
  },
  removerTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});