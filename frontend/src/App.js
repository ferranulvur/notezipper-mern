import './App.css';
import Header from './components/header/header.js'
import Footer from './components/footer/footer.js'
import LandingPage from './screens/landingPage/landingPage.js';
import LoginScreen from './screens/loginScreen/loginScreen.js';
import RegisterScreen from './screens/registerScreen/registerScreen.js';
import MyNotes from './screens/myNotes/myNotes.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route path="/mynotes" element={<MyNotes/>}/>        
          <Route path="/login" element={<LoginScreen/>}/>        
          <Route path="/register" element={<RegisterScreen/>}/>        

      </Routes>
    </main>
    <Footer />
  </BrowserRouter>


)

export default App;
