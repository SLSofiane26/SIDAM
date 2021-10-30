import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {PureComponent} from 'react';
import {Icon} from 'native-base';
import axios from 'axios';
import {connect} from 'react-redux';
import {API_URL} from '@env';
import FactureBis from './FactureBis';
import * as ACTIONS from './ACTIONS';
import Cadre from '../assets/SVG/facture.png';
import RevoSWW from '../assets/1x/SVG/revoSW.png';
import PistCZZ from '../assets/1x/SVG/pistCZ.png';
import PistSWW from '../assets/1x/SVG/pistSW.png';
import CaraSWW from '../assets/1x/SVG/caraSW.png';
import CaraCZZ from '../assets/1x/SVG/caraCZ.png';
import FondB from '../assets/fond.jpg';

class Factures extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      facture: [],
      f: false,
      orientation: null,
      refresh: false,
    };
    this._handleR = this._handleR.bind(this);
    this.FetchArmes = this.FetchArmes.bind(this);
  }

  dde = false;

  w = Dimensions.get('window').width;
  h = Dimensions.get('window').height;

  //permet de récuper les certificat de l'utilisateur//
  FetchArmes = async () => {
    await axios({
      method: 'GET',
      baseURL: `${API_URL}/api/factures`,
      headers: {
        'x-auth-token': this.props.token,
      },
    }).then(res => {
      if (res.data.msg) {
        this.props.handleLogout();
      } else {
        this.setState(prevState => ({
          ...this.state,
          data: res.data.factures,
        }));
      }
    });
  };

  //action lors du raffraichissement//
  _handleR = () => {
    this.props.handleFacture(this.props.token);

    this.setState(prevState => ({
      ...this.state,
      refresh: true,
    }));

    setTimeout(() => {
      this.setState(prevState => ({
        ...this.state,
        refresh: false,
      }));
    }, 100);
  };

  componentDidMount = async () => {
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

    if (!this.ddd) {
      this.props.handleFacture(this.props.token);
      if (this.props.factures && !this.state.data) {
        this.setState(prevState => ({
          ...this.state,
          data: this.props.factures,
        }));
      }
    }
  };

  componentDidUpdate = async (prevState, prevProps) => {
    if (!this.dde) {
      if (this.state.data.length !== this.props.factures.length) {
        if (this.props.factures) {
          this.setState(prevState => ({
            ...this.state,
            data: this.props.factures,
          }));
        }
      }
      this.state.data.map((items, index) => {
        if (
          items._id !==
            this.props.factures.map((items, index) => {
              items._id;
            }) ||
          this.props.facture.length !== this.state.data.length
        ) {
          this.setState(prevState => ({
            ...this.state,
            data: this.props.factures,
          }));
        }
      });
    }

    Dimensions.addEventListener('change', ({window: {width, height}}) => {
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
  };

  componentWillUnmount = async () => {
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
        }}>
        <Image
          source={FondB}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />

        {this.state.data.length > 0 ? (
          <View
            style={{
              width: '100%',
              marginTop:
                this.state.orientation === 'PORTRAIT'
                  ? Platform.OS === 'android'
                    ? '25%'
                    : '30%'
                  : Platform.OS === 'android'
                  ? '8%'
                  : this.w === 568
                  ? '15%'
                  : '12%',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                zIndex: 1000,
                position: 'absolute',
                marginLeft: '2%',
                marginTop:
                  this.state.orientation === 'PORTRAIT'
                    ? Platform.OS === 'ios'
                      ? '8%'
                      : this.h > 830 && this.h < 831
                      ? '4%'
                      : '0%'
                    : Platform.OS === 'android'
                    ? '3%'
                    : '2%',
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{
                  zIndex: 10000,
                  width: this.state.orientation === 'PORTRAIT' ? '50%' : '20%',
                  height: 40,
                }}>
                <Icon
                  type="Entypo"
                  name="chevron-left"
                  style={{
                    position: 'absolute',
                    fontSize: 20,
                    color: '#636A28',
                    zIndex: 10000,
                    marginTop: 1,
                  }}
                />
                <Text
                  style={{
                    color: '#636A28',
                    fontSize: 16,
                    fontFamily: 'Poppins-Regular',
                    marginLeft:
                      this.state.orientation === 'PORTRAIT' ? '10%' : '15%',
                    zIndex: 1000,
                  }}>
                  Retour
                </Text>
              </TouchableOpacity>
            </View>
            <FactureBis
              handleFetch={() => this.props.handleFacture(this.props.token)}
              handleD={() => this.FetchArmes()}
              dataFacture={this.state.data}
              FetchFacture={() => this.FetchArmes()}
              dataB={this.ccc}
            />
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
                refreshing={this.state.refresh}
                onRefresh={this._handleR}
                colors={['#999D3B']}
                tintColor={['#999D3B']}
                title="Chargement"
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
                    : this.h === 480
                    ? '7%'
                    : '10%',
                height: this.h === 432 ? '25%' : 'auto',
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Accueil')}
                style={{
                  alignContent: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#6D9FB2',
                  width:
                    this.state.orientation === 'PORTRAIT'
                      ? '65%'
                      : this.w === 568
                      ? '50%'
                      : this.w > 771 && this.w < 772
                      ? '50%'
                      : this.w > 759 && this.w < 760
                      ? '45%'
                      : '40%',
                  height:
                    Platform.OS === 'android'
                      ? this.state.orientation === 'PORTRAIT'
                        ? 50
                        : this.h === 312
                        ? this.w === 640
                          ? 30
                          : 50
                        : this.w === 692
                        ? 50
                        : 60
                      : this.h === 736
                      ? '30%'
                      : this.w === 375
                      ? '32%'
                      : this.h === 568
                      ? '33%'
                      : this.w === 568
                      ? '35%'
                      : '26%',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: this.w === 270 ? 13 : this.w === 640 ? 13 : 17,
                    fontFamily: 'OpenSans-SemiBold',
                    width:
                      this.state.orientation === 'PORTRAIT'
                        ? this.h > 900
                          ? '60%'
                          : this.h === 736
                          ? '60%'
                          : '80%'
                        : this.w === 736
                        ? '90%'
                        : this.w === 375
                        ? '100%'
                        : this.w === 667
                        ? '100%'
                        : this.w > 771 && this.w < 772
                        ? '100%'
                        : this.w > 759 && this.w < 760
                        ? '100%'
                        : this.w > 748 && this.w < 749
                        ? '90%'
                        : '85%',
                  }}>
                  Aucun certificat de garantie
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
    factures: state.factures,
  };
};

let mapDispatchToProps = dispatch => {
  return {
    handleLogout: () => {
      dispatch(ACTIONS.Logout());
    },
    handleFacture: token => {
      dispatch(ACTIONS.Facture(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Factures);
