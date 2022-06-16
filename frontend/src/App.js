import {useState} from 'react';
import './App.css';
import Header from './components/header/header.js'
import Footer from './components/footer/footer.js'
import LandingPage from './screens/landingPage/landingPage.js';
import LoginScreen from './screens/loginScreen/loginScreen.js';
import RegisterScreen from './screens/registerScreen/registerScreen.js';
import CreateNoteScreen from './screens/createNoteScreen/createNoteScreen.js';
import SingleNoteScreen from './screens/singleNoteScreen/singleNoteScreen.js';
import MyNotes from './screens/myNotes/myNotes.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';


function App(){
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Header setSearch={(s) => setSearch(s)} />
      <main>
        <Routes>
            <Route exact path="/" element={<LandingPage/>}/>
            <Route
              path="/mynotes"
              element={<MyNotes search={search}/>}
            />            
            <Route path="/login" element={<LoginScreen/>}/>        
            <Route path="/register" element={<RegisterScreen/>}/>    
            <Route path="/createNote" element={<CreateNoteScreen/>}/>  
            <Route path="/notes/:id" element={<SingleNoteScreen/>}/>        

        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )


}

export default App;
