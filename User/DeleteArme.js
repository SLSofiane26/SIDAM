import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Icon, Picker} from 'native-base';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from '@env';
import FondB from '../assets/fond.jpg';
import {Select, Option} from 'react-native-chooser';
import * as ACTIONS from './ACTIONS';

let DeleteArme = props => {
  let [orientation, setOrientation] = useState(null);
  let [armeError, setErrArme] = useState(false);
  let [error, setError] = useState(null);
  let [errorBis, setErrorBis] = useState(null);

  let [armurier, setArmurier] = useState({
    nom: null,
    telephone: null,
    email: '',
  });

  let [email, setEmail] = useState('');

  let [form, setForm] = useState('Particulier');

  let token = useSelector(state => state.token);

  let dispatch = useDispatch();

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
    let existe = true;
    Object.values(form).forEach(val => {
      if (!val) {
        existe = false;
      }
    });
    return existe;
  };

  //permet de transférer une arme vers un armurier//
  let handleDelBis = async data => {
    let f = {};
    f.nom = armurier.nom;
    f.telephone = armurier.telephone;
    f.email = armurier.email;

    if (
      isValid(armurier) &&
      !isNaN(armurier.telephone) &&
      regEx.test(armurier.email)
    ) {
      await axios({
        method: 'POST',
        baseURL: `${API_URL}/api/armes/cedd/${props.route.params.delete._id}`,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        data: f,
      })
        .then(res => {
          dispatch(ACTIONS.Facture(token));
          props.navigation.navigate('Armes', {
            delete: props.route.params.delete._id,
          });
        })
        .catch(err => {
          setErrArme(true);
        });
    } else {
      setErrArme(true);
    }
  };

  //permet de transférer une arme vers un particulier//
  let handleDel = async data => {
    let f = {};
    f.email = email;
    if (email && regEx.test(email)) {
      await axios({
        method: 'POST',
        baseURL: `${API_URL}/api/armes/ced/${props.route.params.delete._id}`,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        data: f,
      })
        .then(res => {
          dispatch(ACTIONS.Facture(token));
          props.navigation.navigate('Armes', {
            delete: props.route.params.delete._id,
          });
        })
        .catch(err => {
          setError(true);
        });
    } else {
      setErrorBis(true);
    }
  };

  //permet de supprimer une arme//
  let handleDeleted = async () => {
    await axios({
      method: 'DELETE',
      baseURL: `${API_URL}/api/armes/${props.route.params.delete._id}`,
      headers: {
        'x-auth-token': token,
      },
    }).then(res => {
      dispatch(ACTIONS.Facture(token));
      props.navigation.navigate('Armes', {
        delete: props.route.params.delete._id,
      });
    });
  };

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 7000);
  }

  if (errorBis) {
    setTimeout(() => {
      setErrorBis(false);
    }, 7000);
  }

  if (armeError) {
    setTimeout(() => {
      setErrArme(false);
    }, 7000);
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled={true}>
      <Image
        source={FondB}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{height: '100%'}}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingTop:
              orientation === 'PORTRAIT'
                ? Platform.OS === 'android'
                  ? h > 753 && h < 754
                    ? '25%'
                    : h > 830 && h < 831
                    ? '28%'
                    : '22%'
                  : h === 896
                  ? '30%'
                  : '25%'
                : Platform.OS === 'android'
                ? '5%'
                : '10%',
            backgroundColor:
              form === 'Destruction'
                ? 'white'
                : !form && Platform.OS === 'android'
                ? 'null'
                : 'white',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop:
                orientation === 'PORTRAIT'
                  ? Platform.OS === 'android'
                    ? h === 1182
                      ? '5%'
                      : '4%'
                    : h === 667
                    ? '7%'
                    : w === 414
                    ? '6%'
                    : h === 568
                    ? '12%'
                    : '10%'
                  : Platform.OS === 'android'
                  ? w > 683 && w < 684
                    ? '8%'
                    : '5%'
                  : w === 568
                  ? '9%'
                  : '5%',
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{
                width: orientation === 'PORTRAIT' ? '95%' : '100%',
                height: 20,
              }}>
              <Icon
                type="Entypo"
                name="chevron-left"
                style={{
                  position: 'absolute',
                  fontSize: w === 320 ? 17 : 20,
                  color: '#636A28',
                  marginLeft: orientation === 'PORTRAIT' ? '0%' : '2%',
                  marginTop: w === 270 ? 0 : 2,
                }}
              />
              <Text
                style={{
                  color: '#636A28',
                  fontSize: w === 270 ? 13 : 16,
                  fontFamily: 'Poppins-Regular',
                  marginLeft: w === 270 ? '8%' : '5%',
                }}>
                Retour
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                width:
                  orientation === 'PORTRAIT'
                    ? Platform.OS === 'android'
                      ? w === 360
                        ? '60%'
                        : w === 270
                        ? '60%'
                        : '50%'
                      : h === 568
                      ? '60%'
                      : '50%'
                    : Platform.OS === 'android'
                    ? w > 753 && w < 754
                      ? '25%'
                      : h === 432
                      ? '26%'
                      : w === 1152
                      ? '20%'
                      : w === 592
                      ? '35%'
                      : w > 1018 && w < 1019
                      ? '25%'
                      : w === 960
                      ? '25%'
                      : h === 492
                      ? '20%'
                      : '30%'
                    : w === 667
                    ? '30%'
                    : w === 736
                    ? '27%'
                    : w === 568
                    ? '35%'
                    : '23%',
                color: '#636A28',
                textAlign: 'center',
                fontSize: w === 270 ? 20 : 27,
                fontFamily: 'OpenSans-ExtraBold',
              }}>
              Je me sépare de mon arme
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              {Platform.OS === 'android' ? (
                <View
                  style={{
                    height: 40,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Select
                    style={{
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      width: orientation === 'PORTRAIT' ? w / 1.2 : w / 2,
                    }}
                    animationType="slide"
                    indicatorColor="#999D3B"
                    indicator="down"
                    defaultText={form ? form : 'Je céde mon arme'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm(item)}
                    optionListStyle={{
                      height: orientation === 'PORTRAIT' ? h / 3 : h / 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                      backgroundColor: 'white',
                    }}>
                    <Option value=""></Option>
                    <Option value="Armurier">
                      <Text
                        style={{
                          fontSize: w === 270 ? 15 : 20,
                          color: 'black',
                        }}>
                        Je céde mon arme à un armurier
                      </Text>
                    </Option>
                    <Option value="Particulier">
                      <Text
                        style={{
                          fontSize: w === 270 ? 15 : 20,
                          color: 'black',
                        }}>
                        Je céde mon arme à un particulier
                      </Text>
                    </Option>
                    <Option value="Destruction">
                      <Text
                        style={{fontSize: w === 270 ? 15 : 20, color: 'black'}}>
                        Je céde mon arme pour destruction
                      </Text>
                    </Option>
                  </Select>
                </View>
              ) : (
                <Picker
                  iosIcon={<Icon name="down" type="AntDesign" />}
                  iosHeader="Céder"
                  placeholder={
                    form === 'Destruction'
                      ? 'Je cède mon arme pour destruction'
                      : `Je cède mon arme ${form ? `à un ${form}` : ''}`
                  }
                  mode="dropdown"
                  textStyle={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                  }}
                  placeholderStyle={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    fontSize: 15,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  style={{
                    height: 40,
                    borderColor: '#3D4C28',
                    borderWidth: 1,
                    width: orientation === 'PORTRAIT' ? w / 1.2 : w / 2,
                    backgroundColor: 'white',
                  }}
                  headerStyle={{
                    backgroundColor: '#636A28',
                  }}
                  accessibilityLabel={'sujetB'}
                  headerTitleStyle={{
                    color: 'white',
                    fontSize: 15,
                    fontFamily: 'Poppins-Regular',
                  }}
                  itemTextStyle={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 15,
                  }}
                  headerBackButtonText="Retour"
                  headerBackButtonTextStyle={{
                    color: 'white',
                  }}
                  onValueChange={(itemValue, itemIndex) => setForm(itemValue)}>
                  <Picker.Item
                    value="Armurier"
                    label="Je céde mon arme à un armurier"
                  />
                  <Picker.Item
                    value="Particulier"
                    label="Je céde mon arme à un particulier"
                  />
                  <Picker.Item
                    value="Destruction"
                    label="Je céde mon arme pour destruction"
                  />
                </Picker>
              )}
            </View>
          </View>
          {form === 'Armurier' && (
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: orientation === 'PORTRAIT' ? '84%' : '50%',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: w === 270 ? 13 : 16,
                    color: 'black',
                    textAlign: 'left',
                    marginTop: 15,
                  }}>
                  Je cède mon arme et son extension de garantie cumulée. Le
                  nouvel acquéreur doit télécharger l’application et contacter
                  SIDAM pour enregistrer le transfert de son arme dans son
                  coffre fort virtuel. Le nouvel acheteur a un délai d’un mois
                  pour bénéficier du transfert gratuit de l’extension.
                </Text>
              </View>
              <View
                style={{
                  marginTop: orientation === 'PORTRAIT' ? 20 : 15,
                }}>
                <TextInput
                  style={{
                    width:
                      orientation === 'PORTRAIT'
                        ? w / 1.2
                        : Platform.OS === 'android'
                        ? w / 1.5
                        : w / 2,
                    backgroundColor: 'white',
                    height: 50,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    paddingLeft: 20,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 17,
                  }}
                  placeholder="Nom de l'armurerie"
                  dataDetectorTypes="all"
                  autoCapitalize="none"
                  placeholderTextColor="grey"
                  onChangeText={val =>
                    setArmurier({
                      ...armurier,
                      nom: val,
                    })
                  }
                />
                {armeError && !armurier.nom && (
                  <Text
                    style={{
                      color: 'red',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 16,
                      marginTop: 15,
                      textAlign: 'center',
                    }}>
                    Veuillez renseigner le nom de l'armurier
                  </Text>
                )}
              </View>
              <View>
                <TextInput
                  onChangeText={val =>
                    setArmurier({
                      ...armurier,
                      telephone: val,
                    })
                  }
                  style={{
                    width:
                      orientation === 'PORTRAIT'
                        ? w / 1.2
                        : Platform.OS === 'android'
                        ? w / 1.5
                        : w / 2,
                    backgroundColor: 'white',
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
                  placeholder="Téléphone de l'armurier"
                  dataDetectorTypes="all"
                  autoCapitalize="none"
                  placeholderTextColor="grey"
                />
                {armeError && !armurier.telephone && (
                  <Text
                    style={{
                      color: 'red',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 16,
                      marginTop: 15,
                      textAlign: 'center',
                    }}>
                    Veuillez renseigner le téléphone de l'armurier
                  </Text>
                )}
              </View>
              <View>
                <TextInput
                  onChangeText={val =>
                    setArmurier({
                      ...armurier,
                      email: val,
                    })
                  }
                  style={{
                    width:
                      orientation === 'PORTRAIT'
                        ? w / 1.2
                        : Platform.OS === 'android'
                        ? w / 1.5
                        : w / 2,
                    backgroundColor: 'white',
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
                  placeholder="Email de l'armurier"
                  dataDetectorTypes="all"
                  autoCapitalize="none"
                  placeholderTextColor="grey"
                />
                {armeError && !armurier.telephone && (
                  <Text
                    style={{
                      color: 'red',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 16,
                      marginTop: 15,
                      textAlign: 'center',
                    }}>
                    Veuillez renseigner l'email de l'armurier
                  </Text>
                )}
              </View>

              <View style={{marginTop: 40}}></View>
              <View
                style={{
                  width: Dimensions.get('window').width,
                }}>
                <Image
                  source={FondB}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  {armurier.email.length > 0 && !regEx.test(armurier.email) && (
                    <Text
                      style={{
                        color: 'red',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 16,
                        marginTop: 15,
                      }}>
                      Email invalide
                    </Text>
                  )}
                  {armeError && (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        width: Dimensions.get('window').width,
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 16,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Veuillez renseigner tous les champs
                      </Text>
                    </View>
                  )}
                  <View
                    style={{
                      marginTop: orientation === 'PORTRAIT' ? '5%' : '3%',
                      width:
                        orientation === 'PORTRAIT'
                          ? '60%'
                          : w === 568
                          ? '60%'
                          : '100%',
                    }}>
                    <Text
                      style={{
                        color: '#636A28',
                        textAlign: 'center',
                        fontSize: w === 270 ? 16 : 20,
                        fontFamily: 'OpenSans-ExtraBold',
                      }}>
                      Êtes-vous sûr de vouloir transférer cette arme ?
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: 20,
                      width: '100%',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#6D9FB2',
                        width: orientation === 'PORTRAIT' ? '60%' : '32%',
                        height: 60,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => handleDelBis()}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontSize:
                            w === 360
                              ? 16
                              : w === 270
                              ? h === 432
                                ? 14
                                : 13
                              : 17,
                          fontFamily: 'OpenSans-SemiBold',
                          width:
                            Platform.OS === 'android'
                              ? orientation === 'PORTRAIT'
                                ? w === 360
                                  ? '80%'
                                  : w === 270
                                  ? '90%'
                                  : '80%'
                                : w === 592
                                ? '100%'
                                : '90%'
                              : orientation === 'PORTRAIT'
                              ? '80%'
                              : w === 736
                              ? '80%'
                              : w === 568
                              ? '100%'
                              : '70%',
                        }}>
                        Envoyer votre demande de transfert
                      </Text>
                      <Icon
                        name="right"
                        type="AntDesign"
                        style={{
                          fontSize: 15,
                          color: 'white',
                          position: 'absolute',
                          paddingLeft: '90%',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: 40}}></View>
                </View>
              </View>
            </View>
          )}
          {form === 'Destruction' && (
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{marginTop: 40}}></View>
              <View
                style={{
                  width: Dimensions.get('window').width,
                }}>
                <Image
                  source={FondB}
                  style={{
                    position: 'absolute',
                    width: Dimensions.get('window').width,
                    height: '100%',
                  }}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      marginTop: 40,
                      width:
                        orientation === 'PORTRAIT'
                          ? '60%'
                          : w === 568
                          ? '35%'
                          : '32%',
                    }}>
                    <Text
                      style={{
                        color: '#636A28',
                        textAlign: 'center',
                        fontSize: w === 270 ? 16 : 20,
                        fontFamily: 'OpenSans-ExtraBold',
                      }}>
                      Êtes-vous sûr de vouloir supprimer cette arme ?
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      width: '100%',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#6D9FB2',
                        width:
                          orientation === 'PORTRAIT'
                            ? h === 568
                              ? '65%'
                              : '60%'
                            : w === 568
                            ? '34%'
                            : '33%',
                        height: 60,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                      }}
                      onPress={() => handleDeleted()}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontSize: w === 270 ? 12 : 16,
                          fontFamily: 'OpenSans-SemiBold',
                          width:
                            orientation === 'PORTRAIT'
                              ? w === 375
                                ? '82%'
                                : Platform.OS === 'android'
                                ? h === 640
                                  ? '86%'
                                  : h === 592
                                  ? w === 384
                                    ? '80%'
                                    : '90%'
                                  : w === 270
                                  ? '90%'
                                  : h === 752
                                  ? w === 392
                                    ? '80%'
                                    : '90%'
                                  : h === 732
                                  ? '90%'
                                  : h === 692
                                  ? '90%'
                                  : '85%'
                                : h === 568
                                ? '89%'
                                : '79%'
                              : Platform.OS === 'android'
                              ? w > 753 && w < 754
                                ? '80%'
                                : w === 592
                                ? '100%'
                                : '90%'
                              : w > 900
                              ? '62%'
                              : w === 667
                              ? '85%'
                              : w === 736
                              ? '80%'
                              : w === 568
                              ? '100%'
                              : '70%',
                        }}>
                        Envoyer votre demande de suppression
                      </Text>
                      <Icon
                        name="right"
                        type="AntDesign"
                        style={{
                          fontSize: 15,
                          color: 'white',
                          position: 'absolute',
                          paddingLeft: '90%',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{marginTop: 20}}></View>
              </View>
            </View>
          )}
          {form === 'Particulier' && (
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: orientation === 'PORTRAIT' ? '84%' : '50%',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: w === 270 ? 13 : 16,
                    color: 'black',
                    textAlign: 'left',
                    marginTop: 15,
                  }}>
                  Je cède mon arme et son extension de garantie cumulée. Le
                  nouvel acquéreur doit télécharger l’application et contacter
                  SIDAM pour enregistrer le transfert de son arme dans son
                  coffre fort virtuel. Le nouvel acheteur a un délai d’un mois
                  pour bénéficier du transfert gratuit de l’extension.
                </Text>
              </View>
              <View
                style={{
                  marginTop: 15,
                  width: w,
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  onChangeText={val => setEmail(val)}
                  style={{
                    width: orientation === 'PORTRAIT' ? '84%' : '50%',
                    backgroundColor: 'white',
                    height: 50,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    paddingLeft: 20,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 17,
                  }}
                  placeholder="Mail de l'acquéreur"
                  dataDetectorTypes="all"
                  autoCapitalize="none"
                  placeholderTextColor="grey"
                />
              </View>

              <View style={{marginTop: 30}}></View>

              <View
                style={{
                  width: Dimensions.get('window').width,
                }}>
                <Image
                  source={FondB}
                  style={{
                    position: 'absolute',
                    width: Dimensions.get('window').width,
                    height: '100%',
                  }}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  {error && (
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 17,
                        marginTop: 10,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Utilisateur inconnu
                    </Text>
                  )}
                  {email.length > 0 && !regEx.test(email) && (
                    <Text
                      style={{
                        color: 'red',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 16,
                        marginTop: 15,
                      }}>
                      Email invalide
                    </Text>
                  )}
                  {errorBis && (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        width: Dimensions.get('window').width,
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 16,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Veuillez renseigner tous les champs
                      </Text>
                    </View>
                  )}
                  <View
                    style={{
                      marginTop: orientation === 'PORTRAIT' ? '5%' : '3%',
                      width:
                        orientation === 'PORTRAIT'
                          ? '60%'
                          : w === 568
                          ? '50%'
                          : '32%',
                    }}>
                    <Text
                      style={{
                        color: '#636A28',
                        textAlign: 'center',
                        fontSize: w === 270 ? 16 : 20,
                        fontFamily: 'OpenSans-ExtraBold',
                      }}>
                      Êtes-vous sûr de vouloir transférer cette arme ?
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 25,
                      width: '100%',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#6D9FB2',
                        width:
                          orientation === 'PORTRAIT'
                            ? '60%'
                            : w === 568
                            ? '34%'
                            : '32%',
                        height: 60,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => handleDel()}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontSize: w === 360 ? 16 : h === 432 ? 14 : 17,
                          fontFamily: 'OpenSans-SemiBold',
                          width:
                            Platform.OS === 'android'
                              ? orientation === 'PORTRAIT'
                                ? '80%'
                                : w === 592
                                ? h === 384
                                  ? '100%'
                                  : '95%'
                                : w === 640
                                ? '100%'
                                : '85%'
                              : orientation === 'PORTRAIT'
                              ? h === 568
                                ? '100%'
                                : '80%'
                              : w === 667
                              ? '85%'
                              : w === 736
                              ? '80%'
                              : w === 568
                              ? '100%'
                              : '70%',
                        }}>
                        Envoyer votre demande de transfert
                      </Text>
                      <Icon
                        name="right"
                        type="AntDesign"
                        style={{
                          fontSize: 15,
                          color: 'white',
                          position: 'absolute',
                          paddingLeft:
                            orientation === 'PORTRAIT' ? '90%' : '85%',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: 40}}></View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DeleteArme;
