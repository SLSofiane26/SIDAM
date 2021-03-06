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
  Modal,
} from 'react-native';
import axios from 'axios';
import {Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import * as ACTIONS from '../User/ACTIONS';
import {API_URL} from '@env';
import FondB from '../assets/fond.jpg';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Logo from '../assets/logo.png';

let Inscription = props => {
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
  });

  let [autorisation, setAutorisation] = useState(false);

  let [error, setError] = useState(false);

  let [email, setEmail] = useState(false);

  let [isSelected, setSelection] = useState(false);

  let [errorPassword, setErrorPassword] = useState(false);

  let [orientation, setOrientation] = useState(null);

  let [passwordVis, setPasswordVisu] = useState(false);

  let [passwordVisB, setPasswordVisuB] = useState(false);

  let [reglement, setReglement] = useState(false);

  let [errorAutorisation, setErrorAutorisation] = useState(false);

  let tokenB = useSelector(state => state.deviceToken);

  let w = Dimensions.get('window').width;
  let h = Dimensions.get('window').height;

  let dispatch = useDispatch();

  let regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

  let isValid = form => {
    let valid = true;
    Object.values(form).forEach(val => {
      if (!val) {
        valid = false;
      }
    });
    return valid;
  };

  let handleReglement = () => {
    if (autorisation) {
      setReglement(!reglement);
    } else {
      setErrorAutorisation(true);
    }
  };

  if (email) {
    setTimeout(() => {
      setEmail(false);
    }, 4000);
  }

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 10000);
  }

  if (errorAutorisation) {
    setTimeout(() => {
      setErrorAutorisation(!errorAutorisation);
    }, 10000);
  }

  //permet de s'inscrire//
  let handleSubmit = async () => {
    let data = {};
    data.nom = form.nom;
    data.prenom = form.prenom;
    data.email = form.email;
    data.motdepasse = form.motdepasse;
    data.ville = form.ville;
    data.SIA = form.SIA;
    data.adresse = form.adresse;
    data.codepostal = form.codepostal;
    data.telephone = form.telephone;
    data.deviceToken = tokenB;
    data.autorisation = isSelected;

    if (isValid(form) && regEx.test(form.email) && autorisation) {
      if (form.motdepasse === form.confirmmdp) {
        await axios({
          method: 'POST',
          baseURL: `${API_URL}/api/user`,
          data: data,
        })
          .then(res => {
            dispatch(ACTIONS.InscriptionBis(res.data));
          })
          .catch(err => {
            setEmail(true);
          });
      } else {
        setErrorPassword(true);
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
      }}>
      <Image
        source={FondB}
        style={{
          width: Dimensions.get('window').width,
          height: '100%',
          zIndex: 0,
          position: 'absolute',
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop:
            orientation === 'PORTRAIT'
              ? Platform.OS === 'android'
                ? h === 1152
                  ? '25%'
                  : w === 480
                  ? '22%'
                  : h === 1182
                  ? '22%'
                  : '23%'
                : '27%'
              : w === 568
              ? '14%'
              : '10%',
        }}
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
              Email ou SIA d??j?? utilis??e
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            width: '100%',
            height: 40,
            marginTop: 30,
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
                orientation === 'PORTRAIT' ? (w === 270 ? '10%' : '7%') : '5%',
            }}>
            Retour
          </Text>
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            width: Dimensions.get('screen').width,
          }}>
          <TextInput
            style={{
              backgroundColor: 'white',
              width: orientation === 'PORTRAIT' ? w / 1.5 : w / 3,
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
            placeholder="Pr??nom"
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
          {error && !form.prenom && (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
              }}>
              Veuillez renseigner votre pr??nom
            </Text>
          )}
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
                nom: val,
              })
            }
            placeholder="Nom"
            dataDetectorTypes="all"
            autoCompleteType="name"
            autoCapitalize="none"
            placeholderTextColor="grey"
            textContentType="name"
          />
          {error && !form.nom && (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
              }}>
              Veuillez renseigner votre nom
            </Text>
          )}
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
          {error && !form.email && (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
              }}>
              Veuillez renseigner votre email
            </Text>
          )}
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
              marginTop: !regEx.test(form.email) && form.email ? 10 : 30,
              borderWidth: 1,
              borderColor: '#3D4C28',
              paddingLeft: 20,
              fontFamily: 'Poppins-Regular',
              fontSize: 17,
            }}
            onChangeText={val =>
              setForm({
                ...form,
                telephone: val,
              })
            }
            placeholder="N?? de t??l??phone"
            dataDetectorTypes="phoneNumber"
            placeholderTextColor="grey"
            textContentType="telephoneNumber"
            autoCompleteType="tel"
            dataDetectorTypes="all"
          />
          {error && !form.telephone && (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
              }}>
              Veuillez renseigner votre t??l??phone
            </Text>
          )}
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
                adresse: val,
              })
            }
            placeholder="Adresse"
            dataDetectorTypes="all"
            autoCompleteType="street-address"
            placeholderTextColor="grey"
            textContentType="streetAddressLine1"
            autoCapitalize="none"
          />
          {error && !form.adresse && (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
              }}>
              Veuillez renseigner votre adresse
            </Text>
          )}
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
                codepostal: val,
              })
            }
            placeholder="Code postal"
            dataDetectorTypes="all"
            autoCompleteType="postal-code"
            placeholderTextColor="grey"
            textContentType="postalCode"
            keyboardType="number-pad"
            autoCapitalize="none"
          />
          {error && !form.codepostal && (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
              }}>
              Veuillez renseigner votre code postal
            </Text>
          )}
          <TextInput
            style={{
              backgroundColor: 'white',
              width: orientation === 'PORTRAIT' ? w / 1.5 : w / 3,
              height: 50,
              display: 'flex',
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
                ville: val,
              })
            }
            placeholder="Ville"
            dataDetectorTypes="all"
            textContentType="countryName"
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
          {error && !form.ville && (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
              }}>
              Veuillez renseigner votre ville
            </Text>
          )}
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
                SIA: val,
              })
            }
            placeholder="N?? SIA"
            dataDetectorTypes="all"
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
          {error && !form.SIA && (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
              }}>
              Veuillez renseigner votre SIA
            </Text>
          )}
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
            placeholder="Mot de passe"
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
          {error && !form.motdepasse && (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
              }}>
              Veuillez renseigner votre mot de passe
            </Text>
          )}
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
              Le mot de passe doit contenir entre 5 et 15 caract??res
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
          {errorPassword && (
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
                Mot de passe erron??
              </Text>
            </View>
          )}
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
                  textAlign: 'center',
                }}>
                Veuillez remplir tout les champs
              </Text>
            </View>
          )}
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: Dimensions.get('window').width,
              alignContent: 'center',
              alignItems: 'center',
              marginTop: '3%',
            }}>
            <TouchableOpacity
              onPress={() => setReglement(true)}
              style={{
                borderColor: 'black',
                borderWidth: 0.2,
                padding: 10,
                width: w / 1.5,
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  textAlign: 'center',
                  fontSize: 13,
                  color: 'black',
                }}>
                Accepter le r??glement
              </Text>
            </TouchableOpacity>
            {error && !autorisation && (
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
                    textAlign: 'center',
                  }}>
                  Veuillez accepter le r??glement
                </Text>
              </View>
            )}
            <Modal
              visible={reglement}
              supportedOrientations={['landscape', 'portrait']}>
              <ScrollView
                contentContainerStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  marginTop: orientation === 'PORTRAIT' ? '15%' : '5%',
                }}>
                <View
                  style={{
                    width: orientation === 'PORTRAIT' ? '100%' : '95%',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => setReglement(!reglement)}
                    style={{
                      width: '100%',
                      height: 20,
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
                              ? '10%'
                              : '7%'
                            : '5%',
                      }}>
                      Retour
                    </Text>
                  </TouchableOpacity>
                  <Image source={Logo} />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 20,
                      color: 'black',
                    }}>
                    CONDITIONS D???EXTENSION DE GARANTIE
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 20,
                      color: 'black',
                    }}>
                    Armes de cat??gorie B
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    width: '98%',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'center',
                        fontSize: 12,
                      }}>
                      274 rue Louis LEPINE ??? P??le d???Activit??s des Costi??res ???
                      BP57 - 30600 Vauvert ??? France ??? TEL 04 66 88 29 06 ??? FAX
                      04 66 88 97 62
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'center',
                        fontSize: 12,
                      }}>
                      RC NIMES 319 213 617 00040 ??? CODE APE 4649Z ??? FR 21 319
                      213 617
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'center',
                        fontSize: 12,
                      }}>
                      VALABLES A PARTIR DU 1er SEPTEMBRE 2021
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: 'blue',
                      }}>
                      Pr??ambule
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Les particuliers, acheteurs finaux d???armes b??n??ficient
                      d???une garantie l??gale (dont les termes sont rappel??s in
                      fine) et ??ventuellement contractuelle, de la part du
                      d??taillant aupr??s de qui l???arme a ??t?? acquise et/ou du
                      fabricant de celle-ci. {'\n'}
                      {'\n'}La Soci??t?? SIDAM est distributeur d???armes de
                      cat??gorie B exclusivement aupr??s de professionnels
                      armuriers et d???administrations publiques.{'\n'}
                      {'\n'}
                      La Soci??t?? SIDAM a souhait?? proposer aux particuliers,
                      utilisateurs finaux de ces produits (ci-apr??s ?? Client
                      Final ??) une extension de garantie (ci-apr??s ?? l???Extension
                      de Garantie ??) conditionn??e par l???acquisition r??currente
                      d???un certain volume de Munitions dont SIDAM assure la
                      distribution et correspondant aux dits Produits.{'\n'}
                      {'\n'}
                      Cette extension de garantie contractuelle est ind??pendante
                      des garanties dont le Client Final b??n??ficie vis-??-vis de
                      la personne aupr??s de qui il a acquis l???arme, et/ou du
                      fabricant de celle-ci.{'\n'}
                      {'\n'}Les pr??sentes ?? Conditions d???Extension de garantie
                      ??, sont applicables entre la Soci??t?? SIDAM et le Client
                      Final.{'\n'}
                      {'\n'}Elles constituent un accord contractuel, dont Le
                      Client Final reconna??t avoir pris connaissance et accepte
                      d?????tre li?? par celles-ci.
                    </Text>
                  </View>
                  <View style={{marginTop: '2%'}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: 'blue',
                      }}>
                      Article pr??liminaire???d??finition
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Les termes et expressions commen??ant par une majuscule
                      utilis??e dans les pr??sentes conditions d???Extension de
                      Garantie ont la signification suivante : {'\n'}
                      {'\n'}- Le ?? Produit?? d??signe exclusivement les armes de
                      cat??gorie acquises neuves, par le Client Final dans les
                      conditions pr??cis??es aux pr??sentes. La liste des Produits
                      concern??s est indiqu??e dans l???Application.{'\n'}
                      {'\n'}- L????? Application?? d??signe l???application mobile ??
                      SIDAM ??? Extension de garantie SIDAM ?? accessible depuis
                      les plateformes de t??l??chargement d???applications pour
                      mobiles.{'\n'}
                      {'\n'}- Le ?? Client Final ?? d??signe toute personne
                      physique ayant achet?? un Produit dans un cadre et pour un
                      usage non professionnel.{'\n'}
                      {'\n'}- ?? Revendeur Qualifi?? ?? d??signe les personnes
                      physiques ou morales exer??ant l???activit?? d???armurier
                      professionnel dans le respect de la r??glementation
                      applicable, ayant acquis les Produits ou les Munitions
                      directement aupr??s de la Soci??t?? SIDAM, avant de les
                      revendre directement au Client Final.{'\n'}
                      {'\n'}- ?? Munitions ?? d??signe des munitions neuves des
                      marques dont SIDAM assure la distribution du calibre
                      correspondant au Produit et vendues par un Revendeur
                      Qualifi?? apr??s avoir ??t?? acquis par celui-ci aupr??s de
                      SIDAM. La liste des marques de Munitions concern??s est
                      indiqu??e dans l???Application.{'\n'}
                      {'\n'}- ?? P??riode d???Achat ?? a le sens pr??cis?? ci-apr??s,
                      {'\n'}
                      {'\n'}- ?? Continuit?? d???Acquisition ?? et ?? Rupture de
                      Continuit?? d???Acquisition ?? ont le sens pr??cis?? ci- apr??s
                    </Text>
                  </View>
                  <View style={{marginTop: '2%'}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: 'blue',
                      }}>
                      Objet de la garantie
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                      }}>
                      La pr??sente Extension de Garantie concerne exclusivement
                      les Produits acquis par le Client Final, sur le territoire
                      fran??ais, dans le strict respect de la r??glementation
                      applicable, aupr??s d???un Revendeur Qualifi??.
                    </Text>
                  </View>
                  <View style={{marginTop: '3%'}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: 'blue',
                      }}>
                      Conditions de la garantie
                    </Text>
                    <View style={{marginTop: '2%'}}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                          color: '#00008B',
                        }}>
                        4.1 Etapes pr??alables
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Le Client doit renseigner l???ensemble des informations
                        sollicit??es dans l???interface de l???Application permettant
                        de souscrire ?? l???Extension de Garantie.{'\n'}
                        {'\n'}A ce titre il doit notamment pr??ciser ses ??l??ments
                        d???indentification (nom, pr??nom, identit?? du Revendeurs
                        Qualifi?? concern??, adresse mail, etc...) ainsi que ceux
                        du Produit tels que sa marque, son mod??le, et son num??ro
                        de s??rie. La transmission des ??l??ments justifiant de ces
                        informations est n??cessaire (pi??ces d???identit??, facture
                        et date d???acquisition du produit, etc...).{'\n'}
                        {'\n'}Suite ?? la communication de ces ??l??ments, SIDAM se
                        r??serve le droit de supprimer un compte ou des ??l??ments
                        de ce compte si des ??l??ments transmis ne sont pas
                        conformes et non ??ligibles, aux conditions de ce
                        r??glement. SIDAM ne sera engag?? par l???Extension de
                        Garantie vis-??-vis du Client Final, qu???exclusivement
                        pour le ou les Produits pour lesquels les ??l??ments
                        transmis sont conformes aux conditions de ce r??glement.
                        Les confirmations d?????ligibilit??s g??n??r??es
                        automatiquement par l???application peuvent ??tre annul??es
                        si les ??l??ments transmis ne sont pas conformes aux
                        conditions de ce r??glement.
                      </Text>
                    </View>
                    <View style={{marginTop: '2%'}}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                          color: '#00008B',
                        }}>
                        4.1 Prix/contrepartie
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                        }}>
                        L???Extension de Garantie est conditionn??e ?? l???acquisition
                        par le Client Final d???un Munitions dans les conditions
                        qui suivent.
                      </Text>
                    </View>
                    <View style={{marginTop: '2%'}}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                          color: '#00008B',
                        }}>
                        4.3 Dur??e de la garantie
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                          color: 'blue',
                        }}>
                        4.3.1 Date de d??but
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Le Client Final b??n??ficie d???une garantie l??gale et
                        ??ventuellement contractuelle vis ?? vis du Revendeur
                        Qualifi?? aupr??s de qui le Produit a ??t?? acquis et/ou
                        vis-??-vis du fabricant de celui-ci. L???Extension de
                        garantie propos??e par SIDAM au Client Final a vocation ??
                        prendre effet ?? l???expiration de la garantie
                        contractuelle du Fabricant du Produit, sans se cumuler,
                        ni se substituer ?? celle-ci. La dur??e de garantie
                        contractuelle du Fabricant est rappel??e au Client Final
                        lors de la confirmation de l?????ligibilit?? du Produit ??
                        l???Extension de Garantie, via l???Application. L???Extension
                        de Garantie propos??e par SIDAM prendra effet ?? la Date
                        d???expiration de la garantie contractuelle du Fabricant,
                        telle qu???indiqu??e dans l???Application. Sa dur??e sera
                        d??termin??e dans les conditions qui suivent.
                      </Text>
                    </View>
                    <View style={{marginTop: '2%'}}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                          color: 'blue',
                        }}>
                        4.3.2 Dur??e
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                        }}>
                        La dur??e de l???Extension de Garantie est d??termin??e en
                        fonction d???une Continuit?? d???Acquisition de Munitions,
                        par le Client Final, aupr??s d???un ou de Revendeur(s)
                        Qualifi??(s).{'\n'}
                        {'\n'}Dans les (trois) 3 mois de la date d???acquisition
                        du Produit par le Client Final, il devra avoir acquis au
                        moins (cinq cent) 500 Munitions.{'\n'}
                        {'\n'}Le Client Final devra transmettre des ??l??ments
                        justificatifs ?? SIDAM, via l???Application (facture
                        nominative d???acquisition, num??ro de lot indiqu?? sur la
                        boite de munition) avant l???expiration de ce d??lai. Si
                        ces conditions ne sont pas remplies, le Client final ne
                        pourra pas b??n??ficier de l???Extension de garantie pr??vue
                        aux pr??sentes.{'\n'}
                        {'\n'}Une fois ces conditions satisfaites, le Client
                        final sera inform??, via l???Application, de la nouvelle
                        date ?? l???issue de laquelle, il devra avoir acquis au
                        moins (cinq cent) 500 nouvelles munitions.{'\n'}
                        {'\n'}La dur??e de cette nouvelle p??riode d???achat sera
                        fix??e par la formule suivante :{'\n'}
                        {'\n'}Dur??e de la nouvelle p??riode d???achat en mois = 3 x
                        le nombre de lots entier de 500 munitions, acquis lors
                        de la p??riode d???achat pr??c??dente.{'\n'}
                        {'\n'}
                        Le Client Final devra transmettre les ??l??ments
                        justificatifs de l???acquisition de nouvelles munitions ??
                        SIDAM, via l???Application (facture nominative
                        d???acquisition, num??ro de lot indiqu??e sur la boite de
                        munition) avant l???expiration de ce d??lai.{'\n'}
                        {'\n'}La non-acquisition et/ou la non-justification de
                        l???acquisition de la quantit?? de Munitions minimum
                        requise dans la p??riode d???achat constitue une Rupture de
                        Continuit?? d???Acquisition.{'\n'}
                        {'\n'}La date de la Rupture de Continuit?? d???Acquisition
                        est fix??e ?? la date butoir de la derni??re p??riode
                        d???achat pour laquelle les conditions d???acquisition et de
                        justification de la quantit?? de Munitions minimum ont
                        ??t?? respect??es{'\n'}
                        {'\n'}La dur??e de l???Extension de Garantie est de (trois)
                        3 mois par lots entiers de 500 munitions achet??es entre
                        la date d???acquisition du Produit par le Client Final et
                        la date de Rupture de Continuit?? d???Acquisition.{'\n'}
                        {'\n'}Aussi, en cas de Rupture de la Continuit??
                        d???Acquisition, aucune acquisition ult??rieure de
                        Munitions ne pourra ??tre retenue pour le calcul de la
                        dur??e de l???Extension de Garantie.{'\n'}
                        {'\n'}En l???absence de Rupture de la Continuit??
                        d???Acquisition la dur??e de l???Extension de Garantie
                        continuera ?? s???allonger dans les conditions qui
                        pr??c??dent.{'\n'}
                        {'\n'}
                        L???allongement de la dur??e de la Garantie pourra
                        ??galement prendre fin par notification unilat??rale de
                        SIDAM, moyennant un pr??avis de 3 (trois) mois, transmis
                        au client via l???Application ou par tout autre moyen,
                        notamment en cas d???arr??t de l???Application. N??anmoins, le
                        Client final conservera le b??n??fice de la dur??e de
                        l???Extension de Garantie acquise, ?? la date d???effet de la
                        notification.
                      </Text>
                    </View>
                    <View style={{marginTop: '2%'}}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                          color: 'blue',
                        }}>
                        Modalit?? de mise en oeuvre
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Afin de faire valoir ses droits, le Client Final devra
                        informer par ??crit la soci??t?? SIDAM en lui adressant le
                        formulaire pr??vu ?? cet effet dans l???Application, avant
                        l???expiration du d??lai d???Extension de garantie.{'\n'}
                        {'\n'}La Soci??t?? SIDAM accusera r??ception de sa demande
                        dans les 72 heures et indiquera si le Client Final est
                        ??ligible ?? la Garantie.{'\n'}
                        {'\n'}Une fois que la Soci??t?? SIDAM aura accus??
                        r??ception de la demande, le Client final pourra d??poser
                        le Produit concern?? chez le Revendeur Qualifi?? d??sign??
                        dans l???Application, contre r??c??piss?? et engagement de ce
                        dernier de l???exp??dier ?? SIDAM.{'\n'}
                        {'\n'}Le Revendeur Qualifi?? exp??diera ?? SIDAM le
                        Produit.{'\n'}
                        {'\n'}D??s r??ception du Produit, SIDAM l???examinera.{'\n'}
                        {'\n'}SIDAM remplacera ou fera r??parer le Produit ou
                        pi??ces sous garantie jug??s d??fectueux dans un d??lai de 2
                        mois, sous r??serve de disponibilit?? des ??l??ments par
                        SIDAM et de son fournisseur.{'\n'}
                        {'\n'}SIDAM r??exp??diera le Produit au Revendeur Qualifi??
                        et en tiendra inform?? le Client Final via l???Application.
                        {'\n'}
                        {'\n'}Cette garantie couvre ??galement les frais de main
                        d'??uvre. Le remplacement des Produits ou pi??ces
                        d??fectueux n'aura pas pour effet de prolonger la dur??e
                        de la garantie, sauf si la p??riode d???immobilisation dure
                        au moins (septe) 7 jours, auquel cas elle viendra
                        s???ajouter ?? la dur??e de garantie. Aucun remboursement ne
                        sera possible.
                      </Text>
                    </View>
                    <View style={{marginTop: '2%'}}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                          color: 'blue',
                        }}>
                        Exclusion de garantie
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Toute garantie est exclue : {'\n'} {'\n'}- en cas de
                        mauvaise utilisation, n??gligence ou d??faut d'entretien,{' '}
                        {'\n'} {'\n'}- en cas de Chutes, choix ou utilisation de
                        solvants inappropri??s, {'\n'} {'\n'}- en cas de
                        non-respect des instructions et consignes de montage et
                        d???utilisation des produits, ??? en cas d???usure normale du
                        produit, d???accident ou de force majeure, {'\n'} {'\n'}-
                        en cas d???utilisation des produits dans des conditions
                        diff??rentes de celles pour lesquelles ils ont ??t??
                        fabriqu??s, {'\n'} {'\n'}- pour les d??fauts et
                        d??t??riorations des produits cons??cutifs ?? des conditions
                        anormales de stockage et/ou de conservation, {'\n'}{' '}
                        {'\n'}- en cas de customisation de l???arme modifiant le
                        processus de mise ?? feu et la fiabilit?? de celle-ci ;{' '}
                        {'\n'} {'\n'}- en cas de modification du canon, de la
                        carcasse, de la culasse, du barillet du Produit, {'\n'}{' '}
                        {'\n'}- en cas de d??fauts et d??t??riorations des produits
                        provenant de choc, chute, d??faut de surveillance, {'\n'}{' '}
                        {'\n'}- en cas de d??fauts et d??t??riorations des produits
                        touchant les pi??ces d???usure, les pi??ces en plastique et
                        en bois, {'\n'} {'\n'}- les produits et pi??ces
                        pr??sentant des traces de montage, {'\n'} {'\n'}- en cas
                        de transformation, modification, alt??ration du produit,{' '}
                        {'\n'} {'\n'}- en cas d???utilisation de munitions non
                        reconnues par la CIP ou recharg??es. {'\n'} {'\n'}Aussi,
                        si lors de la r??ception du Produit SIDAM constate qu???il
                        entre dans l???un des cas d???exclusion ci- dessus, elle en
                        informera le Client Final lui permettant de faire valoir
                        ses observations sous un d??lai de (quarante-huit) 48
                        heures.
                      </Text>
                    </View>
                    <View style={{marginTop: '2%'}}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          fontSize: 14,
                          color: 'blue',
                        }}>
                        Transfert et reprise du b??n??fice de la Garantie
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Le b??n??fice de l???Extension de garantie est propre au
                        Client Final qui n???aura pas la possibilit?? de
                        transmettre, ?? titre on??reux, gratuit ou par voie de
                        succession, en dehors des seuls cas limitatifs suivants.
                      </Text>
                    </View>
                  </View>
                  <View style={{marginTop: '2%'}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: '#00008B',
                      }}>
                      7.1 Cession du Produit ?? une autre Client Final
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                      }}>
                      En cas de cession du Produit ?? un autre Client Final, ce
                      dernier pourra se voir transf??rer le b??n??fice de
                      l???Extension de garantie dans les conditions suivantes.
                      {'\n'}
                      {'\n'}Le nouveau Client Final devra proc??der aux ??tapes
                      d???identification pr??vues ?? l???article 4 ci avant via
                      l???Application et justifier de l???acquisition du Produit
                      aupr??s du pr??c??dent Client Final, ainsi que du respect de
                      la r??glementation applicable (enregistrement de la cession
                      aupr??s des autorit??s et intervenants comp??tents etc..).
                      {'\n'}
                      {'\n'}Le Client Final (initialement b??n??ficiaire de la
                      Garantie) devra confirmer par ??crit ?? SIDAM qu???il a
                      effectivement proc??d?? ?? la cession du Produit au nouveau
                      Client Final et qu???il accepte de lui transmettre le
                      b??n??fice des droits acquis ?? l???Extension de garantie.
                      {'\n'}
                      {'\n'}Suite ?? l?????tude des renseignements communiqu??s, le
                      nouveau Client Final recevra de SIDAM une confirmation,
                      via l???Application, de l?????ligibilit?? de l???arme ??
                      l???Extension de Garantie et du transfert ?? son b??n??fice des
                      droits acquis.{'\n'}
                      {'\n'}SIDAM se r??serve le droit de supprimer un compte ou
                      des ??l??ments de ce nouveau compte si des ??l??ments transmis
                      ne sont pas conformes et non ??ligibles, aux conditions de
                      ce r??glement. SIDAM ne sera engag?? par l???Extension de
                      Garantie vis-??-vis du Client Final, qu???exclusivement pour
                      le ou les Produits pour lesquels les ??l??ments transmis
                      sont conformes aux conditions de ce r??glement. Les
                      confirmations d?????ligibilit??s g??n??r??es automatiquement par
                      l???application peuvent ??tre annul??es si les ??l??ments
                      transmis ne sont pas conformes aux conditions de ce
                      r??glement.{'\n'}
                      {'\n'}Le nouveau Client Final sera alors subrog?? dans les
                      droits acquis du Client Final ?? partir de la date ??
                      laquelle il aura acquis le Produit. Les conditions de
                      Garanties seront conserv??es sans interruption, notamment
                      celles aff??rentes ?? la Continuit?? d???Acquisition de
                      Munitions.
                    </Text>
                  </View>
                  <View style={{marginTop: '2%'}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: '#00008B',
                      }}>
                      7.2 Cession ?? un revendeur Qualifi??
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                      }}>
                      En cas de cession du Produit ?? un Revendeur Qualifi??, le
                      b??n??fice de l???Extension de Garantie pourra ??tre transf??r??e
                      au nouveau Client Final, ?? qui le Revendeur Qualifi??
                      vendra le Produit, dans les conditions suivantes.{'\n'}
                      {'\n'}Le Client Final de la Garantie devra indiquer par
                      ??crit ?? SIDAM, via l???Application, qu???il a effectivement
                      proc??d?? ?? la cession du Produits au Revendeur Qualifi??, et
                      qu???il accepte de transmettre le b??n??fice des droits acquis
                      ?? l???Extension de Garantie.{'\n'}
                      {'\n'}Le nouveau Client Final, ?? qui le Revendeur Qualifi??
                      aura c??d?? le Produits devra proc??der aux ??tapes
                      d???identification pr??vues ?? l???article 4 ci avant, via
                      l???Application, et justifier de l???acquisition du Produit
                      aupr??s du Revendeur Qualifi??, ainsi que du respect de la
                      r??glementation applicable (enregistrement de la cession
                      aupr??s des autorit??s et intervenants comp??tents etc..).
                      {'\n'}
                      {'\n'}Suite ?? l?????tude des renseignements communiqu??s, le
                      nouveau Client Final recevra de SIDAM une confirmation,
                      via l???Application, de l?????ligibilit?? de l???arme ??
                      l???Extension de Garantie et le transfert ?? son b??n??fice des
                      droits acquis.{'\n'}
                      {'\n'}SIDAM se r??serve le droit de supprimer un compte ou
                      des ??l??ments de ce nouveau compte si des ??l??ments transmis
                      ne sont pas conformes et non ??ligibles, aux conditions de
                      ce r??glement. SIDAM ne sera engag?? par l???Extension de
                      Garantie vis-??-vis du Client Final, qu???exclusivement pour
                      le ou les Produits pour lesquels les ??l??ments transmis
                      sont conformes aux conditions de ce r??glement. Les
                      confirmations d?????ligibilit??s g??n??r??es automatiquement par
                      l???application peuvent ??tre annul??es si les ??l??ments
                      transmis ne sont pas conformes aux conditions de ce
                      r??glement.{'\n'}
                      {'\n'}Le nouveau Client Final sera alors subrog?? dans les
                      droits acquis du Client Final ?? partir de la date ??
                      laquelle il aura acquis le Produit et les conditions de la
                      garantie conserv??e, notamment celles aff??rentes ?? la
                      Continuit?? d???Acquisition de Munitions, ??tant pr??cis?? que
                      la p??riode de d??tention du Produit par le Revendeur
                      Qualifi?? ne sera pas prise en compte pour l???appr??ciation
                      de la Continuit?? d???Acquisition des Munitions.
                    </Text>
                  </View>
                  <View style={{marginTop: '2%'}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: '#00008B',
                      }}>
                      Annulation de la garantie
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Toute fausse d??claration, faux ou usage de faux,
                      tromperie, ou tout autre man??uvre (r??utilisation,
                      falsification de facture ou autre...), aux fins notamment
                      de b??n??ficier de conditions indues de garantie, entrainera
                      l???annulation irr??vocable de l???Extension de Garantie et
                      pourra ?? tout moment, et en tout ??tat de cause, ??tre
                      oppos?? par SIDAM pour refuser le b??n??fice de l???Extension
                      de Garantie.
                    </Text>
                  </View>
                  <View style={{marginTop: '2%'}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: '#00008B',
                      }}>
                      Garanties l??gales
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Nous vous rappelons qu???en cas de d??faut de conformit?? du
                      bien au contrat, la garantie l??gale de conformit??
                      mentionn??e aux articles L.217-4 ?? L.217-13 du Code de la
                      Consommation et celle relative aux d??fauts de la chose
                      vendue, mentionn??e aux articles 1641 ?? 1648 et 2232 du
                      Code Civil, s???appliqueront conform??ment ?? la loi.{'\n'}
                      {'\n'}Article L217-4 du code de la consommation : ?? Le
                      vendeur livre un bien conforme au contrat et r??pond des
                      d??fauts de conformit?? existant lors de la d??livrance.
                      {'\n'}
                      {'\n'}Il r??pond ??galement des d??fauts de conformit??
                      r??sultant de l???emballage, des instructions de montage ou
                      de l???installation lorsque celle-ci a ??t?? mise ?? sa charge
                      par le contrat ou a ??t?? r??alis??e sous sa responsabilit?? ??.
                      {'\n'}
                      {'\n'}
                      Article L217-5 du code de la consommation :{'\n'}
                      {'\n'}?? Le bien est conforme au contrat :{'\n'}
                      {'\n'}1 - S???il est propre ?? l???usage habituellement attendu
                      d???un bien semblable et, le cas ??ch??ant {'\n'}
                      {'\n'}- s???il correspond ?? la description donn??e par le
                      vendeur et poss??de les qualit??s que celui-ci a pr??sent??es
                      ?? l???acheteur sous forme d?????chantillon ou de mod??le ; -
                      {'\n'}
                      {'\n'}s???il pr??sente les qualit??s qu???un acheteur peut
                      l??gitimement attendre eu ??gard aux d??clarations publiques
                      faites par le vendeur, par le producteur ou par son
                      repr??sentant, notamment dans la publicit?? ou l?????tiquetage
                      ; {'\n'}
                      {'\n'}2 - Ou s???il pr??sente les caract??ristiques d??finies
                      d???un commun accord par les parties ou est propre ?? tout
                      usage sp??cial recherch?? par l???acheteur, port?? ?? la
                      connaissance du vendeur et que ce dernier a accept??.??.
                      {'\n'}
                      {'\n'} Article L217-12 du code de la consommation : ??
                      L???action r??sultant du d??faut de conformit?? se prescrit par
                      deux ans ?? compter de la d??livrance du bien ??.{'\n'}
                      {'\n'}Article L217-16 du code de la consommation : ??
                      Lorsque l???acheteur demande au vendeur, pendant le cours de
                      la garantie commerciale qui lui a ??t?? consentie lors de
                      l???acquisition ou de la r??paration d???un bien meuble, une
                      remise en ??tat couverte par la garantie, toute p??riode
                      d???immobilisation d???au moins sept jours vient s???ajouter ??
                      la dur??e de la garantie qui restait ?? courir. Cette
                      p??riode court ?? compter de la demande d???intervention de
                      l???acheteur ou de la mise ?? disposition pour r??paration du
                      bien en cause, si cette mise ?? disposition est post??rieure
                      ?? la demande d???intervention ??.{'\n'}
                      {'\n'}Article 1641 du code civil : ?? Le vendeur est tenu
                      de la garantie ?? raison des d??fauts cach??s de la chose
                      vendue qui la rendent impropre ?? l???usage auquel on la
                      destine, ou qui diminuent tellement cet usage que
                      l???acheteur ne l???aurait pas acquise, ou n???en aurait donn??
                      qu???un moindre prix, s???il les avait connus??.{'\n'}
                      {'\n'}Article 1648 du code civil : ?? L???action r??sultant
                      des vices r??dhibitoires doit ??tre intent??e par l???acqu??reur
                      dans un d??lai de deux ans ?? compter de la d??couverte du
                      vice ??.{'\n'}
                      {'\n'}En cas d???action en garantie l??gale de conformit??, le
                      consommateur :{'\n'}
                      {'\n'} - b??n??ficie d???un d??lai de deux ans ?? compter de la
                      d??livrance du bien pour agir, {'\n'}
                      {'\n'}- peut choisir entre la r??paration ou le
                      remplacement du bien, sous r??serve des conditions de co??t
                      pr??vues par l???article L.217-9 du code de la consommation,{' '}
                      {'\n'}
                      {'\n'}- est dispens?? de rapporter la preuve de l???existence
                      du d??faut de conformit?? du bien durant les 6 mois suivant
                      la d??livrance du bien. Ce d??lai est port?? ?? vingt-quatre
                      mois ?? compter du 18 mars 2016, sauf pour les biens
                      d???occasion.
                      {'\n'}
                      {'\n'}La garantie l??gale de conformit?? s???applique
                      ind??pendamment de la garantie commerciale ou
                      contractuelle.{'\n'}
                      {'\n'}Dans le cas o?? le consommateur d??cide de mettre en
                      ??uvre la garantie des vices cach??s de la chose vendue
                      telle que pr??vue par l???article 1641 du code civil, il peut
                      choisir entre la r??solution de la vente ou une r??duction
                      du prix de vente conform??ment ?? l???article 1644 dudit code.
                    </Text>
                  </View>
                  <View style={{marginTop: '2%'}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: '#00008B',
                      }}>
                      Mode de r??glement des litiges
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Pour toute question relative ?? cette Extension de
                      Garantie, n???h??sitez pas, ?? nous contacter au
                      04.66.88.29.06 (tarif local) du lundi au vendredi entre
                      9H00-12h00 et 14H00-18H00 (sauf les jours f??ri??s et
                      interdiction l??gislative, r??glementaire ou
                      conventionnelle).{'\n'}
                      {'\n'}Si vous rencontrez une difficult??, nous vous
                      invitons ?? vous adresser ?? nous et nous nous efforcerons
                      de trouver avec vous une solution amiable.{'\n'}
                      {'\n'}?? d??faut de trouver une solution vous donnant
                      satisfaction, vous pourrez nous adresser une r??clamation
                      par courrier ?? l???adresse :{'\n'}
                      {'\n'}SIDAM, 274 rue Louis LEPINE, p??le d???activit??s des
                      costi??res ??? BP 57 ; 30600 VAUVERT {'\n'}
                      {'\n'}SIDAM s???engage ?? r??pondre imm??diatement, et au plus
                      tard dans les 72 heures, ?? toute r??clamation faite aupr??s
                      du Service t??l??phonique, et ?? r??pondre dans un d??lai de 10
                      jour ouvrable aux r??clamations faites par courrier.{'\n'}
                      {'\n'}Si vous n???obtenez pas de r??ponse satisfaisante ??
                      votre r??clamation, vous pouvez contacter le m??diateur de
                      la F??d??ration du e-commerce et de la vente ?? distance
                      (FEVAD), selon les modalit??s indiqu??es ?? la page
                      http://www. mediateurfevad.fr et dont les coordonn??es sont
                      les suivantes : 60 rue La Bo??tie 75008 Paris.{'\n'}
                      {'\n'}Conform??ment au R??glement (UE) n??524/2013, la
                      Commission Europ??enne a mis en place une plateforme de
                      R??glement en Ligne des Litiges, facilitant le r??glement
                      ind??pendant par voie extrajudiciaire des litiges en ligne
                      entre consommateurs et professionnels de l???Union
                      europ??enne. Cette plateforme est accessible au lien
                      suivant: https://webgate.ec.europa.eu/odr/{'\n'}
                      {'\n'}Les pr??sentes sous mis que Droit fran??ais et en cas
                      de persistance d???un diff??rend, les Tribunaux fran??ais
                      seront comp??tents pour en connaitre. Les r??gles fran??aises
                      de droit commun seraient applicables.
                    </Text>
                  </View>
                  <View style={{marginTop: '2%'}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: 'blue',
                      }}>
                      Donn??es personnelles
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Les donn??es vous concernant sont trait??es par la soci??t??
                      SIDAM responsable de traitement. {'\n'} {'\n'}Les donn??es
                      sont stock??es sur les serveurs de l???h??bergeur neoIP 660
                      Avenue de la gare ??? 34560 Montbazin ??? France selon un
                      protocole permettant de chiffrer (s??curiser) le contenu
                      des ??changes entre le navigateur du visiteur de
                      l???application et les serveurs h??bergeant ce dernier. Ceci
                      permet donc d?????viter que les donn??es personnelles
                      transitant ?? l???issue de la soumission d???un formulaire
                      puissent ??tre facilement lues par des tiers. {'\n'} {'\n'}
                      Vos donn??es sont trait??es principalement pour cr??er et
                      g??rer votre compte, vos demandes, vos informations d???achat
                      et leur suivi, personnaliser nos services et effectuer des
                      analyses statistiques, ainsi qu????? des fins de marketing et
                      publicit?? cibl??e (connaissance client, envoi de
                      communications ??lectroniques et profilage publicitaire par
                      combinaison de donn??es). {'\n'} {'\n'}Ces traitements
                      peuvent ??tre fond??s sur diff??rentes bases l??gales selon
                      les finalit??s concern??es.
                      {'\n'} {'\n'}Vous gardez la possibilit?? de retirer votre
                      consentement ?? tout moment. Les donn??es collect??es dans le
                      cadre d???une commande sont susceptibles d?????tre communiqu??es
                      ?? des fins d???analyse de d??tection de la fraude. {'\n'}{' '}
                      {'\n'}En fonction de vos choix, certaines informations
                      pourront ??galement ??tre transmises aux entit??s du groupe
                      SIDAM ?? des fins de connaissance client et
                      personnalisation de nos services, ou ?? des partenaires
                      commerciaux ?? des fins de marketing cibl?? et de profilage
                      publicitaire par combinaison de donn??es. Pour refuser le
                      partage aux entit??s du groupe ou avec les partenaires,
                      rendez-vous sur la rubrique ?? mon compte ?? de
                      l???application. {'\n'}
                      {'\n'}Vous pouvez ??galement g??rer vos donn??es personnelles
                      et exprimer vos choix, notamment concernant les cookies,
                      en vous rendant dans la rubrique ?? mon compte ??. de
                      l???Application.{'\n'}
                      {'\n'}Vous pouvez exercer vos droits (acc??s,
                      rectification, suppression, opposition, limitation et
                      portabilit?? le cas ??ch??ant) et d??finir le sort de vos
                      donn??es personnelles post mortem via l???Application ou par
                      email (info@ste-sidam.com) ou contacter le D??l??gu?? ?? la
                      Protection des Donn??es de SIDAM par courrier : SIDAM, 274
                      rue Louis L??pine, p??le d???activit??s des costi??res ??? BP57,
                      30600 VAUVERT{'\n'}
                      {'\n'}Vous disposez par ailleurs, du droit d???introduire
                      une r??clamation aupr??s de la Commission Nationale de
                      l???Informatique et des Libert??s (CNIL), notamment sur son
                      site internet www.cnil.fr. La plupart des donn??es vous
                      concernant seront conserv??es pendant une dur??e de 5 ans ??
                      compter de votre derni??re activit?? (ex. : achat, ??ch??ance
                      de vos contrats), puis archiv??es avec un acc??s restreint
                      pour une dur??e suppl??mentaire de 5 ans pour des raisons
                      strictement limit??es et autoris??es par la loi (paiement,
                      garantie, litiges ...). Vous ??tes inform??s que vos donn??es
                      peuvent ??tre transmises pour les besoins des finalit??s
                      mentionn??es ci-dessus ?? des soci??t??s situ??es en dehors de
                      l???Union Europ??enne notamment pour les activit??s de service
                      client, prestations informatiques, exploitation des
                      donn??es en lien avec les r??seaux sociaux. Toute proc??dure
                      requise pour s??curiser les donn??es sera mise en ??uvre
                      avant de proc??der ?? de tels transferts.
                    </Text>
                  </View>
                  <View style={{marginTop: '2%'}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: 'blue',
                      }}>
                      Droit de r??tractation
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Pour vos achats sur internet vous b??n??ficiez d???un d??lai de
                      15 jours ?? compter de votre souscription aux pr??sentes,
                      pour vous r??tracter. Pour plus d???informations sur
                      l???exercice de ce droit et afin de t??l??charger le
                      formulaire de r??tractation, rendez-vous dans la rubrique ??
                      contact ?? de votre application.
                    </Text>
                  </View>
                  {errorAutorisation && (
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: 'red',
                      }}>
                      Vous devez accepter le r??glement pour continuer
                    </Text>
                  )}
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <BouncyCheckbox
                      size={25}
                      fillColor={errorAutorisation ? '#999D3B' : '#999D3B'}
                      unfillColor={errorAutorisation ? 'red' : 'white'}
                      iconStyle={{
                        borderColor: errorAutorisation
                          ? autorisation
                            ? '#999D3B'
                            : 'red'
                          : '#999D3B',
                      }}
                      isChecked={autorisation}
                      onPress={setAutorisation}
                      style={{marginLeft: '3%', marginTop: '2%'}}
                    />
                    <TouchableOpacity
                      onPress={() => handleReglement()}
                      style={{
                        borderColor: errorAutorisation ? 'red' : '#999D3B',
                        borderWidth: 1,
                        padding: '3%',
                        marginTop: '2%',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Continuer
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: '30%'}}></View>
                </View>
              </ScrollView>
            </Modal>
            <BouncyCheckbox
              size={25}
              fillColor="#999D3B"
              unfillColor="#FFFFFF"
              iconStyle={{borderColor: '#999D3B'}}
              onPress={setSelection}
              style={{marginLeft: '3%', marginTop: '4%'}}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
                fontSize: 13,
              }}>
              ?? J???autorise SIDAM ?? m???envoyer, par notifications et/ou e-mails,
              mes avantages cumul??s et toutes informations n??cessaires ??
              l???utilisation de l???application ainsi que sur les produits et
              services propos??s ??
            </Text>
          </View>

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
                    Platform.OS === 'android'
                      ? orientation === 'PORTRAIT'
                        ? w === 270
                          ? 120
                          : 160
                        : w === 640
                        ? 140
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

export default Inscription;
