
import './App.css';
import ChangeLang from './components/ChangeLang';
import Menu from './components/Menu';
import { useEffect, useState } from 'react';
import Slider from './components/Slider';

function App() {
    const [showSplash, setShowSplash] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          backgroundColor: 'black',
        }}
      >
        <img
          className=''
          src="/images/gold-logo.jpg"
          alt="Splash"
          style={{objectFit : "cover" ,borderRadius : "40px", width: '500px', height: '300px'}}
        />
      </div>
    );
  }

  return (
    <div
      className="App position-relative"
      style={{
        backgroundImage: "url('/images/home-pg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ChangeLang onSearch={setSearchTerm} />
      <Slider />
      <Menu searchTerm={searchTerm} />
    </div>
  );
}

export default App;
