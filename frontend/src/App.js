import './App.css';
import Header from './components/header/header.js'
import Footer from './components/footer/footer.js'
import LandingPage from './screens/landingPage/landingPage.js';
function App() {
  return (

    <div className="App">
      <Header />
      <div>
        <LandingPage/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
