import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

function Layout() {
  return (
    <main className="container-fluid ">
      <div className="row">

        <div className="col-12 p-0 ">
          <Header />
        </div>
        <div className="col-12 p-0">
          <Outlet />
        </div>
      </div>

    </main>
  );
}

export default Layout;
