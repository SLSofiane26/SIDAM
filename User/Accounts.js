import React, {PureComponent} from 'react';
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import {API_URL} from '@env';
import Coffre from '../assets/coffre.png';
import Facture from '../assets/facture.png';
import Compte from '../assets/compte.png';
import Contact from '../assets/contact.png';
import FondB from '../assets/fond.jpg';
import * as ACTIONS from './ACTIONS';

export class Accounts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      orientation: null,
      email: null,
    };
  }

  w = Dimensions.get('window').width;

  h = Dimensions.get('window').height;

  cc = false;

  //permet de récupérer les informations de l'utilisateur//
  FetchUserBisBis = async () => {
    await axios({
      method: 'GET',
      url: `${API_URL}/api/user`,
      headers: {
        'x-auth-token': this.props.token,
      },
    }).then(res => {
      if (res.data.msg) {
        this.props.Logout();
      } else {
        this.props.UserHandleName(res.data.prenom, res.data.nom);
        this.setState(prevState => ({
          ...this.state,
          data: res.data,
        }));
      }
    });
  };

  //permet de récupérer les informations de l'utilisateur//
  FetchUserBis = async () => {
    await axios({
      method: 'GET',
      url: `${API_URL}/api/user`,
      headers: {
        'x-auth-token': this.props.token,
      },
    }).then(res => {
      if (res.data.msg) {
        this.props.Logout();
      } else {
        if (
          res.data.prenom !== this.state.data.prenom ||
          res.data.nom !== this.state.data.nom
        ) {
          this.setState(prevState => ({
            ...this.state,
            data: res.data,
          }));
          this.props.UserHandleName(res.data.prenom, res.data.nom);
        } else {
          return;
        }
      }
    });
  };

  ffff = false;
  dada = false;

  componentDidMount = () => {
    this.FetchUserBisBis();
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
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (!this.ffff) {
      this.FetchUserBis();
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
    this.ffff = true;
    Dimensions.removeEventListener('change');
  };

  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={30}
        enabled={true}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}>
        <Image
          source={FondB}
          style={{
            width: Dimensions.get('window').width,
            position: 'absolute',
            height: '100%',
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop:
              this.state.orientation === 'PORTRAIT'
                ? Platform.OS === 'android'
                  ? this.h > 718 && this.h < 800
                    ? '36%'
                    : this.h === 816
                    ? '35%'
                    : this.w === 480
                    ? this.h > 1018 && this.h < 1019
                      ? '40%'
                      : this.h > 938 && this.h < 939
                      ? '38%'
                      : '40%'
                    : this.h === 1152
                    ? '45%'
                    : this.h === 912
                    ? '30%'
                    : this.w === 270
                    ? '25%'
                    : this.w === 360
                    ? this.h === 592
                      ? '25%'
                      : this.h === 640
                      ? '28%'
                      : '35%'
                    : this.h === 1182
                    ? '44%'
                    : this.h === 1032
                    ? '35%'
                    : this.h === 1122
                    ? '40%'
                    : '28%'
                  : this.h === 667
                  ? '37%'
                  : this.w === 414
                  ? this.h === 896
                    ? '50%'
                    : '38%'
                  : this.h === 568
                  ? '35%'
                  : '45%'
                : Platform.OS === 'android'
                ? '10%'
                : '10%',
          }}
          contentContainerStyle={{
            display: 'flex',
            justifyContent: 'center',
          }}>
          {this.state.data && (
            <View>
              <TouchableOpacity>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontFamily: 'Poppins-ExtraBold',
                    color: '#636A28',
                    fontSize: this.w === 270 ? 20 : 35,
                    textTransform: 'uppercase',
                  }}>
                  Bienvenue
                </Text>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                    color: '#636A28',
                    fontSize: 20,
                  }}>
                  {this.state.data.prenom} {this.state.data.nom}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: this.state.orientation === 'PORTRAIT' ? '10%' : '5%',
            }}>
            <View
              style={{
                flexBasis: '50%',
                backgroundColor: '#999D3B',
                height:
                  this.state.orientation === 'PORTRAIT'
                    ? this.h / 4
                    : this.h / 2,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Add')}>
                <Image source={Coffre} />
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  textTransform: 'uppercase',
                  color: 'white',
                  fontSize: this.w === 270 ? 12 : this.h === 568 ? 13 : 17,
                  marginTop:
                    this.state.orientation === 'PORTRAIT'
                      ? this.w === 360 || this.w === 384
                        ? '0%'
                        : '8%'
                      : '4%',
                }}>
                Mon coffre-fort
              </Text>
            </View>
            <View
              style={{
                flexBasis: '50%',
                backgroundColor: '#636A28',
                height:
                  this.state.orientation === 'PORTRAIT'
                    ? this.h / 4
                    : this.h / 2,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Mes certificats de garantie')
                }>
                <Image source={Facture} />
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  textTransform: 'uppercase',
                  color: 'white',
                  fontSize: this.w === 270 ? 12 : this.h === 568 ? 12 : 17,
                  marginTop:
                    this.state.orientation === 'PORTRAIT'
                      ? this.w === 360 || this.w === 384
                        ? '0%'
                        : '8%'
                      : '4%',
                }}>
                Mes certificats de garantie
              </Text>
            </View>
            <View
              style={{
                flexBasis: '50%',
                backgroundColor: '#636A28',
                height:
                  this.state.orientation === 'PORTRAIT'
                    ? this.h / 4
                    : this.h / 2,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('UserAccount')}>
                <Image source={Compte} />
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  textTransform: 'uppercase',
                  color: 'white',
                  fontSize: this.w === 270 ? 11 : this.h === 568 ? 12 : 18,
                  marginTop:
                    this.state.orientation === 'PORTRAIT'
                      ? this.w === 360 || this.w === 384
                        ? this.h === 640
                          ? '13%'
                          : '0%'
                        : this.state.orientation === 'PORTRAIT'
                        ? this.w > 392 && this.w < 393
                          ? '3%'
                          : this.w > 411 && this.w < 412
                          ? '4%'
                          : '3%'
                        : '8%'
                      : '2%',
                }}>
                Mon compte
              </Text>
            </View>
            <View
              style={{
                flexBasis: '50%',
                backgroundColor: '#999D3B',
                height:
                  this.state.orientation === 'PORTRAIT'
                    ? this.h / 4
                    : this.h / 2,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Contact')}>
                <Image source={Contact} />
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  textTransform: 'uppercase',
                  color: 'white',
                  fontSize: this.w === 270 ? 12 : this.h === 568 ? 13 : 18,
                  marginTop:
                    this.state.orientation === 'PORTRAIT'
                      ? this.w === 360 || this.w === 384
                        ? this.h === 592
                          ? '8%'
                          : this.h === 752
                          ? '5%'
                          : this.h === 672
                          ? this.w === 360
                            ? '7%'
                            : '25%'
                          : this.h === 640
                          ? '13%'
                          : this.h === 692
                          ? '6%'
                          : this.h === 712
                          ? '5%'
                          : this.h === 732
                          ? '5%'
                          : this.h > 830 && this.h < 831
                          ? '5%'
                          : '0%'
                        : this.h === 568
                        ? '15%'
                        : this.h === 1122
                        ? '5%'
                        : '9%'
                      : '4%',
                }}>
                Contact
              </Text>
            </View>
          </View>
          <View style={{height: 40}}></View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

let mapStateToProps = state => {
  return {
    datab: state.email,
    token: state.token,
    name: state.prenom,
  };
};

let mapDispatchToProps = dispatch => {
  return {
    Logout: () => dispatch(ACTIONS.Logout()),
    handleUser: data => dispatch(ACTIONS.UserB(data)),
    UserHandleName: (data, datab) =>
      dispatch({type: 'USERB', payload: {data: {prenom: data, nom: datab}}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
