// src/components/sections/Main/Main.tsx
import React from 'react';
import Intro from '@/components/sections/Intro/Intro';
import FeaturedActivities from '@/components/sections/FeaturedActivities/FeaturedActivities';

const Home: React.FC = () => {
  return (
    <div>
      <Intro />
      <FeaturedActivities />
    </div>
  );
};

export default Home;