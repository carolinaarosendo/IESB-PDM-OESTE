import { useEffect, useState } from 'react';

export default function useDebounce(valor, atraso = 400) {
  const [valorComAtraso, setValorComAtraso] = useState(valor);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValorComAtraso(valor);
    }, atraso);

    return () => clearTimeout(timer);
  }, [valor, atraso]);

  return valorComAtraso;
}