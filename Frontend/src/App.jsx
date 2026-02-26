import { Routes, Route } from "react-router-dom";
import AuthPage from "./Pages/AuthenticationPage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Catagoryselectionpage from "./Pages/Catagoryselectionpage";
import ArtistDashboard from "./Components/ArtistDashboard";
import DistributorDashboard from "./Components/DistributorDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      <Route
        path="/category-selection"
        element={
          <ProtectedRoute>
            <Catagoryselectionpage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/artist"
        element={
          <ProtectedRoute>
            <ArtistDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/distributor"
        element={
          <ProtectedRoute>
            <DistributorDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}