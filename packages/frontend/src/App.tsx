import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { Settings } from './pages/settings';
import { BlogPage } from './pages/blog';
import { CreateBlog } from './pages/createBlog';
import { AuthContext, useAuth } from './context/authContext';
import { LoginPage } from './pages/login';
import { SignupPage } from './pages/signup';
import { WelcomePage } from './pages/WelcomePage';
import { Loading } from './components/loading';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthContext>
          <Routes>
            <Route path='/*' element={
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path='/*' element={
                  <ProtectedRoutes />
                } />
              </Routes>
            } />
          </Routes>
        </AuthContext>
      </Router>
    </ThemeProvider>
  )
}

function ProtectedRoutes() {
  const { loading, error } = useAuth();

  if (loading) return <Loading />
  if (error) return <span>OOpsie</span>

  return (
    <Routes>
      <Route path='dashboard/*' element={
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new-post" element={<CreateBlog />} />
          <Route path=':blogId' element={<BlogPage />} />
        </Routes>
      } />
      <Route path="settings/" element={<Settings />} />
    </Routes>
  )
}

export default App
