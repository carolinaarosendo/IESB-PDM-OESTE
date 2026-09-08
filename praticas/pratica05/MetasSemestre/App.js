import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarMetas() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados) {
          setMetas(JSON.parse(dados));
        }
      } catch (erro) {
        Alert.alert('Erro', 'Não foi possível carregar suas metas salvas.');
      } finally {
        setCarregando(false);
      }
    }
    carregarMetas();
  }, []);


  useEffect(() => {
    if (carregando) return;
    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        Alert.alert('Erro', 'Não foi possível salvar suas metas.');
      }
    }
    salvarMetas();
  }, [metas, carregando]);

  function handleAdd() {
    if (texto.trim() === '') {
      Alert.alert('Atenção', 'Digite uma meta antes de adicionar.');
      return;
    }
    const novaMeta = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadaEm: new Date().toISOString(),
      concluida: false,
    };
    setMetas((atuais) => [...atuais, novaMeta]);
    setTexto('');
  }

  function handleDelete(id) {
    setMetas((atuais) => atuais.filter((meta) => meta.id !== id));
  }

  function handleToggle(id) {
    setMetas((atuais) =>
      atuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  }

  const pendentes = metas.filter((m) => !m.concluida).length;
  const concluidas = metas.filter((m) => m.concluida).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('./assets/icon.png')} style={styles.logo} />
            <View>
              <Text style={styles.titulo}>Metas do Semestre</Text>
              <Text style={styles.contador}>
                {pendentes} pendentes / {concluidas} concluídas
              </Text>
            </View>
          </View>

          <MetaInput value={texto} onChangeText={setTexto} onAdd={handleAdd} />

          <MetaList metas={metas} onDelete={handleDelete} onToggle={handleToggle} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contador: {
    fontSize: 12,
    color: '#666',
  },
});