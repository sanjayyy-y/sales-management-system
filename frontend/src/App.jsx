import { Dashboard } from './pages/Dashboard';
import { Sidebar } from './components/Sidebar';
import './styles.css';

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;