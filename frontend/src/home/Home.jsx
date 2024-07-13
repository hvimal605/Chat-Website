import React from 'react';
import Left from './leftpart/Left';
import Right from './Rightpart/Right';
import Navbar from './UpperPart/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row h-[90vh]">
        <Left />
        <Right />
      </div>
    </div>
  );
};

export default Home;
