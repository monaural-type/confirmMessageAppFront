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
const url = 'http://0.0.0.0:5000';
const AccessOauth = () => {
  const [userData, setUserData] = useState('');
  const [data, setData] = useState('');
  //クリックした時(今回は文字をbuttonをクリックしたらサーバーにTwitterのもじが送られる)
  const handleClick = async () => {
    try {
      let res = await axios.get(url + '/oath');
      window.location.href = res.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="vertificationDocuments foldtl">
        <h1 className="verification">Twitter確かめったー</h1>
        <div className="Container">
          <p>
            このアプリケーションはTwitterの発言をしてもいいか、友達に確かめてもらうアプリです。
          </p>
          <p>アプリの使い方は以下です</p>
          <ol>
            <li>下のアイコンをクリックしてTwitterの認証をする</li>
            <li>メッセージと何人に確かめてもらいたいかを入力する</li>
            <li>入力後、リダイレクトしたページURLを友達に送る</li>
            <li>友達がメッセージを確認する</li>
            <li>
              設定した人数分の人に確認してもらい次第、Twitterに自動的にメッセージが送られる
            </li>
          </ol>
        </div>
        <button className="TwitterButton" onClick={handleClick}>
          Twitter認証
        </button>
      </div>
    </>
  );
};

export default AccessOauth;
