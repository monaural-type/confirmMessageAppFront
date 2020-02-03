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
const TwitterInputForm = () => {
  const ws = new WebSocket('ws://localhost:5000/pipe');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [count, setCount] = useState('');
  const [error, setError] = useState('');
  const [greetingStatus, displayGreeting] = useState(false);
  const contentProps = useSpring({
    opacity: greetingStatus ? 1 : 0,
    marginLeft: greetingStatus ? 0 : 1000
  });

  const contentProp = useSpring({
    opacity: greetingStatus ? 0 : 1,
    marginRight: greetingStatus ? 2000 : 0
  });
  ws.onmessage = e => {
    console.log(e);
    if (e.data == 'error') {
      setError('この名前は登録されています');
    } else if (e.data.includes('name')) {
      let url = window.location.href;
      window.location.href = url.split('?')[0] + e.data;
    }
  };
  const confirms = () => {
    if (count == '') {
      setError('空です。入力してください');
      displayGreeting(false);
    } else {
      setError('');
      displayGreeting(true);
    }
  };
  const handleChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
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
  const confirmCount = () => {
    if (count == '') {
      setError('入力してください');
    } else {
      displayGreeting(true);
    }
  };
  const handleSubmit = event => {
    if (message == '') {
      setError('messageを入力してください');
    } else {
      event.preventDefault();
      const envelope = {
        type: 'Twitter',
        name: name,
        message: message,
        count: count,
        oauth_token: getParam('oauth_token'),
        oauth_verifier: getParam('oauth_verifier')
      };
      ws.send(JSON.stringify(envelope));
      console.log(name);
    }
  };
  return (
    <>
      <h2>メッセージなど設定ページ</h2>
      <p>メッセージと確認人数を設定しましょう</p>
      <div className="container">
        {!greetingStatus ? (
          <>
            <a.div className="box" style={contentProp}>
              <p>何人に確認して欲しいか?</p>
              <div className="wrapper">
                <input
                  type="text"
                  name="count"
                  value={count}
                  onChange={handleChange}
                />
                <div className="buttons">
                  <button onClick={confirms} className="button">
                    Next
                  </button>
                </div>
              </div>
              <div>{error}</div>
            </a.div>
          </>
        ) : (
          <>
            <a.div className="box" style={contentProps}>
              <p>Tweet内容</p>
              <div className="wrapper">
                <textarea
                  name="message"
                  value={message}
                  onChange={handleChange}
                />
                <div className="buttons">
                  <button onClick={handleSubmit}>決定</button>
                  <button
                    onClick={() => displayGreeting(a => !a)}
                    className="button"
                  >
                    Prev
                  </button>
                </div>
                <div>{error}</div>
              </div>
            </a.div>
          </>
        )}
      </div>
    </>
  );
};

//url無いの特定の要素を持ってくるためのコード(コピペ)
const getParam = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const AccessOauth = () => {
  const ws = new WebSocket('ws://localhost:5000/pipe');
  const [userData, setUserData] = useState('');
  const [data, setData] = useState('');
  // const pages = [
  //   ({ style }) => (
  //     <animated.div style={{ ...style, background: 'lightpink' }}>
  //       A
  //     </animated.div>
  //   ),
  //   ({ style }) => (
  //     <animated.div style={{ ...style, background: 'lightblue' }}>
  //       B
  //     </animated.div>
  //   ),
  //   ({ style }) => (
  //     <animated.div style={{ ...style, background: 'lightgreen' }}>
  //       C
  //     </animated.div>
  //   )
  // ];
  // const [index, set] = useState(0);
  // const onClick = useCallback(() => set(state => (state + 1) % 3), []);
  // const transitions = useTransition(index, p => p, {
  //   from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
  //   enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
  //   leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
  // });
  // const Text = ({ children, offset, pos, start, end }) => {
  //   const [transform] = useState(() =>
  //     offset
  //       .interpolate({
  //         range: [start, end],
  //         output: [100, 0],
  //         extrapolate: 'clamp'
  //       })
  //       .interpolate(s => `translate3d(${s}px,0,0)`)
  //   );
  //   const [opacity] = useState(() => offset.interpolate([start, end], [0, 1]));
  //   return (
  //     <a.div
  //       style={{
  //         position: 'absolute',
  //         left: 0,
  //         top: `${pos * 100}vh`,
  //         transform,
  //         opacity
  //       }}
  //     >
  //       {children}
  //     </a.div>
  //   );
  // };
  // サーバー側からメッセージが送られてきた際に受け取り、関数を発動する(Twitterの認証用URLに飛ぶため)
  ws.onmessage = e => {
    console.log(e);
    if (e.data.includes('oauth_token')) {
      window.location.href = e.data;
    } else {
      console.log(e);
      setData(e.data);
    }
  };
  //クリックした時(今回は文字をbuttonをクリックしたらサーバーにTwitterのもじが送られる)
  const handleClick = () => {
    const envelope = {
      oauthType: 'Twitter'
    };
    console.log('rest');
    ws.send(JSON.stringify(envelope));
  };
  return (
    <>
      <h2>Twitter確かめったー</h2>
      {/* <div className="simple-trans-main" onClick={onClick}>
        {transitions.map(({ item, props, key }) => {
          const Page = pages[item];
          return <Page key={key} style={props} />;
        })}
      </div> */}
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
      <button onClick={handleClick}>Twitter認証</button>
    </>
  );
};

const BottonContent = () => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [flag, setFlag] = useState(false);
  const axios = require('axios');
  const url = 'http://localhost:5000';
  let nameId = getParam('name');
  let time = getParam('time');
  useEffect(async () => {
    const params = {
      name: nameId,
      time: time
    };
    console.log(params);
    let res;
    try {
      res = await axios.get(url + '/getData', { params });
    } catch (error) {
      console.log(error);
    }
    setName(res.data.name);
    setMessage(res.data.message);
  }, [setMessage, setName]);
  const handleClick = async () => {
    console.log('rest');
    const params = {
      nameId: getParam('name'),
      time: getParam('time')
    };
    try {
      await axios.get(url + '/sub', { params });
      setFlag(true);
    } catch (error) {
      console.log(error);
    }
  };
  if (flag == false) {
    return (
      <div className="mouses">
        <p className="mouses">{name}</p>
        <p>{message}</p>
        <button onClick={handleClick}>承認</button>
      </div>
    );
  } else if (flag == true) {
    return (
      <>
        <p>Thank you your corporation!! </p>
      </>
    );
  }
};
function App() {
  const [flag, setFlag] = useState(false);
  let render;
  // if (window.location.search.includes('name')) {
  //   render = <BottonContent />;
  // }
  // webSocketとの通信;
  // レンダー前にwsがopenした後にurl内のverifierを返す;
  if (window.location.search.includes('verifier')) {
    render = <TwitterInputForm />;
    //サーバへ送信
    // ws.send(JSON.stringify(envelope));
  } else if (
    window.location.search.includes('name') &&
    window.location.search.includes('time')
  ) {
    render = <BottonContent />;
  } else {
    render = <AccessOauth />;
  }

  // //レンダー要素の切替
  // let render = flag ? <InputForm /> : <AccessOauth />;
  return render;
}

export default App;
