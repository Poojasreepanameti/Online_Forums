import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThreadList from './components/ThreadList';
import CreateThread from './components/CreateThread';
import ThreadView from './pages/ThreadView';

const App = () => {
    return (
        <Router>
            <div>
                <h1>Online Forum</h1>
                <Routes>
                    <Route path="/" element={<ThreadList />} />
                    <Route path="/create" element={<CreateThread />} />
                    <Route path="/threads/:id" element={<ThreadView />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
