import React, {useState} from 'react';
import axios from 'axios';
import {InstructDroneResponse} from '../models/types';
import {Billboard} from 'src/api/helpers';
import {DroneAPI} from '@app/models/Drone';
import DroneControls from './DroneControls';
import {API_BASE_URL} from '@app/utils/app';

interface Props {
    setBillboards: React.Dispatch<React.SetStateAction<Billboard[]>>;
}

const InstructionInput: React.FC<Props> = ({setBillboards}) => {
    const [instructions, setInstructions] = useState<string>('');
    const sendInstructions = async () => {
        try {
            const response = await axios.get<InstructDroneResponse>(
                `${API_BASE_URL}/${DroneAPI.SEND_INSTRUCTIONS}?instructions=${instructions}`
            );
            setBillboards(response.data.billboards);
            setInstructions('');
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
