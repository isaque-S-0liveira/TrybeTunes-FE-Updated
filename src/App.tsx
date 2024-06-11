import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Album from './pages/Album/Album';
import Layout from './components/Layout';
import Favorites from './pages/Favorites/Favorites';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route index path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <h1>Perfil</h1> } />
      </Route>
      <Route path="/*" element={ <h1>Not Found</h1> } />
    </Routes>
  );
}

export default App;
