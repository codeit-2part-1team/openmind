import { Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import Home from './pages/Home';
import QuestionList from './pages/QuestionList';
import Ranking from './pages/Ranking';
import Answer from './pages/Answer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<QuestionList />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/post/:id/answer" element={<Answer />} />
    </Routes>
  );
}

export default App;
