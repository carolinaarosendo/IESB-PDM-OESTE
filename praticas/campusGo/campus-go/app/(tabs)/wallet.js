import React from 'react';
import { View, Text, Pressable, Share, StyleSheet } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function Wallet() {
  const { expenses } = useExpenses();

  const total = expenses.reduce((soma, item) => soma + item.amount, 0);

  async function handleCompartilhar() {
    try {
      await Share.share({
        message: `Gastei R$ ${total.toFixed(2)} neste semestre.`,
      });
    } catch (erro) {
      console.log('Erro ao compartilhar:', erro);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>Total de despesas</Text>
      <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
      <Text style={styles.quantidade}>
        {expenses.length} {expenses.length === 1 ? 'despesa registrada' : 'despesas registradas'}
      </Text>
      <Pressable
        style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
        onPress={handleCompartilhar}
      >
        <Text style={styles.botaoTexto}>Compartilhar resumo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  rotulo: { fontSize: 16, color: '#555' },
  total: { fontSize: 36, fontWeight: 'bold', marginVertical: 8 },
  quantidade: { fontSize: 14, color: '#888', marginBottom: 32 },
  botao: { backgroundColor: '#4f46e5', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  botaoPressionado: { opacity: 0.7 },
  botaoTexto: { color: '#fff', fontWeight: '600' },
});