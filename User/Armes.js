import React, {useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  RefreshControl,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from '@env';
import {Picker, Icon} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Sound from 'react-native-sound';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import SW from '../assets/sw.png';
import CZ from '../assets/CZ.png';
import * as ACTIONS from './ACTIONS';
import Spinner from 'react-native-spinkit';
import Speedometer from 'react-native-cool-speedometer';
import {Select, Option} from 'react-native-chooser';
import Lot from '../assets/lot.jpg';

let Armes = React.memo(function Armes(props) {
  let [factures, setFacture] = useState(null);
  let [orientation, setOrientation] = useState(null);
  let [DD, setDD] = useState(false);
  let [loading, setLoading] = useState(false);
  let [add, setAdd] = useState(false);
  let [help, setHelp] = useState(false);
  let [DateDate, setDateDate] = useState(new Date());
  let [dateBB, setDate] = useState(false);
  let [Message, setMessage] = useState(false);
  let [formbis, setFormBis] = useState({
    nombre: null,
    dateachat: null,
    preuveachat: null,
    marque: null,
    numerodelot: null,
  });
  let [numero, setNumero] = useState(false);
  let [picture, setPicture] = useState(false);
  let [refreshArme, setRefreshArme] = useState(false);
  let [error, setError] = useState(null);
  let [errorBis, setErrorBis] = useState(null);
  let [munitions, setMunitions] = useState(false);
  let [historique, setHistorique] = useState(false);
  let [Limit, setMunLimit] = useState(false);
  let [achat, setAchat] = useState(new Date('2021-09-01'));
  let token = useSelector(state => state.token);
  let prenom = useSelector(state => state.prenom);
  let nom = useSelector(state => state.nom);

  let scrollRef = useRef(null);

  Sound.setCategory('Playback');

  let dispatch = useDispatch();

  let w = Dimensions.get('window').width;
  let h = Dimensions.get('window').height;

  let handleRefresh = () => {
    setRefreshArme(true);
    props.handleArme();
    setTimeout(() => {
      setRefreshArme(false);
    }, 100);
  };

  let dd = false;

  useEffect(() => {
    if (!dd) {
      if (w < h) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    }
    return () => {
      dd = true;
    };
  });

  let handleTop = () => {
    scrollRef.current.scrollToEnd({index: 0, animated: true});
  };

  let handleBottom = () => {
    scrollRef.current.scrollToOffset({offset: 0, animated: false});
  };

  // Permet de prendre une photo depuis la galerie du téléphone //
  let handlePictureBis = async () => {
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
        setFormBis({
          ...formbis,
          preuveachat: res.path,
        });
      })
      .catch(err => {
        setPicture(false);
      });
  };

  // Permet de prendre une photo depuis la camera //
  let handlePictureBBis = async () => {
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
        setFormBis({
          ...formbis,
          preuveachat: res.path,
        });
      })
      .catch(err => {
        setPicture(false);
      });
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

  let handleAnnulerAdd = () => {
    setMessage(false);
    setFormBis({
      ...formbis,
      dateachat: null,
      preuveachat: null,
      nombre: null,
    });
  };

  let handleConfirm = data => {
    setDateDate(data);
    setDate(false);
    setDD(true);
  };

  let handleDateBis = data => {
    setDateDate(data);
    setDD(true);
  };

  let handleHelp = () => {
    setHelp(!help);
  };

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }

  if (Limit) {
    setTimeout(() => {
      setMunLimit(false);
    }, 5000);
  }

  if (errorBis) {
    setTimeout(() => {
      setErrorBis(false);
    }, 5000);
  }

  // Permet d'annulez le transfert d'une arme //
  let handleAnnulez = async data => {
    await axios({
      method: 'POST',
      url: `${API_URL}/api/armes/annulez/${data}`,
      headers: {
        'x-auth-token': token,
      },
    }).then(res => {
      props.Fetch();
    });
  };

  // Permet d'ajouter des munitions //
  let handleAdd = async () => {
    setMessage(false);
    setLoading(true);
    setAdd(true);

    let dd = props.dataB.map((items, index) => {
      return items._id;
    });

    let f = dd.toString();

    let d = {};
    d.nombre = formbis.nombre;
    d.dateachat = formbis.dateachat;
    d.marque = formbis.marque;
    d.numerolot = formbis.numerodelot;

    await axios({
      method: 'POST',
      url: `${API_URL}/api/munition/${f}`,
      headers: {
        'x-auth-token': token,
      },
      data: d,
    })
      .then(res => {
        if (res.data.msg === 'MUNIONLIMIT') {
          setMunLimit(true);
        } else {
          RNFetchBlob.fetch(
            'POST',
            `${API_URL}/api/munitionb/${res.data._id}`,
            {
              'Content-Type': 'multipart/form-data',
            },
            [
              {
                name: 'autorisation',
                filename: 'autorisation.jpg',
                type: 'image/foo',
                data: RNFetchBlob.wrap(formbis.preuveachat),
              },
            ],
          )
            .then(resp => {
              handleBottom();
              let whoosh = new Sound(
                'sound_two.mp3',
                Sound.MAIN_BUNDLE,
                error => {
                  if (error) {
                    setLoading(false);
                    return;
                  }
                  whoosh.setVolume(1);
                  whoosh.play(success => {
                    if (success) {
                      if (res.data.ok) {
                        setLoading(false);
                        dispatch(ACTIONS.Facture(token)).then(() => {
                          props.SuccesMunition();
                          setFormBis({
                            ...formbis,
                            dateachat: null,
                            preuveachat: null,
                          });
                        });
                        let whooshB = new Sound(
                          'notification.mp3',
                          Sound.MAIN_BUNDLE,
                          error => {
                            if (error) {
                              return;
                            }
                            setTimeout(() => {
                              whooshB.play();
                            }, 800);
                          },
                        );
                      } else {
                        setLoading(false);
                        dispatch(ACTIONS.Facture(token)).then(() => {
                          props.SuccesMunition();
                          setFormBis({
                            ...formbis,
                            dateachat: null,
                            preuveachat: null,
                          });
                        });
                      }
                    } else {
                      setLoading(false);
                      setError(true);
                    }
                  });
                },
              );
            })
            .catch(err => {
              setLoading(false);
              setError(true);
            });
        }
      })
      .catch(err => {
        setLoading(false);
        setError(true);
      });
  };

  let f = [];

  // Permet d'afficher l'historique des munitions //
  let showHandle = async data => {
    await axios({
      method: 'GET',
      url: `${API_URL}/api/armes/${data._id}`,
      headers: {
        'x-auth-token': token,
      },
    }).then(res => {
      f.push(res.data);
      setHistorique(f);
    });
  };

  let dateBBB = null;

  let ccc = null;

  let handleAddM = async () => {
    formbis.dateachat = DateDate;
    if (
      formbis.dateachat &&
      formbis.nombre &&
      formbis.preuveachat &&
      formbis.marque &&
      !isNaN(formbis.nombre)
    ) {
      if (formbis.nombre > 1000) {
        setErrorBis(true);
      } else {
        setMessage(true);
      }
    } else {
      setError(true);
    }
  };

  if (DateDate) {
    let mois = new Date(DateDate).getMonth() + 1;
    let jours = new Date(DateDate).getDate();
    let annee = new Date(DateDate).getFullYear();

    if (jours < 10) {
      jours = '0' + jours;
    }
    if (mois < 10) {
      mois = '0' + mois;
    }
    dateBBB = `${jours}/${mois}/${annee}`;
    ccc = dateBBB.toString();
  }

  let renderItem = items => {
    let NumberExp =
      Number(items.item.expiration) + Number(items.item.extension * 7889400000);

    let dadaB = new Date(NumberExp).getTime();
    let dada = new Date().getTime();
    let dateGarantie = new Date(
      Number(items.item.garantie) + Number(items.item.extension * 7889400000),
    ).toDateString();
    let m = new Date(dateGarantie).getMonth();

    let ff = m + 1;

    if (ff < 10) {
      ff = '0' + ff;
    }

    let j = new Date(dateGarantie).getDate();

    if (j < 10) {
      j = '0' + j;
    }
    let an = new Date(dateGarantie).getFullYear();
    let date = `${j}/${ff}/${an}`;

    let dateAchat = new Date(items.item.dateAchat).toDateString();
    let mmm = new Date(dateAchat).getMonth();
    let fff = mmm + 1;

    if (fff < 10) {
      fff = '0' + fff;
    }

    let jjj = new Date(dateAchat).getDate();

    if (jjj < 10) {
      jjj = '0' + jjj;
    }

    let annnn = new Date(dateAchat).getFullYear();
    let DateAchatBis = `${jjj}/${fff}/${annnn}`;
    let pourcentageM = 500 * (items.item.pourcentage / 100);
    let ann = 500 - pourcentageM;
    let c = ann.toFixed(0);

    let dateB = date.toString();

    let dateExpM = new Date(Number(items.item.limitDate)).getMonth() + 1;
    let dateExpJ = new Date(Number(items.item.limitDate)).getDate();
    let dateExpA = new Date(Number(items.item.limitDate)).getFullYear();

    if (dateExpM < 10) {
      dateExpM = '0' + dateExpM;
    }

    if (dateExpJ < 10) {
      dateExpJ = '0' + dateExpJ;
    }

    let dateExp = `${dateExpJ}/${dateExpM}/${dateExpA}`;

    return (
      <View
        key={items.index}
        style={{
          width: w,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
          }}>
          {prenom && (
            <View
              style={{
                marginLeft: orientation === 'PORTRAIT' ? 0 : 30,
                marginTop:
                  orientation === 'PORTRAIT'
                    ? Platform.OS === 'android'
                      ? 0
                      : h === 667
                      ? '5%'
                      : h === 568
                      ? '10%'
                      : w === 568
                      ? '4%'
                      : '4%'
                    : Platform.OS === 'android'
                    ? '5%'
                    : '2%',
              }}>
              <TouchableOpacity onPress={() => props.handleAccount()}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    alignSelf: 'flex-start',
                    backgroundColor: '#999D3B',
                    marginLeft: '12%',
                    fontFamily: 'Poppins-Regular',
                    marginRight:
                      orientation === 'PORTRAIT'
                        ? 0
                        : Platform.OS === 'ios'
                        ? 0
                        : 20,
                    padding:
                      orientation === 'PORTRAIT'
                        ? '2%'
                        : Platform.OS === 'ios'
                        ? '2%'
                        : '1%',
                  }}>
                  {prenom} {nom}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              marginTop:
                orientation === 'PORTRAIT'
                  ? Platform.OS === 'android'
                    ? 0
                    : h === 667
                    ? '5%'
                    : h === 568
                    ? '10%'
                    : '4%'
                  : Platform.OS === 'android'
                  ? '5%'
                  : '4%',
            }}>
            <TouchableOpacity
              onPress={() => handleHelp()}
              style={{
                marginRight: orientation === 'PORTRAIT' ? '6%' : '7%',
              }}>
              <Icon
                name="help-circle"
                type="Ionicons"
                style={{
                  color: '#999D3B',
                  fontSize: 40,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
          }}>
          {help && (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                zIndex: 15000,
              }}>
              <View
                style={{
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => setHelp(false)}
                  style={{
                    zIndex: 10000,
                    position: 'absolute',
                    marginLeft: orientation === 'PORTRAIT' ? '90%' : '81%',
                    marginTop: orientation === 'PORTRAIT' ? '0%' : '2%',
                  }}>
                  <Icon
                    type="Entypo"
                    name="circle-with-cross"
                    style={{
                      color: '#6D9FB2',
                      backgroundColor: 'white',
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    marginTop: '3%',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderColor: 'grey',
                      borderWidth: 1,
                      padding: 2,
                      borderRadius: 10,
                      backgroundColor: 'white',
                      width: orientation === 'PORTRAIT' ? '90%' : w / 1.5,
                    }}>
                    <Text
                      style={{
                        color: '#6D9FB2',
                        textAlign: 'center',
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: w === 270 ? 10 : 15,
                        padding: 10,
                        backgroundColor: 'white',
                      }}>
                      Toute fausse déclaration entraînera la nullité définitive
                      de l’extension de garantie et des avantages cumulés.
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => props.HandleD(items.item._id)}
              style={{
                width: '60%',
                height: items.item.isDivisible
                  ? 30
                  : Platform.OS === 'android'
                  ? 30
                  : orientation === 'PORTRAIT'
                  ? 20
                  : 'auto',
                marginTop: h === 568 ? '2%' : '0%',
              }}>
              <Icon
                type="Entypo"
                name="chevron-left"
                style={{
                  position: 'absolute',
                  fontSize: 20,
                  marginLeft:
                    orientation === 'PORTRAIT'
                      ? '3%'
                      : Platform.OS === 'ios'
                      ? '5%'
                      : '1%',
                  color: '#636A28',
                  marginTop: h === 432 ? 0 : 1,
                }}
              />
              <Text
                style={{
                  color: '#636A28',
                  fontSize: w === 270 ? 13 : 16,
                  fontFamily: 'Poppins-Regular',
                  marginLeft:
                    orientation === 'PORTRAIT'
                      ? w === 270
                        ? '15%'
                        : '11%'
                      : Platform.OS === 'ios'
                      ? w === 568
                        ? '12%'
                        : '9%'
                      : '5%',
                }}>
                Retour
              </Text>
            </TouchableOpacity>
          </View>

          {items.item.isDivisible && items.item.quantite > 0 && (
            <View
              style={{
                backgroundColor: '#636A28',
                height: 100,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: help ? 20 : 0,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: w === 270 ? 13 : 16,
                  color: 'white',
                  width: '90%',
                }}>
                Votre arme bénéficie d’une extension de garantie jusqu’au {date}
              </Text>
            </View>
          )}
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop:
                orientation === 'PORTRAIT'
                  ? items.item.isDivisible
                    ? 10
                    : 0
                  : items.item.isDivisible
                  ? 10
                  : 0,
            }}>
            {items.item.type === 'REVOLVERSMITHWESSON' && <Image source={SW} />}
            {items.item.type === 'PISTOLETSMITHWESSON' && <Image source={SW} />}
            {items.item.type === 'CARABINESMITHWESSON' && <Image source={SW} />}
            {items.item.type === 'PISTOLETCZ' && (
              <Image source={CZ} style={{width: 160, height: 63.1}} />
            )}
            {items.item.type === 'CARABINECZ' && <Image source={CZ} />}
          </View>

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  marginTop: 15,
                  fontSize: w === 270 ? 13 : 16,
                  color: 'black',
                  fontFamily: 'Poppins-Regular',
                }}>
                Modèle :{' '}
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontFamily: 'Poppins-Bold',
                  }}>
                  {items.item.modele}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: w === 270 ? 13 : 16,
                  color: 'black',
                  fontFamily: 'Poppins-Regular',
                }}>
                Calibre :{' '}
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontFamily: 'Poppins-Bold',
                  }}>
                  {items.item.calibre}
                </Text>
              </Text>
              <Text
                style={{
                  marginTop: 3,
                  fontSize: w === 270 ? 13 : 16,
                  color: 'black',
                  fontFamily: 'Poppins-Regular',
                }}>
                N° de série :{' '}
                <Text
                  style={{
                    color: 'black',
                    fontSize: w === 270 ? 13 : 16,
                    fontFamily: 'Poppins-Bold',
                  }}>
                  {items.item.serie}
                </Text>
              </Text>

              <Text
                style={{
                  marginTop: 3,
                  fontSize: w === 270 ? 13 : 16,
                  color: 'black',
                  fontFamily: 'Poppins-Regular',
                }}>
                Date d'acquisition :{' '}
                <Text
                  style={{
                    color: 'black',
                    fontSize: w === 270 ? 13 : 16,
                    fontFamily: 'Poppins-Bold',
                  }}>
                  {DateAchatBis}
                </Text>
              </Text>
              <Text
                style={{
                  marginTop: 3,
                  fontSize: w === 270 ? 13 : 16,
                  color: 'black',
                  fontFamily: 'Poppins-Regular',
                }}>
                Date de garantie cumulée :{' '}
                <Text
                  style={{
                    fontSize: w === 270 ? 13 : 16,
                    fontFamily: 'Poppins-Bold',
                  }}>
                  {dateB}
                </Text>
              </Text>
            </View>
          </View>

          {Number(dadaB) > Number(dada) ? (
            <View
              style={{
                marginTop: 15,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  alignSelf: 'center',
                  marginTop:
                    orientation === 'PORTRAIT'
                      ? h === 432
                        ? '15%'
                        : h === 692
                        ? '10%'
                        : h === 568
                        ? '12%'
                        : '10%'
                      : Platform.OS === 'android'
                      ? w === 1152
                        ? '4%'
                        : w > 1018 && w < 1019
                        ? '4%'
                        : h === 432
                        ? '4%'
                        : h === 492
                        ? '3%'
                        : '5%'
                      : w === 568
                      ? '7%'
                      : '5%',
                  fontSize: w === 270 ? 13 : 16,
                  color: 'black',
                  fontFamily: 'Poppins-Regular',
                }}>
                250
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  marginTop:
                    orientation === 'PORTRAIT'
                      ? Platform.OS === 'android'
                        ? h === 592
                          ? w === 360
                            ? '21%'
                            : '20%'
                          : h === 432
                          ? w === 270
                            ? '35%'
                            : '25%'
                          : h === 640
                          ? '25%'
                          : h === 692
                          ? '20%'
                          : h === 752
                          ? '20%'
                          : w === 540
                          ? '13%'
                          : h === 1024
                          ? '16%'
                          : h === 912
                          ? '16%'
                          : h === 992
                          ? '14%'
                          : h === 732
                          ? '20%'
                          : h > 830 && h < 831
                          ? '19%'
                          : h === 672
                          ? '20%'
                          : '18%'
                        : h === 812
                        ? w === 375
                          ? '20%'
                          : '20%'
                        : w === 390
                        ? '18%'
                        : w === 414
                        ? h === 896
                          ? '19%'
                          : h === 736
                          ? '20%'
                          : '22%'
                        : h === 568
                        ? '22%'
                        : h === 667
                        ? '20%'
                        : '18%'
                      : Platform.OS === 'android'
                      ? w === 1152
                        ? '8%'
                        : w === 592
                        ? '14%'
                        : w > 1018 && w < 1019
                        ? '8%'
                        : h === 432
                        ? w === 816
                          ? '10%'
                          : w === 816
                          ? '10%'
                          : '8%'
                        : h === 492
                        ? w === 1230
                          ? '6%'
                          : w === 1080
                          ? '6%'
                          : '8%'
                        : '10%'
                      : w === 568
                      ? '13%'
                      : h === 375
                      ? w === 667
                        ? '11%'
                        : '9%'
                      : w === 736
                      ? '10%'
                      : '9%',
                  fontSize: w === 270 ? 13 : 16,
                  color: 'black',
                  fontFamily: 'Poppins-Regular',
                  marginLeft:
                    orientation === 'PORTRAIT'
                      ? h === 812
                        ? w === 375
                          ? '50%'
                          : '52%'
                        : w === 270
                        ? h === 432
                          ? '60%'
                          : '55%'
                        : h === 896
                        ? '48%'
                        : w === 540
                        ? '46%'
                        : h === 1024
                        ? '46%'
                        : h === 912
                        ? '48%'
                        : h === 992
                        ? '48%'
                        : '50%'
                      : Platform.OS === 'android'
                      ? w === 1152
                        ? '43%'
                        : w > 1018 && w < 1019
                        ? '43%'
                        : h === 432
                        ? '43%'
                        : h === 492
                        ? '43%'
                        : '45%'
                      : w === 667
                      ? '44%'
                      : '44%',
                }}>
                350
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  alignSelf: 'flex-start',
                  marginTop:
                    orientation === 'PORTRAIT'
                      ? w === 270
                        ? h === 432
                          ? '31%'
                          : '26%'
                        : h === 912
                        ? '16%'
                        : w === 360
                        ? h === 592
                          ? '21%'
                          : '20%'
                        : h > 805 && h < 806
                        ? '26%'
                        : w === 480
                        ? '15%'
                        : w === 540
                        ? '15%'
                        : h === 568
                        ? '23%'
                        : w === 375
                        ? '18%'
                        : '17.3%'
                      : w === 568
                      ? '12%'
                      : w > 683 && w < 684
                      ? '12%'
                      : w === 1152
                      ? '7%'
                      : w === 592
                      ? '13%'
                      : w > 1018 && w < 1019
                      ? '8%'
                      : h === 432
                      ? w === 816
                        ? '9%'
                        : h === 432
                        ? w === 1056
                          ? '7%'
                          : '8%'
                        : '7%'
                      : h === 480
                      ? '8%'
                      : w === 960
                      ? '8%'
                      : h === 492
                      ? w === 1230
                        ? '6%'
                        : '7%'
                      : w === 667
                      ? '11%'
                      : w === 736
                      ? '10%'
                      : w === 926
                      ? '8%'
                      : '9%',
                  fontSize: w === 270 ? 13 : 16,
                  color: 'black',
                  fontFamily: 'Poppins-Regular',
                  marginLeft:
                    orientation === 'PORTRAIT'
                      ? w === 270
                        ? h === 432
                          ? '13%'
                          : '18%'
                        : h === 912
                        ? w === 480
                          ? '25%'
                          : '28%'
                        : h > 805 && h < 806
                        ? '25%'
                        : h > 938 && h < 939
                        ? '25%'
                        : h > 1018 && h < 1019
                        ? '25%'
                        : w === 480
                        ? '25%'
                        : w === 540
                        ? '25%'
                        : h === 568
                        ? '22%'
                        : '23%'
                      : Platform.OS === 'android'
                      ? w > 683 && w < 684
                        ? '30%'
                        : h > 392 && h < 393
                        ? '30%'
                        : w === 1152
                        ? '33%'
                        : w === 592
                        ? '28%'
                        : w === 752
                        ? '30%'
                        : w === 692
                        ? '30%'
                        : w === 640
                        ? '30%'
                        : w === 800
                        ? '30%'
                        : w === 760
                        ? '30%'
                        : w > 771 && w < 772
                        ? '30%'
                        : w === 816
                        ? '32%'
                        : w > 748 && w < 749
                        ? '30%'
                        : w > 774 && w < 775
                        ? '30%'
                        : w === 720
                        ? '30%'
                        : w === 1230
                        ? '34%'
                        : w === 780
                        ? '32%'
                        : '33%'
                      : w === 667
                      ? '30%'
                      : w === 736
                      ? '31%'
                      : w === 568
                      ? '29%'
                      : '32%',
                }}>
                150
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  marginTop:
                    orientation === 'PORTRAIT'
                      ? w === 270
                        ? h === 432
                          ? '31%'
                          : '26%'
                        : h === 912
                        ? w === 540
                          ? '30%'
                          : w === 480
                          ? '30%'
                          : 'z6%'
                        : w === 360
                        ? h === 592
                          ? Platform.OS === 'android'
                            ? '45%'
                            : '24%'
                          : h === 692
                          ? '50%'
                          : h === 752
                          ? '50%'
                          : h === 712
                          ? '50%'
                          : h === 640
                          ? '45%'
                          : h === 672
                          ? '45%'
                          : h > 701 && h < 702
                          ? '40%'
                          : h === 732
                          ? '50%'
                          : h > 830 && h < 831
                          ? '50%'
                          : '20%'
                        : h > 805 && h < 806
                        ? '26%'
                        : h > 900
                        ? Platform.OS === 'android'
                          ? w === 540
                            ? '35%'
                            : '40%'
                          : '38%'
                        : h === 568
                        ? '60%'
                        : w === 390
                        ? '40%'
                        : '40%'
                      : w === 667
                      ? h === 375
                        ? '22%'
                        : '30%'
                      : w === 736
                      ? '25%'
                      : w === 568
                      ? '30%'
                      : w > 683 && w < 684
                      ? '25%'
                      : h > 392 && h < 393
                      ? '25%'
                      : h > 411 && h < 412
                      ? '20%'
                      : w === 816
                      ? '20%'
                      : w === 1152
                      ? '15%'
                      : w === 592
                      ? '29%'
                      : w === 752
                      ? '24%'
                      : h === 312
                      ? w === 800
                        ? '19%'
                        : '21%'
                      : w === 692
                      ? '25%'
                      : w === 1230
                      ? '15%'
                      : w === 800
                      ? '24%'
                      : '20%',
                  fontSize:
                    orientation === 'PORTRAIT'
                      ? h === 812
                        ? 15
                        : h === 816
                        ? 15
                        : h === 912
                        ? 18
                        : h > 805 && h < 806
                        ? 16
                        : h > 938 && h < 939
                        ? 16
                        : h > 1018 && h < 1019
                        ? 16
                        : h === 667
                        ? 15
                        : h === 568
                        ? 16
                        : h === 692
                        ? 14
                        : h === 592
                        ? w === 360
                          ? 17
                          : 14
                        : 16
                      : w === 736
                      ? 15
                      : w === 667
                      ? h === 375
                        ? 14
                        : 10
                      : 17,
                  color: '#636A28',
                  fontFamily: 'Poppins-Regular',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  marginLeft:
                    orientation === 'PORTRAIT'
                      ? w === 270
                        ? h === 432
                          ? '13%'
                          : '18%'
                        : h === 912
                        ? w === 540
                          ? '45%'
                          : w === 480
                          ? '50%'
                          : '28%'
                        : h > 805 && h < 806
                        ? '25%'
                        : h > 938 && h < 939
                        ? Platform.OS === 'android'
                          ? '50%'
                          : '25%'
                        : h > 1018 && h < 1019
                        ? w === 480
                          ? '45%'
                          : '25%'
                        : '50%'
                      : Platform.OS === 'android'
                      ? h > 392 && h < 393
                        ? '45%'
                        : h > 411 && h < 412
                        ? w > 683 && w < 684
                          ? '44%'
                          : '45%'
                        : w === 816
                        ? '41%'
                        : w === 592
                        ? '42%'
                        : h === 312
                        ? w > 878 && w < 879
                          ? '43%'
                          : '45%'
                        : w === 1230
                        ? '41%'
                        : '40%'
                      : '43%',
                }}>
                500
              </Text>

              <View
                style={{
                  transform: [{rotate: '-35deg'}],
                  marginLeft: '3%',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Speedometer
                  dangerZone
                  marks={{lineColor: 'black'}}
                  secondaryArcColor={
                    items.item.pourcentage <= 30
                      ? 'red'
                      : items.item.pourcentage > 30 &&
                        items.item.pourcentage <= 50
                      ? '#FFA500'
                      : items.item.pourcentage > 50 &&
                        items.item.pourcentage <= 70
                      ? '#FFFF00'
                      : '#999D3B'
                  }
                  noBackground
                  primaryArcWidth={10}
                  secondaryArcWidth={4}
                  primaryArcColor={
                    items.item.pourcentage <= 30
                      ? 'red'
                      : items.item.pourcentage > 30 &&
                        items.item.pourcentage <= 50
                      ? '#FFA500'
                      : items.item.pourcentage > 50 &&
                        items.item.pourcentage <= 70
                      ? '#FFFF00'
                      : '#999D3B'
                  }
                  value={items.item.pourcentage}
                  accentColor="green"
                  step={2}
                  NoBackground
                  indicatorStyle={{
                    color: '#636A28',
                  }}
                  max={100}
                  noNumberMarks
                  noIndicator
                  rotation={-90}
                  needle={{
                    baseOffset: 0,
                    circleRadius: 15,
                    color: '#636A28',
                    circleColor: 'black',
                  }}
                />
              </View>

              <View
                style={{
                  position: 'absolute',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  display: 'flex',
                  marginTop:
                    orientation === 'PORTRAIT'
                      ? h > 900
                        ? Platform.OS === 'android'
                          ? w === 540
                            ? '42%'
                            : '47%'
                          : '50%'
                        : h === 667
                        ? '60%'
                        : h === 568
                        ? '70%'
                        : h === 692
                        ? '63%'
                        : w === 360
                        ? '62%'
                        : w === 432
                        ? '53%'
                        : h == 812
                        ? '60%'
                        : '56%'
                      : w > 900
                      ? h === 432
                        ? w > 986 && w < 987
                          ? '23%'
                          : '21%'
                        : w === 1152
                        ? '20%'
                        : w > 1018 && w < 1019
                        ? '22%'
                        : w === 960
                        ? '22%'
                        : h === 492
                        ? '19%'
                        : '24%'
                      : w === 667
                      ? '34%'
                      : w === 736
                      ? '30%'
                      : w === 568
                      ? '40%'
                      : w > 683 && w < 684
                      ? '30%'
                      : h > 392 && h < 393
                      ? '30%'
                      : w === 816
                      ? '27%'
                      : w === 592
                      ? '36%'
                      : w === 752
                      ? '30%'
                      : h === 312
                      ? w === 640
                        ? '33%'
                        : w === 800
                        ? '28%'
                        : w > 878 && w < 879
                        ? '25%'
                        : '30%'
                      : w === 896
                      ? '25%'
                      : w === 692
                      ? '33%'
                      : w > 748 && w < 749
                      ? '29%'
                      : w > 774 && w < 775
                      ? '29%'
                      : '26%',
                }}>
                <Text
                  style={{
                    fontSize:
                      orientation === 'PORTRAIT'
                        ? h === 812
                          ? 13
                          : h === 816
                          ? 15
                          : h === 912
                          ? 18
                          : h > 805 && h < 806
                          ? 16
                          : h > 938 && h < 939
                          ? 16
                          : h > 1018 && h < 1019
                          ? 16
                          : h === 667
                          ? 15
                          : h === 568
                          ? 13
                          : h === 692
                          ? 14
                          : h === 592
                          ? 14
                          : 16
                        : w === 736
                        ? 14
                        : w === 667
                        ? h === 375
                          ? 14
                          : 10
                        : 14,
                    color: '#636A28',
                    fontFamily: 'Poppins-Regular',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                  }}>
                  3 mois d'extension
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    textAlign: 'center',
                    fontFamily: 'Miami',
                    marginTop:
                      orientation === 'PORTRAIT'
                        ? Platform.OS === 'android'
                          ? '0%'
                          : '2%'
                        : w > 683 && w < 684
                        ? '3%'
                        : '0%',
                  }}>
                  Compteur de munitions
                </Text>
              </View>
            </View>
          ) : null}
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width:
                  orientation === 'PORTRAIT'
                    ? w > 400
                      ? Platform.OS === 'ios'
                        ? w / 1.13
                        : w / 1.15
                      : w / 1.15
                    : '55%',
              }}>
              {Number(dadaB) > Number(dada) ? (
                <Text
                  style={{
                    fontSize: w === 270 ? 13 : 16,
                    color: 'black',
                    marginTop: 30,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Enregistrer {c} munitions avant le {dateExp} pour bénéficier
                  de{' '}
                  <Text style={{fontFamily: 'Poppins-Bold'}}>
                    3 mois d'extension de garantie supplémentaire.
                  </Text>
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: w === 270 ? 13 : 16,
                    color: 'red',
                    fontFamily: 'Poppins-Regular',
                    textAlign: 'center',
                  }}>
                  Délais d'enregistrement de munition(s) dépassé
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginRight:
                Platform.OS === 'android'
                  ? orientation === 'PORTRAIT'
                    ? '5%'
                    : '10%'
                  : '5%',
            }}
            onPress={() => handleTop()}>
            <Icon
              name="angle-double-down"
              type="FontAwesome"
              style={{fontSize: 80}}
            />
          </TouchableOpacity>
        </View>

        {items.item.cedee && (
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'red',
                marginTop: 30,
                fontSize:
                  Platform.OS === 'ios'
                    ? h === 568 || w === 568
                      ? 14
                      : 16
                    : 16,
                marginTop: 30,
                fontFamily: 'Poppins-Regular',
              }}>
              En cours de validation pour transfert
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => handleAnnulez(items.item._id)}
                style={{
                  backgroundColor: '#ff4136',
                  width: orientation === 'PORTRAIT' ? '55%' : '28%',
                  height: 40,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 30,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 17,
                    fontFamily: 'OpenSans-SemiBold',
                    width: '100%',
                  }}>
                  Annuler
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
            <View
              style={{
                marginTop: orientation === 'PORTRAIT' ? '40%' : '10%',
              }}></View>
          </View>
        )}

        {!munitions && !items.item.cedee && !historique && (
          <View>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 30,
                zIndex: 100,
              }}>
              <Spinner
                style={{position: 'absolute', zIndex: 150}}
                isVisible={loading}
                size={150}
                type="WanderingCubes"
                color={'#999D3B'}
              />
            </View>
            {Number(dadaB) > Number(dada) && (
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 15,
                  zIndex: 10,
                }}>
                <TouchableOpacity
                  style={{
                    zIndex: 10,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#636A28',
                    marginTop: orientation === 'PORTRAIT' ? 0 : 0,
                    height: 50,
                    width: orientation === 'PORTRAIT' ? '55%' : '32%',
                  }}
                  onPress={() => setMunitions(items.item)}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: w === 270 ? 13 : 17,
                      fontFamily: 'OpenSans-SemiBold',
                      width: '70%',
                    }}>
                    Enregistrer des munitions
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
            )}
            {items.item.munitions.length > 0 && (
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#999D3B',
                    marginTop: orientation === 'PORTRAIT' ? 0 : 0,
                    height: 50,
                    width: orientation === 'PORTRAIT' ? '55%' : '32%',
                  }}
                  onPress={() => {
                    items.item.munitions.length > 0
                      ? showHandle(items.item)
                      : null;
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize:
                        orientation === 'PORTRAIT'
                          ? 17
                          : Platform.OS === 'ios'
                          ? 17
                          : w === 1072
                          ? 15
                          : 17,
                      fontFamily: 'OpenSans-SemiBold',
                      width:
                        orientation === 'PORTRAIT'
                          ? '80%'
                          : w === 568
                          ? '70%'
                          : '60%',
                    }}>
                    Historique des munitions
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
            )}
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: items.item.munitions.length > 10 ? 40 : 15,
              }}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#6D9FB2',
                  marginTop: orientation === 'PORTRAIT' ? 0 : 10,
                  height: 50,
                  width: orientation === 'PORTRAIT' ? '55%' : '32%',
                }}
                onPress={() => props.handleNavigationBBB(items.item)}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: w === 270 ? 13 : 17,
                    fontFamily: 'OpenSans-SemiBold',
                    width:
                      orientation === 'PORTRAIT'
                        ? Platform.OS === 'android'
                          ? w === 360
                            ? '70%'
                            : w === 270
                            ? '70%'
                            : '55%'
                          : h === 568
                          ? '80%'
                          : '58%'
                        : Platform.OS === 'android'
                        ? w > 683 && w < 684
                          ? '70%'
                          : w === 1152
                          ? '40%'
                          : w === 592
                          ? '60%'
                          : w === 640
                          ? '60%'
                          : h === 492
                          ? w === 960
                            ? '50%'
                            : w === 1080
                            ? '50%'
                            : '60%'
                          : w === 1072
                          ? '45%'
                          : '50%'
                        : w === 667
                        ? '55%'
                        : w === 736
                        ? '50%'
                        : w === 568
                        ? '80%'
                        : '42%',
                  }}>
                  Je me sépare de mon arme
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
            <View
              style={{
                marginTop: orientation === 'PORTRAIT' ? '25%' : '15%',
              }}></View>
          </View>
        )}
        {munitions && (
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: '5%',
            }}>
            <TouchableOpacity
              onPress={() => setMunitions(false)}
              style={{
                width:
                  orientation === 'PORTRAIT'
                    ? Platform.OS === 'android'
                      ? h === 640
                        ? '55%'
                        : h === 592
                        ? w === 360
                          ? '60%'
                          : '55%'
                        : w === 270
                        ? '70%'
                        : h === 752
                        ? '60%'
                        : h === 672
                        ? '60%'
                        : h === 692
                        ? '60%'
                        : h === 712
                        ? '70%'
                        : h > 701 && h < 702
                        ? '60%'
                        : h === 732
                        ? '60%'
                        : '53%'
                      : h === 568
                      ? '70%'
                      : '53%'
                    : Platform.OS === 'android'
                    ? w > 753 && w < 754
                      ? '30%'
                      : '50%'
                    : '55%',
              }}>
              <Text
                style={{
                  color: '#636A28',
                  textAlign: 'center',
                  fontSize: w === 270 ? 23 : 27,
                  fontFamily: 'OpenSans-ExtraBold',
                  marginTop: Platform.OS === 'android' ? (h > 700 ? 0 : 10) : 5,
                }}>
                J'enregistre des munitions
              </Text>
            </TouchableOpacity>
            {errorBis && (
              <Text
                style={{
                  color: 'red',
                  marginTop: 20,
                  fontSize: 17,
                  fontFamily: 'Poppins-Regular',
                  textAlign: 'center',
                }}>
                Impossible d'enregistrer plus de 2000 munitions
              </Text>
            )}

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
            {Limit && (
              <Text
                style={{
                  textAlign: 'center',
                  color: 'red',
                  fontSize: h === 568 ? 15 : h === 432 ? 12 : 14,
                  fontFamily: 'Poppins-Regular',
                }}>
                Impossible d'enregistrer plus de 2000 munitions
              </Text>
            )}
            <View
              style={{
                width: '100%',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                onChangeText={val => {
                  setFormBis({
                    ...formbis,
                    nombre: val,
                  });
                }}
                style={{
                  backgroundColor: 'white',
                  width: orientation === 'PORTRAIT' ? '70%' : '40%',
                  height: 50,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: '#3D4C28',
                  textAlign: 'center',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 17,
                }}
                placeholder="Quantité munitions"
                placeholderTextColor="grey"
              />
              {error && !formbis.nombre && (
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'red',
                    fontSize: h === 568 ? 15 : h === 432 ? 12 : 14,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Veuillez renseigner le nombre de munitions
                </Text>
              )}
              {Platform.OS === 'android' ? (
                <Select
                  style={{
                    height: 50,
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    backgroundColor: 'white',
                    width: orientation === 'PORTRAIT' ? w / 1.43 : w / 2.5,
                    marginTop: 18,
                  }}
                  animationType="slide"
                  indicatorColor="#636A28"
                  indicator="down"
                  defaultText={
                    formbis.marque === 'MAGTECH'
                      ? 'MAGTECH'
                      : formbis.marque === 'SELLIER&BELLOT'
                      ? 'SELLIER & BELLOT'
                      : 'Veuillez choisir une marque'
                  }
                  backdropStyle={{
                    backgroundColor: 'white',
                  }}
                  onSelect={item => setFormBis({...formbis, marque: item})}
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
                  <Option value="SELLIER&BELLOT">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      SELLIER & BELLOT
                    </Text>
                  </Option>
                  <Option value="MAGTECH">
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                      }}>
                      MAGTECH
                    </Text>
                  </Option>
                </Select>
              ) : (
                <Picker
                  iosIcon={<Icon name="down" type="AntDesign" />}
                  iosHeader="Marque"
                  mode="dropdown"
                  textStyle={{
                    textAlign: 'center',
                  }}
                  placeholder={
                    formbis.marque
                      ? formbis.marque === 'MAGTECH'
                        ? 'MAGTECH'
                        : 'SELLIER & BELLOT'
                      : 'Marque'
                  }
                  placeholderStyle={{
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  style={{
                    backgroundColor: 'white',
                    width: orientation === 'PORTRAIT' ? w / 1.4 : w / 2.3,
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
                    setFormBis({...formbis, marque: itemValue})
                  }>
                  <Picker.Item label="MAGTECH" value="MAGTECH" />
                  <Picker.Item label="SELLIER&BELLOT" value="SELLIER&BELLOT" />
                </Picker>
              )}

              {error && !formbis.marque && (
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'red',
                    fontSize: h === 568 ? 15 : h === 432 ? 12 : 14,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Veuillez renseigner la marque de vos munitions
                </Text>
              )}

              <TextInput
                onChangeText={val => {
                  setFormBis({
                    ...formbis,
                    numerodelot: val,
                  });
                }}
                style={{
                  backgroundColor: 'white',
                  width: orientation === 'PORTRAIT' ? '70%' : '40%',
                  height: 50,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: '#3D4C28',
                  textAlign: 'center',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 17,
                }}
                placeholder="Numéro de lot"
                placeholderTextColor="grey"
              />
              <TouchableOpacity onPress={() => setNumero(!numero)}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 15,
                    color: 'red',
                  }}>
                  Où trouver mon numéro de lot ?
                </Text>
              </TouchableOpacity>
              {numero && (
                <View>
                  <TouchableOpacity
                    onPress={() => setNumero(false)}
                    style={{
                      zIndex: 10000,
                      marginLeft:
                        orientation === 'PORTRAIT'
                          ? Platform.OS === 'ios'
                            ? '85%'
                            : '90%'
                          : w === 568
                          ? '60%'
                          : '50%',
                    }}>
                    <Icon
                      type="Entypo"
                      name="circle-with-cross"
                      style={{
                        color: '#6D9FB2',
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      width: w,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={Lot}
                      style={{
                        width:
                          h === 568
                            ? 300
                            : h === 752
                            ? 300
                            : h === 692
                            ? 300
                            : 415,
                        height:
                          h === 568
                            ? 200
                            : h === 752
                            ? 200
                            : h === 692
                            ? 200
                            : 250,
                      }}
                    />
                  </View>
                </View>
              )}
              {error && !formbis.numerodelot && (
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'red',
                    fontSize: h === 568 ? 15 : h === 432 ? 12 : 14,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Veuillez renseigner le numéro de lot de vos munitions
                </Text>
              )}

              <TouchableOpacity
                onPress={() => setDate(!dateBB)}
                style={{
                  backgroundColor: 'white',
                  marginTop: 10,
                  borderWidth: 1,
                  width: orientation === 'PORTRAIT' ? '70%' : '40%',
                  height: 50,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                    fontSize: w === 270 ? 13 : 16,
                    color: 'grey',
                  }}>
                  {DD ? ccc : 'Date d’achat'}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              {Platform.OS === 'android' ? (
                dateBB && (
                  <DatePicker
                    date={DateDate}
                    onDateChange={handleDateBis}
                    maximumDate={new Date()}
                    minimumDate={achat}
                    mode="date"
                    textColor="black"
                    fadeToColor="white"
                    androidVariant="nativeAndroid"
                    locale="fr"
                    style={{
                      marginTop: 10,
                    }}
                  />
                )
              ) : (
                <DateTimePickerModal
                  isVisible={dateBB}
                  headerTextIOS="Date d'acquisition"
                  confirmTextIOS="Confirmer"
                  cancelTextIOS="Annuler"
                  onConfirm={handleConfirm}
                  onCancel={() => setDate(false)}
                  mode="date"
                  date={new Date()}
                  locale="FR-fr"
                  maximumDate={new Date()}
                  minimumDate={achat}
                />
              )}
              {error && !formbis.dateachat && (
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'red',
                    fontSize: h === 568 ? 15 : h === 432 ? 12 : 14,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Veuillez renseigner la date d'achat
                </Text>
              )}
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#999D3B',
                  marginTop: 30,
                  height: 50,
                  width: orientation === 'PORTRAIT' ? '55%' : '28%',
                }}
                onPress={() => setPicture(true)}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: w === 270 ? 13 : 17,
                    fontFamily: 'OpenSans-SemiBold',
                    width:
                      orientation === 'PORTRAIT'
                        ? Platform.OS === 'android'
                          ? w === 360
                            ? '60%'
                            : w === 270
                            ? '60%'
                            : '50%'
                          : h === 568
                          ? '80%'
                          : '55%'
                        : w === 568
                        ? '70%'
                        : h === 384
                        ? '80%'
                        : '60%',
                  }}>
                  Télécharger votre facture
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
              <Text style={{color: 'red'}}>* Champs obligatoires</Text>
              {error && !formbis.preuveachat && (
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
                        backgroundColor: '#6D9FB2',
                        padding: orientation === 'PORTRAIT' ? '10%' : '2%',
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
                        onPress={() => handlePictureBBis()}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: w === 360 ? 15 : w === 270 ? 14 : 17,
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
                        onPress={() => handlePictureBis()}>
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
                                : 17,
                            fontFamily: 'Arial',
                            width: orientation === 'PORTRAIT' ? '90%' : '70%',
                          }}>
                          Sélectionner une photo depuis ma librairie
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </Modal>

              {loading && (
                <View style={{position: 'absolute', zIndex: 100}}>
                  <Spinner
                    isVisible={loading}
                    size={150}
                    type="WanderingCubes"
                    color={'#999D3B'}
                  />
                </View>
              )}
              {formbis.preuveachat && (
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
                      setFormBis({
                        ...formbis,
                        preuveachat: null,
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
                    source={{uri: formbis.preuveachat}}
                    style={{width: 150, height: 150, marginTop: 15}}
                  />
                </View>
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: '#6D9FB2',
                  width: orientation === 'PORTRAIT' ? '55%' : '28%',
                  height: 40,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}
                onPress={() => handleAddM()}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: w === 270 ? 14 : 17,
                    fontFamily: 'OpenSans-SemiBold',
                    width: orientation === 'PORTRAIT' ? '80%' : '80%',
                  }}>
                  Envoyer
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
              <View
                style={{
                  marginTop:
                    h === 640
                      ? '25%'
                      : h === 667
                      ? '30%'
                      : h === 568
                      ? '30%'
                      : '25%',
                }}></View>
            </View>

            {factures && (
              <Text
                style={{
                  color: '#999D3B',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 17,
                }}>
                Certificat de garantie envoyé par email
              </Text>
            )}
          </View>
        )}

        {historique && !munitions && (
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              width: '100%',
              paddingBottom: 100,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                zIndex: 10,
                width: '100%',
              }}>
              <TouchableOpacity
                style={{
                  zIndex: 10,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#636A28',
                  height: 50,
                  width: orientation === 'PORTRAIT' ? '55%' : '32%',
                }}
                onPress={() => setMunitions(items.item)}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 17,
                    fontFamily: 'OpenSans-SemiBold',
                    width:
                      orientation === 'PORTRAIT'
                        ? '60%'
                        : w === 568
                        ? '60%'
                        : '55%',
                  }}>
                  Enregistrer des munitions
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
            <TouchableOpacity onPress={() => setHistorique(false)}>
              <Text
                style={{
                  color: '#636A28',
                  textAlign: 'center',
                  fontSize:
                    Platform.OS === 'ios'
                      ? h === 568 || w === 568
                        ? 23
                        : 24
                      : h > 850 && h < 851
                      ? 25
                      : h === 640
                      ? 23
                      : 27,
                  fontFamily: 'OpenSans-ExtraBold',
                  marginTop: Platform.OS === 'android' ? 10 : 30,
                }}>
                Achat de munitions (
                {historique.map((items, index) => {
                  return items.quantite;
                })}
                C)
              </Text>
            </TouchableOpacity>

            {historique.slice().map((items, index) => {
              return items.munitions.map((items, index) => {
                let annn = new Date(items.dateachat).getFullYear();

                let jr = new Date(items.dateachat).getDate();

                let mt = new Date(items.dateachat).getMonth();

                if (jr < 10) {
                  jr = '0' + jr;
                }

                if (mt < 10) {
                  mt = '0' + mt;
                }

                let dateBBB = `${jr}/${mt}/${annn}`;

                let fff = dateBBB.toString();

                return (
                  <View
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      width: w / 1.5,
                      borderColor: '#3D4C28',
                      borderWidth: 1,
                      height: 50,
                      alignContent: 'center',
                      alignItems: 'center',
                      marginTop: 20,
                      flexWrap: 'wrap',
                    }}>
                    <Text
                      style={{
                        fontSize: w === 270 ? 13 : 16,
                        color: 'grey',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {fff}
                    </Text>
                    <Text
                      style={{
                        fontSize: w === 270 ? 13 : 16,
                        color: 'grey',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {items.nombre}C
                    </Text>
                  </View>
                );
              });
            })}
          </View>
        )}
      </View>
    );
  };

  let d = null;

  if (props.dataB) {
    d = props.dataB.map((items, index) => {
      return items ? items._id : null;
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? null : 'padding'}
      keyboardVerticalOffset={10}>
      {props.dataB ? (
        <FlatList
          ref={scrollRef}
          refreshControl={
            <RefreshControl
              refreshing={refreshArme}
              onRefresh={handleRefresh}
              colors={['#999D3B']}
              tintColor={['#999D3B']}
              title="Chargement"
            />
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          keyExtractor={(items, index) => {
            return items ? items._id : null;
          }}
          data={props.dataB}
          numColumns={1}
          renderItem={renderItem}
        />
      ) : (
        <Text
          style={{
            fontFamily: 'OpenSans-SemiBold',
            color: 'red',
            textAlign: 'center',
          }}>
          Arme Supprimée par admin
        </Text>
      )}
      <Modal
        visible={Message}
        supportedOrientations={['landscape', 'portrait']}
        transparent>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: 'flex-end',
              alignContent: 'center',
              alignItems: 'center',
              height: Dimensions.get('window').height,
              marginTop: orientation === 'PORTRAIT' ? 0 : 200,
            }}>
            <View
              style={{
                marginTop: 100,
                backgroundColor: '#B22222',
                borderRadius: 10,
                height: orientation === 'PORTRAIT' ? 'auto' : '60%',
                width: '100%',
                marginBottom: '30%',
                paddingBottom: 15,
              }}>
              <TouchableOpacity style={{zIndex: 1000}}>
                <Text
                  style={{
                    fontSize: w === 270 ? 13 : 16,
                    fontFamily: 'Poppins-SemiBold',
                    textAlign: 'center',
                    marginTop: orientation === ' PORTRAIT' ? '5%' : '0%',
                    padding: '2%',
                    color: 'white',
                  }}>
                  Toute fausse déclaration entraînera la nullité définitive de
                  l’extension de garantie et des avantages cumulés.
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => handleAdd()}
                  style={{
                    zIndex: 10,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#636A28',
                    marginTop: 10,
                    height: 50,
                    width: '55%',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 17,
                      fontFamily: 'OpenSans-SemiBold',
                      width: '55%',
                    }}>
                    Continuer
                  </Text>
                  <Icon
                    name="right"
                    type="AntDesign"
                    style={{
                      fontSize: 15,
                      color: 'white',
                      position: 'absolute',
                      paddingLeft: '80%',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAnnulerAdd()}
                  style={{
                    zIndex: 10,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#6D9FB2',
                    marginTop: 15,
                    height: 50,
                    width: '55%',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 17,
                      fontFamily: 'OpenSans-SemiBold',
                      width: '55%',
                    }}>
                    Annuler
                  </Text>
                  <Icon
                    name="right"
                    type="AntDesign"
                    style={{
                      fontSize: 15,
                      color: 'white',
                      position: 'absolute',
                      paddingLeft: '80%',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          width: '100%',
          backgroundColor: 'white',
          padding: orientation === 'PORTRAIT' ? '5%' : '2%',
          marginTop:
            orientation === 'PORTRAIT'
              ? Platform.OS === 'android'
                ? h === 640
                  ? '130%'
                  : h > 753 && h < 754
                  ? '150%'
                  : h > 771 && h < 772
                  ? '145%'
                  : h > 718 && h < 719
                  ? '140%'
                  : h === 816
                  ? '141%'
                  : h > 759 && h < 800
                  ? '143%'
                  : h > 748 && h < 749
                  ? '140%'
                  : h > 737 && h < 738
                  ? '140%'
                  : w === 384
                  ? '110%'
                  : w === 480
                  ? h > 1018 && h < 1019
                    ? '165%'
                    : h > 938 && h < 939
                    ? '150%'
                    : h > 805 && h < 806
                    ? '125%'
                    : w === 480
                    ? h === 1024
                      ? '165%'
                      : h === 912
                      ? '145%'
                      : h === 992
                      ? '160%'
                      : h === 1008
                      ? '160%'
                      : '155%'
                    : '135%'
                  : h === 1152
                  ? w === 540
                    ? '165%'
                    : '140%'
                  : h === 752
                  ? w === 392
                    ? '142%'
                    : '155%'
                  : w === 540
                  ? h === 1182
                    ? '170%'
                    : h === 1032
                    ? '146%'
                    : h === 1122
                    ? '160%'
                    : '126%'
                  : w === 270
                  ? '110%'
                  : h === 592
                  ? w === 360
                    ? '117%'
                    : '117%'
                  : h === 672
                  ? '136%'
                  : h === 692
                  ? '142%'
                  : h === 712
                  ? '146%'
                  : h > 701 && h < 702
                  ? '143%'
                  : h === 732
                  ? '150%'
                  : h > 830 && h < 831
                  ? '175%'
                  : '120%'
                : h === 667
                ? '133%'
                : h === 736
                ? '133%'
                : h === 912
                ? '190%'
                : h === 568
                ? '130%'
                : '166%'
              : Platform.OS === 'android'
              ? w > 753 && w < 754
                ? '31%'
                : h === 480
                ? w > 1018 && w < 1019
                  ? '29%'
                  : '32%'
                : w > 683 && w < 684
                ? '37%'
                : h > 411 && h < 412
                ? w > 748 && w < 749
                  ? '33%'
                  : w > 774 && w < 775
                  ? '33%'
                  : '32%'
                : h > 392 && h < 393
                ? w > 759 && w < 760
                  ? '32%'
                  : '33%'
                : w === 816
                ? '33%'
                : h === 432
                ? w > 1013 && w < 1014
                  ? '26%'
                  : w > 986 && w < 987
                  ? '26%'
                  : h === 432
                  ? w === 1072
                    ? '25%'
                    : w === 1040
                    ? '25%'
                    : w === 1056
                    ? '25%'
                    : '28%'
                  : '25%'
                : w === 1152
                ? '30%'
                : w === 592
                ? h === 384
                  ? '40%'
                  : '36%'
                : w === 752
                ? '28%'
                : h === 312
                ? w === 640
                  ? '27%'
                  : w === 800
                  ? '21%'
                  : h === 312
                  ? w === 780
                    ? '22%'
                    : w > 878 && w < 879
                    ? '18.5%'
                    : '24%'
                  : '23%'
                : w === 692
                ? '30%'
                : w === 960
                ? '33%'
                : h === 492
                ? w === 1080
                  ? '28%'
                  : w === 1170
                  ? '27%'
                  : '25%'
                : w === 800
                ? '25%'
                : '47%'
              : w === 667
              ? '35%'
              : w === 736
              ? '36%'
              : w === 568
              ? '34%'
              : '29%',
        }}>
        <TouchableOpacity
          onPress={() => props.handleNavigation(d.toString())}
          style={{
            backgroundColor: '#6D9FB2',
            width: orientation === 'PORTRAIT' ? '60%' : '33%',
            height: 40,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: w === 270 ? 13 : 17,
              fontFamily: 'OpenSans-SemiBold',
              width:
                orientation === 'PORTRAIT'
                  ? h === 568
                    ? '80%'
                    : '70%'
                  : '100%',
            }}>
            Mon coffre-fort
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
                  ? h === 640
                    ? 175
                    : h === 592
                    ? 170
                    : w === 270
                    ? 125
                    : w === 592
                    ? 170
                    : 180
                  : '85%',
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop:
            Platform.OS === 'ios'
              ? orientation === 'PORTRAIT'
                ? h === 667 || h === 736
                  ? '5%'
                  : h === 568
                  ? '5%'
                  : '10%'
                : '2%'
              : 15,
        }}></View>
    </KeyboardAvoidingView>
  );
});

export default Armes;
