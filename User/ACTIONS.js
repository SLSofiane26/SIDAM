import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';

export let Login = data => async dispatch => {
  await AsyncStorage.setItem('token', data.token);
  await AsyncStorage.setItem('identifiant', data.id);
  let exp = new Date(Date.now() + 36000 * 10000).getTime().toString();
  await AsyncStorage.setItem('expDate', exp);

  dispatch({
    type: 'SUCCES',
    payload: {
      token: data.token,
      identifiant: data.id,
    },
  });
  dispatch(LogoutTimeOut(36000));
};

export let InscriptionBis = data => async dispatch => {
  await AsyncStorage.setItem('token', data.token);
  await AsyncStorage.setItem('identifiant', data.id);
  let exp = new Date(Date.now() + 36000 * 10000).getTime().toString();
  await AsyncStorage.setItem('expDate', exp);

  dispatch({
    type: 'SUCCES',
    payload: {
      token: data.token,
      datab: false,
      admin: data.admin,
      identifiant: data.id,
    },
  });
  dispatch(LogoutTimeOut(36000));
};

export let CheikAuth = () => async dispatch => {
  let date = await AsyncStorage.getItem('expDate');
  let token = await AsyncStorage.getItem('token');
  let identifiant = await AsyncStorage.getItem('identifiant');

  if (!token || !date || !identifiant) {
    dispatch(Logout());
  } else {
    if (Number(date) <= new Date().getTime()) {
      dispatch(Logout());
    } else {
      dispatch(LogoutTimeOut((Number(date) - new Date().getTime()) / 100));
      dispatch({
        type: 'SUCCES',
        payload: {token: token, identifiant: identifiant},
      });
    }
  }
};

export let LogoutTimeOut = data => async dispatch => {
  setTimeout(() => {
    dispatch(Logout());
  }, data * 1000);
};

export let IdentifiantLogin = data => async dispatch => {
  dispatch({
    type: 'IDENTIFIANT',
    payload: {
      data: data,
    },
  });
};

export let Facture = token => async dispatch => {
  await axios({
    method: 'GET',
    baseURL: `${API_URL}/api/factures`,
    headers: {
      'x-auth-token': token,
    },
  }).then(res => {
    dispatch({type: 'FACTURE', payload: {data: res.data.factures}});
  });
};

export let Logout = () => async dispatch => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('expDate');
  let identifiant = await AsyncStorage.getItem('identifiant');
  dispatch({
    type: 'LOGOUT',
    payload: {
      identifiant: identifiant,
    },
  });
};

export let LogoutBis = () => async dispatch => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('expDate');
  await AsyncStorage.removeItem('identifiant');
  dispatch({type: 'LogoutBis'});
};

export let UserB = data => {
  dispatch({type: 'USERB', payload: {data: data}});
};
