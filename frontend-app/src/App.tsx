import { LoginPage } from './screens/LoginPage';
import { SignupPage } from './screens/SignupPage';
import { StudentQuizListPage } from './screens/StudentQuizListPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path = "/" element= {<LoginPage/>} />
      <Route path = "/signup" element= {<SignupPage/>} />
      <Route path = "/quizzes" element= {<StudentQuizListPage/>} />
    </Routes>
  );
}

export default App;