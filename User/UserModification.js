import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from 'react-native';
import {Icon} from 'native-base';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {API_URL} from '@env';
import FondB from '../assets/fond.jpg';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

let UserModification = React.memo(function UserModification(props) {
  let [data, setSata] = useState(null);
  let [form, setForm] = useState({
    nom: null,
    prenom: null,
    email: null,
    telephone: null,
    adresse: null,
    codepostal: null,
    ville: null,
    SIA: null,
    motdepasse: null,
    confirmmdp: null,
    autorisation: false,
  });

  let [isSelected, setSelection] = useState(false);

  let [orientation, setOrientation] = useState(null);

  let [errorBB, SeterrorBB] = useState(false);

  let token = useSelector(state => state.token);

  let cc = false;

  let w = Dimensions.get('window').width;
  let h = Dimensions.get('window').height;

  let regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

  //permet de récupérer les informations de l'utilisateur//
  let FetchUser = async () => {
    await axios({
      method: 'GET',
      url: `${API_URL}/api/user`,
      headers: {
        'x-auth-token': token,
      },
    }).then(res => {
      if (res.data.msg) {
      } else {
        setSelection(res.data.autorisation);
        setSata(res.data);
      }
    });
  };

  useEffect(() => {
    FetchUser();
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

  if (errorBB) {
    setTimeout(() => {
      SeterrorBB(false);
    }, 6000);
  }

  //permet de modifier les informations de l'utilisateur//
  let handleChangeUser = async () => {
    let d = {};
    d.nom = form.nom;
    d.prenom = form.prenom;
    d.email = form.email;
    d.telephone = form.telephone;
    d.adresse = form.adresse;
    d.codepostal = form.codepostal;
    d.ville = form.ville;
    d.SIA = form.SIA;
    d.motdepasse = form.motdepasse;
    d.confirmmdp = form.confirmmdp;
    d.autorisation = isSelected;

    if (form.motdepasse) {
      if (form.motdepasse === form.confirmmdp) {
        await axios({
          method: 'POST',
          url: `${API_URL}/api/userss`,
          headers: {
            'x-auth-token': token,
          },
          data: d,
        })
          .then(res => {
            props.navigation.navigate('Accueil', {ok: 'ok'});
          })
          .catch(err => {
            SeterrorBB(true);
          });
      } else {
        SeterrorBB(true);
      }
    } else {
      await axios({
        method: 'POST',
        url: `${API_URL}/api/userss`,
        headers: {
          'x-auth-token': token,
        },
        data: d,
      }).then(res => {
        props.navigation.navigate('Accueil', {ok: 'ok'});
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={30}>
      <Image
        source={FondB}
        style={{
          width: w,
          position: 'absolute',
          height: h,
        }}
      />
      {data && (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{
            marginTop:
              orientation === 'PORTRAIT'
                ? Platform.OS === 'android'
                  ? h === 912
                    ? w === 480
                      ? '25%'
                      : '20%'
                    : h > 830 && h < 831
                    ? '30%'
                    : '27%'
                  : w === 414
                  ? h === 896
                    ? '34%'
                    : '32%'
                  : h === 568
                  ? '38%'
                  : '35%'
                : Platform.OS === 'android'
                ? '11%'
                : w === 667
                ? '15%'
                : w === 736
                ? '15%'
                : w === 568
                ? '17%'
                : '13%',
          }}
          contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Icon
                type="Entypo"
                name="chevron-left"
                style={{
                  position: 'absolute',
                  fontSize: 20,
                  marginLeft: '15%',
                  color: '#636A28',
                  marginTop: 1,
                }}
              />
              <Text
                style={{
                  color: '#636A28',
                  fontSize: 16,
                  fontFamily: 'Poppins-Regular',
                  marginLeft:
                    Platform.OS === 'ios'
                      ? 30
                      : orientation === 'PORTRAIT'
                      ? h > 845 && h < 846
                        ? 35
                        : 30
                      : Platform.OS === 'android'
                      ? 35
                      : 40,
                }}>
                Retour
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={{
              backgroundColor: 'white',
              width: orientation === 'PORTRAIT' ? '70%' : '50%',
              height:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 40 : 50) : 50,
              marginTop: w === 320 ? 10 : 10,
              borderWidth: 1,
              borderColor: '#3D4C28',
              paddingLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 14 : 17) : 17,
            }}
            placeholder={data.prenom}
            defaultValue={data.prenom}
            dataDetectorTypes="all"
            autoCompleteType="name"
            autoCapitalize="none"
            placeholderTextColor="grey"
            textContentType="name"
            onChangeText={val =>
              setForm({
                ...form,
                prenom: val,
              })
            }
          />
          <TextInput
            style={{
              backgroundColor: 'white',
              width: orientation === 'PORTRAIT' ? '70%' : '50%',
              height:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 40 : 50) : 50,
              marginTop: 30,
              borderWidth: 1,
              borderColor: '#3D4C28',
              paddingLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 14 : 17) : 17,
            }}
            onChangeText={val =>
              setForm({
                ...form,
                nom: val,
              })
            }
            placeholder={data.nom}
            defaultValue={data.nom}
            dataDetectorTypes="all"
            autoCompleteType="name"
            autoCapitalize="none"
            placeholderTextColor="grey"
            textContentType="name"
          />
          <TextInput
            style={{
              backgroundColor: 'white',
              width: orientation === 'PORTRAIT' ? '70%' : '50%',
              height:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 40 : 50) : 50,
              marginTop: 30,
              borderWidth: 1,
              borderColor: '#3D4C28',
              paddingLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 14 : 17) : 17,
            }}
            onChangeText={val =>
              setForm({
                ...form,
                email: val,
              })
            }
            defaultValue={data.email}
            placeholder={data.email}
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
                fontSize:
                  Platform.OS === 'ios'
                    ? h === 568 || w === 568
                      ? 13
                      : 16
                    : 16,
                marginTop: 10,
              }}>
              Adresse email invalide
            </Text>
          ) : null}
          <TextInput
            style={{
              backgroundColor: 'white',
              width: orientation === 'PORTRAIT' ? '70%' : '50%',
              height:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 40 : 50) : 50,
              marginTop: 30,
              borderWidth: 1,
              borderColor: '#3D4C28',
              paddingLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 14 : 17) : 17,
            }}
            onChangeText={val =>
              setForm({
                ...form,
                telephone: val,
              })
            }
            placeholder={data.telephone}
            defaultValue={data.telephone}
            dataDetectorTypes="phoneNumber"
            placeholderTextColor="grey"
            textContentType="telephoneNumber"
            keyboardType="number-pad"
            autoCompleteType="tel"
          />
          <TextInput
            style={{
              backgroundColor: 'white',
              width: orientation === 'PORTRAIT' ? '70%' : '50%',
              height:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 40 : 50) : 50,
              marginTop: 30,
              borderWidth: 1,
              borderColor: '#3D4C28',
              paddingLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 14 : 17) : 17,
            }}
            onChangeText={val =>
              setForm({
                ...form,
                adresse: val,
              })
            }
            placeholder={data.adresse}
            defaultValue={data.adresse}
            dataDetectorTypes="all"
            autoCompleteType="street-address"
            placeholderTextColor="grey"
            textContentType="streetAddressLine1"
            autoCapitalize="none"
          />
          <TextInput
            style={{
              backgroundColor: 'white',
              width: orientation === 'PORTRAIT' ? '70%' : '50%',
              height:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 40 : 50) : 50,
              marginTop: 30,
              borderWidth: 1,
              borderColor: '#3D4C28',
              paddingLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 14 : 17) : 17,
            }}
            onChangeText={val =>
              setForm({
                ...form,
                codepostal: val,
              })
            }
            placeholder={data.codepostal}
            defaultValue={data.codepostal}
            dataDetectorTypes="all"
            autoCompleteType="postal-code"
            placeholderTextColor="grey"
            textContentType="postalCode"
            keyboardType="number-pad"
            autoCapitalize="none"
          />
          <TextInput
            style={{
              backgroundColor: 'white',
              width: orientation === 'PORTRAIT' ? '70%' : '50%',
              height:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 40 : 50) : 50,
              display: 'flex',
              marginTop: 30,
              borderWidth: 1,
              borderColor: '#3D4C28',
              paddingLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 14 : 17) : 17,
            }}
            onChangeText={val =>
              setForm({
                ...form,
                ville: val,
              })
            }
            placeholder={data.ville}
            defaultValue={data.ville}
            dataDetectorTypes="all"
            textContentType="countryName"
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
          <TextInput
            style={{
              backgroundColor: 'white',
              width: orientation === 'PORTRAIT' ? '70%' : '50%',
              height:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 40 : 50) : 50,
              marginTop: 30,
              borderWidth: 1,
              borderColor: '#3D4C28',
              paddingLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 14 : 17) : 17,
            }}
            onChangeText={val =>
              setForm({
                ...form,
                SIA: val,
              })
            }
            placeholder={data.SIA}
            defaultValue={data.SIA}
            dataDetectorTypes="all"
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
          <TextInput
            style={{
              backgroundColor: 'white',
              width: orientation === 'PORTRAIT' ? '70%' : '50%',
              height:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 40 : 50) : 50,
              marginTop: 30,
              borderWidth: 1,
              borderColor: '#3D4C28',
              paddingLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 14 : 17) : 17,
            }}
            onChangeText={val =>
              setForm({
                ...form,
                motdepasse: val,
              })
            }
            placeholder="Mot de passe"
            dataDetectorTypes="all"
            autoCompleteType="password"
            placeholderTextColor="grey"
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
          />
          {form.motdepasse && form.motdepasse.length < 5 ? (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Regular',
                fontSize:
                  Platform.OS === 'ios'
                    ? h === 568 || w === 568
                      ? 13
                      : 16
                    : 16,
                marginTop: 15,
              }}>
              Mot de passe : Entre 5 et 15 caractères
            </Text>
          ) : null}
          <TextInput
            style={{
              backgroundColor: 'white',
              width: orientation === 'PORTRAIT' ? '70%' : '50%',
              height:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 40 : 50) : 50,
              marginTop: 30,
              borderWidth: 1,
              borderColor: '#3D4C28',
              paddingLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize:
                Platform.OS === 'ios' ? (h === 568 || w === 568 ? 14 : 17) : 17,
            }}
            secureTextEntry
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
          {errorBB && (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Regular',
                fontSize:
                  Platform.OS === 'ios'
                    ? h === 568 || w === 568
                      ? 13
                      : 16
                    : 16,
                textAlign: 'center',
                marginTop: 10,
              }}>
              Le mot de passe et la confirmation ne sont pas identiques
            </Text>
          )}
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: Dimensions.get('window').width,
              alignContent: 'center',
              alignItems: 'center',
              marginTop: '7%',
            }}>
            <BouncyCheckbox
              size={25}
              fillColor="#999D3B"
              unfillColor="#FFFFFF"
              iconStyle={{borderColor: '#999D3B'}}
              onPress={setSelection}
              style={{marginLeft: '3%'}}
              isChecked={data.autorisation}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
                fontSize: 13,
              }}>
              « J’autorise SIDAM à m’envoyer, par notifications et/ou e-mails,
              mes avantages cumulés et toutes informations nécessaires à
              l’utilisation de l’application ainsi que sur les produits et
              services proposés »
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#6D9FB2',
              width: orientation === 'PORTRAIT' ? '60%' : '32%',
              height: 50,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}
            onPress={() => handleChangeUser()}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize:
                  Platform.OS === 'ios'
                    ? h === 568 || w === 568
                      ? 14
                      : 17
                    : h > 533 && h < 534
                    ? 13
                    : 17,
                width: '60%',
                fontFamily: 'OpenSans-SemiBold',
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
                      ? h === 640
                        ? 175
                        : w === 270
                        ? 140
                        : 200
                      : 175
                    : '85%',
              }}
            />
          </TouchableOpacity>
          <View style={{marginTop: 50}}></View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
});

export default UserModification;
