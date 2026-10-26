import React, { useState } from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function Tasks() {
  const router = useRouter();
  const [local, setLocal] = useState(null);
  const [buscandoLocal, setBuscandoLocal] = useState(false);

  async function handleCheckIn() {
    setBuscandoLocal(true);
    const place = await getCurrentPlace();
    setBuscandoLocal(false);

    if (!place) {
      Alert.alert('Permissão necessária', 'Não conseguimos acessar sua localização agora.');
      return;
    }
    setLocal(place.label);
  }

  async function handleLembrar() {
    const agendado = await scheduleReminder('Não esqueça de revisar suas tarefas!', 10);
    if (agendado) {
      Alert.alert('Lembrete agendado', 'Você será avisado em 10 segundos.');
    } else {
      Alert.alert('Permissão necessária', 'Permita notificações para receber o lembrete.');
    }
  }

  async function handleConcluir() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (erro) {
      console.log('Vibração indisponível neste dispositivo:', erro);
    }
    Alert.alert('Tarefa concluída');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tarefas</Text>

      <Link href="/new-task" asChild>
        <Pressable style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}>
          <Text style={styles.botaoTexto}>Nova tarefa</Text>
        </Pressable>
      </Link>

      <Pressable
        style={({ pressed }) => [styles.botao, styles.botaoSecundario, pressed && styles.botaoPressionado]}
        onPress={() => router.push('/task/42')}
      >
        <Text style={styles.botaoSecundarioTexto}>Ver tarefa 42</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.botao, styles.botaoSecundario, pressed && styles.botaoPressionado]}
        onPress={handleCheckIn}
        disabled={buscandoLocal}
      >
        <Text style={styles.botaoSecundarioTexto}>
          {buscandoLocal ? 'Buscando local...' : 'Estudei aqui'}
        </Text>
      </Pressable>
      {local && <Text style={styles.local}>{local}</Text>}

      <Pressable
        style={({ pressed }) => [styles.botao, styles.botaoSecundario, pressed && styles.botaoPressionado]}
        onPress={handleLembrar}
      >
        <Text style={styles.botaoSecundarioTexto}>Lembrar em 10 s</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.botao, styles.botaoSucesso, pressed && styles.botaoPressionado]}
        onPress={handleConcluir}
      >
        <Text style={styles.botaoTexto}>Concluir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  botao: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  botaoSecundario: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#4f46e5' },
  botaoSucesso: { backgroundColor: '#16a34a' },
  botaoPressionado: { opacity: 0.7 },
  botaoTexto: { color: '#fff', fontWeight: '600' },
  botaoSecundarioTexto: { color: '#4f46e5', fontWeight: '600' },
  local: { fontSize: 13, color: '#555', textAlign: 'center' },
});