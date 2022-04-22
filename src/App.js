import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import HomePage from './components/HomePage';
import RQSuperHeroesPage from './components/RQSuperHeroesPage';
import SuperHeroesPage from './components/SuperHeroesPage';
import RQSuperHeroesHW from './components/RQSuperHeroesHW';
import RQSuperHero from './components/RQSuperHero';
import ParallelQueries from './components/ParallelQueries';
import DynamicParallelQueries from './components/DynamicParallelQueries';
import DependentQueries from './components/DependentQueries';
import PaginatedQueries from './components/PaginatedQueries';

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
              <li>
                <Link to="/rq-super-heroes-hw">RQ Super Heroes Homework</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/rq-super-heroes-hw" element={<RQSuperHeroesHW />} />
            <Route path="/rq-super-heroes/:heroId" element={<RQSuperHero />} />
            <Route path="/rq-parallel" element={<ParallelQueries />} />
            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicParallelQueries heroIds={[1, 3]} />}
            />
            <Route
              path="/rq-dependent"
              element={<DependentQueries email="vishwas@example.com" />}
            />
            <Route path="/rq-pagineted" element={<PaginatedQueries />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
