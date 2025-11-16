// hooks/useSelectedStocks.ts
import { useLocalStorage } from '@mantine/hooks';

export function useSelectedStocks() {
  const [selectedTickers, setSelectedTickers] = useLocalStorage<any[]>({
    key: 'selected-tickers', // localStorage key
    defaultValue: [],
  });


  return { selectedTickers, setSelectedTickers };
}

// import { useLocalStorage } from '@mantine/hooks';

// export function useSelectedStocks() {
//   // Store full stock objects instead of just tickers
//   const [selectedStocks, setSelectedStocks] = useLocalStorage<any[]>({
//     key: 'selected-stocks', // localStorage key
//     defaultValue: [],
//   });

//   // Helper to get just tickers
//   const selectedTickers = selectedStocks.map(stock => stock.Tickers);

//   return { selectedStocks, setSelectedStocks, selectedTickers };
// }
