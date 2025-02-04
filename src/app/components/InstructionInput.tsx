import React, {useState} from 'react';
import axios from 'axios';
import {DroneAPI} from '../models/Drone';
import {InstructDroneResponse} from '../models/types';
import {Billboard} from 'src/api/helpers';
import DroneControls from './DroneControls';

interface Props {
    setBillboards: React.Dispatch<React.SetStateAction<Billboard[]>>;
}

const InstructionInput: React.FC<Props> = ({setBillboards}) => {
    const [instructions, setInstructions] = useState<string>('');
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
            <p>
                Note: Moves are always exactly 1 km to the north (^), south (v), east (&gt;) or west
                (&lt;) or take a photograph (x)
            </p>
            <DroneControls
                onInstructionClick={(instruction: string) => {
                    setInstructions((prev) => prev + instruction);
                }}
            />
            <input
                type="text"
                value={instructions}
                placeholder="Enter drone instructions"
                readOnly
            />
            <button onClick={sendInstructions}>Send</button>
            <button onClick={() => setInstructions('')}>Clear</button>
        </div>
    );
};

export default InstructionInput;
