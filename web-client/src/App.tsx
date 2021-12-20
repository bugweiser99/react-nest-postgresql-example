import { useEffect, useRef, useState } from 'react';

function App() {
  const [text, setText] = useState('');

  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchText = async () => {
      const response = await fetch('/api/app/hello');
      setText(await response.text());
    };

    fetchText();
  }, []);

  const uploadFile = async () => {
    const body = new FormData();
    const file: File = fileInput.current!.files![0];
    body.append('file', file);

    const response = await fetch('/api/app/upload', {
      method: 'post',
      body: body,
    });

    if (response.status === 201) {
      setText(await response.text());
    } else {
      setText('upload failed');
    }
  };

  return (
    <div className='ml-10'>
      <div className='text-purple-500 mb-3'>{text}</div>
      <div className='mb-3'>
        <input type='file' ref={fileInput} />
      </div>
      <div>
        <button
          className='bg-purple-500 text-white px-2 py-1 rounded'
          onClick={uploadFile}
        >
          Upload chosen file
        </button>
      </div>
    </div>
  );
}

export default App;
