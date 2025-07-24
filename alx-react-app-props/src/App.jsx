import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile.jsx';
import WelcomeMessage from './components/WelcomeMessage';
import './App.css'
import UserContext from './UserContext';
import ProfilePage from './components/ProfilePage';

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return <ProfilePage userData={userData} />;
}

export default App
