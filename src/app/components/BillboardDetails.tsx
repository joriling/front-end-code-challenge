import React, {useState} from 'react';
import axios from 'axios';
import {DroneAPI} from '../models/Drone';

import {Billboard, GetBillboardResponse} from '../models/types';

const BillboardDetails: React.FC = () => {
    const [billboardId, setBillboardId] = useState<string>('');
    const [billboard, setBillboard] = useState<Billboard | null>(null);

    const fetchBillboard = async () => {
        try {
            const response = await axios.get<GetBillboardResponse>(
                `http://localhost:4001/${DroneAPI.GET_BILLBOARD}?id=${billboardId}`
            );
            setBillboard(response.data.billboard);
        } catch (error) {
            console.error('Error fetching billboard details:', error);
        }
    };

    return (
        <div>
            <h2>Get Billboard Details</h2>
            <input
                type="text"
                value={billboardId}
                onChange={(e) => setBillboardId(e.target.value)}
                placeholder="Enter billboard ID"
            />
            <button onClick={fetchBillboard}>Fetch</button>
            {billboard && (
                <div>
                    <h3>Billboard Details</h3>
                    <p>
                        <strong>Advertiser:</strong> {billboard.advertiser}
                    </p>
                    <p>
                        <strong>Text:</strong> {billboard.billboardText}
                    </p>
                    <p>
                        <strong>Address:</strong> {billboard.address}
                    </p>
                    <img src={billboard.image} alt="Billboard" />
                </div>
            )}
        </div>
    );
};

export default BillboardDetails;
