import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Billboard} from '@app/models/types';
import {DroneAPI} from '@app/models/Drone';
import {API_BASE_URL} from '@app/utils/app';
import {Link} from 'react-router-dom';

const BillboardDetailPage: React.FC = () => {
    const {id} = useParams<{id: string}>(); // Access route parameter "id"
    const [billboard, setBillboard] = useState<Billboard | null>(null);

    useEffect(() => {
        const fetchBillboardDetails = async () => {
            try {
                const response = await axios.get<{billboard: Billboard}>(
                    `${API_BASE_URL}/${DroneAPI.GET_BILLBOARD}?id=${id}`
                );
                setBillboard(response.data.billboard);
            } catch (error) {
                console.error('Error fetching billboard details:', error);
            }
        };

        if (id) fetchBillboardDetails();
    }, [id]);

    if (!billboard) {
        return <div>Loading billboard details...</div>;
    }

    return (
        <div>
            <h2>Billboard Details</h2>
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
                <strong>Address:</strong> {billboard.address}
            </p>
            <p>
                <strong>Location:</strong> ({billboard.x}, {billboard.y})
            </p>
            <img src={billboard.image} alt="Billboard" />
            <Link to="/">
                <button className="btn-block">Back</button>
            </Link>
        </div>
    );
};

export default BillboardDetailPage;
