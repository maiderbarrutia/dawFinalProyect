import SiteRoutes from './routes/routes';
import { SpeedInsights } from "@vercel/speed-insights/react"

const App: React.FC = () => {
  return (
    <>
      <SpeedInsights/>
      <SiteRoutes />
    </>
  );
}

export default App;