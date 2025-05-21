import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import StudentsPage from './Pages/HomePage/StudentPage';
import AttendancePage from './Pages/HomePage/AttendancePage';
import StudentDataProvider from './Context/StudentDataContext';
import LoginPage from './Pages/LoginPage';
import SettingsPage from './Pages/HomePage/SettingPage';
import SignUpPage from './Pages/SignUpPage';
import UserContext from './Context/TeacherDataContext';

function App() {
  return (
    <div className="App">
      <StudentDataProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <UserContext>
                <LoginPage />
              </UserContext>
            }>
              </Route>
            <Route path='/signUp' element={<SignUpPage />}></Route>
            <Route path='/home' element={<HomePage />} />
            <Route path='/students' element={<StudentsPage />} />
            <Route path='/attendance' element={<AttendancePage />} />
            <Route path='/settings' element={<SettingsPage />} />
          </Routes>
        </Router>
      </StudentDataProvider>
    </div>
  );
}


export default App;
