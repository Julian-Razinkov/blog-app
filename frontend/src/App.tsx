import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { Settings } from './pages/settings';
import { BlogPage } from './pages/blog';
import { CreateBlog } from './pages/createBlog';
import { AuthContext } from './context/authContext';
import { LoginPage } from './pages/login';
import { SignupPage } from './pages/signup';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthContext>
          <Routes>
            <Route path='/*' element={
              <Routes>
                <Route path="/" element={<Navigate to='/dashboard' replace />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path='dashboard/*' element={
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/new-post" element={<CreateBlog />} />
                    <Route path=':blogId' element={<BlogPage />} />
                  </Routes>
                } />
                <Route path="settings/" element={<Settings />} />
              </Routes>

            } />
          </Routes>
        </AuthContext>
      </Router>
    </ThemeProvider>
  )
}

export default App
