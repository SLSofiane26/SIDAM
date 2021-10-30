import React, {useEffect, useState} from 'react';
import {Dimensions, View, Image} from 'react-native';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {API_URL} from '@env';
import Armes from './Armes';
import FondB from '../assets/fond.jpg';
import * as ACTIONS from './ACTIONS';

let Add = React.memo(function Add(props) {
  let [data, setData] = useState([]);
  let [munition, setMunition] = useState(null);
  let [id, setID] = useState(null);
  let [error, setError] = useState(null);
  let [add, setAdd] = useState(false);
  let [errorBis, setErrorBis] = useState(null);
  let [dataM, setDataM] = useState(null);
  let [ced, setCed] = useState(null);
  let [armeError, setErrArme] = useState(false);
  let [extension, setExtension] = useState(false);

  let dispatch = useDispatch();

  let token = useSelector(state => state.token);

  if (!token) {
    dispatch(ACTIONS.Logout());
  }

  let d = [];

  let handleNavigationBBB = data => {
    props.navigation.navigate('Delete', {delete: data});
  };

  let handleAddM = data => {
    setMunition(data);
  };

  let handleShow = async data => {
    setID(data._id);
    await axios({
      method: 'GET',
      url: `${API_URL}/api/armes/${data._id}`,
      headers: {
        'x-auth-token': token,
      },
    })
      .then(res => {
        if (res.data.msg) {
          dispatch(ACTIONS.Logout());
        } else {
          let d = [];
          d.push(res.data);
          setDataM(d);
        }
      })
      .catch(err => {
        props.navigation.navigate('Accueil');
      });
  };

  let handleCeder = data => {
    setCed(data);
  };

  if (errorBis) {
    setTimeout(() => {
      setErrorBis(null);
    }, 2000);
  }

  if (armeError) {
    setTimeout(() => {
      setErrArme(false);
    }, 2000);
  }

  // Permet de récuperer les informations de l'arme //
  let fetchArmes = async () => {
    setMunition(null);
    setCed(null);
    setAdd(null);
    setDataM(null);
    await axios({
      method: 'GET',
      url: `${API_URL}/api/armes/${props.route.params.arme._id}`,
      headers: {
        'x-auth-token': token,
      },
    })
      .then(res => {
        if (!res.data) {
          props.navigation.goBack();
        } else if (res.data.msg) {
          dispatch(ACTIONS.Logout());
        } else {
          let d = [];
          d.push(res.data);
          setData(d);
        }
      })
      .catch(err => {
        props.navigation.navigate('Accueil');
      });
  };

  let handleNavigation = data => {
    props.navigation.navigate('Armes', {data: data});
  };

  useEffect(() => {
    fetchArmes();
  }, []);

  // Permet de récuperer les informations de l'arme //
  let fetchArmesBis = async () => {
    setMunition(null);
    setCed(null);
    setAdd(null);
    setDataM(null);
    setExtension(true);
    await axios({
      method: 'GET',
      url: `${API_URL}/api/armes/${props.route.params.arme._id}`,
      headers: {
        'x-auth-token': token,
      },
    })
      .then(res => {
        if (res.data.msg) {
          dispatch(ACTIONS.Logout());
        } else {
          d.push(res.data);
          setData(d);
          setExtension(true);
        }
      })
      .catch(err => {
        dispatch(ACTIONS.Logout());
      });
  };

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

  if (extension) {
    setTimeout(() => {
      setExtension(false);
    }, 20000);
  }

  let handleNavigationBis = data => {
    props.navigation.navigate('Armes', {delete: data});
  };

  let handleNavigationBB = datab => {
    props.navigation.navigate('Mes factures', {delete: datab});
  };

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
      <Image
        source={FondB}
        style={{
          width: Dimensions.get('window').width,
          zIndex: 0,
          position: 'absolute',
          height: '100%',
        }}
      />
      <View
        style={{
          flex: 1,
          zIndex: 1000,
          width: Dimensions.get('window').width,
        }}>
        <Armes
          handleAccount={() => props.navigation.navigate('Accueil')}
          handleArme={() => fetchArmes()}
          extensionBis={extension}
          showHandle={handleShow}
          SuccesMunition={() => fetchArmesBis()}
          dataB={data}
          addMunition={handleAddM}
          cederArmes={handleCeder}
          HandleD={handleNavigation}
          DataD={data}
          Fetch={() => fetchArmes()}
          handleNavigation={handleNavigationBis}
          handleNavigationBis={handleNavigationBB}
          DataMunition={dataM}
          handleNavigationBBB={handleNavigationBBB}
        />
      </View>
    </View>
  );
});

export default Add;
