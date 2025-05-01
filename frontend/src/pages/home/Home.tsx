import React from 'react';
import Intro from '@/components/sections/Intro/Intro';
import FeaturedActivities from '@/components/sections/FeaturedActivities/FeaturedActivities';
import FeaturedCategories from '@/components/sections/FeaturedCategories/FeaturedCategories';
import FeaturedCompanies from '@/components/sections/FeaturedCompanies/FeaturedCompanies';

const Home: React.FC = () => {
  return (
    <div>
      <Intro />
      <FeaturedActivities />
      <FeaturedCategories />
      <FeaturedCompanies />
    </div>
  );
};

export default Home;