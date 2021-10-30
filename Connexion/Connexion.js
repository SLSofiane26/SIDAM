import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import axios from 'axios';
import {Icon} from 'native-base';
import TouchID from 'react-native-touch-id';
import {useDispatch, useSelector} from 'react-redux';
import ResetPassword from './ResetPassword';
import * as ACTIONS from '../User/ACTIONS';
import {API_URL} from '@env';
import ImageMunition from '../assets/photo-munitions.jpg';
import FondB from '../assets/fond.jpg';

let Connexion = props => {
  let [mdp, setmdp] = useState(false);
  let [errorsBis, setErrorBis] = useState(null);
  let [errors, setError] = useState(false);
  let [resetPassword, setResetPassword] = useState(false);
  let [email, setEmailS] = useState(null);
  let [errorD, setErrorD] = useState(null);
  let [errorBB, setErrorBB] = useState(null);
  let [orientation, setOrientation] = useState(null);
  let [passwordVisB, setPasswordVisuB] = useState(false);

  let [form, setForm] = useState({
    email: null,
    motdepasse: null,
  });

  let token = useSelector(state => state.token);

  let tokenB = useSelector(state => state.deviceToken);

  let identifiant = useSelector(state => state.identifiant);

  let w = Dimensions.get('window').width;
  let h = Dimensions.get('window').height;

  let dispatch = useDispatch();

  let regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let isValid = form => {
    let valid = true;
    Object.values(form).forEach(val => {
      if (!val) {
        valid = false;
      }
    });
    return valid;
  };

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

  useEffect(() => {
    if (w < h) {
      setOrientation('PORTRAIT');
    } else {
      setOrientation('LANDSCAPE');
    }
  }, [w, h]);

  //permet de s'authentifier avec la biometrie//
  let handleSubmitBis = async data => {
    let optionalConfigObject = {
      title: 'SIDAM Authentification',
      imageColor: '#999D3B',
      imageErrorColor: '#ff0000',
      sensorDescription: 'SIDAM Authentification',
      sensorErrorDescription: 'SIDAM Authentification echouée ',
      cancelText: 'Retour',
      fallbackLabel: 'Show Passcode',
      unifiedErrors: false,
      passcodeFallback: false,
    };

    await TouchID.authenticate('', optionalConfigObject)
      .then(async succes => {
        let c = {};
        c.identifiant = identifiant;
        c.deviceToken = tokenB;
        await axios
          .post(`${API_URL}/api/authd`, c)
          .then(res => {
            if (res.data === 'SERVEUR ERREUR') {
              setErrorBB(true);
            } else {
              dispatch(ACTIONS.Login(res.data));
            }
          })
          .catch(err => {
            setErrorBB(true);
          });
      })
      .catch(error => {
        setErrorBB(true);
      });
  };

  useEffect(async () => {
    if (identifiant && !token) {
      handleSubmitBis(identifiant);
    }
  }, []);

  if (errorD) {
    setTimeout(() => {
      setErrorD(null);
    }, 10000);
  }

  if (errorBB) {
    setTimeout(() => {
      setErrorBB(null);
    }, 10000);
  }

  if (email) {
    setTimeout(() => {
      setEmailS(null);
    }, 7000);
  }

  if (errorsBis) {
    setTimeout(() => {
      setErrorBis(null);
    }, 7000);
  }

  if (errors) {
    setTimeout(() => {
      setError(false);
    }, 7000);
  }

  let e = null;

  if (form.motdepasse !== null && form.motdepasse.length < 5) {
    e = (
      <Text
        style={{
          color: 'red',
          textAlign: 'center',
          fontSize: 16,
          marginTop: 10,
          fontFamily: 'Poppins-Regular',
          position: 'relative',
          width: w / 1.2,
        }}>
        Le mot de passe doit contenir entre 5 et 10 caractères
      </Text>
    );
  }

  let d = null;

  if (form.email && !regEx.test(form.email)) {
    d = (
      <Text
        style={{
          marginTop: 10,
          color: 'red',
          fontSize: w === 270 ? 13 : 16,
          fontFamily: 'Poppins-Regular',
        }}>
        Veuillez saisir une adresse email valide
      </Text>
    );
  }

  //permet de s'authentifier avec l'email et le mot de passe//
  let handleSubmit = async () => {
    let d = {};
    d.email = form.email;
    d.motdepasse = form.motdepasse;
    d.deviceToken = tokenB;

    if (isValid(form) && regEx.test(form.email)) {
      await axios({
        method: 'POST',
        url: `${API_URL}/api/auth`,
        data: d,
      })
        .then(res => {
          dispatch(ACTIONS.Login(res.data));
        })
        .catch(err => {
          setErrorBB(true);
        });
    } else {
      setErrorBis(true);
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={100}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled={true}>
      <View>
        <Image
          source={FondB}
          style={{
            width: Dimensions.get('window').width,
            position: 'absolute',
            height: h,
          }}
        />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignContent: 'center',
          alignItems: 'center',
          height: 'auto',
          flex: 0,
        }}>
        <Image
          source={ImageMunition}
          style={{
            position: 'absolute',
            width: Dimensions.get('window').width,
            height:
              orientation === 'PORTRAIT'
                ? Platform.OS === 'ios'
                  ? h / 2.3
                  : h / 2.1
                : Platform.OS === 'ios'
                ? h / 1.45
                : h / 1.5,
          }}
        />
        <View>
          <View
            style={{
              width: '50%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                width: Dimensions.get('window').width,
                marginTop:
                  orientation === 'PORTRAIT'
                    ? Platform.OS === 'android'
                      ? h > 753 && h < 754
                        ? '43%'
                        : h > 771 && h < 772
                        ? '43%'
                        : h > 718 && h < 719
                        ? '37%'
                        : h === 816
                        ? '45%'
                        : h > 760 && h < 800
                        ? h > 774 && h < 775
                          ? '42%'
                          : '35%'
                        : h > 759 && h < 760
                        ? '42%'
                        : h > 748 && h < 749
                        ? '39%'
                        : h > 737 && h < 738
                        ? '40%'
                        : h === 592
                        ? w === 360
                          ? '25%'
                          : '22%'
                        : h > 683 && h < 684
                        ? '32%'
                        : w === 480
                        ? h > 1018 && h < 1019
                          ? '55%'
                          : w === 480
                          ? h > 938 && h < 939
                            ? '45%'
                            : h === 912
                            ? '42%'
                            : '58%'
                          : '45%'
                        : h === 1152
                        ? '55%'
                        : h === 752
                        ? '45%'
                        : h === 912
                        ? '35%'
                        : w === 270
                        ? '20%'
                        : h === 672
                        ? '35%'
                        : h === 692
                        ? '35%'
                        : h === 712
                        ? '40%'
                        : h === 1182
                        ? '70%'
                        : h > 701 && h < 702
                        ? '40%'
                        : h === 1032
                        ? '55%'
                        : h === 732
                        ? w === 360
                          ? '44%'
                          : '40%'
                        : h === 1122
                        ? '65%'
                        : h > 830 && h < 831
                        ? '55%'
                        : '30%'
                      : h > 900
                      ? '50%'
                      : h === 667
                      ? '27%'
                      : w === 414
                      ? h === 896
                        ? '50%'
                        : '30%'
                      : h === 568
                      ? '31%'
                      : '44%'
                    : Platform.OS == 'android'
                    ? w > 753 && w < 754
                      ? '12%'
                      : h > 392 && h < 393
                      ? '12%'
                      : w > 986 && w < 987
                      ? '12%'
                      : h === 360
                      ? w === 752
                        ? '6%'
                        : '8%'
                      : w === 640
                      ? '7%'
                      : h === 432
                      ? w === 816
                        ? '15%'
                        : '12%'
                      : h === 312
                      ? '6%'
                      : w > 774 && w < 775
                      ? '14%'
                      : h === 492
                      ? '14%'
                      : w === 800
                      ? '8%'
                      : '15%'
                    : w === 568
                    ? '7%'
                    : '15%',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize:
                    h === 1152
                      ? 25
                      : h > 1018 && h < 1019
                      ? 23
                      : h === 912
                      ? 23
                      : h > 938 && h < 939
                      ? 23
                      : w === 270
                      ? 13
                      : h === 568
                      ? 15
                      : 17,
                  color: 'white',
                  fontFamily: 'OpenSans-SemiBold',
                  width:
                    orientation === 'PORTRAIT'
                      ? w > 411 && w < 412
                        ? '80%'
                        : w === 480
                        ? h > 1018 && h < 1019
                          ? '90%'
                          : h > 938 && h < 939
                          ? '85%'
                          : h > 805 && h < 806
                          ? '70%'
                          : h === 912
                          ? '90%'
                          : '62%'
                        : h === 912
                        ? '80%'
                        : Platform.OS === 'android'
                        ? h === 816
                          ? '80%'
                          : h === 1182
                          ? '70%'
                          : h === 1032
                          ? '70%'
                          : h === 1122
                          ? '70%'
                          : '90%'
                        : h === 568
                        ? '90%'
                        : '80%'
                      : Platform.OS === 'android'
                      ? h === 360
                        ? w === 592
                          ? '60%'
                          : '50%'
                        : '100%'
                      : w === 568
                      ? '80%'
                      : '100%',
                }}>
                Bienvenue sur l'application SIDAM qui vous permet de bénéficier
                d'une
              </Text>
              <View
                style={{
                  width: w / 1.7,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize:
                      h === 1152
                        ? 40
                        : h > 1018 && h < 1019
                        ? 40
                        : h === 912
                        ? 40
                        : h > 938 && h < 939
                        ? 40
                        : w === 270
                        ? 25
                        : h === 568
                        ? 25
                        : 33,
                    fontFamily: 'OpenSans-ExtraBold',
                    textAlign: 'center',
                    color: 'white',
                    textTransform: 'uppercase',
                  }}>
                  extension
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize:
                      h === 1152
                        ? 40
                        : h > 1018 && h < 1019
                        ? 40
                        : h === 912
                        ? 40
                        : h > 938 && h < 939
                        ? 40
                        : w === 270
                        ? 25
                        : h === 568
                        ? 25
                        : 33,
                    fontFamily: 'OpenSans-ExtraBold',
                    textAlign: 'center',
                    color: 'white',
                    textTransform: 'uppercase',
                  }}>
                  de garantie
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize:
                      h === 1152
                        ? 40
                        : h > 1018 && h < 1019
                        ? 40
                        : h === 912
                        ? 40
                        : h > 938 && h < 939
                        ? 40
                        : w === 270
                        ? 25
                        : h === 568
                        ? 25
                        : 33,
                    fontFamily: 'OpenSans-ExtraBold',
                    textAlign: 'center',
                    color: 'white',
                    textTransform: 'uppercase',
                  }}>
                  de votre arme
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            marginTop:
              orientation === 'PORTRAIT'
                ? Platform.OS === 'android'
                  ? h === 592
                    ? '15%'
                    : h === 1152
                    ? '35%'
                    : h > 1018 && h < 1019
                    ? '30%'
                    : h === 752
                    ? '30%'
                    : w === 270
                    ? '20%'
                    : w === 480
                    ? h > 938 && h < 939
                      ? '30%'
                      : h === 912
                      ? '30%'
                      : '34%'
                    : h === 1182
                    ? '40%'
                    : h === 1032
                    ? '37%'
                    : h === 1122
                    ? '35%'
                    : h > 830 && h < 831
                    ? '33%'
                    : '24%'
                  : h === 667
                  ? '20%'
                  : w === 414
                  ? h === 896
                    ? '30%'
                    : '25%'
                  : h === 568
                  ? '22%'
                  : '30%'
                : Platform.OS === 'android'
                ? '10%'
                : '10%',
          }}>
          <View>
            {errorBB && (
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 16,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Utilisateur inconnu
                </Text>
              </View>
            )}
          </View>
          {errorD && (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: 'Poppins-Regular',
                }}>
                Utilisateur inconnu
              </Text>
            </View>
          )}
          {email && (
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}>
              <Text
                style={{
                  color: '#999D3B',
                  textAlign: 'center',
                  fontSize: w === 270 ? 13 : 16,
                  fontFamily: 'Poppins-Regular',
                  width: w / 1.1,
                }}>
                Un email avec vos idenfiants SIDAM vous a été envoyé par email
              </Text>
            </View>
          )}
          {errorsBis && (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: w === 270 ? 14 : 16,
                  fontFamily: 'Poppins-Regular',
                }}>
                Veuillez renseigner tous les champs
              </Text>
            </View>
          )}

          <View
            style={{
              width: '100%',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                backgroundColor: 'white',
                width: orientation === 'PORTRAIT' ? '67%' : '40%',
                height: 50,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 10,
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

            <View>{d}</View>

            <TextInput
              style={{
                backgroundColor: 'white',
                width: orientation === 'PORTRAIT' ? '67%' : '40%',
                height: 50,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                marginTop: 20,
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
              placeholderTextColor="grey"
              onChangeText={val =>
                setForm({
                  ...form,
                  motdepasse: val,
                })
              }
              secureTextEntry={passwordVisB ? false : true}
              placeholder="Mot de passe"
              autoCapitalize="none"
              textContentType="password"
            />
            <TouchableOpacity onPress={() => setPasswordVisuB(!passwordVisB)}>
              <Icon name="eye" type="AntDesign" />
            </TouchableOpacity>
          </View>
        </View>
        <View>{e}</View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'space-around',
            flexDirection: 'row',
            width: '100%',
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#636A28',
                width: orientation === 'PORTRAIT' ? '55%' : '35%',
                height: 40,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}
              onPress={() => handleSubmit()}>
              <Text
                style={{
                  color: 'white',
                  fontSize:
                    Platform.OS === 'ios'
                      ? h === 568 || w === 568
                        ? 17
                        : 17
                      : w === 270
                      ? 14
                      : 17,
                  fontFamily: 'OpenSans-SemiBold',
                }}>
                Se connecter
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
                        ? h === 432
                          ? 125
                          : 175
                        : 190
                      : '85%',
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#6D9FB2',
                  width: orientation === 'PORTRAIT' ? '55%' : '35%',
                  height: 40,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 30,
                }}
                onPress={() => props.navigation.navigate('Inscription')}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: w === 270 ? 14 : 17,
                    fontFamily: 'OpenSans-SemiBold',
                    textAlign: 'center',
                  }}>
                  Créer un compte
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
                            ? 130
                            : 175
                          : 190
                        : '85%',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => {
              setResetPassword(true);
            }}>
            <Text
              style={{
                color: 'red',
                fontSize: w === 270 ? 14 : 17,
                fontFamily: 'Poppins-Regular',
              }}>
              Mot de passe oublié ?
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 30,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          {errors && (
            <Text
              style={{
                color: 'red',
                fontSize:
                  Platform.OS === 'ios'
                    ? h === 568 || w === 568
                      ? 13
                      : 16
                    : 16,
                fontFamily: 'Poppins-Regular',
              }}>
              Veuillez saisir un identifiant
            </Text>
          )}
          <View
            style={{
              marginTop:
                Platform.OS === 'android'
                  ? '0%'
                  : orientation === 'PORTRAIT'
                  ? '10%'
                  : '5%',
            }}></View>
        </View>
      </ScrollView>
      <ResetPassword
        handleResetSucces={() => {
          setmdp(false);
          setEmailS(true);
          setResetPassword(false);
          dispatch(ACTIONS.LogoutBis());
        }}
        resetPass={resetPassword}
        passwordR={() => setResetPassword(null)}
      />
    </KeyboardAvoidingView>
  );
};

export default Connexion;
