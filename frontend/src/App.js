import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Navbar from './components/Navbar'
function App() {
  return (
    <div className="App">
      <div className="pages">
        
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
