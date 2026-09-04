import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from '../components/LoginForm'; // Tu formulario ya creado
import Dashboard from '../pages/Dashboard';       // Necesitarás crear este archivo

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz: Muestra el Login */}
        <Route path="/" element={<LoginForm />} />
        
        {/* Ruta Dashboard: Muestra el Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};