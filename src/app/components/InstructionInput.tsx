import React, {useState} from 'react';
import axios from 'axios';
import {DroneAPI} from '../models/Drone';
import {API_BASE_URL} from '../utils/app';
import {InstructDroneResponse} from '../models/types';
import {Billboard} from 'src/api/helpers';

interface Props {
    setBillboards: React.Dispatch<React.SetStateAction<Billboard[]>>;
}

const InstructionInput: React.FC<Props> = ({setBillboards}) => {
    const [instructions, setInstructions] = useState<string>('');
    console.log(DroneAPI.GET_BILLBOARD);

    const sendInstructions = async () => {
        try {
            const response = await axios.get<InstructDroneResponse>(
                `http://localhost:4001/${DroneAPI.SEND_INSTRUCTIONS}?instructions=${instructions}`
            );
            setBillboards(response.data.billboards);
        } catch (error) {
            console.error('Error sending instructions:', error);
        }
    };

    return (
        <div>
            <h2>Send Drone Instructions</h2>
            <input
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Enter drone instructions"
            />
            <button onClick={sendInstructions}>Send</button>
        </div>
    );
};

export default InstructionInput;
