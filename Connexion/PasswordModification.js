import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {Icon} from 'native-base';
import {API_URL} from '@env';
import FondB from '../assets/fond.jpg';

let PasswordModification = ({route, navigation}) => {
  let [form, setForm] = useState({
    email: null,
    motdepasse: null,
    confirmmdp: null,
  });

  let [error, setError] = useState(false);

  let [pass, setPass] = useState(false);

  let [email, setEmail] = useState(false);

  let [passwordVis, setPasswordVisu] = useState(false);

  let [passwordVisB, setPasswordVisuB] = useState(false);

  let [orientation, setOrientation] = useState(null);

  let regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let cc = false;

  let w = Dimensions.get('window').width;
  let h = Dimensions.get('window').height;

  useEffect(() => {
    if (!cc) {
      if (w < h) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    }
    return () => {
      cc = true;
    };
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

  let isValid = form => {
    let valid = true;
    Object.values(form).forEach(val => {
      if (!val) {
        valid = false;
      }
    });
    return valid;
  };

  let id = route.params.id.replace('user-', '');

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 5000);
  }

  if (email) {
    setTimeout(() => {
      setEmail(false);
    }, 5000);
  }

  if (pass) {
    setTimeout(() => {
      setPass(false);
    }, 5000);
  }

  //permet de modifier son mot de passe//
  let handleSubmit = async () => {
    let data = {};
    data.email = form.email;
    data.motdepasse = form.motdepasse;
    data.secret = id;

    if (isValid(form) && regEx.test(form.email)) {
      if (form.motdepasse === form.confirmmdp) {
        await axios({
          method: 'POST',
          baseURL: `${API_URL}/api/NewPasswordBis`,
          data: data,
        })
          .then(res => {
            navigation.navigate('Connexion');
          })
          .catch(err => {
            setEmail(true);
          });
      } else {
        setPass(true);
      }
    } else {
      setError(true);
    }
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled={true}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
      <View
        style={{
          position: 'absolute',
          zIndex: 0,
          height: '100%',
          width: Dimensions.get('window').width,
        }}>
        <Image
          source={FondB}
          style={{
            height: '100%',
            width: Dimensions.get('window').width,
          }}
        />
      </View>
      <TouchableOpacity
        style={{marginTop: orientation === 'PORTRAIT' ? '60%' : '10%'}}
        onPress={() => navigation.navigate('Connexion')}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
          }}>
          Retour
        </Text>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          {email && (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
                marginTop: 20,
              }}>
              Email introuvable
            </Text>
          )}
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              backgroundColor: 'white',
              width: orientation === 'PORTRAIT' ? w / 1.5 : w / 3,
              height: 50,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 30,
              borderWidth: 1,
              borderColor: '#3D4C28',
              paddingLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize: 17,
            }}
            onChangeText={val =>
              setForm({
                ...form,
                email: val,
              })
            }
            placeholder="Email"
            dataDetectorTypes="all"
            autoCompleteType="email"
            placeholderTextColor="grey"
            textContentType="emailAddress"
            autoCapitalize="none"
          />
          {!regEx.test(form.email) && form.email ? (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
                marginTop: 10,
              }}>
              Adresse email invalide
            </Text>
          ) : null}

          <TextInput
            style={{
              backgroundColor: 'white',
              width: orientation === 'PORTRAIT' ? w / 1.5 : w / 3,
              height: 50,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 30,
              borderWidth: 1,
              borderColor: '#3D4C28',
              paddingLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize: 17,
            }}
            onChangeText={val =>
              setForm({
                ...form,
                motdepasse: val,
              })
            }
            placeholder="Nouveau mot de passe"
            dataDetectorTypes="all"
            autoCompleteType="password"
            placeholderTextColor="grey"
            textContentType="password"
            secureTextEntry={passwordVis ? false : true}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setPasswordVisu(!passwordVis)}>
            <Icon name="eye" type="AntDesign" />
          </TouchableOpacity>
          {form.motdepasse && form.motdepasse.length < 5 ? (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
                marginTop: 10,
                width: w / 1.5,
                textAlign: 'center',
              }}>
              Le mot de passe doit contenir entre 5 et 15 caractères
            </Text>
          ) : null}
          <TextInput
            style={{
              backgroundColor: 'white',
              width: orientation === 'PORTRAIT' ? w / 1.5 : w / 3,
              height: 50,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop:
                form.motdepasse && form.motdepasse.length < 5 ? 10 : 30,
              borderWidth: 1,
              borderColor: '#3D4C28',
              paddingLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize: 17,
            }}
            secureTextEntry={passwordVisB ? false : true}
            onChangeText={val =>
              setForm({
                ...form,
                confirmmdp: val,
              })
            }
            placeholder="Confirmation"
            dataDetectorTypes="all"
            autoCompleteType="password"
            placeholderTextColor="grey"
            textContentType="password"
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setPasswordVisuB(!passwordVisB)}>
            <Icon name="eye" type="AntDesign" />
          </TouchableOpacity>
          {error && (
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                width: Dimensions.get('window').width,
                marginTop: 15,
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 17,
                  fontFamily: 'Poppins-Regular',
                }}>
                Veuillez renseigner tous les champs
              </Text>
            </View>
          )}

          {error ||
            (pass && (
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  width: Dimensions.get('window').width,
                  marginTop: 15,
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 17,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Mot de passe erroné
                </Text>
              </View>
            ))}

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              width: Dimensions.get('window').width,
              marginTop: 15,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#6D9FB2',
                width: orientation === 'PORTRAIT' ? '50%' : '25%',
                height: 40,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}
              onPress={() => handleSubmit()}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 17,
                }}>
                Modifier
              </Text>
              <Icon
                name="right"
                type="AntDesign"
                style={{
                  fontSize: 15,
                  color: 'white',
                  position: 'absolute',
                  paddingLeft:
                    Platform.OS === 'android'
                      ? orientation === 'PORTRAIT'
                        ? w === 270
                          ? 115
                          : 160
                        : 150
                      : '85%',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: orientation === 'PORTRAIT' ? '15%' : '5%',
          }}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PasswordModification;
