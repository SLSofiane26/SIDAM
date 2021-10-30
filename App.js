import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import Application from './Application/Application';
import Reducer from './Reducer/Reducer.js';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

let store = createStore(Reducer, applyMiddleware(thunk));

let App = () => {
  useEffect(() => {
    Platform.OS === 'android'
      ? PushNotification.createChannel({
          channelId: 'channel-id',
          channelName: 'My channel',
          channelDescription: 'A channel to categorise your notifications',
          soundName: 'sound_one.mp3',
          playSound: true,
          importance: 4,
          vibrate: true,
        })
      : null;
  }, []);

  return (
    <Provider store={store}>
      <Application />
    </Provider>
  );
};

export default App;
