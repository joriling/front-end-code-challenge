import {useState} from 'react';
import {Billboard} from './models/types';
import InstructionInput from './components/InstructionInput';
import BillboardDetails from './components/BillboardDetails';

function App() {
    const [billboards, setBillboards] = useState<Billboard[]>([]);

    return (
        <div className="App">
            <h1>Drone Dashboard</h1>
            <InstructionInput setBillboards={setBillboards} />
            {billboards.length > 0 && (
                <div>
                    <h2>Billboards</h2>
                    {billboards.map((billboard) => (
                        <div key={billboard.id}>
                            <p>
                                <strong>Id:</strong> {billboard.id}
                            </p>
                            <p>
                                <strong>Advertiser:</strong> {billboard.advertiser}
                            </p>
                            <p>
                                <strong>Text:</strong> {billboard.billboardText}
                            </p>
                            <p>
                                <strong>Location:</strong> ({billboard.x}, {billboard.y})
                            </p>
                        </div>
                    ))}
                </div>
            )}
            <BillboardDetails />
        </div>
    );
}

export default App;
