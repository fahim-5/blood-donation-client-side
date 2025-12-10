import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';
import VolunteerRoute from './components/common/VolunteerRoute';
import DonorRoute from './components/common/DonorRoute';
import DashboardLayout from './pages/dashboard/DashboardLayout';

// Public Pages
import Home from './pages/public/Home';
import SearchDonors from './pages/public/SearchDonors';
import DonationRequests from './pages/public/DonationRequests';
import ContactUs from './pages/public/ContactUs';
import AboutUs from './pages/public/AboutUs';
import HowItWorks from './pages/public/HowItWorks';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Error Pages
import NotFound from './pages/error/NotFound';
import Unauthorized from './pages/error/Unauthorized';
import BlockedUser from './pages/error/BlockedUser';
import Maintenance from './pages/error/Maintenance';
import ServerError from './pages/error/ServerError';

// Dashboard Shared
import DashboardHome from './pages/dashboard/DashboardHome';
import Profile from './pages/dashboard/shared/Profile';
import Funding from './pages/dashboard/shared/Funding';
import AllDonationRequestsShared from './pages/dashboard/shared/AllDonationRequestsShared';
import ChangePassword from './pages/dashboard/shared/ChangePassword';
import NotificationSettings from './pages/dashboard/shared/NotificationSettings';

// Donor Dashboard
import DonorDashboardHome from './pages/dashboard/donor/DonorDashboardHome';
import MyDonationRequests from './pages/dashboard/donor/MyDonationRequests';
import CreateDonationRequest from './pages/dashboard/donor/CreateDonationRequest';
import EditDonationRequest from './pages/dashboard/donor/EditDonationRequest';

// Admin Dashboard
import AdminDashboardHome from './pages/dashboard/admin/AdminDashboardHome';
import AllUsers from './pages/dashboard/admin/AllUsers';
import AllDonationRequests from './pages/dashboard/admin/AllDonationRequests';
import FundingStatistics from './pages/dashboard/admin/FundingStatistics';
import SystemAnalytics from './pages/dashboard/admin/SystemAnalytics';
import AdminSettings from './pages/dashboard/admin/AdminSettings';

// Volunteer Dashboard
import VolunteerDashboardHome from './pages/dashboard/volunteer/VolunteerDashboardHome';
import AllDonationRequestsVolunteer from './pages/dashboard/volunteer/AllDonationRequestsVolunteer';
import VolunteerTasks from './pages/dashboard/volunteer/VolunteerTasks';

// Request Details
import DonationRequestDetails from './pages/dashboard/requests/DonationRequestDetails';
import RequestDonorsList from './pages/dashboard/requests/RequestDonorsList';
import RequestStatusUpdate from './pages/dashboard/requests/RequestStatusUpdate';

const Routes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <RouterRoutes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/search-donors" element={<SearchDonors />} />
      <Route path="/donation-requests" element={<DonationRequests />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

      {/* Error Routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/blocked" element={<BlockedUser />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/server-error" element={<ServerError />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      }>
        {/* Shared Routes */}
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="funding" element={<Funding />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="notification-settings" element={<NotificationSettings />} />

        {/* Donor Routes */}
        <Route path="donor-home" element={
          <DonorRoute>
            <DonorDashboardHome />
          </DonorRoute>
        } />
        <Route path="my-donation-requests" element={
          <DonorRoute>
            <MyDonationRequests />
          </DonorRoute>
        } />
        <Route path="create-donation-request" element={
          <DonorRoute>
            <CreateDonationRequest />
          </DonorRoute>
        } />
        <Route path="edit-donation-request/:id" element={
          <DonorRoute>
            <EditDonationRequest />
          </DonorRoute>
        } />

        {/* Admin Routes */}
        <Route path="admin-home" element={
          <AdminRoute>
            <AdminDashboardHome />
          </AdminRoute>
        } />
        <Route path="all-users" element={
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        } />
        <Route path="all-blood-donation-request" element={
          <AdminRoute>
            <AllDonationRequests />
          </AdminRoute>
        } />
        <Route path="funding-statistics" element={
          <AdminRoute>
            <FundingStatistics />
          </AdminRoute>
        } />
        <Route path="system-analytics" element={
          <AdminRoute>
            <SystemAnalytics />
          </AdminRoute>
        } />
        <Route path="admin-settings" element={
          <AdminRoute>
            <AdminSettings />
          </AdminRoute>
        } />

        {/* Volunteer Routes */}
        <Route path="volunteer-home" element={
          <VolunteerRoute>
            <VolunteerDashboardHome />
          </VolunteerRoute>
        } />
        <Route path="volunteer-donation-requests" element={
          <VolunteerRoute>
            <AllDonationRequestsVolunteer />
          </VolunteerRoute>
        } />
        <Route path="volunteer-tasks" element={
          <VolunteerRoute>
            <VolunteerTasks />
          </VolunteerRoute>
        } />

        {/* Request Details Routes */}
        <Route path="donation-request/:id" element={
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        } />
        <Route path="donation-request/:id/donors" element={
          <PrivateRoute>
            <RequestDonorsList />
          </PrivateRoute>
        } />
        <Route path="donation-request/:id/status" element={
          <PrivateRoute>
            <RequestStatusUpdate />
          </PrivateRoute>
        } />

        {/* Shared Donation Requests */}
        <Route path="all-donation-requests" element={
          <PrivateRoute>
            <AllDonationRequestsShared />
          </PrivateRoute>
        } />
      </Route>

      {/* Catch all route - 404 */}
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;