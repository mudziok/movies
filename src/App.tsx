import './App.css';
import { RateContextProvider } from './contexts/rateContext';
import { MovieSearch } from './movieSearch/movieSearch';
import { RecentlyRated } from './recentlyRated/recentlyRated';

function App() {
  return (
    <RateContextProvider>
      <MovieSearch />
      <RecentlyRated />
    </RateContextProvider>
  );
}

export default App;
