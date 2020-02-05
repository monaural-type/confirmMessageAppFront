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
const url = 'https://stormy-bayou-25730.herokuapp.com';
const TwitterInputForm = props => {
  const { getParam } = props;
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [count, setCount] = useState('');
  const [error, setError] = useState('');
  const [id, setId] = useState('');
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
        let res = await axios.get(url + '/push_data', {
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
        <div className="Container">
          <h1 className="verification">承認証</h1>
          <p className="nameTitle">名前</p>
          <div className="name">{name}</div>
          <p className="messageTitle">メッセージ</p>
          <textarea
            className="messageTextArea"
            name="message"
            value={message}
            onChange={handleChange}
          ></textarea>
          <p className="messageTitle">何人に確認して欲しいか？</p>
          <input
            className="inputLayout"
            value={count}
            onChange={handleChange}
            type="number"
            name="count"
          />
          <span>{error}</span>
          <button className="TwitterButton" onClick={handleSubmit}>
            <span className="buttonText">決定</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TwitterInputForm;
