import React from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';

export default function CompromissoList({ itens, onDelete, onToggle, tituloLista, listaVazia }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.vazio}>{listaVazia}</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable style={styles.textoArea} onPress={() => onToggle(item.id)}>
              <Text style={[styles.texto, item.concluido && styles.textoConcluido]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
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