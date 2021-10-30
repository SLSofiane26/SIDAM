import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Picker, Icon} from 'native-base';
import axios from 'axios';
import {API_URL} from '@env';
import FondB from '../assets/fond.jpg';
import {Select, Option} from 'react-native-chooser';
import Sound from 'react-native-sound';
import DatePicker from 'react-native-date-picker';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch} from 'react-redux';
import * as ACTIONS from './ACTIONS';
import Spinner from 'react-native-spinkit';

let AddArmes = props => {
  let [form, setForm] = useState({
    modele: null,
    calibre: null,
    serie: null,
    dateAchat: null,
    autorisation: null,
    armurier: null,
    marques: null,
    type: null,
  });

  let [dateB, setDateB] = useState(new Date());
  let [DD, setDD] = useState(false);
  let [picture, setPicture] = useState(false);
  let [date, setDate] = useState(false);
  let [error, setError] = useState(null);
  let [orientation, setOrientation] = useState(null);
  let [loading, setLoading] = useState(false);

  let token = useSelector(state => state.token);

  let dispatch = useDispatch();

  let cc = false;

  let w = Dimensions.get('window').width;
  let h = Dimensions.get('window').height;

  let dateBBB = null;

  let fff = null;

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

  Sound.setCategory('Playback');

  if (dateB) {
    let mois = new Date(dateB).getMonth() + 1;
    let jours = new Date(dateB).getDate();
    let annee = new Date(dateB).getFullYear();

    if (jours < 10) {
      jours = '0' + jours;
    }

    if (mois < 10) {
      mois = '0' + mois;
    }

    dateBBB = `${jours}/${mois}/${annee}`;
    fff = dateBBB.toString();
  }

  let isValid = object => {
    let existe = true;
    Object.values(object).forEach(val => {
      if (!val) {
        existe = false;
      }
    });
    return existe;
  };

  let handleDateBis = date => {
    setDateB(date);
    setDD(true);
  };

  let handleConfirm = data => {
    setDateB(data);
    setDD(true);
    setDate(false);
  };

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 7000);
  }

  let validatePicture = async () => {
    await ImagePicker.openPicker({
      cropping: true,
      cropperCancelText: 'Annuler',
      cropperChooseText: 'Sélectionner une photo',
      cropperActiveWidgetColor: 'white',
      cropperStatusBarColor: '#999D3B',
      cropperTintColor: 'white',
      cropperToolbarColor: '#999D3B',
      cropperToolbarWidgetColor: 'white',
      cropperToolbarTitle: 'SIDAM',
      width: 1700,
      height: 1800,
    })
      .then(res => {
        setPicture(false);
        setForm({
          ...form,
          autorisation: res.path,
        });
      })
      .catch(err => {
        setPicture(false);
      });
  };

  let handleAddW = async () => {
    setForm({
      ...form,
      munitions: 'dsdsds',
    });

    form.dateAchat = dateB;

    setLoading(true);

    if (isValid(form)) {
      if (
        (form.marques === 'SMITHWESSON' && form.type === 'PISTOLETCZ') ||
        (form.marques === 'SMITHWESSON' && form.type === 'CARABINECZ')
      ) {
        setError(true);
        setForm({
          ...form,
          calibre: null,
          dateAchat: null,
          type: null,
          modele: null,
          marques: null,
        });
      } else if (
        (form.marques === 'CZ' && form.type === 'PISTOLETSMITHWESSON') ||
        (form.marques === 'CZ' && form.type === 'REVOLVERSMITHWESSON') ||
        (form.marques === 'CZ' && form.type === 'CARABINESMITHWESSON')
      ) {
        setError(true);
        setForm({
          ...form,
          calibre: null,
          dateAchat: null,
          type: null,
          modele: null,
          marques: null,
        });
      } else {
        await axios({
          method: 'POST',
          baseURL: `${API_URL}/api/armes`,
          headers: {
            'x-auth-token': token,
          },
          data: form,
        })
          .then(async res => {
            await RNFetchBlob.fetch(
              'POST',
              `${API_URL}/api/armes/${res.data._id}`,
              {
                'Content-Type': 'multipart/form-data',
              },
              [
                {
                  name: 'autorisation',
                  filename: 'autorisation.jpg',
                  type: 'image/foo',
                  data: RNFetchBlob.wrap(form.autorisation),
                },
              ],
            )
              .then(resp => {
                let whoosh = new Sound(
                  'sound_one.mp3',
                  Sound.MAIN_BUNDLE,
                  error => {
                    if (error) {
                      return;
                    }
                    whoosh.setVolume(1);
                    whoosh.play(success => {
                      if (success) {
                        setLoading(false);
                        dispatch(ACTIONS.Facture(token));
                        props.navigation.navigate('Armes', {
                          delete: res.data._id,
                        });
                      } else {
                        return;
                      }
                    });
                  },
                );
              })
              .catch(err => {
                setLoading(false);
                setError(true);
              });
          })
          .catch(err => {
            setLoading(false);
            setError(true);
          });
      }
    } else {
      setLoading(false);
      setError(true);
    }
  };

  let handlePicture = async () => {
    setPicture(true);
  };

  let handlePictureBis = async () => {
    await ImagePicker.openCamera({
      cropping: true,
      cropperCancelText: 'Annuler',
      cropperChooseText: 'Sélectionner une photo',
      cropperActiveWidgetColor: 'white',
      cropperStatusBarColor: '#999D3B',
      cropperTintColor: 'white',
      cropperToolbarColor: '#999D3B',
      cropperToolbarWidgetColor: 'white',
      cropperToolbarTitle: 'SIDAM',
      width: 1700,
      height: 1800,
    })
      .then(res => {
        setPicture(false);
        setForm({
          ...form,
          autorisation: res.path,
        });
      })
      .catch(err => {
        setPicture(false);
      });
  };

  if (
    (form.marques === 'SMITHWESSON' && form.type === 'PISTOLETCZ') ||
    (form.marques === 'SMITHWESSON' && form.type === 'CARABINECZ')
  ) {
    setForm({
      ...form,
      calibre: null,
      dateAchat: null,
      type: null,
      modele: null,
      marques: null,
    });
  } else if (
    (form.marques === 'CZ' && form.type === 'PISTOLETSMITHWESSON') ||
    (form.marques === 'CZ' && form.type === 'REVOLVERSMITHWESSON') ||
    (form.marques === 'CZ' && form.type === 'CARABINESMITHWESSON')
  ) {
    setForm({
      ...form,
      calibre: null,
      dateAchat: null,
      type: null,
      modele: null,
      marques: null,
    });
  } else if (
    (form.type === 'PISTOLETCZ' && form.modele == 'SCORPIONEVO3S1') ||
    (form.type === 'PISTOLETCZ' && form.modele === 'BREN2')
  ) {
    setForm({
      ...form,
      calibre: null,
      dateAchat: null,
      type: null,
      modele: null,
      marques: null,
    });
  } else if (
    (form.type === 'CARABINECZ' && form.modele == '75') ||
    (form.type === 'CARABINECZ' && form.modele === 'P-07') ||
    (form.type === 'CARABINECZ' && form.modele === 'P-09') ||
    (form.type === 'CARABINECZ' && form.modele === 'P-10') ||
    (form.type === 'CARABINECZ' && form.modele === 'SHADOW1') ||
    (form.type === 'CARABINECZ' && form.modele === 'SHADOW2') ||
    (form.type === 'CARABINECZ' && form.modele === 'TACTICALSPORT') ||
    (form.type === 'CARABINECZ' && form.modele === 'TACTICALSPORT2')
  ) {
    setForm({
      ...form,
      calibre: null,
      dateAchat: null,
      type: null,
      modele: null,
      marques: null,
    });
  } else if (
    (form.type === 'PISTOLETSMITHWESSON' && form.modele == 'M&P15') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === 'M&P10') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '10') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '19') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '25') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '27') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '29') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '36') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '57') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '60') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '64') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '66') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '67') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '69') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '327') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '329') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '340') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '360') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '442') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '460') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '500') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '586') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '610') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '625') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '627') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '629') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '637') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '638') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '640') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '642') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '649') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '686') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '929') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === '986') ||
    (form.type === 'PISTOLETSMITHWESSON' && form.modele === 'R8')
  ) {
    setForm({
      ...form,
      calibre: null,
      dateAchat: null,
      type: null,
      modele: null,
      marques: null,
    });
  } else if (
    (form.type === 'CARABINESMITHWESSON' && form.modele === '1911') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === 'BODYGUARD380') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === 'M&P380') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === 'M&P40') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === 'M&P45') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === 'M&P9') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === 'SD40') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === 'SD9') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '10') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '19') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '25') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '27') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '29') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '36') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '57') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '60') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '64') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '66') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '67') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '69') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '327') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '329') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '340') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '360') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '442') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '460') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '500') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '586') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '610') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '625') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '627') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '629') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '637') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '638') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '640') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '642') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '649') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '686') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '929') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === '986') ||
    (form.type === 'CARABINESMITHWESSON' && form.modele === 'R8')
  ) {
    setForm({
      ...form,
      calibre: null,
      dateAchat: null,
      type: null,
      modele: null,
      marques: null,
    });
  } else if (
    (form.type === 'REVOLVERSMITHWESSON' && form.modele === '1911') ||
    (form.type === 'REVOLVERSMITHWESSON' && form.modele === 'BODYGUARD380') ||
    (form.type === 'REVOLVERSMITHWESSON' && form.modele === 'M&P380') ||
    (form.type === 'REVOLVERSMITHWESSON' && form.modele === 'M&P40') ||
    (form.type === 'REVOLVERSMITHWESSON' && form.modele === 'M&P45') ||
    (form.type === 'REVOLVERSMITHWESSON' && form.modele === 'M&P9') ||
    (form.type === 'REVOLVERSMITHWESSON' && form.modele === 'SD40') ||
    (form.type === 'REVOLVERSMITHWESSON' && form.modele === 'SD9') ||
    (form.type === 'REVOLVERSMITHWESSON' && form.modele === 'M&P15') ||
    (form.type === 'REVOLVERSMITHWESSON' && form.modele === 'M&P10')
  ) {
    setForm({
      ...form,
      calibre: null,
      dateAchat: null,
      type: null,
      modele: null,
      marques: null,
    });
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled={true}>
      <Image
        source={FondB}
        style={{
          width: '100%',
          position: 'absolute',
          height: '100%',
        }}
      />
      <View
        style={{
          marginTop:
            orientation === 'PORTRAIT'
              ? Platform.OS === 'android'
                ? '20%'
                : h === 667
                ? '22%'
                : h === 568
                ? '25%'
                : '26%'
              : Platform.OS === 'android'
              ? w > 753 && w < 754
                ? '10%'
                : '10%'
              : '10%',
        }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{height: '100%'}}>
          <View
            style={{
              marginTop:
                Platform.OS === 'ios'
                  ? orientation === 'PORTRAIT'
                    ? h === 667
                      ? '12%'
                      : '8%'
                    : w === 568
                    ? '5%'
                    : w === 667
                    ? '6%'
                    : w === 736
                    ? '5%'
                    : '2%'
                  : orientation === 'PORTRAIT'
                  ? h > 845 && h < 846
                    ? '10%'
                    : '10%'
                  : '0%',
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{
                width: '100%',
                height: 40,
              }}>
              <Icon
                type="Entypo"
                name="chevron-left"
                style={{
                  position: 'absolute',
                  fontSize: 20,
                  color: '#636A28',
                  marginLeft: '2%',
                  marginTop: 1,
                }}
              />
              <Text
                style={{
                  color: '#636A28',
                  fontSize: 16,
                  fontFamily: 'Poppins-Regular',
                  marginLeft:
                    orientation === 'PORTRAIT'
                      ? w === 270
                        ? '9%'
                        : '7%'
                      : '5%',
                }}>
                Retour
              </Text>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              {Platform.OS === 'android' ? (
                <Select
                  style={{
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    backgroundColor: 'white',
                    height: 50,
                    width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                  }}
                  animationType="slide"
                  indicatorColor="#636A28"
                  indicator="down"
                  defaultText={
                    form.marques
                      ? form.marques === 'SMITHWESSON'
                        ? 'Smith & Wesson'
                        : 'CZ'
                      : 'Veuillez choisir une marque'
                  }
                  backdropStyle={{
                    backgroundColor: 'white',
                  }}
                  onSelect={item => setForm({...form, marques: item})}
                  optionListStyle={{
                    height: Dimensions.get('window').height / 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    width: Dimensions.get('window').width,
                    backgroundColor: 'white',
                    borderWidth: 0,
                  }}>
                  <Option value=""></Option>
                  <Option value="CZ">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      CZ
                    </Text>
                  </Option>
                  <Option value="SMITHWESSON">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      SMITH & WESSON
                    </Text>
                  </Option>
                </Select>
              ) : (
                <Picker
                  iosHeader="Marque"
                  mode="dropdown"
                  iosIcon={<Icon name="down" type="AntDesign" />}
                  textStyle={{
                    textAlign: 'center',
                  }}
                  placeholder={
                    form.marques
                      ? form.marques === 'SMITHWESSON'
                        ? 'Smith & Wesson'
                        : 'CZ'
                      : 'Marque d' + "'" + 'arme'
                  }
                  placeholderStyle={{
                    fontSize: h === 568 ? 15 : 17,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  style={{
                    backgroundColor: 'white',
                    width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                    borderColor: '#3D4C28',
                    borderWidth: 1,
                    height: 50,
                  }}
                  accessibilityLabel={'marques'}
                  headerStyle={{
                    backgroundColor: '#636A28',
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  headerTitleStyle={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Poppins-Regular',
                  }}
                  itemTextStyle={{
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  headerBackButtonText="Retour"
                  headerBackButtonTextStyle={{
                    color: 'white',
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    setForm({...form, marques: itemValue})
                  }>
                  <Picker.Item label="CZ" value="CZ" />
                  <Picker.Item label="SMITH & WESSON" value="SMITHWESSON" />
                </Picker>
              )}
              {error && !form.marques && (
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'red',
                    fontSize: h === 568 ? 15 : h === 432 ? 12 : 14,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Veuillez renseigner la marque de votre arme
                </Text>
              )}
            </View>

            {Platform.OS === 'android' ? (
              <View
                style={{
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {form.marques === 'SMITHWESSON' && (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 18,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={
                      form.type
                        ? form.type === 'PISTOLETSMITHWESSON'
                          ? 'Pistolet Smith & Wesson'
                          : form.type === 'REVOLVERSMITHWESSON'
                          ? 'Revolver Smith & Wesson'
                          : 'Carabine Smith & Wesson'
                        : 'Type'
                    }
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, type: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="PISTOLETSMITHWESSON">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        Pistolet SMITH & WESSON
                      </Text>
                    </Option>
                    <Option value="REVOLVERSMITHWESSON">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Revolver SMITH & WESSON
                      </Text>
                    </Option>
                    <Option value="CARABINESMITHWESSON">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        Carabine SMITH & WESSON
                      </Text>
                    </Option>
                  </Select>
                )}
                {form.marques === 'CZ' && (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 18,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={
                      form.type
                        ? form.type === 'PISTOLETCZ'
                          ? 'Pistolet CZ'
                          : 'Carabine CZ'
                        : 'Type'
                    }
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, type: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="PISTOLETCZ">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        Pistolet CZ
                      </Text>
                    </Option>
                    <Option value="CARABINECZ">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        Carabine CZ
                      </Text>
                    </Option>
                  </Select>
                )}
              </View>
            ) : (
              <View
                style={{
                  marginTop: 5,
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                {form.marques === 'CZ' && (
                  <Picker
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    iosHeader="Type"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    placeholder={
                      form.type
                        ? form.type === 'PISTOLETCZ'
                          ? 'Pistolet CZ'
                          : 'Carabine CZ'
                        : 'Type'
                    }
                    placeholderStyle={{
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 15,
                      height: 50,
                    }}
                    accessibilityLabel={'Type'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, type: itemValue})
                    }>
                    <Picker.Item label="Pistolet CZ" value="PISTOLETCZ" />
                    <Picker.Item label="Carabine CZ" value="CARABINECZ" />
                  </Picker>
                )}

                {form.marques === 'SMITHWESSON' && (
                  <Picker
                    iosHeader="Type"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={
                      form.type
                        ? form.type === 'PISTOLETSMITHWESSON'
                          ? 'Pistolet Smith & Wesson'
                          : form.type === 'REVOLVERSMITHWESSON'
                          ? 'Revolver Smith & Wesson'
                          : 'Carabine Smith & Wesson'
                        : 'Type'
                    }
                    placeholderStyle={{
                      fontSize: h === 568 ? 10 : h === 812 ? 12 : 14,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 15,
                      height: 50,
                    }}
                    accessibilityLabel={'Type'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, type: itemValue})
                    }>
                    <Picker.Item
                      label="Pistolet SMITH & WESSON"
                      value="PISTOLETSMITHWESSON"
                    />
                    <Picker.Item
                      label="Revolver SMITH & WESSON"
                      value="REVOLVERSMITHWESSON"
                    />
                    <Picker.Item
                      label="Carabine SMITH & WESSON"
                      value="CARABINESMITHWESSON"
                    />
                  </Picker>
                )}
              </View>
            )}
            {error && !form.type && form.marques && (
              <Text
                style={{
                  textAlign: 'center',
                  color: 'red',
                  fontSize: h === 568 ? 15 : h === 432 ? 12 : 14,
                  fontFamily: 'Poppins-Regular',
                }}>
                Veuillez renseigner le type de votre arme
              </Text>
            )}
          </View>

          {Platform.OS === 'android' ? (
            <View
              style={{
                marginTop: 5,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {form.type === 'PISTOLETCZ' && (
                <Select
                  style={{
                    height: 50,
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    backgroundColor: 'white',
                    width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                    marginTop: 18,
                  }}
                  animationType="slide"
                  indicatorColor="#636A28"
                  indicator="down"
                  defaultText={form.modele ? form.modele : 'Modèle'}
                  backdropStyle={{
                    backgroundColor: 'white',
                  }}
                  onSelect={item => setForm({...form, modele: item})}
                  optionListStyle={{
                    height: Dimensions.get('window').height / 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    width: Dimensions.get('window').width,
                    borderWidth: 0,
                  }}>
                  <Option value=""></Option>
                  <Option value="75">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      75
                    </Text>
                  </Option>
                  <Option value="P-07">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      P-07
                    </Text>
                  </Option>
                  <Option value="P-09">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      P-09
                    </Text>
                  </Option>
                  <Option value="P-10">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      P-10
                    </Text>
                  </Option>
                  <Option value="SHADOW1">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      SHADOW 1
                    </Text>
                  </Option>
                  <Option value="SHADOW2">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      SHADOW 2
                    </Text>
                  </Option>
                  <Option value="TACTICALSPORT">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      TACTICAL SPORT
                    </Text>
                  </Option>
                  <Option value="TACTICALSPORT2">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      TACTICAL SPORT 2
                    </Text>
                  </Option>
                </Select>
              )}

              {form.type === 'CARABINECZ' && (
                <Select
                  style={{
                    height: 50,
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    backgroundColor: 'white',
                    width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                    marginTop: 18,
                  }}
                  animationType="slide"
                  indicatorColor="#636A28"
                  indicator="down"
                  defaultText={form.modele ? form.modele : 'Modèle'}
                  backdropStyle={{
                    backgroundColor: 'white',
                  }}
                  onSelect={item => setForm({...form, modele: item})}
                  optionListStyle={{
                    height: Dimensions.get('window').height / 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    width: Dimensions.get('window').width,
                    borderWidth: 0,
                  }}>
                  <Option value=""></Option>
                  <Option value="SCORPIONEVO3S1">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      SCORPION EVO 3 S1
                    </Text>
                  </Option>
                  <Option value="BREN2">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      BREN 2
                    </Text>
                  </Option>
                </Select>
              )}

              {form.type === 'CARABINESMITHWESSON' && (
                <Select
                  style={{
                    height: 50,
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    backgroundColor: 'white',
                    width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                    marginTop: 18,
                  }}
                  animationType="slide"
                  indicatorColor="#636A28"
                  indicator="down"
                  defaultText={form.modele ? form.modele : 'Modèle'}
                  backdropStyle={{
                    backgroundColor: 'white',
                  }}
                  onSelect={item => setForm({...form, modele: item})}
                  optionListStyle={{
                    height: Dimensions.get('window').height / 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    width: Dimensions.get('window').width,
                    borderWidth: 0,
                  }}>
                  <Option value=""></Option>
                  <Option value="M&P15">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      M&P 15
                    </Text>
                  </Option>
                  <Option value="M&P10">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      M&P 10
                    </Text>
                  </Option>
                </Select>
              )}

              {form.type === 'PISTOLETSMITHWESSON' && (
                <Select
                  style={{
                    height: 50,
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    backgroundColor: 'white',
                    width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                    marginTop: 18,
                  }}
                  animationType="slide"
                  indicatorColor="#636A28"
                  indicator="down"
                  defaultText={form.modele ? form.modele : 'Modèle'}
                  backdropStyle={{
                    backgroundColor: 'white',
                  }}
                  onSelect={item => setForm({...form, modele: item})}
                  optionListStyle={{
                    height: Dimensions.get('window').height / 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    width: Dimensions.get('window').width,
                    borderWidth: 0,
                  }}>
                  <Option value=""></Option>
                  <Option value="1911">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      1911
                    </Text>
                  </Option>
                  <Option value="BODYGUARD380">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      BODYGUARD 380
                    </Text>
                  </Option>

                  <Option value="M&P380">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      M&P 380
                    </Text>
                  </Option>
                  <Option value="M&P40">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      M&P 40
                    </Text>
                  </Option>
                  <Option value="M&P45">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      M&P 45
                    </Text>
                  </Option>
                  <Option value="M&P9">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      M&P 9
                    </Text>
                  </Option>
                  <Option value="SD9">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      SD 9
                    </Text>
                  </Option>
                  <Option value="SD40">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      SD 40
                    </Text>
                  </Option>
                </Select>
              )}

              {form.type === 'REVOLVERSMITHWESSON' && (
                <Select
                  style={{
                    height: 50,
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    backgroundColor: 'white',
                    width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                    marginTop: 18,
                  }}
                  animationType="slide"
                  indicatorColor="#636A28"
                  indicator="down"
                  defaultText={form.modele ? form.modele : 'Modèle'}
                  backdropStyle={{
                    backgroundColor: 'white',
                  }}
                  onSelect={item => setForm({...form, modele: item})}
                  optionListStyle={{
                    height: Dimensions.get('window').height / 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    width: Dimensions.get('window').width,
                    borderWidth: 0,
                  }}>
                  <Option value=""></Option>
                  <Option value="10">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      10
                    </Text>
                  </Option>
                  <Option value="19">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      19
                    </Text>
                  </Option>
                  <Option value="25">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      25
                    </Text>
                  </Option>
                  <Option value="27">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      27
                    </Text>
                  </Option>
                  <Option value="29">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      29
                    </Text>
                  </Option>
                  <Option value="36">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      36
                    </Text>
                  </Option>
                  <Option value="57">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      57
                    </Text>
                  </Option>
                  <Option value="60">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      60
                    </Text>
                  </Option>
                  <Option value="64">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      64
                    </Text>
                  </Option>
                  <Option value="66">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      66
                    </Text>
                  </Option>
                  <Option value="67">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      67
                    </Text>
                  </Option>
                  <Option value="69">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      69
                    </Text>
                  </Option>
                  <Option value="327">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      327
                    </Text>
                  </Option>
                  <Option value="329">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      329
                    </Text>
                  </Option>
                  <Option value="340">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      340
                    </Text>
                  </Option>
                  <Option value="360">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      360
                    </Text>
                  </Option>
                  <Option value="442">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      442
                    </Text>
                  </Option>
                  <Option value="460">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      460
                    </Text>
                  </Option>
                  <Option value="500">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      500
                    </Text>
                  </Option>
                  <Option value="586">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      586
                    </Text>
                  </Option>
                  <Option value="610">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      610
                    </Text>
                  </Option>
                  <Option value="625">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      625
                    </Text>
                  </Option>

                  <Option value="627">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      627
                    </Text>
                  </Option>
                  <Option value="629">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      629
                    </Text>
                  </Option>
                  <Option value="637">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      637
                    </Text>
                  </Option>
                  <Option value="638">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      638
                    </Text>
                  </Option>
                  <Option value="640">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      640
                    </Text>
                  </Option>
                  <Option value="642">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      642
                    </Text>
                  </Option>
                  <Option value="649">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      649
                    </Text>
                  </Option>

                  <Option value="686">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      686
                    </Text>
                  </Option>
                  <Option value="929">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      929
                    </Text>
                  </Option>
                  <Option value="986">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      986
                    </Text>
                  </Option>
                  <Option value="R8">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      R8
                    </Text>
                  </Option>
                </Select>
              )}
            </View>
          ) : (
            <View
              style={{
                marginTop: 5,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {form.type === 'PISTOLETCZ' && (
                <Picker
                  selectedValue={form.modele}
                  iosIcon={<Icon name="down" type="AntDesign" />}
                  iosHeader="Modèle"
                  mode="dropdown"
                  textStyle={{
                    textAlign: 'center',
                  }}
                  placeholder={form.modele ? form.modele : 'Modèle'}
                  placeholderStyle={{
                    fontSize: h === 568 ? 14 : 17,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  style={{
                    backgroundColor: 'white',
                    width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                    borderColor: '#3D4C28',
                    borderWidth: 1,
                    marginTop: 15,
                    height: h === 568 || w === 568 ? 40 : 50,
                  }}
                  accessibilityLabel={'Modèle'}
                  headerStyle={{
                    backgroundColor: '#636A28',
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  headerTitleStyle={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Poppins-Regular',
                  }}
                  itemTextStyle={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  headerBackButtonText="Retour"
                  headerBackButtonTextStyle={{
                    color: 'white',
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    setForm({...form, modele: itemValue})
                  }>
                  <Picker.Item label="75" value="75" />
                  <Picker.Item label="P-07" value="P-07" />
                  <Picker.Item label="P-09" value="P-09" />
                  <Picker.Item label="P-10" value="P-10" />
                  <Picker.Item label="SHADOW 1" value="SHADOW1" />
                  <Picker.Item label="SHADOW 2" value="SHADOW2" />
                  <Picker.Item label="TACTICAL SPORT" value="TACTICALSPORT" />
                  <Picker.Item
                    label="TACTICAL SPORT 2"
                    value="TACTICALSPORT2"
                  />
                </Picker>
              )}
              {form.type === 'CARABINECZ' && (
                <Picker
                  selectedValue={form.modele}
                  iosIcon={<Icon name="down" type="AntDesign" />}
                  iosHeader="Modèle"
                  mode="dropdown"
                  placeholder={form.modele ? form.modele : 'Modèle'}
                  placeholderStyle={{
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                    fontSize: h === 568 ? 1 : 17,
                  }}
                  style={{
                    backgroundColor: 'white',
                    width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                    borderColor: '#3D4C28',
                    borderWidth: 1,
                    marginTop: 15,
                    height: h === 568 || w === 568 ? 40 : 50,
                  }}
                  accessibilityLabel={'Modèle'}
                  headerStyle={{
                    backgroundColor: '#636A28',
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  headerTitleStyle={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Poppins-Regular',
                  }}
                  itemTextStyle={{
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  headerBackButtonText="Retour"
                  headerBackButtonTextStyle={{
                    color: 'white',
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    setForm({...form, modele: itemValue})
                  }>
                  <Picker.Item
                    label="SCORPION EVO 3 S1"
                    value="SCORPIONEVO3S1"
                  />
                  <Picker.Item label="BREN 2" value="BREN2" />
                </Picker>
              )}
              {form.type === 'CARABINESMITHWESSON' && (
                <Picker
                  selectedValue={form.modele}
                  iosHeader="Modèle"
                  mode="dropdown"
                  textStyle={{
                    textAlign: 'center',
                  }}
                  iosIcon={<Icon name="down" type="AntDesign" />}
                  placeholder={form.modele ? form.modele : 'Modèle'}
                  placeholderStyle={{
                    fontSize: 17,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                    fontSize:
                      Platform.OS === 'ios'
                        ? h === 568 || w === 568
                          ? 11
                          : 14
                        : 14,
                  }}
                  style={{
                    backgroundColor: 'white',
                    width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                    borderColor: '#3D4C28',
                    borderWidth: 1,
                    marginTop: 15,
                    height:
                      Platform.OS === 'ios'
                        ? h === 568 || w === 568
                          ? 40
                          : 50
                        : 50,
                  }}
                  accessibilityLabel={'Modèle'}
                  headerStyle={{
                    backgroundColor: '#636A28',
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  headerTitleStyle={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Poppins-Regular',
                  }}
                  itemTextStyle={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  headerBackButtonText="Retour"
                  headerBackButtonTextStyle={{
                    color: 'white',
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    setForm({...form, modele: itemValue})
                  }>
                  <Picker.Item label="M&P 15" value="M&P15" />
                  <Picker.Item label="M&P 10" value="M&P10" />
                </Picker>
              )}
              {form.type === 'PISTOLETSMITHWESSON' && (
                <Picker
                  iosHeader="Modèle"
                  mode="dropdown"
                  selectedValue={form.modele}
                  textStyle={{
                    textAlign: 'center',
                  }}
                  iosIcon={<Icon name="down" type="AntDesign" />}
                  placeholder={form.modele ? form.modele : 'Modèle'}
                  placeholderStyle={{
                    fontSize: h === 568 ? 14 : 17,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  style={{
                    backgroundColor: 'white',
                    width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                    borderColor: '#3D4C28',
                    borderWidth: 1,
                    marginTop: 15,
                    height: h === 568 || w === 568 ? 40 : 50,
                  }}
                  accessibilityLabel={'Modèle'}
                  headerStyle={{
                    backgroundColor: '#636A28',
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  headerTitleStyle={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Poppins-Regular',
                  }}
                  itemTextStyle={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  headerBackButtonText="Retour"
                  headerBackButtonTextStyle={{
                    color: 'white',
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    setForm({...form, modele: itemValue})
                  }>
                  <Picker.Item label="1911" value="1911" />
                  <Picker.Item label="BODYGUARD 380" value="BODYGUARD380" />
                  <Picker.Item label="M&P 380" value="M&P380" />
                  <Picker.Item label="M&P 40" value="M&P40" />
                  <Picker.Item label="M&P 45" value="M&P45" />
                  <Picker.Item label="M&P 9" value="M&P9" />
                  <Picker.Item label="SD 40" value="SD40" />
                  <Picker.Item label="SD 9" value="SD9" />
                </Picker>
              )}
              {form.type === 'REVOLVERSMITHWESSON' && (
                <Picker
                  selectedValue={form.modele}
                  iosHeader="Modèle"
                  mode="dropdown"
                  textStyle={{
                    textAlign: 'center',
                  }}
                  iosIcon={<Icon name="down" type="AntDesign" />}
                  placeholder={form.modele ? form.modele : 'Modèle'}
                  placeholderStyle={{
                    fontSize: h === 568 ? 14 : 17,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  style={{
                    backgroundColor: 'white',
                    width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                    borderColor: '#3D4C28',
                    borderWidth: 1,
                    marginTop: 15,
                    height: h === 568 || w === 568 ? 40 : 50,
                  }}
                  accessibilityLabel={'Modèle'}
                  headerStyle={{
                    backgroundColor: '#636A28',
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  headerTitleStyle={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Poppins-Regular',
                  }}
                  itemTextStyle={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  headerBackButtonText="Retour"
                  headerBackButtonTextStyle={{
                    color: 'white',
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    setForm({...form, modele: itemValue})
                  }>
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="19" value="19" />
                  <Picker.Item label="25" value="25" />
                  <Picker.Item label="27" value="27" />
                  <Picker.Item label="29" value="29" />
                  <Picker.Item label="36" value="36" />
                  <Picker.Item label="57" value="57" />
                  <Picker.Item label="60" value="60" />
                  <Picker.Item label="64" value="64" />
                  <Picker.Item label="66" value="66" />
                  <Picker.Item label="67" value="67" />
                  <Picker.Item label="69" value="69" />
                  <Picker.Item label="327" value="327" />
                  <Picker.Item label="329" value="329" />
                  <Picker.Item label="340" value="340" />
                  <Picker.Item label="360" value="360" />
                  <Picker.Item label="442" value="442" />
                  <Picker.Item label="460" value="460" />
                  <Picker.Item label="500" value="500" />
                  <Picker.Item label="586" value="586" />
                  <Picker.Item label="610" value="610" />
                  <Picker.Item label="625" value="625" />
                  <Picker.Item label="627" value="627" />
                  <Picker.Item label="629" value="629" />
                  <Picker.Item label="637" value="637" />
                  <Picker.Item label="638" value="638" />
                  <Picker.Item label="640" value="640" />
                  <Picker.Item label="642" value="642" />
                  <Picker.Item label="649" value="649" />
                  <Picker.Item label="686" value="686" />
                  <Picker.Item label="929" value="929" />
                  <Picker.Item label="986" value="986" />
                  <Picker.Item label="R8" value="R8" />
                </Picker>
              )}
            </View>
          )}
          {error && !form.modele && form.type && (
            <Text
              style={{
                textAlign: 'center',
                color: 'red',
                fontSize: h === 568 ? 15 : h === 432 ? 12 : 14,
                fontFamily: 'Poppins-Regular',
              }}>
              Veuillez renseigner le modèle de votre arme
            </Text>
          )}

          <View
            style={{
              marginTop: 10,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            {Platform.OS === 'android' ? (
              <View>
                {form.modele === '75' ||
                form.modele === 'P-07' ||
                form.modele === 'P-09' ||
                form.modele === 'SHADOW1' ||
                form.modele === 'SHADOW2' ||
                form.modele === 'TACTICALSPORT2' ? (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="9x19">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        9x19
                      </Text>
                    </Option>
                  </Select>
                ) : null}

                {form.modele === 'P-10' && (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="9x19">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        9x19
                      </Text>
                    </Option>
                    <Option value="45Auto">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        45 Auto
                      </Text>
                    </Option>
                  </Select>
                )}

                {form.modele === 'TACTICALSPORT' && (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="9x19">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        9x19
                      </Text>
                    </Option>
                    <Option value="40S&W">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        40 S&W
                      </Text>
                    </Option>
                  </Select>
                )}

                {form.modele === 'SCORPIONEVO3S1' && (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="9x19">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        9x19
                      </Text>
                    </Option>
                  </Select>
                )}

                {form.modele === 'BREN2' && (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value="223Rem/5,56"></Option>
                    <Option value="9x19">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        223 Rem/5,56
                      </Text>
                    </Option>
                  </Select>
                )}

                {form.modele === '1911' && (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="45Auto">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        45 Auto
                      </Text>
                    </Option>
                    <Option value="9x19">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        9x19
                      </Text>
                    </Option>
                  </Select>
                )}

                {form.modele === 'M&P380' || form.modele === 'BODYGUARD380' ? (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="380Auto">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        380 Auto
                      </Text>
                    </Option>
                  </Select>
                ) : null}

                {form.modele === '625' ? (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      textAlign: 'center',
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="45Auto">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        45 Auto
                      </Text>
                    </Option>
                  </Select>
                ) : null}

                {form.modele === 'SD40' ||
                  (form.modele === 'M&P40' && (
                    <Select
                      style={{
                        height: 50,
                        borderWidth: 1,
                        borderColor: '#3D4C28',
                        backgroundColor: 'white',
                        width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                        marginTop: 10,
                      }}
                      animationType="slide"
                      indicatorColor="#636A28"
                      indicator="down"
                      defaultText={form.calibre ? form.calibre : 'Calibre'}
                      backdropStyle={{
                        textAlign: 'center',
                        backgroundColor: 'white',
                      }}
                      onSelect={item => setForm({...form, calibre: item})}
                      optionListStyle={{
                        height: Dimensions.get('window').height / 3,
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        width: Dimensions.get('window').width,
                        borderWidth: 0,
                      }}>
                      <Option value=""></Option>
                      <Option value="40S&W">
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'black',
                          }}>
                          40 S&W
                        </Text>
                      </Option>
                    </Select>
                  ))}

                {form.modele === 'M&P45' && (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      textAlign: 'center',
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="45Auto">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        45 Auto
                      </Text>
                    </Option>
                  </Select>
                )}

                {form.modele === 'SD9' || form.modele === 'M&P9' ? (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="9x19">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        9x19
                      </Text>
                    </Option>
                  </Select>
                ) : null}

                {form.modele === '25' && (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="45Colt">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        45 Colt
                      </Text>
                    </Option>
                  </Select>
                )}

                {form.modele === '629' ||
                form.modele === '69' ||
                form.modele === '29' ||
                form.modele === '329' ? (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="44Rem.Mag/44S&W Spl">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        44 Rem. Mag / 44 S&W Spl
                      </Text>
                    </Option>
                  </Select>
                ) : null}

                {form.modele === '36' ||
                form.modele === '10' ||
                form.modele === '64' ||
                form.modele === '67' ||
                form.modele === '442' ||
                form.modele === '637' ||
                form.modele === '638' ||
                form.modele === '642' ? (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="38Spl+P">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        38 Spl +P
                      </Text>
                    </Option>
                  </Select>
                ) : null}

                {form.modele === '19' ||
                form.modele === '27' ||
                form.modele === '60' ||
                form.modele === '66' ||
                form.modele === '327' ||
                form.modele === '340' ||
                form.modele === '360' ||
                form.modele === '586' ||
                form.modele === '627' ||
                form.modele === '640' ||
                form.modele === '649' ||
                form.modele === '686' ||
                form.modele === 'R8' ? (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="357Mag/38Spl+P">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        357 Mag / 38 Spl +P
                      </Text>
                    </Option>
                  </Select>
                ) : null}

                {form.modele === '57' && (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="41Magnum">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        41 Magnum
                      </Text>
                    </Option>
                  </Select>
                )}

                {form.modele === '929' || form.modele === '986' ? (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="9x19">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        9x19
                      </Text>
                    </Option>
                  </Select>
                ) : null}

                {form.modele === 'M&P10' ? (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="6,5Creedmoor">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        6,5 Creedmoor
                      </Text>
                    </Option>
                    <Option value="308Win">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        308 Win
                      </Text>
                    </Option>
                    <Option value="300Whisper">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        300 Whisper
                      </Text>
                    </Option>
                  </Select>
                ) : null}

                {form.modele === 'M&P15' ? (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      textAlign: 'center',
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="5.56NATO">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        5.56 NATO
                      </Text>
                    </Option>
                  </Select>
                ) : null}

                {form.modele === '500' ? (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="500S&WMag">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        500S&W Mag
                      </Text>
                    </Option>
                  </Select>
                ) : null}

                {form.modele === '460' ? (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="500S&WMag">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        500S&W Mag
                      </Text>
                    </Option>
                  </Select>
                ) : null}

                {form.modele === '610' ? (
                  <Select
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#3D4C28',
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      marginTop: 10,
                    }}
                    animationType="slide"
                    indicatorColor="#636A28"
                    indicator="down"
                    defaultText={form.calibre ? form.calibre : 'Calibre'}
                    backdropStyle={{
                      backgroundColor: 'white',
                    }}
                    onSelect={item => setForm({...form, calibre: item})}
                    optionListStyle={{
                      height: Dimensions.get('window').height / 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width,
                      borderWidth: 0,
                    }}>
                    <Option value=""></Option>
                    <Option value="10mmAuto">
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                        }}>
                        10 mm Auto
                      </Text>
                    </Option>
                  </Select>
                ) : null}
              </View>
            ) : (
              <View>
                {form.modele === '75' ||
                form.modele === 'P-07' ||
                form.modele === 'P-09' ||
                form.modele === 'SHADOW1' ||
                form.modele === 'SHADOW2' ||
                form.modele === 'TACTICALSPORT2' ? (
                  <Picker
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,
                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="9x19" value="9x19" />
                  </Picker>
                ) : null}
                {form.modele === 'P-10' && (
                  <Picker
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,
                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="9x19" value="9x19" />
                    <Picker.Item label="45 Auto" value="45Auto" />
                  </Picker>
                )}
                {form.modele === 'TACTICALSPORT' && (
                  <Picker
                    selectedValue={form.calibre}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,
                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="9x19" value="9x19" />
                    <Picker.Item label="40 S&W" value="40S&W" />
                  </Picker>
                )}

                {form.modele === 'SCORPIONEVO3S1' && (
                  <Picker
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,
                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="9x19" value="9x19" />
                  </Picker>
                )}
                {form.modele === 'BREN2' && (
                  <Picker
                    selectedValue={form.calibre}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,
                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="223 Rem. / 5,56" value="223Rem/5,56" />
                  </Picker>
                )}
                {form.modele === '1911' && (
                  <Picker
                    selectedValue={form.calibre}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,
                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="9x19" value="9x19" />
                    <Picker.Item label="45 Auto" value="45Auto" />
                  </Picker>
                )}
                {form.modele === 'BODYGUARD380' || form.modele === 'M&P380' ? (
                  <Picker
                    selectedValue={form.calibre}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,

                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',

                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="380 Auto" value="380Auto" />
                  </Picker>
                ) : null}

                {form.modele === 'M&P45' && (
                  <Picker
                    selectedValue={form.calibre}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,

                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',

                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="45 Auto" value="45Auto" />
                  </Picker>
                )}

                {form.modele === 'M&P40' || form.modele === 'SD40' ? (
                  <Picker
                    selectedValue={form.calibre}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,

                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',

                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="40 S&W" value="40S&W" />
                  </Picker>
                ) : null}

                {form.modele === 'M&P9' || form.modele === 'SD9' ? (
                  <Picker
                    selectedValue={form.calibre}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,

                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="9x19" value="9x19" />
                  </Picker>
                ) : null}

                {form.modele === '36' ||
                form.modele === '10' ||
                form.modele === '64' ||
                form.modele === '67' ||
                form.modele === '442' ||
                form.modele === '637' ||
                form.modele === '638' ||
                form.modele === '642' ? (
                  <Picker
                    selectedValue={form.calibre}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 15,

                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',

                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="38 Spl +P" value="38Spl+P" />
                  </Picker>
                ) : null}

                {form.modele === '19' ||
                form.modele === '27' ||
                form.modele === '60' ||
                form.modele === '66' ||
                form.modele === '327' ||
                form.modele === '340' ||
                form.modele === '360' ||
                form.modele === '586' ||
                form.modele === '627' ||
                form.modele === '640' ||
                form.modele === '649' ||
                form.modele === '686' ||
                form.modele === 'R8' ? (
                  <Picker
                    selectedValue={form.calibre}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,

                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item
                      label="357 Mag / 38 Spl +P"
                      value="357Mag/38Spl+P"
                    />
                  </Picker>
                ) : null}

                {form.modele === '929' || form.modele === '986' ? (
                  <Picker
                    selectedValue={form.calibre}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 15,
                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="9x19" value="9x19" />
                  </Picker>
                ) : null}

                {form.modele === '629' ||
                form.modele === '69' ||
                form.modele === '29' ||
                form.modele === '329' ? (
                  <Picker
                    selectedValue={form.calibre}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,
                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item
                      label="44Rem.Mag/44S&WSpl"
                      value="44Rem.Mag/44S&W Spl"
                    />
                  </Picker>
                ) : null}

                {form.modele === '57' ? (
                  <Picker
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,

                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="41 Magnum" value="41Magnum" />
                  </Picker>
                ) : null}

                {form.modele === '25' && (
                  <Picker
                    selectedValue={form.calibre}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,
                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="45 Colt" value="45Colt" />
                  </Picker>
                )}

                {form.modele === 'M&P10' ? (
                  <Picker
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,

                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',

                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="6,5 Creedmoor" value="6,5Creedmoor" />
                    <Picker.Item label="308 Win" value="308Win" />
                    <Picker.Item label="300 Whisper" value="300Whisper" />
                  </Picker>
                ) : null}
                {form.modele === 'M&P15' ? (
                  <Picker
                    selectedValue={form.calibre}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,
                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',

                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="5.56 NATO" value="5.56NATO" />
                  </Picker>
                ) : null}

                {form.modele === '500' ? (
                  <Picker
                    selectedValue={form.calibre}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,

                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',

                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="500S&W Mag" value="500S&WMag" />
                  </Picker>
                ) : null}
                {form.modele === '460' ? (
                  <Picker
                    selectedValue={form.calibre}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,

                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',

                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="500S&W Mag" value="500S&WMag" />
                  </Picker>
                ) : null}

                {form.modele === '625' ? (
                  <Picker
                    selectedValue={form.calibre}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,

                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',

                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="45 Auto" value="45Auto" />
                  </Picker>
                ) : null}

                {form.modele === '610' ? (
                  <Picker
                    selectedValue={form.calibre}
                    iosHeader="Calibre"
                    mode="dropdown"
                    textStyle={{
                      textAlign: 'center',
                    }}
                    iosIcon={<Icon name="down" type="AntDesign" />}
                    placeholder={form.calibre ? form.calibre : 'Calibre'}
                    placeholderStyle={{
                      fontSize: 17,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? w / 1.55 : w / 2.3,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      marginTop: 10,
                      height: 50,
                    }}
                    accessibilityLabel={'Calibre'}
                    headerStyle={{
                      backgroundColor: '#636A28',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerTitleStyle={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                    }}
                    itemTextStyle={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                    }}
                    headerBackButtonText="Retour"
                    headerBackButtonTextStyle={{
                      color: 'white',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setForm({...form, calibre: itemValue})
                    }>
                    <Picker.Item label="10 mm Auto" value="10mmAuto" />
                  </Picker>
                ) : null}
              </View>
            )}
            {error && !form.calibre && form.modele && (
              <Text
                style={{
                  textAlign: 'center',
                  color: 'red',
                  fontSize: h === 568 ? 15 : h === 432 ? 12 : 14,
                  fontFamily: 'Poppins-Regular',
                }}>
                Veuillez renseigner le calibre de votre arme
              </Text>
            )}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: form.calibre || form.type ? 10 : 0,
            }}>
            <TextInput
              placeholder="Armurerie d'achat"
              style={{
                backgroundColor: 'white',
                width: orientation === 'PORTRAIT' ? '65%' : '43%',
                height: 50,
                marginTop: form.type ? 10 : Platform.OS === 'android' ? 5 : 0,
                borderWidth: 1,
                borderColor: '#3D4C28',
                paddingLeft: 20,
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
              }}
              onChangeText={val =>
                setForm({
                  ...form,
                  armurier: val,
                })
              }
              placeholderTextColor="grey"
            />
            {error && !form.armurier && (
              <Text
                style={{
                  textAlign: 'center',
                  color: 'red',
                  fontSize: h === 568 ? 15 : h === 432 ? 12 : 14,
                  fontFamily: 'Poppins-Regular',
                }}>
                Veuillez renseigner l'armurerie d'achat de votre arme
              </Text>
            )}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <TextInput
              placeholder="N° de série"
              style={{
                backgroundColor: 'white',
                width: orientation === 'PORTRAIT' ? '65%' : '43%',
                height: 50,
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#3D4C28',
                paddingLeft: 20,
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
              }}
              onChangeText={val =>
                setForm({
                  ...form,
                  serie: val,
                })
              }
              placeholderTextColor="grey"
            />
            {error && !form.serie && (
              <Text
                style={{
                  textAlign: 'center',
                  color: 'red',
                  fontSize: h === 568 ? 15 : h === 432 ? 12 : 14,
                  fontFamily: 'Poppins-Regular',
                }}>
                Veuillez renseigner le numéro de série de votre arme
              </Text>
            )}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => setDate(!date)}
              style={{
                backgroundColor: 'white',
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#3D4C28',
                width: orientation === 'PORTRAIT' ? '65%' : '43%',
                height: 50,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  paddingLeft: 20,
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  color: 'grey',
                }}>
                {DD ? fff : "Date d'acquisition"}
              </Text>
            </TouchableOpacity>
            {Platform.OS === 'ios' ? (
              <DateTimePickerModal
                locale="fr-FR"
                isVisible={date}
                headerTextIOS="Date d'acquisition"
                confirmTextIOS="Confirmer"
                cancelTextIOS="Annuler"
                onConfirm={handleConfirm}
                onCancel={() => setDate(false)}
                mode="date"
                date={new Date()}
                maximumDate={new Date()}
                minimumDate={new Date('2021-09-01')}
              />
            ) : (
              date && (
                <DatePicker
                  date={dateB}
                  onDateChange={handleDateBis}
                  minimumDate={new Date('2021-09-01')}
                  maximumDate={new Date()}
                  locale="fr"
                  mode="date"
                  androidVariant="nativeAndroid"
                  textColor="black"
                  fadeToColor="white"
                  style={{
                    marginTop: 10,
                  }}
                />
              )
            )}
            {error && !form.dateAchat && (
              <Text
                style={{
                  textAlign: 'center',
                  color: 'red',
                  fontSize: h === 568 ? 15 : h === 432 ? 12 : 14,
                  fontFamily: 'Poppins-Regular',
                }}>
                Veuillez renseigner la date d'achat de votre arme
              </Text>
            )}
          </View>
          <View
            style={{
              marginTop: 10,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#636A28',
                width: orientation === 'PORTRAIT' ? '65%' : '40%',
                height: 50,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}
              onPress={() => (loading ? null : handlePicture())}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: w === 270 ? 12 : 15,
                  fontFamily: 'OpenSans-SemiBold',
                  width:
                    orientation === 'PORTRAIT'
                      ? h === 568
                        ? '90%'
                        : '85%'
                      : w === 586
                      ? '90%'
                      : w === 640
                      ? '80%'
                      : '70%',
                }}>
                Enregistrer mon autorisation de détention
              </Text>
            </TouchableOpacity>
            <Text style={{color: 'red'}}>* Champs obligatoires</Text>
          </View>
          {form.autorisation && (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                width: '100%',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <TouchableOpacity
                onPress={() =>
                  setForm({
                    ...form,
                    autorisation: null,
                  })
                }>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Supprimer
                </Text>
              </TouchableOpacity>
              <Image
                source={{uri: form.autorisation}}
                style={{width: 150, height: 150, marginTop: 15}}
              />
            </View>
          )}
          {error && !form.autorisation && (
            <Text
              style={{
                textAlign: 'center',
                color: 'red',
                fontSize: h === 568 ? 15 : h === 432 ? 12 : 14,
                fontFamily: 'Poppins-Regular',
              }}>
              Photo manquante
            </Text>
          )}

          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#6D9FB2',
                width: orientation === 'PORTRAIT' ? '65%' : '40%',
                height: 40,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: orientation === 'PORTRAIT' ? '20%' : '10%',
              }}
              onPress={() => (loading ? null : handleAddW())}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize:
                    Platform.OS === 'ios'
                      ? w === 320 || h === 320
                        ? 14
                        : 17
                      : w === 270
                      ? 14
                      : 17,
                  fontFamily: 'OpenSans-SemiBold',
                  width: orientation === 'PORTRAIT' ? '50%' : '40%',
                }}>
                Valider
              </Text>
              <Icon
                name="right"
                type="AntDesign"
                style={{
                  fontSize: 15,
                  color: 'white',
                  position: 'absolute',
                  paddingLeft:
                    Platform.OS === 'android' ? (w === 270 ? 150 : 200) : '85%',
                }}
              />
            </TouchableOpacity>
            {error && (
              <Text
                style={{
                  textAlign: 'center',
                  color: 'red',
                  fontSize: h === 568 ? 15 : h === 432 ? 12 : 14,
                  fontFamily: 'Poppins-Regular',
                }}>
                Veuillez renseigner tous les champs
              </Text>
            )}
            <View
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                display: 'flex',
                width: '100%',
                zIndex: 100000,
              }}>
              <Spinner
                isVisible={loading}
                size={150}
                type="WanderingCubes"
                color={'#999D3B'}
              />
            </View>
          </View>

          <Modal
            visible={picture}
            transparent={true}
            supportedOrientations={['landscape', 'portrait']}>
            <TouchableOpacity
              onPress={() => setPicture(!picture)}
              style={{height: '100%', justifyContent: 'center'}}>
              <View
                style={{
                  width: '100%',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    width: '90%',
                    marginTop: '10%',
                    backgroundColor: 'rgba(109, 159, 178, 1)',
                    padding: orientation === 'PORTRAIT' ? '10%' : '5%',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: orientation === 'PORTRAIT' ? '80%' : '40%',
                      height: 50,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      borderRadius: 50,
                    }}
                    onPress={() => handlePictureBis()}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: w === 360 ? 15 : w === 270 ? 14 : 16,
                        fontFamily: 'Arial',
                        width: orientation === 'PORTRAIT' ? '80%' : '70%',
                        color: 'black',
                      }}>
                      Prendre une photo
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: orientation === 'PORTRAIT' ? '80%' : '40%',
                      height: 50,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      marginTop: 25,
                      backgroundColor: 'white',
                      borderRadius: 50,
                    }}
                    onPress={() => validatePicture()}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'black',
                        fontSize:
                          orientation === 'PORTRAIT'
                            ? w === 360
                              ? 15
                              : w === 270
                              ? 14
                              : h === 568
                              ? 14
                              : w === 384
                              ? 14
                              : h === 812
                              ? 15
                              : h === 667
                              ? 14
                              : 17
                            : w === 568
                            ? 14
                            : w === 640
                            ? 15
                            : 17,
                        fontFamily: 'Arial',
                        width: h === 568 ? '90%' : '80%',
                      }}>
                      Sélectionner une photo depuis ma librairie
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>

          <View style={{marginTop: 50}}></View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddArmes;
