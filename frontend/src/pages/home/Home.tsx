// src/components/sections/Main/Main.tsx
import React from 'react';
import Intro from '@/components/sections/Intro/Intro';
import FeaturedActivities from '@/components/sections/FeaturedActivities/FeaturedActivities';
import FeaturedCategories from '@/components/sections/FeaturedCategories/FeaturedCategories';

const Home: React.FC = () => {
  return (
    <div>
      <Intro />
      <FeaturedActivities />
      <FeaturedCategories />
    </div>
  );
};

export default Home;