
import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './dashboard/layout/MainLayout';
import Login from './dashboard/pages/Login';
import ProtectDashboard from './middleware/ProtectDashboard';
import ProtectRole from './middleware/ProtectRole';
import AdminIndex from './dashboard/pages/AdminIndex';
import Unable from './dashboard/pages/Unable';
import Writers from './dashboard/pages/Writers';
import AddWriter from './dashboard/pages/AddWriter';
import News from './dashboard/pages/News';
import Profile from './dashboard/pages/Profile';
import WriterIndex from './dashboard/pages/WriterIndex';
import CreateNews from './dashboard/pages/CreateNews';
import Edit_news from './dashboard/pages/Edit_news';
import storeContext from './context/storeContext';
import CreateBanner from './dashboard/pages/CreateBanner';
import Banner from './dashboard/pages/Banner';
import AddVideoContent from './dashboard/pages/AddVideoContent';
import Videos from './dashboard/pages/Videos';
import Deactive from './dashboard/pages/Deactive';
import Advertisement from './dashboard/pages/Advertisement';
import Addvertai from './dashboard/pages/Addvertai';
import Advertisement_edit from './dashboard/pages/Advertisement_edit';
import ServerDown from './dashboard/pages/ServerDown';
import Subscribers from './dashboard/pages/Subscribe';
import VideoContents from './dashboard/components/VideoContents';


function App() {
  const { store } = useContext(storeContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Login Page - always accessible */}
        <Route path="/login" element={<Login />} />

        {/* ✅ Dashboard - protected by token */}
        <Route
          path="/dashboard"
          element={
            store?.token ? (
              <ProtectDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="" element={<MainLayout />}>
            {/* ✅ Role-based dashboard redirection */}
            <Route
              index
              element={
                store?.userInfo?.role === 'admin' ? (
                  <Navigate to="/dashboard/admin" />
                ) : (
                  <Navigate to="/dashboard/writer" />
                )
              }
            />

            <Route path="unable-access" element={<Unable />} />
            <Route path="news" element={<News />} />
            <Route path="profile" element={<Profile />} />

            {/* ✅ Admin Routes */}
            <Route path="" element={<ProtectRole role="admin" />}>
              <Route path="admin" element={<AdminIndex />} />
              <Route path="writer/add" element={<AddWriter />} />
              <Route path="writers" element={<Writers />} />
               <Route path="subscribe" element={<Subscribers />} />
              <Route path="createBanner" element={<CreateBanner />} />
              <Route path="banner" element={<Banner />} />
              <Route path="addVideoContent" element={<AddVideoContent />} />
              <Route path="video" element={<Videos />} />
              <Route path="deactive" element={<Deactive />} />
              <Route path="createAdvertisement" element={<Advertisement />} />
              <Route path="advertisement" element={<Addvertai />} />
              <Route path="advertisement_edit/:_id" element={<Advertisement_edit />} />
              <Route path="videos" element={<VideoContents/>} />


              
            </Route>

            {/* ✅ Writer Routes */}
            <Route path="" element={<ProtectRole role="writer" />}>
              <Route path="writer" element={<WriterIndex />} />
              <Route path="news/create" element={<CreateNews />} />
              <Route path="news/edit/:news_id" element={<Edit_news />} />
               <Route path="serverDown" element={<ServerDown />} />
            </Route>
          </Route>
        </Route>

        {/* ✅ Catch-all route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;