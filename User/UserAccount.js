import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {Icon} from 'native-base';
import axios from 'axios';
import {API_URL} from '@env';
import FondB from '../assets/fond.jpg';
import * as ACTIONS from './ACTIONS';

export class UserAccount extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      orientation: null,
    };
    this.FetchUser = this.FetchUser.bind(this);
  }

  //permet de récupérer les informations de l'utilisateur//
  FetchUser = async () => {
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
        this.setState(prevState => ({
          ...this.state,
          data: res.data,
        }));
      }
    });
  };

  w = Dimensions.get('window').width;

  h = Dimensions.get('window').height;

  cc = false;

  componentDidMount = () => {
    this.FetchUser();
    if (!this.cc) {
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
    this.cc = false;
  };

  render() {
    return (
      <View>
        <Image
          source={FondB}
          style={{
            width: this.w,
            position: 'absolute',
            height: this.h,
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop:
              this.state.orientation === 'PORTRAIT'
                ? Platform.OS === 'android'
                  ? this.h > 639 && this.h < 684
                    ? '25%'
                    : this.h > 718 && this.h < 775
                    ? this.w === 360
                      ? '30%'
                      : '25%'
                    : this.h === 816
                    ? '25%'
                    : this.h === 592
                    ? '20%'
                    : this.w === 480
                    ? '28%'
                    : this.h === 1152
                    ? '25%'
                    : this.h === 912
                    ? '20%'
                    : this.w === 270
                    ? '20%'
                    : this.h === 692
                    ? this.w === 360
                      ? '25%'
                      : '20%'
                    : this.h > 830 && this.h < 831
                    ? '30%'
                    : '25%'
                  : this.w === 414
                  ? this.h === 896
                    ? '35%'
                    : '32%'
                  : this.h === 568
                  ? '38%'
                  : '35%'
                : this.w === 667
                ? '15%'
                : this.w === 736
                ? '15%'
                : Platform.OS === 'android'
                ? '11%'
                : this.w === 568
                ? '18%'
                : '13%',
          }}>
          <View
            style={{
              width: '100%',
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon
                type="Entypo"
                name="chevron-left"
                style={{
                  position: 'absolute',
                  fontSize: 20,
                  color: '#636A28',
                  marginLeft:
                    Platform.OS === 'android'
                      ? this.state.orientation === 'PORTRAIT'
                        ? 10
                        : 20
                      : 10,
                  marginTop: 1,
                }}
              />
              <Text
                style={{
                  color: '#636A28',
                  fontSize: 16,
                  fontFamily: 'Poppins-Regular',
                  marginLeft:
                    Platform.OS === 'android'
                      ? this.state.orientation === 'PORTRAIT'
                        ? 30
                        : Platform.OS === 'android'
                        ? 40
                        : 10
                      : 30,
                }}>
                Retour
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.data && (
            <View>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 20,
                  }}>
                  Nom
                </Text>
                <TextInput
                  value={this.state.data.nom}
                  editable={false}
                  style={{
                    color: 'black',
                    backgroundColor: 'white',
                    width:
                      this.state.orientation === 'PORTRAIT' ? '70%' : '50%',
                    height: 50,
                    marginTop: 15,
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    paddingLeft: 20,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 17,
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 15,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 20,
                  }}>
                  Prénom
                </Text>
                <TextInput
                  value={this.state.data.prenom}
                  editable={false}
                  style={{
                    color: 'black',
                    backgroundColor: 'white',
                    width:
                      this.state.orientation === 'PORTRAIT' ? '70%' : '50%',
                    height: 50,

                    marginTop: 15,
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    paddingLeft: 20,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 17,
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 20,
                  }}>
                  Email
                </Text>
                <TextInput
                  value={this.state.data.email}
                  editable={false}
                  style={{
                    color: 'black',
                    backgroundColor: 'white',
                    width:
                      this.state.orientation === 'PORTRAIT' ? '70%' : '50%',
                    height: 50,

                    marginTop: 15,
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    paddingLeft: 20,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 17,
                  }}
                />
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 20,
                  }}>
                  SIA
                </Text>
                <TextInput
                  value={this.state.data.SIA}
                  editable={false}
                  style={{
                    color: 'black',
                    backgroundColor: 'white',
                    width:
                      this.state.orientation === 'PORTRAIT' ? '70%' : '50%',
                    height: 50,
                    marginTop: 15,
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    paddingLeft: 20,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 17,
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 15,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 20,
                  }}>
                  Adresse
                </Text>
                <TextInput
                  value={this.state.data.adresse}
                  editable={false}
                  style={{
                    color: 'black',
                    backgroundColor: 'white',
                    width:
                      this.state.orientation === 'PORTRAIT' ? '70%' : '50%',
                    height: 50,
                    marginTop: 15,
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    paddingLeft: 20,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 17,
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 15,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 20,
                  }}>
                  Ville
                </Text>
                <TextInput
                  value={this.state.data.ville}
                  editable={false}
                  style={{
                    color: 'black',
                    backgroundColor: 'white',
                    width:
                      this.state.orientation === 'PORTRAIT' ? '70%' : '50%',
                    height: 50,
                    marginTop: 15,
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    paddingLeft: 20,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 17,
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 15,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 20,
                  }}>
                  Téléphone
                </Text>
                <TextInput
                  value={this.state.data.telephone}
                  editable={false}
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    width:
                      this.state.orientation === 'PORTRAIT' ? '70%' : '50%',
                    height: 50,
                    marginTop: 15,
                    borderWidth: 1,
                    borderColor: '#3D4C28',
                    paddingLeft: 20,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 17,
                  }}
                />
              </View>
            </View>
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
                width: this.state.orientation === 'PORTRAIT' ? '60%' : '32%',
                height: 50,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}
              onPress={() => this.props.navigation.navigate('Modification')}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: this.w === 270 ? 14 : 17,
                  width: '60%',
                  fontFamily: 'OpenSans-SemiBold',
                }}>
                Modifier mes informations
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
          <View style={{height: 40}}></View>
        </ScrollView>
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
    Logout: () => dispatch(ACTIONS.Logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
