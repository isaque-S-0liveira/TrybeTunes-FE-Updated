import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <Search /> } />
      <Route path="/album/:id" element={ <h1>Album</h1> } />
      <Route path="/*" element={ <h1>Not Found</h1> } />
    </Routes>
  );
}

export default App;
