import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Album from './pages/Album/Album';
import Layout from './components/Layout';
import Favorites from './pages/Favorites/Favorites';
import Profile from './pages/Profile/Profile';
import ProfileEdit from './pages/ProfileEdit/ProfileEdit';

function App() {
  return (
    <Routes>
      <Route index element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="search" element={ <Search /> } />
        <Route path="album/:id" element={ <Album /> } />
        <Route path="favorites" element={ <Favorites /> } />
        <Route path="profile" element={ <Profile /> } />
        <Route path="profile/edit" element={ <ProfileEdit /> } />
        <Route path="*" element={ <h1>Not Found</h1> } />
      </Route>
    </Routes>
  );
}

export default App;
