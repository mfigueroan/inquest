import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Formulario from './components/Formulario';
import AdminDashboard from './components/AdminDashboard';
import VerResultados from './components/admin/VerResultados';
import GestionUsuarios from './components/admin/GestionUsuarios';
import GestionFormularios from './components/admin/GestionFormularios';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

const PrivateRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/formulario/:id" 
          element={
            <PrivateRoute>
              <Formulario />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute adminOnly>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/resultados" 
          element={
            <PrivateRoute adminOnly>
              <VerResultados />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/usuarios" 
          element={
            <PrivateRoute adminOnly>
              <GestionUsuarios />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/formularios" 
          element={
            <PrivateRoute adminOnly>
              <GestionFormularios />
            </PrivateRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
