import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {Billboard} from './models/types';
import InstructionInput from './components/InstructionInput';
import BillboardDetailPage from './components/BillboardDetailPage';
import BillboardDetails from './components/BillboardDetails';
import './App.css';

const App: React.FC = () => {
    const [billboards, setBillboards] = useState<Billboard[]>([]);

    return (
        <div className="container">
            <h1>Drone Dashboard</h1>
            <Routes>
                {/* Main Dashboard Route */}
                <Route
                    path="/"
                    element={
                        <>
                            <InstructionInput setBillboards={setBillboards} />
                            {billboards.length > 0 && (
                                <div>
                                    <h2>Billboards</h2>
                                    {billboards.map((billboard) => (
                                        <div key={billboard.id}>
                                            <p>
                                                <strong>Id:</strong>{' '}
                                                <Link to={`/details/${billboard.id}`}>
                                                    {billboard.id}
                                                </Link>
                                            </p>
                                            <p>
                                                <strong>Advertiser:</strong> {billboard.advertiser}
                                            </p>
                                            <p>
                                                <strong>Text:</strong> {billboard.billboardText}
                                            </p>
                                            <p>
                                                <strong>Location:</strong> ({billboard.x},{' '}
                                                {billboard.y})
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <BillboardDetails />
                        </>
                    }
                />
                {/* Billboard Details Route */}
                <Route path="/details/:id" element={<BillboardDetailPage />} />
            </Routes>
        </div>
    );
};

export default App;
