import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

const ExpensesContext = createContext(null);

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'UPDATE':
      return state.map((despesa) =>
        despesa.id === action.payload.id ? { ...despesa, ...action.payload.data } : despesa
      );
    case 'DELETE':
      return state.filter((despesa) => despesa.id !== action.payload.id);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega os dados salvos assim que o app monta
  useEffect(() => {
    async function carregarDespesas() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados) {
          dispatch({ type: 'SET', payload: JSON.parse(dados) });
        }
      } catch (erro) {
        console.log('Erro ao carregar despesas:', erro);
      } finally {
        setIsLoaded(true);
      }
    }
    carregarDespesas();
  }, []);

  // Salva sempre que a lista mudar, menos na primeira renderizacao (antes de carregar)
  useEffect(() => {
    if (!isLoaded) return;
    async function salvarDespesas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (erro) {
        console.log('Erro ao salvar despesas:', erro);
      }
    }
    salvarDespesas();
  }, [expenses, isLoaded]);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: { ...expenseData, id: Date.now().toString() } });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: { id } });
  }

  function clearExpenses() {
    dispatch({ type: 'SET', payload: [] });
  }

  const value = { expenses, addExpense, updateExpense, deleteExpense, clearExpenses };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses precisa ser usado dentro de um ExpensesContextProvider');
  }
  return context;
}