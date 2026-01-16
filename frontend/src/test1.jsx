import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Test1() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/test', {
                    params: { id: 1 }
                });
                setMessage(response.data.name);
            } catch (error) {
                setMessage('서버 요청 실패: ' + error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '2rem',
                fontFamily: 'Arial, sans-serif'
            }}
        >
            <h2>로그인 페이지입니다</h2>
            <div><h3>{message}</h3></div>



        </div>
    );
}

export default Test1;
