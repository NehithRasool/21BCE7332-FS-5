import React from 'react';
import Navbar from './components/Navbar';
import { ThemeProviderWrapper } from './context/ThemeContext';
import VideoList from './components/VideoList';

const App = () => {
  return (
    <ThemeProviderWrapper>
      <Navbar />
      <VideoList />
    </ThemeProviderWrapper>
  );
};

export default App;
