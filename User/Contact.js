import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {Icon} from 'native-base';
import axios from 'axios';
import {Picker} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from '@env';
import ImageMunition from '../assets/22.jpg';
import {Select, Option} from 'react-native-chooser';
import * as ACTIONS from './ACTIONS';
import Spinner from 'react-native-spinkit';
import Sound from 'react-native-sound';

let Contact = () => {
  let [date, setData] = useState(null);

  let [form, setForm] = useState({
    text: null,
    sujet: null,
  });

  let [send, setSend] = useState(null);

  let [error, setError] = useState(null);

  let [loading, setLoading] = useState(false);

  let [orientation, setOrientation] = useState(null);

  let token = useSelector(state => state.token);

  let dispatch = useDispatch();

  let cc = false;

  let w = Dimensions.get('window').width;
  let h = Dimensions.get('window').height;

  Sound.setCategory('Playback');

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

  //permet de récuperer les informations de l'utilisateur//
  let fetchUser = async () => {
    await axios({
      method: 'GET',
      url: `${API_URL}/api/user`,
      headers: {
        'x-auth-token': token,
      },
    }).then(res => {
      if (res.data.msg) {
        dispatch(ACTIONS.Logout());
      } else if (!date) {
        setData(res.data);
      }
    });
  };

  useEffect(() => {
    fetchUser();
  });

  let c = null;

  if (send) {
    c = (
      <Text
        style={{
          color: '#999D3B',
          fontSize: 16,
          fontFamily: 'Poppins-Regular',
          marginTop: 15,
        }}>
        Email envoyé avec succès
      </Text>
    );
  }

  //permet d'envoyer une email//
  let handleSubmit = async () => {
    setLoading(true);
    if (form.sujet && form.text) {
      let f = {};
      f.email = date.email;
      f.nom = date.nom;
      f.prenom = date.prenom;
      f.sujet = form.sujet;
      f.text = form.text;

      await axios({
        method: 'POST',
        url: `${API_URL}/api/email`,
        headers: {
          'x-auth-token': token,
        },
        data: f,
      })
        .then(res => {
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
                  setForm({
                    ...form,
                    text: null,
                    sujet: null,
                  });
                  setSend(true);
                  setLoading(false);
                } else {
                  return;
                }
              });
            },
          );
        })
        .catch(err => {
          setError(true);
          setLoading(false);
        });
    } else {
      setError(true);
      setLoading(false);
    }
  };

  if (send) {
    setTimeout(() => {
      setSend(null);
    }, 6000);
  }

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 6000);
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      enabled={true}
      style={{
        backgroundColor: 'white',
      }}>
      {date && (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{
            paddingTop:
              orientation === 'PORTRAIT'
                ? Platform.OS === 'android'
                  ? h > 683 && h < 684
                    ? '4%'
                    : h === 592
                    ? w === 384
                      ? '2%'
                      : '3%'
                    : h === 1152
                    ? '15%'
                    : w === 270
                    ? '0%'
                    : h === 640
                    ? '5%'
                    : w === 480
                    ? '15%'
                    : '10%'
                  : h === 667
                  ? '5%'
                  : h === 736
                  ? w === 414
                    ? '5%'
                    : '8%'
                  : h === 568
                  ? '2%'
                  : '11%'
                : 0,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Poppins-SemiBold',
              fontSize: w === 270 ? 20 : 26,
              color: '#636A28',
              marginTop:
                orientation === 'PORTRAIT'
                  ? Platform.OS === 'android'
                    ? '10%'
                    : '10%'
                  : '1%',
            }}>
            Nous contacter
          </Text>

          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}>
            {Platform.OS === 'android' ? (
              <View
                style={{
                  width: '80%',
                }}>
                <Select
                  style={{
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    width: '100%',
                    marginTop: 15,
                  }}
                  animationType="slide"
                  indicatorColor="#999D3B"
                  indicator="down"
                  defaultText={
                    form.sujet ? form.sujet : 'Veuillez choisir un sujet'
                  }
                  onSelect={item => setForm({...form, sujet: item})}
                  optionListStyle={{
                    height: orientation === 'PORTRAIT' ? '30%' : '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    borderWidth: 0,
                  }}>
                  <Option value=""></Option>
                  <Option value="Demande d’assistance">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      Demande d’assistance
                    </Text>
                  </Option>
                  <Option value="Demande de SAV">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      Demande de SAV
                    </Text>
                  </Option>
                  <Option value="Divers">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      Divers
                    </Text>
                  </Option>
                </Select>
              </View>
            ) : (
              <Picker
                iosIcon={<Icon name="down" type="AntDesign" />}
                iosHeader="Sujet"
                placeholder={
                  form.sujet ? form.sujet : 'Veuillez choisir un sujet'
                }
                mode="dropdown"
                placeholderStyle={{
                  paddingLeft: 20,
                  flex: 1,
                  fontSize: 16,
                  color: 'black',
                  fontFamily: 'Poppins-Regular',
                }}
                style={{
                  height: 50,
                  marginTop: 25,
                  width: '80%',
                  borderColor: '#3D4C28',
                  borderWidth: 1,
                }}
                headerStyle={{
                  backgroundColor: '#636A28',
                  fontSize: 16,
                  color: 'black',
                  fontFamily: 'Poppins-Regular',
                }}
                accessibilityLabel={'sujetB'}
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
                  setForm({...form, sujet: itemValue})
                }>
                <Picker.Item
                  label="Demande d’assistance"
                  value="Demande d’assistance"
                />
                <Picker.Item label="Demande de SAV" value="Demande de SAV" />
                <Picker.Item label="Divers" value="Divers" />
              </Picker>
            )}
          </View>
          <View
            style={{
              marginTop: 15,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Votre message"
              placeholderTextColor="grey"
              multiline={true}
              value={form.text}
              onChangeText={val =>
                setForm({
                  ...form,
                  text: val,
                })
              }
              maxLength={300}
              style={{
                width: '80%',
                height: h / 3,
                backgroundColor: 'rgba(255,255,255,1)',
                borderColor: '#3D4C28',
                borderWidth: 1,
                textAlign: 'justify',
                color: 'black',
                textAlignVertical: 'top',
                marginTop: 10,
                paddingLeft: 20,
                paddingRight: 20,
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
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
                    marginTop: 15,
                    textAlign: 'center',
                    fontSize: 16,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Veuillez renseigner tout les champs
                </Text>
              )}
            </View>
            <View style={{position: 'absolute', zIndex: 10000}}>
              <Spinner
                isVisible={loading}
                size={150}
                type="WanderingCubes"
                color={'#999D3B'}
              />
            </View>
            {send && c}
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: '#6D9FB2',
                marginTop: orientation === 'PORTRAIT' ? 30 : 20,
                height: 40,
                width: orientation === 'PORTRAIT' ? '55%' : '40%',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: w === 270 ? 13 : 17,
                }}>
                Enregistrer
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
          <View style={{height: 20}}></View>
          <View style={{width: '100%', height: h / 2}}>
            <Image
              source={ImageMunition}
              style={{
                width: Dimensions.get('window').width,
                height:
                  orientation === 'PORTRAIT'
                    ? '100%'
                    : Platform.OS === 'android'
                    ? '100%'
                    : '100%',
                marginTop: 30,
              }}
            />
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default Contact;
