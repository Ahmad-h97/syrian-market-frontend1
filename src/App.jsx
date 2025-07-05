import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import AppLayout from './components/AppLayout';
import './App.css';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));
const LogIn = lazy(() => import('./pages/LogIn'));
const LogOut = lazy(() => import('./pages/LogOut'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const PostHouse = lazy(() => import('./pages/PostHouse'));
const Profile = lazy(() => import('./pages/Profile'));
const EditHouse = lazy(() => import('./pages/EditHouse'));
const House = lazy(() => import('./pages/House'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Compress = lazy(()=> import('./pages/compress'));

function App() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/compress" element={<Compress />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/post-house" element={<PostHouse />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/:userId/:username" element={<UserProfile />} />
          <Route path="/edit-house/:houseId" element={<EditHouse />} />
          <Route path="/house/:houseId" element={<House />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
