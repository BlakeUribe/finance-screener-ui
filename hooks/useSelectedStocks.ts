// hooks/useSelectedStocks.ts
import { useLocalStorage } from '@mantine/hooks';

export function useSelectedStocks() {
  const [selectedTickers, setSelectedTickers] = useLocalStorage<any[]>({
    key: 'selected-tickers', // localStorage key
    defaultValue: [],
  });

  return { selectedTickers, setSelectedTickers };
}
