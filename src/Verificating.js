import React from 'react';
import './css/style.css';
import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback
} from 'react';
import Pin from './image/bunbougu_hanko.cur';
import axios from 'axios';
import approvalIcon from './image/approval-icon.png';
const url = 'https://stormy-bayou-25730.herokuapp.com';
const Verificating = props => {
  const getParam = props.getParam;
  console.log(props);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [confirmNum, setConfirmNum] = useState('');
  const [verificationNum, setVerificationNum] = useState('');
  const [flag, setFlag] = useState(false);
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
      if (res.data.confirmNum == res.data.verificationNum) {
        setFlag(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setMessage, setName, setConfirmNum, setVerificationNum]);
  const handleClick = async () => {
    if (flag != true) {
      console.log('rest');
      const params = {
        Id: Id
      };
      try {
        await axios.get(url + '/sub', { params });
        setFlag(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const style = {
    cursor: `url(${Pin}) 5 30, pointer`
  };

  if (name == '') {
    return <div>ロード中</div>;
  } else {
    return (
      <div className="vertificationDocuments foldtl" style={style}>
        <div className="Container">
          <h1 className="verification">承認証</h1>
          <p className="nameTitle">名前</p>
          <div className="name">{name}</div>
          <p className="messageTitle">メッセージ</p>
          <div className="messages">{message}</div>
          <div className="BoxOfVertificationWrapper">
            <div className="BoxOfVertification" onClick={handleClick}>
              {flag ? <img className="approvalIcon" src={approvalIcon} /> : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Verificating;
