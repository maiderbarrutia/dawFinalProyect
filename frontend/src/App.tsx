import SiteRoutes from './routes/routes';
import useGoogleAnalytics from './hooks/useGoogleAnalytics';

const App: React.FC = () => {
  useGoogleAnalytics('G-J9CSXZ53YK');
  
  return (
    <SiteRoutes />
  );
}

export default App;