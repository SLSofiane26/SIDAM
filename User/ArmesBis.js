import React, {PureComponent} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  RefreshControl,
  ScrollView,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {API_URL} from '@env';
import {Icon} from 'native-base';
import axios from 'axios';
import Cadre from '../assets/SVG/1.png';
import CadreBis from '../assets/SVG/cadre.png';
import RevoSW from '../assets/3.png';
import PistCZ from '../assets/2.png';
import PistSW from '../assets/1.png';
import CaraSW from '../assets/4.png';
import CaraCZ from '../assets/5.png';
import FondB from '../assets/fond.jpg';
import CZ from '../assets/CZ.png';
import SW from '../assets/sw.png';
import RevoSWW from '../assets/1x/SVG/revoSW.png';
import PistCZZ from '../assets/1x/SVG/pistCZ.png';
import PistSWW from '../assets/1x/SVG/pistSW.png';
import CaraSWW from '../assets/1x/SVG/caraSW.png';
import CaraCZZ from '../assets/1x/SVG/caraCZ.png';
import * as ACTIONS from '../User/ACTIONS';

class ArmesBis extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      orientation: null,
      add: false,
      refreshState: false,
      refreshStateBis: false,
    };
    this.fetchArmes = this.fetchArmes.bind(this);
    this.handleAnnulez = this.handleAnnulez.bind(this);
    this.handleR = this.handleR.bind(this);
    this._refreshHandle = this._refreshHandle.bind(this);
  }

  ddd = false;
  dde = false;
  dda = false;

  w = Dimensions.get('window').width;
  h = Dimensions.get('window').height;

  //action lors du rafraichissement//
  handleR = () => {
    this.setState(prevState => ({
      ...this.state,
      refreshState: true,
    }));
    this.fetchArmes().then(() => {
      this.setState(prevState => ({
        ...this.state,
        refreshState: false,
      }));
    });
  };

  //action lors du rafraichissement//
  _refreshHandle = () => {
    this.setState(prevState => ({
      ...this.state,
      refreshStateBis: true,
    }));
    this.fetchArmes().then(() => {
      this.setState(prevState => ({
        ...this.state,
        refreshState: false,
      }));
    });
  };

  //permet d'annulez le transfert d'une arme//
  handleAnnulez = async data => {
    await axios({
      method: 'POST',
      url: `${API_URL}/api/armes/annulez/${data}`,
      headers: {
        'x-auth-token': this.props.token,
      },
    }).then(res => {
      if (res.data.msg === 'ok') {
        this.fetchArmes();
      } else {
        this.props.Logout();
      }
    });
  };

  //permet de récuprer les armes de l'utilisateur//
  fetchArmes = async () => {
    this.setState(prevState => ({
      ...this.state,
      add: null,
    }));

    await axios({
      method: 'GET',
      url: `${API_URL}/api/armes`,
      headers: {
        'x-auth-token': this.props.token,
      },
    }).then(res => {
      if (res.data.msg === 'No token acces') {
        this.props.Logout();
      } else {
        this.props.handleFacture(this.props.token);
        this.setState(prevState => ({
          ...this.state,
          data: res.data.armes,
        }));
      }
    });
  };

  componentDidMount = () => {
    if (this.state.data.length === 0) {
      this.fetchArmes();
    }

    if (!this.ddd) {
      if (this.w < this.h) {
        this.setState(prevState => ({
          ...this.state,
          orientation: 'PORTRAIT',
        }));
      } else {
        this.setState(prevState => ({
          ...this.state,
          orientation: 'LANDSCAPE',
        }));
      }
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    await Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        this.setState(prevState => ({
          ...this.state,
          orientation: 'PORTRAIT',
        }));
      } else {
        this.setState(prevState => ({
          ...this.state,
          orientation: 'LANDSCAPE',
        }));
      }
    });

    if (!this.ddd) {
      await axios({
        method: 'GET',
        url: `${API_URL}/api/armes`,
        headers: {
          'x-auth-token': this.props.token,
        },
      })
        .then(res => {
          if (res.data.msg === 'No token acces') {
            this.props.Logout();
          } else {
            let pour = this.state.data.filter(
              x => x._id === this.props.route.params.data,
            );

            let ffff = pour
              .map((items, index) => {
                return items.pourcentage;
              })
              .toString();

            let dd = res.data.armes.filter(
              x => x._id === this.props.route.params.data,
            );

            let fffff = dd
              .map((items, index) => {
                return items.pourcentage;
              })
              .toString();

            if (ffff !== fffff) {
              this.setState(prevState => ({
                ...this.state,
                data: res.data.armes,
              }));
            }
          }
        })
        .catch(err => {});
    }
    if (!this.dda) {
      await axios({
        method: 'GET',
        url: `${API_URL}/api/armes`,
        headers: {
          'x-auth-token': this.props.token,
        },
      })
        .then(res => {
          if (res.data.msg === 'No token acces') {
            this.props.Logout();
          } else {
            let c = this.state.data.filter(
              x => x._id === this.props.route.params.delete,
            );

            let ff = c
              .map((items, index) => {
                return items.cedee;
              })
              .toString();

            let d = res.data.armes.filter(
              x => x._id === this.props.route.params.delete,
            );

            let fff = d
              .map((items, index) => {
                return items.cedee;
              })
              .toString();

            if (fff != ff) {
              this.setState(prevState => ({
                ...this.state,
                data: res.data.armes,
              }));
            }
          }
        })
        .catch(err => {});
    }

    if (this.state.data.length !== prevState.data.length) {
      await axios({
        method: 'GET',
        url: `${API_URL}/api/armes`,
        headers: {
          'x-auth-token': this.props.token,
        },
      })
        .then(res => {
          if (res.data.msg === 'No token acces') {
            this.props.Logout();
          } else {
            if (this.state.data.length !== res.data.armes.length) {
              this.setState(prevState => ({
                ...this.state,
                data: res.data.armes,
              }));
            }
          }
        })
        .catch(err => {});
    }
  };

  componentWillUnmount = async () => {
    this.ddd = true;
    this.dde = true;
    this.dda = true;
    Dimensions.removeEventListener('change');
  };

  render() {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        {!this.state.data.length > 0 && (
          <Image
            source={FondB}
            style={{
              width: '100%',
              position: 'absolute',
              height: '100%',
            }}
          />
        )}
        {this.state.data.length > 0 ? (
          <View
            style={{
              width: '100%',
              marginTop:
                this.state.orientation === 'PORTRAIT'
                  ? Platform.OS === 'android'
                    ? this.h === 1152
                      ? '25%'
                      : this.h > 1018 && this.h < 1019
                      ? '25%'
                      : this.h === 1024
                      ? '25%'
                      : this.h === 1182
                      ? '25%'
                      : this.h === 732
                      ? '25%'
                      : this.h === 1008
                      ? '25%'
                      : this.h > 830 && this.h < 831
                      ? '29%'
                      : '22%'
                    : this.w === 414
                    ? this.h === 896
                      ? '34%'
                      : '32%'
                    : '34%'
                  : Platform.OS === 'android'
                  ? this.w > 683 && this.w < 684
                    ? '15%'
                    : '10%'
                  : this.w === 667
                  ? '15%'
                  : this.w === 736
                  ? '15%'
                  : this.w === 568
                  ? '15%'
                  : '10%',
            }}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshState}
                  onRefresh={this.handleR}
                  colors={['#999D3B']}
                  tintColor={['#999D3B']}
                  title="Chargement"
                />
              }
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{height: '100%'}}
              contentContainerStyle={{
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-start',
                  marginTop:
                    this.h === 568
                      ? '4%'
                      : this.w > 392 && this.w < 393
                      ? 20
                      : this.h === 752
                      ? 30
                      : 0,
                }}
                onPress={() => this.props.navigation.goBack()}>
                <View>
                  <Icon
                    type="Entypo"
                    name="chevron-left"
                    style={{
                      position: 'absolute',
                      fontSize: 20,
                      marginLeft: '5%',
                      color: '#636A28',
                      marginTop: '1%',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: this.w === 270 ? 14 : 16,
                      fontFamily: 'Poppins-Regular',
                      marginLeft:
                        this.state.orientation === 'PORTRAIT'
                          ? this.w === 270
                            ? '25%'
                            : '20%'
                          : '18%',
                      color: '#636A28',
                    }}>
                    Retour
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  position: 'absolute',
                  zIndex: 1000,
                  marginTop:
                    this.state.orientation === 'PORTRAIT'
                      ? Platform.OS === 'android'
                        ? this.h === 640
                          ? this.w === 360
                            ? '36%'
                            : '31%'
                          : this.h > 717 && this.h < 775
                          ? this.h > 718 && this.h < 719
                            ? this.w > 392 && this.w < 393
                              ? '38%'
                              : '40%'
                            : this.h > 748 && this.h < 749
                            ? '33%'
                            : this.h === 752
                            ? this.w === 360
                              ? '43%'
                              : this.w === 392
                              ? '40%'
                              : '36%'
                            : this.h > 753 && this.h < 754
                            ? '33%'
                            : this.h > 771 && this.h < 772
                            ? '32%'
                            : this.h > 737 && this.h < 738
                            ? '33%'
                            : this.h > 774 && this.h < 775
                            ? '31%'
                            : this.w > 392 && this.w < 393
                            ? '38%'
                            : this.h === 732
                            ? '35%'
                            : '40%'
                          : this.h === 816
                          ? this.w === 432
                            ? '30%'
                            : '38%'
                          : this.h === 592
                          ? this.w === 384
                            ? '43%'
                            : this.w === 360
                            ? '35%'
                            : '45%'
                          : this.w === 480
                          ? this.h > 1018 && this.h < 1019
                            ? '27%'
                            : this.h > 938 && this.h < 939
                            ? '27%'
                            : this.h > 805 && this.h < 806
                            ? '35%'
                            : this.w === 480
                            ? '26%'
                            : '31%'
                          : this.h === 1152
                          ? this.w === 540
                            ? '24%'
                            : '37%'
                          : this.w === 270
                          ? this.h === 432
                            ? '40%'
                            : '31%'
                          : this.h > 683 && this.h < 684
                          ? '31%'
                          : this.h === 672
                          ? this.w === 360
                            ? '36%'
                            : '45%'
                          : this.h === 692
                          ? this.w === 360
                            ? '36%'
                            : '45%'
                          : this.h === 712
                          ? '35%'
                          : this.w === 540
                          ? this.h === 1122
                            ? '24%'
                            : this.h === 912
                            ? '24%'
                            : '25%'
                          : this.h > 701 && this.h < 702
                          ? '35%'
                          : this.h > 830 && this.h < 831
                          ? '35%'
                          : '29%'
                        : this.h === 667
                        ? '43%'
                        : this.h === 736
                        ? '38%'
                        : this.h === 568
                        ? '55%'
                        : this.h > 900
                        ? '37%'
                        : this.h === 896
                        ? '40%'
                        : '42%'
                      : Platform.OS === 'android'
                      ? this.w > 753 && this.w < 754
                        ? this.h > 392 && this.h < 393
                          ? '14%'
                          : '22%'
                        : this.w > 771 && this.w < 772
                        ? this.h > 411 && this.h < 412
                          ? '14%'
                          : '22%'
                        : this.h === 480
                        ? this.w > 1018 && this.w < 1019
                          ? '12%'
                          : '11%'
                        : this.w > 683 && this.w < 684
                        ? this.h > 411 && this.h < 412
                          ? '16%'
                          : '15%'
                        : this.h > 392 && this.h < 393
                        ? '15%'
                        : this.w === 816
                        ? '11%'
                        : this.w > 748 && this.w < 749
                        ? '15%'
                        : this.w > 774 && this.w < 775
                        ? '14%'
                        : this.w > 986 && this.w < 987
                        ? '10%'
                        : this.w === 1152
                        ? '10%'
                        : this.w === 592
                        ? '20%'
                        : this.w === 752
                        ? '15%'
                        : this.h === 312
                        ? this.w === 640
                          ? '18%'
                          : this.w === 800
                          ? '14%'
                          : this.w === 780
                          ? '14%'
                          : this.w > 878 && this.w < 879
                          ? '13%'
                          : '15%'
                        : this.w === 692
                        ? '16%'
                        : this.w > 1013 && this.w < 1014
                        ? '8%'
                        : this.w === 960
                        ? this.h === 432
                          ? '8%'
                          : this.h === 492
                          ? '11%'
                          : '12%'
                        : this.w === 1230
                        ? '9%'
                        : this.w === 1080
                        ? '10%'
                        : this.w === 1170
                        ? '9%'
                        : this.w === 1200
                        ? '9%'
                        : this.w === 800
                        ? '13%'
                        : '7%'
                      : this.w === 667
                      ? '22%'
                      : this.w === 736
                      ? this.h === 414
                        ? '20%'
                        : '24%'
                      : this.w === 568
                      ? '27%'
                      : this.w > 900
                      ? '15%'
                      : this.w === 896
                      ? '16%'
                      : '17%',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'OpenSans-ExtraBold',
                    fontSize:
                      this.state.orientation === 'PORTRAIT'
                        ? this.h === 568
                          ? this.w === 320
                            ? 50
                            : 80
                          : this.w === 375
                          ? 50
                          : this.w === 270
                          ? 30
                          : 50
                        : this.w === 568
                        ? 60
                        : this.w === 816
                        ? 55
                        : this.w > 986 && this.w < 987
                        ? 50
                        : this.w === 592
                        ? 60
                        : this.w > 1018 && this.w < 1019
                        ? 55
                        : 70,
                    color: '#636A28',
                    textAlign: 'center',
                  }}>
                  {this.state.data.length}{' '}
                  <Text
                    style={{
                      fontSize: this.w === 270 ? 30 : this.w === 896 ? 60 : 50,
                      textTransform: 'uppercase',
                    }}>
                    {this.state.data.length > 1 ? 'Armes' : 'Arme'}
                  </Text>
                </Text>
              </View>
              <View style={{alignContent: 'center', alignItems: 'center'}}>
                {this.h === 432 ? (
                  <Image source={CadreBis} style={{width: 150, height: 150}} />
                ) : Platform.OS === 'android' ? (
                  <Image
                    source={CadreBis}
                    style={{
                      width: 190,
                      height: 190,
                    }}
                  />
                ) : (
                  <Image source={CadreBis} />
                )}
              </View>
              {this.state.data.map((items, index) => {
                let dateGarantie = new Date(
                  Number(items.garantie) + Number(items.extension * 7889400000),
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
                let date = `${j}-${ff}-${an}`;
                let dateBis = date.toString();

                let NumberExpp =
                  Number(items.expiration) +
                  Number(items.extension * 7889400000);
                let dateExpM = new Date(Number(items.limitDate)).getMonth() + 1;
                let dateExpJ = new Date(Number(items.limitDate)).getDate();
                let dateExpA = new Date(Number(items.limitDate)).getFullYear();

                if (dateExpM < 10) {
                  dateExpM = '0' + dateExpM;
                }

                if (dateExpJ < 10) {
                  dateExpJ = '0' + dateExpJ;
                }

                let dateExp = `${dateExpJ}/${dateExpM}/${dateExpA}`;

                dateExp;

                let dadaB = new Date(NumberExpp).getTime();
                let dada = new Date().getTime();

                if (fff < 10) {
                  fff = '0' + fff;
                }

                let jjj = new Date(dateAchat).getDate();

                if (jjj < 10) {
                  jjj = '0' + jjj;
                }

                let dateAchat = new Date(items.dateAchat).toDateString();
                let mmm = new Date(dateAchat).getMonth();
                let fff = mmm + 1;
                let pourcentageM = 500 * (items.pourcentage / 100);
                let ann = 500 - pourcentageM;
                let c = ann.toFixed(0);
                return (
                  <View
                    key={index}
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      marginTop:
                        this.state.orientation === 'PORTRAIT'
                          ? '10%'
                          : this.w === 816
                          ? '5%'
                          : '10%',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('ArmesBis', {
                            arme: items,
                          })
                        }>
                        {items.type === 'REVOLVERSMITHWESSON' &&
                          (this.h === 432 ? (
                            <Image
                              source={RevoSW}
                              style={{
                                width:
                                  this.state.orientation === 'PORTRAIT'
                                    ? 60
                                    : 80,
                                height:
                                  this.state.orientation === 'PORTRAIT'
                                    ? 60
                                    : 80,
                              }}
                            />
                          ) : (
                            <Image source={RevoSW} />
                          ))}
                        {items.type === 'PISTOLETSMITHWESSON' &&
                          (this.h === 432 ? (
                            <Image
                              source={PistSW}
                              style={{
                                width:
                                  this.state.orientation === 'PORTRAIT'
                                    ? 60
                                    : 80,
                                height:
                                  this.state.orientation === 'PORTRAIT'
                                    ? 60
                                    : 80,
                              }}
                            />
                          ) : (
                            <Image source={PistSW} />
                          ))}
                        {items.type === 'CARABINESMITHWESSON' &&
                          (this.h === 432 ? (
                            <Image
                              source={CaraSW}
                              style={{
                                width:
                                  this.state.orientation === 'PORTRAIT'
                                    ? 60
                                    : 80,
                                height:
                                  this.state.orientation === 'PORTRAIT'
                                    ? 60
                                    : 80,
                              }}
                            />
                          ) : (
                            <Image source={CaraSW} />
                          ))}
                        {items.type === 'PISTOLETCZ' &&
                          (this.h === 432 ? (
                            <Image
                              source={PistCZ}
                              style={{
                                width:
                                  this.state.orientation === 'PORTRAIT'
                                    ? 60
                                    : 80,
                                height:
                                  this.state.orientation === 'PORTRAIT'
                                    ? 60
                                    : 80,
                              }}
                            />
                          ) : (
                            <Image source={PistCZ} />
                          ))}
                        {items.type === 'CARABINECZ' &&
                          (this.h === 432 ? (
                            <Image
                              source={CaraCZ}
                              style={{
                                width:
                                  this.state.orientation === 'PORTRAIT'
                                    ? 60
                                    : 80,
                                height:
                                  this.state.orientation === 'PORTRAIT'
                                    ? 60
                                    : 80,
                              }}
                            />
                          ) : (
                            <Image source={CaraCZ} />
                          ))}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('ArmesBis', {
                            arme: items,
                          })
                        }
                        style={{marginTop: '2%', marginLeft: '2%'}}>
                        {items.marques === 'SMITHWESSON' &&
                          (this.h === 432 ? (
                            <Image
                              source={SW}
                              style={{width: 125, height: 50}}
                            />
                          ) : (
                            <Image source={SW} />
                          ))}
                        {items.marques === 'CZ' &&
                          (this.h === 432 ? (
                            <Image
                              source={CZ}
                              style={{height: 51, width: 129}}
                            />
                          ) : (
                            <Image source={CZ} />
                          ))}
                      </TouchableOpacity>
                    </View>
                    <View style={{width: '90%'}}>
                      <Text
                        style={{
                          marginTop: this.w === 270 ? 10 : 20,
                          textAlign: 'left',
                          fontSize: this.w === 270 ? 13 : 16,
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
                          {items.modele}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          marginTop: 3,
                          textAlign: 'left',
                          fontSize: this.w === 270 ? 13 : 16,
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
                          {items.calibre}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          marginTop: 15,
                          textAlign: 'left',
                          fontSize: this.w === 270 ? 13 : 16,
                          color: 'black',
                          marginTop: 3,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        N° de série :{' '}
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 18,
                            fontFamily: 'Poppins-Bold',
                          }}>
                          {items.serie}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          marginTop: 3,
                          textAlign: 'left',
                          fontSize: this.w === 270 ? 13 : 16,
                          color: 'black',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Date de garantie cumulée :{' '}
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 18,
                            fontFamily: 'Poppins-Bold',
                          }}>
                          {dateBis}
                        </Text>
                      </Text>
                      {Number(dadaB) > Number(dada) ? (
                        <View
                          style={{
                            width: Platform.OS === 'android' ? '100%' : '95%',
                          }}>
                          <Text
                            style={{
                              fontSize:
                                this.w === 270
                                  ? 13
                                  : Platform.OS === 'android'
                                  ? this.h === 692
                                    ? 15
                                    : 16
                                  : 16,
                              color: 'black',
                              marginTop: 13,
                              fontFamily: 'Poppins-Regular',
                            }}>
                            Enregistrer {c} munitions avant le {dateExp} pour
                            bénéficier de{' '}
                            <Text style={{fontFamily: 'Poppins-Bold'}}>
                              3 mois d'extension de garantie supplémentaire.
                            </Text>
                          </Text>
                        </View>
                      ) : (
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'red',
                            marginTop: this.w === 360 ? 5 : 13,
                            fontFamily: 'Poppins-Regular',
                            textAlign: 'center',
                          }}>
                          Délais d'enregistrement de munition(s) dépassé
                        </Text>
                      )}
                    </View>

                    {items.cedee && (
                      <View>
                        <View>
                          <Text
                            style={{
                              color: 'red',
                              fontSize: 16,
                              fontFamily: 'Poppins-Regular',
                              marginTop: 15,
                              textAlign: 'center',
                            }}>
                            En cours de validation pour transfert
                          </Text>
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            width: this.w,
                          }}>
                          <TouchableOpacity
                            onPress={() => this.handleAnnulez(items._id)}
                            style={{
                              backgroundColor: '#ff4136',
                              width:
                                this.state.orientation === 'PORTRAIT'
                                  ? this.h === 667
                                    ? '62%'
                                    : '55%'
                                  : '33%',
                              height: 40,
                              justifyContent: 'center',
                              alignContent: 'center',
                              alignItems: 'center',
                              marginTop: 10,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: 'white',
                                fontSize: 17,
                                fontFamily: 'OpenSans-SemiBold',
                                width: '100%',
                              }}>
                              Annuler le transfert
                            </Text>
                            <Icon
                              name="right"
                              type="AntDesign"
                              style={{
                                fontSize: 15,
                                color: 'white',
                                position: 'absolute',
                                paddingLeft:
                                  this.state.orientation === 'PORTRAIT'
                                    ? this.h === 640
                                      ? '90%'
                                      : this.h === 592
                                      ? '90%'
                                      : '87%'
                                    : '85%',
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    <View
                      style={{
                        width: this.w,
                        alignContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('ArmesBis', {
                            arme: items,
                          })
                        }
                        style={{
                          backgroundColor: '#6D9FB2',
                          marginTop: '5%',
                          width:
                            this.state.orientation === 'PORTRAIT'
                              ? this.h === 667
                                ? this.w === 375
                                  ? '58%'
                                  : '62%'
                                : this.w === 270
                                ? '60%'
                                : this.h === 568
                                ? '60%'
                                : '55%'
                              : Platform.OS === 'android'
                              ? '36%'
                              : '33%',
                          height: 40,
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: 'white',
                            fontSize:
                              this.w === 270 ? 13 : this.w === 568 ? 14 : 17,
                            fontFamily: 'OpenSans-SemiBold',
                            width: '100%',
                          }}>
                          Accéder à mon arme
                        </Text>
                        <Icon
                          name="right"
                          type="AntDesign"
                          style={{
                            fontSize: 15,
                            color: 'white',
                            position: 'absolute',
                            paddingTop: 2,
                            paddingLeft:
                              this.h === 640
                                ? '92%'
                                : this.h === 592
                                ? '92%'
                                : this.h === 568
                                ? '93%'
                                : this.h === 672
                                ? '91%'
                                : this.h === 692
                                ? '92%'
                                : this.h > 701 && this.h < 702
                                ? '90%'
                                : '90%',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: Dimensions.get('screen').width,
                        borderColor: 'black',
                        borderWidth: 0.5,
                        marginTop: '6%',
                      }}></View>
                  </View>
                );
              })}
              <View
                style={{
                  marginTop:
                    this.state.orientation === 'PORTRAIT'
                      ? Platform.OS === 'android'
                        ? this.h > 850
                          ? '25%'
                          : '20%'
                        : '30%'
                      : '15%',
                }}></View>
            </ScrollView>
            <View
              style={{
                width: Dimensions.get('window').width,
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'flex-end',
                alignContent: 'center',
                display: 'flex',
                zIndex: 1000,
                position: 'absolute',
                marginTop:
                  Platform.OS === 'android'
                    ? this.state.orientation === 'PORTRAIT'
                      ? this.w > 392 && this.w < 393
                        ? this.h > 718 && this.h < 719
                          ? '145%'
                          : this.h > 759 && this.h < 760
                          ? '150%'
                          : this.h > 737 && this.h < 738
                          ? '145%'
                          : '155%'
                        : this.w > 411 && this.w < 412
                        ? this.h > 748 && this.h < 750
                          ? '145%'
                          : this.h > 774 && this.h < 775
                          ? '145%'
                          : this.h > 683 && this.h < 684
                          ? '124%'
                          : '150%'
                        : this.h === 816
                        ? '147%'
                        : this.h === 592
                        ? this.w === 384
                          ? '110%'
                          : this.w === 360
                          ? this.h === 592
                            ? '120%'
                            : '140%'
                          : '120%'
                        : this.w === 480
                        ? this.h > 1018 && this.h < 1019
                          ? '168%'
                          : this.h > 938 && this.h < 939
                          ? '155%'
                          : this.h > 805 && this.h < 806
                          ? '129%'
                          : this.w === 480
                          ? this.h > 981 && this.h < 982
                            ? '165%'
                            : this.h === 1024
                            ? '171%'
                            : this.h === 912
                            ? '151%'
                            : this.h === 992
                            ? '166%'
                            : this.h === 1008
                            ? '166%'
                            : '160%'
                          : '135%'
                        : this.h === 1152
                        ? this.w === 540
                          ? '173%'
                          : '170%'
                        : this.h === 752
                        ? this.w === 392
                          ? '149%'
                          : '164%'
                        : this.h === 912
                        ? this.w === 540
                          ? '131.4%'
                          : '130%'
                        : this.w === 270
                        ? '108%'
                        : this.h === 672
                        ? '142%'
                        : this.w === 360
                        ? this.h === 692
                          ? '147%'
                          : this.h === 712
                          ? '153%'
                          : this.h > 701 && this.h < 702
                          ? '150%'
                          : this.h === 732
                          ? '155%'
                          : this.h > 830 && this.h < 831
                          ? '179%'
                          : '133%'
                        : this.h === 1182
                        ? '181%'
                        : this.h === 1032
                        ? '153%'
                        : this.h === 1122
                        ? '168%'
                        : '127%'
                      : this.w > 753 && this.w < 754
                      ? '30%'
                      : this.w > 771 && this.w < 772
                      ? '32%'
                      : this.w > 718 && this.w < 719
                      ? '33%'
                      : this.h > 392 && this.h < 393
                      ? this.w > 737 && this.w < 738
                        ? '33%'
                        : '31%'
                      : this.h === 480
                      ? this.w > 1018 && this.w < 1019
                        ? '29%'
                        : '32%'
                      : this.w === 816
                      ? '33%'
                      : this.w > 748 && this.w < 749
                      ? '34%'
                      : this.w > 774 && this.w < 775
                      ? '33%'
                      : this.h === 432
                      ? this.w > 986 && this.w < 987
                        ? '25.5%'
                        : this.w > 1013 && this.w < 1014
                        ? '25%'
                        : this.w > 1029 && this.w < 1030
                        ? '24%'
                        : this.h === 432
                        ? this.w === 1072
                          ? '23%'
                          : this.w === 1040
                          ? '24%'
                          : this.w === 1056
                          ? '23%'
                          : '27%'
                        : '23%'
                      : this.w === 1152
                      ? '30%'
                      : this.h === 384
                      ? '41%'
                      : this.w === 752
                      ? '27%'
                      : this.h === 312
                      ? this.w === 640
                        ? '26%'
                        : this.w === 800
                        ? '19%'
                        : this.w === 720
                        ? '22%'
                        : this.w === 780
                        ? '20%'
                        : this.w > 878 && this.w < 879
                        ? '16%'
                        : '21%'
                      : this.w === 692
                      ? '30%'
                      : this.w > 683 && this.w < 684
                      ? '33%'
                      : this.w === 960
                      ? '33%'
                      : this.h === 492
                      ? this.w === 1230
                        ? '23%'
                        : this.w === 1080
                        ? '28%'
                        : this.w === 1170
                        ? '25%'
                        : '24%'
                      : this.w === 800
                      ? '23%'
                      : '38%'
                    : this.state.orientation === 'PORTRAIT'
                    ? this.h === 667
                      ? '126%'
                      : this.h === 736
                      ? '130%'
                      : this.h === 568
                      ? '122%'
                      : this.h === 812
                      ? '165%'
                      : '166%'
                    : this.w === 667
                    ? '32%'
                    : this.w === 736
                    ? '32%'
                    : this.w === 568
                    ? '30%'
                    : '29%',
              }}>
              <View
                style={{
                  width: '100%',
                  alignContent: 'center',
                  alignItems: 'center',
                  padding: Platform.OS === 'android' ? 10 : 15,
                  backgroundColor: 'white',
                  zIndex: 100000,
                }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('AddBis')}
                  style={{
                    alignContent: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#6D9FB2',
                    width:
                      this.state.orientation === 'PORTRAIT'
                        ? this.w === 270
                          ? '65%'
                          : this.h == 568
                          ? '65%'
                          : '60%'
                        : Platform.OS === 'ios'
                        ? '34%'
                        : '38%',
                    height: 40,
                    display: 'flex',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: this.w === 270 ? 13 : 17,
                      fontFamily: 'OpenSans-SemiBold',
                      width: '100%',
                    }}>
                    Ajouter une arme
                  </Text>

                  <Icon
                    name="right"
                    type="AntDesign"
                    style={{
                      fontSize: 15,
                      color: 'white',
                      position: 'absolute',
                      paddingLeft: '90%',
                      paddingTop: '1%',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{
              marginTop:
                Platform.OS === 'android'
                  ? this.state.orientation === 'PORTRAIT'
                    ? this.w === 270
                      ? '15%'
                      : this.w === 384
                      ? '5%'
                      : this.h === 672
                      ? '15%'
                      : '10%'
                    : '0%'
                  : this.state.orientation === 'PORTRAIT'
                  ? '30%'
                  : '10%',
            }}
            contentContainerStyle={{
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              flex: this.state.orientation === 'PORTRAIT' ? 1 : 0,
            }}
            refreshControl={
              <RefreshControl
                colors={['#999D3B']}
                tintColor={['#999D3B']}
                title="Chargement"
                refreshing={this.state.refreshStateBis}
                onRefresh={this._refreshHandle}
              />
            }>
            <View
              style={{
                marginTop:
                  this.state.orientation === 'PORTRAIT'
                    ? Platform.OS === 'android'
                      ? this.h === 592
                        ? '13%'
                        : this.h === 432
                        ? this.w === 270
                          ? '15%'
                          : '20%'
                        : this.h === 640
                        ? '30%'
                        : '20%'
                      : this.h === 736
                      ? '0%'
                      : this.h === 667
                      ? '0%'
                      : this.h === 568
                      ? '15%'
                      : 0
                    : Platform.OS === 'android'
                    ? this.h === 432
                      ? '10%'
                      : '10%'
                    : '10%',
                position: 'relative',
                height: this.h === 592 ? '35%' : 'auto',
              }}>
              {this.h === 432 ? (
                <Image
                  source={Cadre}
                  style={{
                    height: this.w === 270 ? 130 : 150,
                    width: this.w === 270 ? 130 : 150,
                  }}
                />
              ) : (
                <Image
                  source={Cadre}
                  style={{
                    height:
                      this.h === 912
                        ? Platform.OS === 'android'
                          ? 200
                          : 300
                        : this.w === 640
                        ? 100
                        : this.h === 568
                        ? 170
                        : this.h === 592
                        ? 170
                        : 200,
                    width:
                      this.h === 912
                        ? Platform.OS === 'android'
                          ? 200
                          : 300
                        : this.w === 640
                        ? 100
                        : this.h === 568
                        ? 170
                        : this.h === 592
                        ? 170
                        : 200,
                  }}
                />
              )}
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                width:
                  this.state.orientation === 'PORTRAIT'
                    ? this.h === 568
                      ? this.w
                      : this.h === 592
                      ? this.w / 1.1
                      : this.h === 912
                      ? this.w / 1.5
                      : this.h === 752
                      ? this.w / 1.1
                      : this.h === 432
                      ? this.w
                      : this.h === 672
                      ? this.w / 1.1
                      : this.h === 640
                      ? this.w / 1.1
                      : this.h === 692
                      ? this.w / 1.1
                      : this.w === 540
                      ? this.w / 1.5
                      : this.h === 712
                      ? this.w / 1.1
                      : this.w / 1.2
                    : this.w === 568
                    ? this.w / 1.5
                    : this.h === 360
                    ? this.w / 1.1
                    : this.h === 384
                    ? this.w / 1.05
                    : this.w === 640
                    ? this.w / 1.1
                    : this.w === 736
                    ? this.w / 1.1
                    : this.w === 667
                    ? this.w / 1
                    : this.w / 1.2,
                flexWrap:
                  this.state.orientation === 'PORTRAIT'
                    ? 'wrap'
                    : this.w === 568
                    ? 'wrap'
                    : 'nowrap',
                marginTop:
                  this.h === 568
                    ? '5%'
                    : this.h === 432
                    ? '5%'
                    : this.h === 592
                    ? '15%'
                    : Platform.OS === 'ios'
                    ? '15%'
                    : this.w === 640
                    ? this.state.orientation === 'PORTRAIT'
                      ? '30%'
                      : '5%'
                    : '10%',
                height: this.h === 592 ? '5%' : '10%',
              }}>
              <Image
                source={PistSWW}
                style={{
                  width:
                    Platform.OS === 'ios'
                      ? this.h === 568
                        ? 80
                        : 96
                      : this.w === 640
                      ? 50
                      : 80,
                  height:
                    Platform.OS === 'ios'
                      ? this.h === 568
                        ? 55
                        : 70
                      : this.w === 640
                      ? 36
                      : 60,
                }}
              />
              <Image
                source={PistCZZ}
                style={{
                  width:
                    Platform.OS === 'ios'
                      ? this.h > 900
                        ? 100
                        : this.h === 568
                        ? 70
                        : 90
                      : this.w === 640
                      ? 50
                      : 80,
                  height:
                    Platform.OS === 'ios'
                      ? this.h === 568
                        ? 55
                        : 70
                      : this.w === 640
                      ? 36
                      : 60,
                }}
              />
              <Image
                source={RevoSWW}
                style={{
                  width:
                    Platform.OS === 'ios'
                      ? this.h === 568
                        ? 100
                        : 120
                      : this.w === 640
                      ? 75
                      : this.h === 592
                      ? 100
                      : 110,
                  height:
                    Platform.OS === 'ios'
                      ? this.h === 568
                        ? 50
                        : 65
                      : this.w === 640
                      ? 36
                      : this.h === 592
                      ? 55
                      : 60,
                }}
              />
              {this.h === 432 ? (
                <Image
                  source={CaraCZZ}
                  style={{
                    width: this.state.orientation === 'PORTRAIT' ? 130 : 150,
                    height: this.state.orientation === 'PORTRAIT' ? 45 : 55,
                    marginTop:
                      this.w === 816
                        ? '1%'
                        : this.state.orientation === 'PORTRAIT'
                        ? '5%'
                        : '0%',
                  }}
                />
              ) : (
                <Image
                  source={CaraCZZ}
                  style={{
                    width:
                      Platform.OS === 'ios'
                        ? this.h > 900
                          ? 170
                          : this.h === 812
                          ? 150
                          : this.h === 568
                          ? 140
                          : 160
                        : this.w === 640
                        ? 100
                        : this.h === 592
                        ? 140
                        : 135,
                    height:
                      Platform.OS === 'ios'
                        ? this.h === 812
                          ? 55
                          : this.h === 568
                          ? 50
                          : 60
                        : this.w === 640
                        ? 36
                        : 50,
                  }}
                />
              )}
              {this.h === 432 ? (
                <Image
                  source={CaraSWW}
                  style={{
                    width: this.state.orientation === 'PORTRAIT' ? 130 : 160,
                    height: this.state.orientation === 'PORTRAIT' ? 40 : 50,
                    marginTop:
                      this.w === 816
                        ? '1%'
                        : this.state.orientation === 'PORTRAIT'
                        ? '5%'
                        : '0%',
                  }}
                />
              ) : (
                <Image
                  source={CaraSWW}
                  style={{
                    width:
                      Platform.OS === 'ios'
                        ? this.h > 900
                          ? 180
                          : this.h === 667
                          ? 150
                          : this.h === 568
                          ? 150
                          : 160
                        : this.w === 640
                        ? 115
                        : this.h === 592
                        ? 150
                        : 160,
                    height:
                      Platform.OS === 'ios'
                        ? this.h === 568
                          ? 50
                          : 60
                        : this.w === 640
                        ? 36
                        : 55,
                  }}
                />
              )}
            </View>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                display: 'flex',
                marginTop:
                  this.w === 640
                    ? '4%'
                    : Platform.OS === 'ios'
                    ? this.h === 736
                      ? '10%'
                      : this.h === 667
                      ? '10%'
                      : this.h === 568
                      ? '15%'
                      : this.w === 568
                      ? '10%'
                      : '0%'
                    : this.state.orientation === 'PORTRAIT'
                    ? '30%'
                    : this.h === 432
                    ? '3%'
                    : this.h === 312
                    ? '10%'
                    : this.w === 692
                    ? '10%'
                    : this.h === 480
                    ? '7%'
                    : '10%',
                height: this.h === 432 ? '25%' : 'auto',
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AddBis')}
                style={{
                  alignContent: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#6D9FB2',
                  width:
                    this.state.orientation === 'PORTRAIT'
                      ? '65%'
                      : this.w === 568
                      ? '50%'
                      : '40%',
                  height:
                    Platform.OS === 'android'
                      ? this.state.orientation === 'PORTRAIT'
                        ? 45
                        : 30
                      : '26%',
                  display: 'flex',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: this.w === 270 ? 13 : this.w === 640 ? 13 : 17,
                    fontFamily: 'OpenSans-SemiBold',
                  }}>
                  Ajouter une arme
                </Text>
                <Icon
                  name="right"
                  type="AntDesign"
                  style={{
                    fontSize: 15,
                    color: 'white',
                    position: 'absolute',
                    paddingLeft: '90%',
                    paddingTop: '1%',
                  }}
                />
              </TouchableOpacity>
            </View>
            {this.state.orientation === 'LANDSCAPE' &&
              Platform.OS === 'android' && (
                <View style={{marginTop: '4%'}}></View>
              )}
          </ScrollView>
        )}
      </View>
    );
  }
}

let mapStateToProps = state => {
  return {
    token: state.token,
  };
};

let mapDispatchToProps = dispatch => {
  return {
    Logout: () => {
      dispatch(ACTIONS.Logout());
    },
    handleFacture: () => {
      dispatch(ACTIONS.Facture());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArmesBis);
