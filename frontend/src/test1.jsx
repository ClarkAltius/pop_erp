import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Test1() {
    const [message, setMessage] = useState('로그인 페이지입니다');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/test', {
                    params: { id: 123 }
                });


                setMessage(response.data.message);
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
            {message}
        </div>
    );
}

export default Test1;
