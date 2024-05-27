import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';

import Public from './pages/Public';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import AssetsList from './pages/assetList';
import AddAssets from './pages/addAssets';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="assetList" element={<AssetsList />} />
          <Route path="addAssets" element={<AddAssets />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
