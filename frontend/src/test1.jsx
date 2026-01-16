import React, { useState } from 'react';
import axios from 'axios';

function Test1() {
    const [message, setMessage] = useState('');
    const [inputId, setInputId] = useState(''); // State for the input box

    // Correct logic: Use Cloud URL if available, otherwise Localhost
    const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

    const fetchById = async () => {
        if (!inputId) {
            alert("Please enter an ID");
            return;
        }

        try {
            // Sends GET request to /api/test?id=YOUR_INPUT
            const response = await axios.get(`${BACKEND_URL}/api/test`, {
                params: { id: inputId }
            });
            setMessage(`ID ${inputId}: ${response.data.name}`);
        } catch (error) {
            console.error(error);
            setMessage('Error: ' + (error.response?.status === 404 ? 'ID not found' : error.message));
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column', // Stack items vertically
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: 'Arial, sans-serif',
            gap: '20px' // Space between elements
        }}>
            <h2>Data Retrieval Test</h2>

            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="number"
                    placeholder="Enter ID (e.g. 1)"
                    value={inputId}
                    onChange={(e) => setInputId(e.target.value)}
                    style={{ padding: '10px', fontSize: '1rem' }}
                />
                <button
                    onClick={fetchById}
                    style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
                >
                    Get Data
                </button>
            </div>

            <div style={{ fontSize: '2rem', color: 'blue' }}>
                <h3>{message}</h3>
            </div>
        </div>
    );
}

export default Test1;