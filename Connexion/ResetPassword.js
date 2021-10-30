import React, {useState, useEffect} from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import {Icon} from 'native-base';
import axios from 'axios';
import {API_URL} from '@env';
import FondB from '../assets/fond.jpg';
import Spinner from 'react-native-spinkit';
import Sound from 'react-native-sound';

let ResetPassword = props => {
  let [form, setForm] = useState({
    email: null,
  });
  let [orientation, setOrientation] = useState(null);
  let [errors, setErros] = useState(null);
  let [errorB, setErroB] = useState(null);
  let [loading, setLoading] = useState(false);

  let regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let w = Dimensions.get('window').width;
  let h = Dimensions.get('window').height;

  Sound.setCategory('Playback');

  useEffect(() => {
    if (w < h) {
      setOrientation('PORTRAIT');
    } else {
      setOrientation('LANDSCAPE');
    }
  }, []);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    });
    return () => {
      Dimensions.removeEventListener('change');
    };
  }, []);

  let d = null;

  if (!regEx.test(form.email) && form.email) {
    d = (
      <Text
        style={{
          color: 'red',
          fontSize:
            Platform.OS === 'ios' ? (h === 568 || w === 568 ? 13 : 16) : 16,
          marginTop: 10,
          fontFamily: 'Poppins-Regular',
          textAlign: 'center',
        }}>
        Veuillez saisir une adresse email valide
      </Text>
    );
  }

  //permet de demander un lien de reinitialisation de son mot de passe//
  let handleReset = async () => {
    setLoading(true);
    let d = {};
    d.email = form.email;
    if (regEx.test(form.email)) {
      await axios
        .post(`${API_URL}/api/passwordreset`, d)
        .then(res => {
          if (res.data.msg == 'email') {
            setErroB(true);
            setLoading(false);
          } else {
            let whoosh = new Sound(
              'courrier_two.mp3',
              Sound.MAIN_BUNDLE,
              error => {
                if (error) {
                  return;
                }
                whoosh.setVolume(1);
                whoosh.play(success => {
                  if (success) {
                    setLoading(false);
                    setForm({
                      ...form,
                      email: null,
                    });
                    props.handleResetSucces();
                  } else {
                    return;
                  }
                });
              },
            );
          }
        })
        .catch(err => {
          setErroB(true);
          setLoading(false);
        });
    } else {
      setErros(true);
      setLoading(false);
    }
  };

  if (errors) {
    setTimeout(() => {
      setErros(null);
    }, 6000);
  }
  if (errorB) {
    setTimeout(() => {
      setErroB(null);
    }, 6000);
  }

  return (
    <Modal
      visible={props.resetPass}
      animationType="slide"
      supportedOrientations={['portrait', 'landscape']}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        enabled={true}
        style={{
          display: 'flex',
          backgroundColor: 'white',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
        }}>
        <View>
          <Image
            source={FondB}
            style={{
              width: '100%',
              position: 'absolute',
            }}
          />
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            flex: 1,
          }}>
          {errors && (
            <Text
              style={{
                color: 'red',
                fontSize: 16,
                textAlign: 'center',
                fontFamily: 'Poppins-Regular',
              }}>
              Veuillez renseigner une adresse email
            </Text>
          )}
          {errorB && (
            <Text
              style={{
                color: 'red',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
              }}>
              Adresse email introuvable
            </Text>
          )}
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Spinner
              isVisible={loading}
              size={150}
              type="WanderingCubes"
              color={'#999D3B'}
            />
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => props.passwordR()}>
              <Icon
                name="arrowleft"
                type="AntDesign"
                style={{color: 'black', fontSize: 50}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 10,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>Email</Text>
            <TextInput
              onChangeText={val =>
                setForm({
                  ...form,
                  email: val,
                })
              }
              placeholder="Email"
              autoCapitalize="none"
              dataDetectorTypes="all"
              autoCompleteType="email"
              textContentType="emailAddress"
              placeholderTextColor="grey"
              autoCapitalize="none"
              style={{
                backgroundColor: 'white',
                width: orientation === 'PORTRAIT' ? '60%' : '35%',
                height: 50,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 30,
                borderWidth: 1,
                borderColor: '#3D4C28',
                paddingLeft: 20,
                fontFamily: 'Poppins-Regular',
                fontSize:
                  Platform.OS === 'ios'
                    ? h === 568 || w === 568
                      ? 14
                      : 17
                    : 17,
              }}
            />
            <View>{d}</View>

            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#636A28',
                  width: orientation === 'PORTRAIT' ? '55%' : '30%',
                  height: 50,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 30,
                }}
                onPress={() => handleReset()}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: w === 270 ? 14 : 17,
                    fontFamily: 'OpenSans-SemiBold',
                    textAlign: 'center',
                    width:
                      orientation === 'PORTRAIT'
                        ? w === 480
                          ? '70%'
                          : '90%'
                        : '75%',
                  }}>
                  Renvoyer mes identifiants
                </Text>
                <Icon
                  name="right"
                  type="AntDesign"
                  style={{
                    fontSize: 15,
                    color: 'white',
                    position: 'absolute',
                    paddingLeft: '85%',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ResetPassword;
