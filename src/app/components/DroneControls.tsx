import React from 'react';

interface InstructionButtonsProps {
    onInstructionClick: (instruction: string) => void;
}

const DroneControls: React.FC<InstructionButtonsProps> = ({onInstructionClick}) => {
    return (
        <div className="instruction-buttons">
            <div className="grid grid-cols-3 gap-2">
                <button
                    className="p-2 bg-blue-500 text-white rounded"
                    onClick={() => onInstructionClick('^')}
                >
                    North (↑)
                </button>
                <button
                    className="p-2 bg-blue-500 text-white rounded"
                    onClick={() => onInstructionClick('>')}
                >
                    East (→)
                </button>
                <button
                    className="p-2 bg-blue-500 text-white rounded"
                    onClick={() => onInstructionClick('v')}
                >
                    South (↓)
                </button>
                <button
                    className="p-2 bg-blue-500 text-white rounded"
                    onClick={() => onInstructionClick('<')}
                >
                    West (←)
                </button>
                <button
                    className="p-2 bg-blue-500 text-white rounded"
                    onClick={() => onInstructionClick('x')}
                >
                    Take Photo (x)
                </button>
            </div>
        </div>
    );
};

export default DroneControls;
