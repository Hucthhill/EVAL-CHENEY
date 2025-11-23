import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EvaluationProvider } from './store/EvaluationContext';
import { Layout } from './components/Layout';
import { InternInfoForm } from './components/InternInfoForm';
import { EvaluationPage } from './pages/EvaluationPage';
import { BookletPage } from './pages/BookletPage';

function App() {
  return (
    <EvaluationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<InternInfoForm />} />
            <Route path="evaluation" element={<EvaluationPage />} />
          </Route>
          <Route path="/booklet" element={
            <div className="min-h-screen bg-gray-100 print:bg-white">
              <div className="fixed top-4 right-4 print:hidden z-50">
                <button
                  onClick={() => window.print()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                  Imprimer / PDF
                </button>
              </div>
              <BookletPage />
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </EvaluationProvider>
  );
}

export default App;
