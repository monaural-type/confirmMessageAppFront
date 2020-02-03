import React from 'react';
import './css/style.css';
import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback
} from 'react';
import axios from 'axios';
import approvalIcon from './image/approval-icon.png';
const url = 'http://0.0.0.0:5000';
const Verificated = props => {
  const getParam = props.getParam;
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [confirmNum, setConfirmNum] = useState('');
  const [verificationNum, setVerificationNum] = useState('');
  const [flag, setFlag] = useState(false);
  const [verificationText, setVerificationText] = useState(
    '承認ページのURLをコピーする'
  );
  const url = 'http://localhost:5000';
  let Id = getParam('Id');
  useEffect(async () => {
    const params = {
      Id: Id
    };
    console.log(params);
    let res;
    try {
      res = await axios.get(url + '/getData', { params });
      setName(res.data.name);
      setMessage(res.data.message);
      setConfirmNum(res.data.confirmNum);
      setVerificationNum(res.data.verificationNum);
    } catch (error) {
      console.log(error);
    }
  }, [setMessage, setName, setConfirmNum, setVerificationNum]);
  const copyToClipboard = () => {
    let element = document.getElementById('vertificatingConect');
    const text = document.createElement('textarea');
    text.classList.add('hidden');
    text.value = element.value;
    document.body.appendChild(text);
    text.select();
    document.execCommand('copy');
    text.remove();
    setVerificationText('コピーできました');
  };
  let items = [];
  const num = Array.from(Array(confirmNum).keys());
  const listItems = num.map(number => {
    console.log(number);
    console.log(confirmNum);
    if (number < verificationNum) {
      return (
        <div className="vertificationBox">
          <img className="approvalIcon" src={approvalIcon} />
        </div>
      );
    } else {
      return <div className="vertificationBox"></div>;
    }
  });
  if (name == '') {
    return <div>メッセージは送信されました</div>;
  } else {
    return (
      <>
        <div className="vertificatingWrapper">
          <button
            id="vertificatingConect"
            value={'http://localhost:3000/Verificating?Id=' + Id}
            onClick={copyToClipboard}
          >
            {verificationText}
          </button>
        </div>
        <div className="vertificationDocuments foldtl">
          <div className="Container">
            <h1 className="verification">承認証</h1>
            <p className="nameTitle">名前</p>
            <div className="name">{name}</div>
            <p className="messageTitle">メッセージ</p>
            <div className="messages">{message}</div>
          </div>
          <div className="vertificationWrapper">
            <div className="vertificationTitle">承認人数</div>
            <div className="vertificationNum">{listItems}</div>
          </div>
        </div>
      </>
    );
  }
};

export default Verificated;
