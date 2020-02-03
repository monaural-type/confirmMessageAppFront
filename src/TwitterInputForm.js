import React from 'react';
import './css/style.css';
import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback
} from 'react';
import { useSpring, useTransition, animated as a } from 'react-spring';
import axios from 'axios';
const url = 'http://0.0.0.0:5000';
const TwitterInputForm = props => {
  const { getParam } = props;
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [count, setCount] = useState('');
  const [error, setError] = useState('');
  const [greetingStatus, displayGreeting] = useState(false);
  const [id, setId] = useState('');
  const contentProps = useSpring({
    opacity: greetingStatus ? 1 : 0,
    marginLeft: greetingStatus ? 0 : 1000
  });
  useEffect(async () => {
    const userId = getParam('Id');
    setId(String(userId));
    console.log(userId);
    const params = {
      id: userId
    };
    console.log(params);
    let res;
    try {
      res = await axios.get(url + '/get_name', { params });
    } catch (error) {
      console.log(error);
    }
    setName(res.data.name);
  }, [setId]);

  const contentProp = useSpring({
    opacity: greetingStatus ? 0 : 1,
    marginRight: greetingStatus ? 2000 : 0
  });
  //   const confirms = () => {
  //     if (count == '') {
  //       setError('空です。入力してください');
  //       displayGreeting(false);
  //     } else {
  //       setError('');
  //       displayGreeting(true);
  //     }
  //   };
  const handleChange = event => {
    switch (event.target.name) {
      case 'message':
        setMessage(event.target.value);
        break;
      case 'count':
        setCount(event.target.value);
        break;
      default:
        console.log('key not found');
    }
  };
  //   const confirmCount = () => {
  //     if (count == '') {
  //       setError('入力してください');
  //     } else {
  //       displayGreeting(true);
  //     }
  //   };
  const handleSubmit = async event => {
    if (message == '' || count == '') {
      setError('messageを入力してください');
    } else {
      event.preventDefault();
      const params = {
        id: id,
        type: 'Twiiter',
        message: message,
        count: count
      };
      console.log(id);
      try {
        let res = await axios.get('http://0.0.0.0:5000' + '/push_data', {
          params
        });
        window.location.href = res.data;
        console.log('OK');
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="vertificationDocuments foldtl">
        <h1 className="verification">承認証</h1>
        <div className="Container">
          <p className="nameTitle">名前</p>
          <div className="name">{name}</div>
          <p className="messageTitle">メッセージ</p>
          <textarea
            name="message"
            value={message}
            onChange={handleChange}
          ></textarea>
          <div className="vertificationNum">
            <p className="messageTitle">何人に確認して欲しいか？</p>
            <input
              className="vertificationNumber"
              value={count}
              onChange={handleChange}
              type="number"
              name="count"
            />
          </div>
        </div>
        <button class="TwitterButton" onClick={handleSubmit}>
          決定
        </button>
      </div>
    </>
  );
};

export default TwitterInputForm;
