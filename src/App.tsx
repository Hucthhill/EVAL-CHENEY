import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { InternInfoForm } from './components/InternInfoForm';
import { EvaluationPage } from './pages/EvaluationPage';
import { BookletPage } from './pages/BookletPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { EvaluationProvider } from './store/EvaluationContext';
import { AuthProvider, ProtectedRoute } from './store/AuthContext';
import { AccessibilityProvider } from './store/AccessibilityContext';
import { Printer } from 'lucide-react';

function App() {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <EvaluationProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="info" element={<InternInfoForm />} />
                  <Route path="evaluation" element={<EvaluationPage />} />
                </Route>

                <Route path="/booklet" element={
                  <div className="min-h-screen bg-gray-100 print:bg-white">
                    <div className="fixed top-4 right-4 print:hidden z-50">
                      <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                      >
                        <Printer size={20} />
                        Imprimer le livret
                      </button>
                    </div>
                    <BookletPage />
                  </div>
                } />
              </Route>
            </Routes>
          </Router>
        </EvaluationProvider>
      </AuthProvider>
    </AccessibilityProvider>
  );
}

export default App;
