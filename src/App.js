import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import HomePage from './components/HomePage';
import RQSuperHeroesPage from './components/RQSuperHeroesPage';
import SuperHeroesPage from './components/SuperHeroesPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
