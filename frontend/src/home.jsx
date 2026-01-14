import { useState } from 'react';
import axios from 'axios';

function App() {

  const [name, setName] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 쿼리 파라미터로 `name`을 보내는 방식
      const res = await axios.post(`/api/test?name=${name}`);
      // 응답을 받아서 상태에 저장
      setResponse(res.data);
      alert('데이터가 성공적으로 추가되었습니다!');
    } catch (error) {
      console.error('Error:', error);
      alert('데이터 추가에 실패했습니다.');
    }
  };


  return (
    <>
      <div>
        <h1>홈페이지 입니다</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">보내기</button>
        </form>

        {response && (
          <div>
            <h3>응답 데이터:</h3>
            <p>{JSON.stringify(response)}</p>
          </div>
        )}
      </div>

    </>
  )
}

export default App
