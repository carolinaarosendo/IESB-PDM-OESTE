import { useCallback, useEffect, useState } from 'react';
import { getNotices } from '../services/api';

export default function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregar = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dados = await getNotices(10);
      setNotices(dados);
    } catch (erro) {
      setError('Não foi possível carregar os avisos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { notices, isLoading, error, reload: carregar };
}