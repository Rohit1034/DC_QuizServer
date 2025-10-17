import { LoginPage } from './screens/LoginPage';
import { SignupPage } from './screens/SignupPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path = "/" element= {<LoginPage/>} />
      <Route path = "/signup" element= {<SignupPage/>} />
    </Routes>
  );
}

export default App;