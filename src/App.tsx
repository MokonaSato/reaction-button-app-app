import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoomGenerator from './pages/RoomGenerator';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoomGenerator />} />
        <Route path="/room" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
