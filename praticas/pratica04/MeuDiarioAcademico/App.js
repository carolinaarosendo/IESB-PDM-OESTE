import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Switch, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { APP_TITLE, INPUT_PLACEHOLDER, BUTTON_LABEL, LIST_TITLE } from './labels';

// Lista estática por enquanto — o foco da atividade é layout, não estado persistente
const disciplinasIniciais = [
  { id: '1', nome: 'Cálculo I' },
  { id: '2', nome: 'Algoritmos e Estrutura de Dados' },
  { id: '3', nome: 'Banco de Dados' },
];

export default function App() {
  const [texto, setTexto] = useState('');
  const [apenasObrigatorias, setApenasObrigatorias] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Cabeçalho */}
          <Text style={styles.header}>{APP_TITLE}</Text>

          {/* Linha de cadastro: input (~70%) + botão (~28%) */}
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder={INPUT_PLACEHOLDER}
              value={texto}
              onChangeText={setTexto}
            />
            <Pressable
              style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
            >
              <Text style={styles.botaoTexto}>{BUTTON_LABEL}</Text>
            </Pressable>
          </View>

          {/* Desafio opcional: Switch sem filtro real ainda */}
          <View style={styles.switchRow}>
            <Text>Mostrar apenas obrigatórias</Text>
            <Switch value={apenasObrigatorias} onValueChange={setApenasObrigatorias} />
          </View>

          {/* Lista de disciplinas */}
          <Text style={styles.listTitle}>{LIST_TITLE}</Text>
          {disciplinasIniciais.map((disciplina) => (
            <View key={disciplina.id} style={styles.item}>
              <Text>{disciplina.nome}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // ocupa toda a área segura da tela
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row', // input e botão lado a lado
    alignItems: 'center', // input e botão têm alturas diferentes; centraliza os dois no eixo cruzado
    justifyContent: 'space-between', // cria o espaço entre input e botão sem precisar de margin fixa
    marginBottom: 16,
  },
  input: {
    width: '68%', // uso de dimensão percentual
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  botao: {
    width: '28%', // uso de dimensão percentual
    backgroundColor: '#2e6ef7',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center', // centraliza o texto no eixo horizontal do botão
    justifyContent: 'center', // centraliza o texto no eixo vertical do botão
  },
  botaoPressionado: {
    opacity: 0.6, // feedback visual de "pressionado"
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    flex: 1, // uso de flex — cada item ocupa a largura disponível do container
    backgroundColor: '#f2f2f2',
    padding: 12,
    margin: 6,
    borderRadius: 6,
  },
});