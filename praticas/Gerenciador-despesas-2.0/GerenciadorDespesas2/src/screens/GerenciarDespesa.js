import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Platform,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import { useAppTheme } from '../store/theme-context';
import { CATEGORIES } from '../constants/categories';
import IconButton from '../components/IconButton';

function validate(values) {
  const errors = {};

  if (!values.description || values.description.trim().length < 3) {
    errors.description = 'A descrição precisa ter no mínimo 3 caracteres.';
  }

  const valorNumerico = parseFloat(values.amount);
  if (!values.amount || isNaN(valorNumerico) || valorNumerico <= 0) {
    errors.amount = 'Informe um valor maior que zero.';
  }

  const hoje = new Date();
  hoje.setHours(23, 59, 59, 999);
  if (!values.date || new Date(values.date) > hoje) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Escolha uma categoria.';
  }

  return errors;
}

export default function GerenciarDespesa({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const { theme } = useAppTheme();

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const despesaExistente = isEditing ? expenses.find((item) => item.id === expenseId) : null;

  const [form, setForm] = useState({
    description: despesaExistente?.description ?? '',
    amount: despesaExistente ? String(despesaExistente.amount) : '',
    date: despesaExistente ? new Date(despesaExistente.date) : new Date(),
    category: despesaExistente?.category ?? '',
  });
  const [errors, setErrors] = useState({});
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [mostrarModalCategoria, setMostrarModalCategoria] = useState(false);

  function handleChange(field, value) {
    setForm((atual) => ({ ...atual, [field]: value }));
    setErrors((atual) => ({ ...atual, [field]: undefined }));
  }

  function handleValorChange(texto) {
    if (/^\d*\.?\d{0,2}$/.test(texto)) {
      handleChange('amount', texto);
    }
  }

  function handleMudarData(event, dataSelecionada) {
    setMostrarDatePicker(Platform.OS === 'ios');
    if (dataSelecionada) {
      handleChange('date', dataSelecionada);
    }
  }

  function handleSalvar() {
    const errosEncontrados = validate(form);
    setErrors(errosEncontrados);
    if (Object.keys(errosEncontrados).length > 0) return;

    const dadosDespesa = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) {
      updateExpense(expenseId, dadosDespesa);
    } else {
      addExpense(dadosDespesa);
    }
    navigation.goBack();
  }

  function handleExcluir() {
    Alert.alert('Excluir despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
      headerRight: isEditing
        ? () => (
            <IconButton icon="trash-outline" size={24} color={theme.danger} onPress={handleExcluir} />
          )
        : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, isEditing]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.rotulo, { color: theme.text }]}>Descrição</Text>
        <TextInput
          style={[styles.input, { borderColor: errors.description ? theme.danger : theme.border, color: theme.text }]}
          placeholder="Ex: Conta de luz"
          placeholderTextColor={theme.textMuted}
          value={form.description}
          onChangeText={(texto) => handleChange('description', texto)}
        />
        {errors.description && <Text style={styles.erro}>{errors.description}</Text>}

        <Text style={[styles.rotulo, { color: theme.text }]}>Valor</Text>
        <TextInput
          style={[styles.input, { borderColor: errors.amount ? theme.danger : theme.border, color: theme.text }]}
          placeholder="0.00"
          placeholderTextColor={theme.textMuted}
          value={form.amount}
          onChangeText={handleValorChange}
          keyboardType="decimal-pad"
        />
        {errors.amount && <Text style={styles.erro}>{errors.amount}</Text>}

        <Text style={[styles.rotulo, { color: theme.text }]}>Data</Text>
        <Pressable
          style={[styles.input, { borderColor: errors.date ? theme.danger : theme.border }]}
          onPress={() => setMostrarDatePicker(true)}
        >
          <Text style={{ color: theme.text }}>{form.date.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {errors.date && <Text style={styles.erro}>{errors.date}</Text>}
        {mostrarDatePicker && (
          <DateTimePicker
            value={form.date}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={handleMudarData}
          />
        )}

        <Text style={[styles.rotulo, { color: theme.text }]}>Categoria</Text>
        <Pressable
          style={[styles.input, { borderColor: errors.category ? theme.danger : theme.border }]}
          onPress={() => setMostrarModalCategoria(true)}
        >
          <Text style={{ color: form.category ? theme.text : theme.textMuted }}>
            {form.category || 'Toque para escolher'}
          </Text>
        </Pressable>
        {errors.category && <Text style={styles.erro}>{errors.category}</Text>}

        <Pressable
          style={({ pressed }) => [
            styles.botaoSalvar,
            { backgroundColor: theme.primary },
            pressed && styles.botaoSalvarPressionado,
          ]}
          onPress={handleSalvar}
        >
          <Text style={styles.botaoSalvarTexto}>
            {isEditing ? 'Salvar alterações' : 'Salvar despesa'}
          </Text>
        </Pressable>
      </ScrollView>

      <Modal
        visible={mostrarModalCategoria}
        transparent
        animationType="slide"
        onRequestClose={() => setMostrarModalCategoria(false)}
      >
        <Pressable style={styles.modalFundo} onPress={() => setMostrarModalCategoria(false)}>
          <View style={[styles.modalConteudo, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitulo, { color: theme.text }]}>Escolha a categoria</Text>
            {CATEGORIES.map((opcao) => (
              <Pressable
                key={opcao}
                style={styles.modalOpcao}
                onPress={() => {
                  handleChange('category', opcao);
                  setMostrarModalCategoria(false);
                }}
              >
                <Text style={[styles.modalOpcaoTexto, { color: theme.text }]}>{opcao}</Text>
                {form.category === opcao && <Ionicons name="checkmark" size={20} color={theme.primary} />}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, paddingBottom: 40 },
  rotulo: { fontSize: 13, marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'center' },
  erro: { color: '#d32f2f', fontSize: 12, marginTop: 4 },
  botaoSalvar: { paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  botaoSalvarPressionado: { opacity: 0.6 },
  botaoSalvarTexto: { color: '#fff', fontWeight: '600' },
  modalFundo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalConteudo: { borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20 },
  modalTitulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  modalOpcao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalOpcaoTexto: { fontSize: 15 },
});