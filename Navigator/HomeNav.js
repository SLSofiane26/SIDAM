import Accueil from '../Connexion/Accueil';
import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Inscription from '../Connexion/Inscription';
import Connexion from '../Connexion/Connexion';
import Reglement from './Reglement';
import {
  Dimensions,
  Platform,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Icon} from 'native-base';
import SidamsIdentification from './SidamsIdentification';
import {enableScreens} from 'react-native-screens';
import SideBar from './SideBar';
import {DrawerActions} from '@react-navigation/native';
import Logo from '../assets/logo.png';
import SidamValidate from '../User/SidamValidate';
import PasswordModification from '../Connexion/PasswordModification';

enableScreens();

let DrawerHome = createDrawerNavigator();

let Acc = createStackNavigator();

let ConnexionConnexion = createStackNavigator();

let InscriptionBis = createStackNavigator();

let ReglementBis = createStackNavigator();

let HomeNav = props => {
  let [orientation, setOrientation] = useState(null);

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

  let InscriptionB = props => {
    return (
      <InscriptionBis.Navigator
        initialRouteName="Inscription"
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          header: () => {
            return (
              <View
                style={{
                  width: Dimensions.get('window').width,
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                  height:
                    orientation === 'PORTRAIT'
                      ? Platform.OS == 'ios'
                        ? h / 7
                        : h / 8
                      : Platform.OS == 'ios'
                      ? h / 5
                      : h / 6,
                }}>
                <View
                  style={{
                    zIndex: 10000,
                    marginLeft:
                      orientation === 'PORTRAIT'
                        ? h > 1018 && h < 1019
                          ? 480
                            ? '4%'
                            : '4%'
                          : '4%'
                        : Platform.OS === 'android'
                        ? w > 965 && w < 966
                          ? '8%'
                          : '2%'
                        : '5%',
                    marginTop:
                      orientation === 'PORTRAIT'
                        ? Platform.OS === 'android'
                          ? h > 1018 && h < 1019
                            ? 480
                              ? '0%'
                              : '0%'
                            : '2%'
                          : h === 736
                          ? '5%'
                          : h === 667
                          ? w === 375
                            ? '5%'
                            : '5%'
                          : h === 568
                          ? '3%'
                          : '9%'
                        : h === 540
                        ? w === 1152
                          ? '1%'
                          : '4%'
                        : w === 667
                        ? '1%'
                        : h === 480
                        ? '1%'
                        : w > 683 && w < 684
                        ? '1%'
                        : h === 432
                        ? '1%'
                        : h === 312
                        ? '0%'
                        : w > 753 && w < 754
                        ? '1%'
                        : h > 411 && h < 412
                        ? '1%'
                        : w > 718 && w < 719
                        ? '1%'
                        : w > 737 && w < 738
                        ? '1%'
                        : w > 759 && w < 760
                        ? '1%'
                        : h === 492
                        ? '0.5%'
                        : '0%',
                  }}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Connexion')}>
                    {orientation === 'LANDSCAPE' &&
                    Platform.OS === 'android' ? (
                      <Image
                        source={Logo}
                        style={{
                          width:
                            h === 432
                              ? w > 986 && w < 987
                                ? 160
                                : w > 1000 && w < 1100
                                ? 159
                                : w === 816
                                ? 160
                                : 140
                              : h > 411 && h < 412
                              ? 160
                              : h > 392 && h < 393
                              ? 150
                              : w === 1170
                              ? 190
                              : 130,
                          height:
                            h === 312
                              ? '94%'
                              : h === 432
                              ? w === 960
                                ? '89%'
                                : w === 816
                                ? '94%'
                                : '95%'
                              : h > 411 && h < 412
                              ? '95%'
                              : h > 392 && h < 393
                              ? '95%'
                              : w === 1170
                              ? '93%'
                              : w === 800
                              ? '89%'
                              : '77%',
                        }}
                      />
                    ) : (
                      <Image source={Logo} />
                    )}
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    width: Dimensions.get('window').width,
                    paddingBottom: 40,
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.dispatch(DrawerActions.toggleDrawer())
                    }
                    style={{
                      alignItems: 'flex-end',
                      marginRight:
                        orientation === 'PORTRAIT'
                          ? h > 1018 && h < 1019
                            ? '10%'
                            : '5%'
                          : Platform.OS === 'android'
                          ? h === 540
                            ? w === 1152
                              ? '3%'
                              : '10%'
                            : '2%'
                          : '5%',
                      marginTop:
                        orientation === 'PORTRAIT'
                          ? Platform.OS === 'android'
                            ? w === 480
                              ? '9%'
                              : w === 540
                              ? '8%'
                              : '12%'
                            : h === 736
                            ? '14%'
                            : h === 667
                            ? '16%'
                            : '18%'
                          : Platform.OS === 'android'
                          ? h === 312
                            ? w === 640
                              ? '5%'
                              : w === 740
                              ? '5%'
                              : '5%'
                            : w === 1080
                            ? '3%'
                            : w === 960
                            ? '2%'
                            : w === 1200
                            ? h === 492
                              ? '3%'
                              : '3%'
                            : '4%'
                          : w === 667
                          ? '6%'
                          : w === 736
                          ? '5%'
                          : w === 568
                          ? '7%'
                          : '4%',
                    }}>
                    <Icon
                      name="menu"
                      type="MaterialIcons"
                      style={{
                        color: '#C69D74',
                        fontSize:
                          w === 270 ? 40 : h === 360 ? 50 : w === 640 ? 50 : 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
        }}>
        <InscriptionBis.Screen name="Inscription" component={Inscription} />
      </InscriptionBis.Navigator>
    );
  };

  let ConnexionB = props => {
    return (
      <ConnexionConnexion.Navigator initialRouteName="Connexion">
        <ConnexionConnexion.Screen
          component={Connexion}
          name="Connexion"
          options={{
            headerShown: true,
            header: () => {
              return (
                <View
                  style={{
                    width: Dimensions.get('window').width,
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    height:
                      orientation === 'PORTRAIT'
                        ? Platform.OS == 'ios'
                          ? h / 7
                          : h / 8
                        : Platform.OS == 'ios'
                        ? h / 5
                        : h / 6,
                  }}>
                  <View
                    style={{
                      zIndex: 10000,
                      marginLeft:
                        orientation === 'PORTRAIT'
                          ? h > 1018 && h < 1019
                            ? 480
                              ? '4%'
                              : '4%'
                            : '4%'
                          : Platform.OS === 'android'
                          ? w > 965 && w < 966
                            ? '8%'
                            : '2%'
                          : '5%',
                      marginTop:
                        orientation === 'PORTRAIT'
                          ? Platform.OS === 'android'
                            ? '0%'
                            : h === 736
                            ? '5%'
                            : h === 667
                            ? w === 375
                              ? '5%'
                              : '5%'
                            : h === 568
                            ? '3%'
                            : '9%'
                          : h === 540
                          ? w === 1152
                            ? '1%'
                            : '4%'
                          : w === 667
                          ? '1%'
                          : h === 480
                          ? '1%'
                          : w > 683 && w < 684
                          ? '1%'
                          : h === 432
                          ? '1%'
                          : h === 312
                          ? '0%'
                          : w > 753 && w < 754
                          ? '1%'
                          : h > 411 && h < 412
                          ? '1%'
                          : w > 718 && w < 719
                          ? '1%'
                          : w > 737 && w < 738
                          ? '1%'
                          : w > 759 && w < 760
                          ? '1%'
                          : h === 492
                          ? '0.5%'
                          : '0%',
                    }}>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('Connexion')}>
                      {orientation === 'LANDSCAPE' &&
                      Platform.OS === 'android' ? (
                        <Image
                          source={Logo}
                          style={{
                            width:
                              h === 432
                                ? w > 986 && w < 987
                                  ? 160
                                  : w > 1000 && w < 1100
                                  ? 159
                                  : w === 816
                                  ? 160
                                  : 140
                                : h > 411 && h < 412
                                ? 160
                                : h > 392 && h < 393
                                ? 150
                                : w === 1170
                                ? 190
                                : 130,
                            height:
                              h === 312
                                ? '94%'
                                : h === 432
                                ? w === 960
                                  ? '89%'
                                  : w === 816
                                  ? '94%'
                                  : '95%'
                                : h > 411 && h < 412
                                ? '95%'
                                : h > 392 && h < 393
                                ? '95%'
                                : w === 1170
                                ? '93%'
                                : w === 800
                                ? '89%'
                                : '77%',
                          }}
                        />
                      ) : (
                        <Image source={Logo} />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      width: Dimensions.get('window').width,
                      paddingBottom: 40,
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.dispatch(DrawerActions.toggleDrawer())
                      }
                      style={{
                        alignItems: 'flex-end',
                        marginRight:
                          orientation === 'PORTRAIT'
                            ? h > 1018 && h < 1019
                              ? '10%'
                              : '5%'
                            : Platform.OS === 'android'
                            ? h === 540
                              ? w === 1152
                                ? '3%'
                                : '10%'
                              : '2%'
                            : '5%',
                        marginTop:
                          orientation === 'PORTRAIT'
                            ? Platform.OS === 'android'
                              ? w === 480
                                ? '9%'
                                : w === 540
                                ? '8%'
                                : '12%'
                              : h === 736
                              ? '14%'
                              : h === 667
                              ? '16%'
                              : '18%'
                            : Platform.OS === 'android'
                            ? h === 312
                              ? w === 640
                                ? '5%'
                                : w === 740
                                ? '5%'
                                : '5%'
                              : w === 1080
                              ? '3%'
                              : w === 960
                              ? '2%'
                              : w === 1200
                              ? h === 492
                                ? '3%'
                                : '3%'
                              : '4%'
                            : w === 667
                            ? '6%'
                            : w === 736
                            ? '5%'
                            : w === 568
                            ? '7%'
                            : '4%',
                      }}>
                      <Icon
                        name="menu"
                        type="MaterialIcons"
                        style={{
                          color: '#C69D74',
                          fontSize:
                            w === 270
                              ? 40
                              : h === 360
                              ? 50
                              : w === 640
                              ? 50
                              : 60,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            },
          }}
        />
      </ConnexionConnexion.Navigator>
    );
  };

  let ReglementBisBis = props => {
    return (
      <ReglementBis.Navigator initialRouteName="Reglement">
        <ReglementBis.Screen
          name="Reglement"
          component={Reglement}
          options={{
            headerShown: true,
            header: () => {
              return (
                <View
                  style={{
                    width: Dimensions.get('window').width,
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    height:
                      orientation === 'PORTRAIT'
                        ? Platform.OS == 'ios'
                          ? h / 7
                          : h / 8
                        : Platform.OS == 'ios'
                        ? h / 5
                        : h / 6,
                  }}>
                  <View
                    style={{
                      zIndex: 10000,
                      marginLeft:
                        orientation === 'PORTRAIT'
                          ? h > 1018 && h < 1019
                            ? 480
                              ? '4%'
                              : '4%'
                            : '4%'
                          : Platform.OS === 'android'
                          ? w > 965 && w < 966
                            ? '8%'
                            : '2%'
                          : '5%',
                      marginTop:
                        orientation === 'PORTRAIT'
                          ? Platform.OS === 'android'
                            ? '0%'
                            : h === 736
                            ? '5%'
                            : h === 667
                            ? w === 375
                              ? '5%'
                              : '5%'
                            : h === 568
                            ? '3%'
                            : '9%'
                          : h === 540
                          ? w === 1152
                            ? '1%'
                            : '4%'
                          : w === 667
                          ? '1%'
                          : h === 480
                          ? '1%'
                          : w > 683 && w < 684
                          ? '1%'
                          : h === 432
                          ? '1%'
                          : h === 312
                          ? '0%'
                          : w > 753 && w < 754
                          ? '1%'
                          : h > 411 && h < 412
                          ? '1%'
                          : w > 718 && w < 719
                          ? '1%'
                          : w > 737 && w < 738
                          ? '1%'
                          : w > 759 && w < 760
                          ? '1%'
                          : h === 492
                          ? '0.5%'
                          : '0%',
                    }}>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('Connexion')}>
                      {orientation === 'LANDSCAPE' &&
                      Platform.OS === 'android' ? (
                        <Image
                          source={Logo}
                          style={{
                            width:
                              h === 432
                                ? w > 986 && w < 987
                                  ? 160
                                  : w > 1000 && w < 1100
                                  ? 159
                                  : w === 816
                                  ? 160
                                  : 140
                                : h > 411 && h < 412
                                ? 160
                                : h > 392 && h < 393
                                ? 150
                                : w === 1170
                                ? 190
                                : 130,
                            height:
                              h === 312
                                ? '94%'
                                : h === 432
                                ? w === 960
                                  ? '89%'
                                  : w === 816
                                  ? '94%'
                                  : '95%'
                                : h > 411 && h < 412
                                ? '95%'
                                : h > 392 && h < 393
                                ? '95%'
                                : w === 1170
                                ? '93%'
                                : w === 800
                                ? '89%'
                                : '77%',
                          }}
                        />
                      ) : (
                        <Image source={Logo} />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      width: Dimensions.get('window').width,
                      paddingBottom: 40,
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.dispatch(DrawerActions.toggleDrawer())
                      }
                      style={{
                        alignItems: 'flex-end',
                        marginRight:
                          orientation === 'PORTRAIT'
                            ? h > 1018 && h < 1019
                              ? '10%'
                              : '5%'
                            : Platform.OS === 'android'
                            ? h === 540
                              ? w === 1152
                                ? '3%'
                                : '10%'
                              : '2%'
                            : '5%',
                        marginTop:
                          orientation === 'PORTRAIT'
                            ? Platform.OS === 'android'
                              ? w === 480
                                ? '9%'
                                : w === 540
                                ? '8%'
                                : '12%'
                              : h === 736
                              ? '14%'
                              : h === 667
                              ? '16%'
                              : '18%'
                            : Platform.OS === 'android'
                            ? h === 312
                              ? w === 640
                                ? '5%'
                                : w === 740
                                ? '5%'
                                : '5%'
                              : w === 1080
                              ? '3%'
                              : w === 960
                              ? '2%'
                              : w === 1200
                              ? h === 492
                                ? '3%'
                                : '3%'
                              : '4%'
                            : w === 667
                            ? '6%'
                            : w === 736
                            ? '5%'
                            : w === 568
                            ? '7%'
                            : '4%',
                      }}>
                      <Icon
                        name="menu"
                        type="MaterialIcons"
                        style={{
                          color: '#C69D74',
                          fontSize:
                            w === 270
                              ? 40
                              : h === 360
                              ? 50
                              : w === 640
                              ? 50
                              : 60,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            },
          }}
        />
      </ReglementBis.Navigator>
    );
  };

  let AccBis = props => {
    return (
      <Acc.Navigator initialRouteName="Autorisation">
        <Acc.Screen
          component={SidamValidate}
          name="Validate"
          options={{
            headerShown: true,
            header: () => {
              return (
                <View
                  style={{
                    width: Dimensions.get('window').width,
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    height:
                      orientation === 'PORTRAIT'
                        ? Platform.OS == 'ios'
                          ? h / 7
                          : h / 8
                        : Platform.OS == 'ios'
                        ? h / 5
                        : h / 6,
                  }}>
                  <View
                    style={{
                      zIndex: 10000,
                      marginLeft:
                        orientation === 'PORTRAIT'
                          ? h > 1018 && h < 1019
                            ? 480
                              ? '4%'
                              : '4%'
                            : '4%'
                          : Platform.OS === 'android'
                          ? w > 965 && w < 966
                            ? '8%'
                            : '2%'
                          : '5%',
                      marginTop:
                        orientation === 'PORTRAIT'
                          ? Platform.OS === 'android'
                            ? '0%'
                            : h === 736
                            ? '5%'
                            : h === 667
                            ? w === 375
                              ? '5%'
                              : '5%'
                            : h === 568
                            ? '3%'
                            : '9%'
                          : h === 540
                          ? w === 1152
                            ? '1%'
                            : '4%'
                          : w === 667
                          ? '1%'
                          : h === 480
                          ? '1%'
                          : w > 683 && w < 684
                          ? '1%'
                          : h === 432
                          ? '1%'
                          : h === 312
                          ? '0%'
                          : w > 753 && w < 754
                          ? '1%'
                          : h > 411 && h < 412
                          ? '1%'
                          : w > 718 && w < 719
                          ? '1%'
                          : w > 737 && w < 738
                          ? '1%'
                          : w > 759 && w < 760
                          ? '1%'
                          : h === 492
                          ? '0.5%'
                          : '0%',
                    }}>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('Connexion')}>
                      {orientation === 'LANDSCAPE' &&
                      Platform.OS === 'android' ? (
                        <Image
                          source={Logo}
                          style={{
                            width:
                              h === 432
                                ? w > 986 && w < 987
                                  ? 160
                                  : w > 1000 && w < 1100
                                  ? 159
                                  : w === 816
                                  ? 160
                                  : 140
                                : h > 411 && h < 412
                                ? 160
                                : h > 392 && h < 393
                                ? 150
                                : w === 1170
                                ? 190
                                : 130,
                            height:
                              h === 312
                                ? '94%'
                                : h === 432
                                ? w === 960
                                  ? '89%'
                                  : w === 816
                                  ? '94%'
                                  : '95%'
                                : h > 411 && h < 412
                                ? '95%'
                                : h > 392 && h < 393
                                ? '95%'
                                : w === 1170
                                ? '93%'
                                : w === 800
                                ? '89%'
                                : '77%',
                          }}
                        />
                      ) : (
                        <Image source={Logo} />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      width: Dimensions.get('window').width,
                      paddingBottom: 40,
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.dispatch(DrawerActions.toggleDrawer())
                      }
                      style={{
                        alignItems: 'flex-end',
                        marginRight:
                          orientation === 'PORTRAIT'
                            ? h > 1018 && h < 1019
                              ? '10%'
                              : '5%'
                            : Platform.OS === 'android'
                            ? h === 540
                              ? w === 1152
                                ? '3%'
                                : '10%'
                              : '2%'
                            : '5%',
                        marginTop:
                          orientation === 'PORTRAIT'
                            ? Platform.OS === 'android'
                              ? w === 480
                                ? '9%'
                                : w === 540
                                ? '8%'
                                : '12%'
                              : h === 736
                              ? '14%'
                              : h === 667
                              ? '16%'
                              : '18%'
                            : Platform.OS === 'android'
                            ? h === 312
                              ? w === 640
                                ? '5%'
                                : w === 740
                                ? '5%'
                                : '5%'
                              : w === 1080
                              ? '3%'
                              : w === 960
                              ? '2%'
                              : w === 1200
                              ? h === 492
                                ? '3%'
                                : '3%'
                              : '4%'
                            : w === 667
                            ? '6%'
                            : w === 736
                            ? '5%'
                            : w === 568
                            ? '7%'
                            : '4%',
                      }}>
                      <Icon
                        name="menu"
                        type="MaterialIcons"
                        style={{
                          color: '#C69D74',
                          fontSize:
                            w === 270
                              ? 40
                              : h === 360
                              ? 50
                              : w === 640
                              ? 50
                              : 60,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            },
          }}
        />
        <Acc.Screen
          name="Accueil"
          component={Accueil}
          options={{
            headerShown: true,
            header: () => {
              return (
                <View
                  style={{
                    width: Dimensions.get('window').width,
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    height:
                      orientation === 'PORTRAIT'
                        ? Platform.OS == 'ios'
                          ? h / 7
                          : h / 8
                        : Platform.OS == 'ios'
                        ? h / 5
                        : h / 6,
                  }}>
                  <View
                    style={{
                      zIndex: 10000,
                      marginLeft:
                        orientation === 'PORTRAIT'
                          ? h > 1018 && h < 1019
                            ? 480
                              ? '4%'
                              : '4%'
                            : '4%'
                          : Platform.OS === 'android'
                          ? w > 965 && w < 966
                            ? '8%'
                            : '2%'
                          : '5%',
                      marginTop:
                        orientation === 'PORTRAIT'
                          ? Platform.OS === 'android'
                            ? '0%'
                            : h === 736
                            ? '5%'
                            : h === 667
                            ? w === 375
                              ? '5%'
                              : '5%'
                            : h === 568
                            ? '3%'
                            : '9%'
                          : h === 540
                          ? w === 1152
                            ? '1%'
                            : '4%'
                          : w === 667
                          ? '1%'
                          : h === 480
                          ? '1%'
                          : w > 683 && w < 684
                          ? '1%'
                          : h === 432
                          ? '1%'
                          : h === 312
                          ? '0%'
                          : w > 753 && w < 754
                          ? '1%'
                          : h > 411 && h < 412
                          ? '1%'
                          : w > 718 && w < 719
                          ? '1%'
                          : w > 737 && w < 738
                          ? '1%'
                          : w > 759 && w < 760
                          ? '1%'
                          : h === 492
                          ? '0.5%'
                          : '0%',
                    }}>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('Connexion')}>
                      {orientation === 'LANDSCAPE' &&
                      Platform.OS === 'android' ? (
                        <Image
                          source={Logo}
                          style={{
                            width:
                              h === 432
                                ? w > 986 && w < 987
                                  ? 160
                                  : w > 1000 && w < 1100
                                  ? 159
                                  : w === 816
                                  ? 160
                                  : 140
                                : h > 411 && h < 412
                                ? 160
                                : h > 392 && h < 393
                                ? 150
                                : w === 1170
                                ? 190
                                : 130,
                            height:
                              h === 312
                                ? '94%'
                                : h === 432
                                ? w === 960
                                  ? '89%'
                                  : w === 816
                                  ? '94%'
                                  : '95%'
                                : h > 411 && h < 412
                                ? '95%'
                                : h > 392 && h < 393
                                ? '95%'
                                : w === 1170
                                ? '93%'
                                : w === 800
                                ? '89%'
                                : '77%',
                          }}
                        />
                      ) : (
                        <Image source={Logo} />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      width: Dimensions.get('window').width,
                      paddingBottom: 40,
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.dispatch(DrawerActions.toggleDrawer())
                      }
                      style={{
                        alignItems: 'flex-end',
                        marginRight:
                          orientation === 'PORTRAIT'
                            ? h > 1018 && h < 1019
                              ? '10%'
                              : '5%'
                            : Platform.OS === 'android'
                            ? h === 540
                              ? w === 1152
                                ? '3%'
                                : '10%'
                              : '2%'
                            : '5%',
                        marginTop:
                          orientation === 'PORTRAIT'
                            ? Platform.OS === 'android'
                              ? w === 480
                                ? '9%'
                                : w === 540
                                ? '8%'
                                : '12%'
                              : h === 736
                              ? '14%'
                              : h === 667
                              ? '16%'
                              : '18%'
                            : Platform.OS === 'android'
                            ? h === 312
                              ? w === 640
                                ? '5%'
                                : w === 740
                                ? '5%'
                                : '5%'
                              : w === 1080
                              ? '3%'
                              : w === 960
                              ? '2%'
                              : w === 1200
                              ? h === 492
                                ? '3%'
                                : '3%'
                              : '4%'
                            : w === 667
                            ? '6%'
                            : w === 736
                            ? '5%'
                            : w === 568
                            ? '7%'
                            : '4%',
                      }}>
                      <Icon
                        name="menu"
                        type="MaterialIcons"
                        style={{
                          color: '#C69D74',
                          fontSize:
                            w === 270
                              ? 40
                              : h === 360
                              ? 50
                              : w === 640
                              ? 50
                              : 60,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            },
          }}
        />
        <Acc.Screen
          name="Autorisation"
          component={SidamsIdentification}
          options={{
            headerShown: true,
            header: () => {
              return (
                <View
                  style={{
                    width: Dimensions.get('window').width,
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#999D3B',
                    height:
                      orientation === 'PORTRAIT'
                        ? Platform.OS == 'ios'
                          ? h / 7
                          : h / 8
                        : Platform.OS == 'ios'
                        ? h / 5
                        : h / 6,
                  }}>
                  <View
                    style={{
                      zIndex: 10000,
                      marginLeft:
                        orientation === 'PORTRAIT'
                          ? h > 1018 && h < 1019
                            ? 480
                              ? '4%'
                              : '4%'
                            : '4%'
                          : Platform.OS === 'android'
                          ? w > 965 && w < 966
                            ? '8%'
                            : '2%'
                          : '5%',
                      marginTop:
                        orientation === 'PORTRAIT'
                          ? Platform.OS === 'android'
                            ? '0%'
                            : h === 736
                            ? '5%'
                            : h === 667
                            ? w === 375
                              ? '5%'
                              : '5%'
                            : h === 568
                            ? '3%'
                            : '9%'
                          : h === 540
                          ? w === 1152
                            ? '1%'
                            : '4%'
                          : w === 667
                          ? '1%'
                          : h === 480
                          ? '1%'
                          : w > 683 && w < 684
                          ? '1%'
                          : h === 432
                          ? '1%'
                          : h === 312
                          ? '0%'
                          : w > 753 && w < 754
                          ? '1%'
                          : h > 411 && h < 412
                          ? '1%'
                          : w > 718 && w < 719
                          ? '1%'
                          : w > 737 && w < 738
                          ? '1%'
                          : w > 759 && w < 760
                          ? '1%'
                          : h === 492
                          ? '0.5%'
                          : '0%',
                    }}>
                    <TouchableOpacity>
                      {orientation === 'LANDSCAPE' &&
                      Platform.OS === 'android' ? (
                        <Image
                          source={Logo}
                          style={{
                            width:
                              h === 432
                                ? w > 986 && w < 987
                                  ? 160
                                  : w > 1000 && w < 1100
                                  ? 159
                                  : w === 816
                                  ? 160
                                  : 140
                                : h > 411 && h < 412
                                ? 160
                                : h > 392 && h < 393
                                ? 150
                                : w === 1170
                                ? 190
                                : 130,
                            height:
                              h === 312
                                ? '94%'
                                : h === 432
                                ? w === 960
                                  ? '89%'
                                  : w === 816
                                  ? '94%'
                                  : '95%'
                                : h > 411 && h < 412
                                ? '95%'
                                : h > 392 && h < 393
                                ? '95%'
                                : w === 1170
                                ? '93%'
                                : w === 800
                                ? '89%'
                                : '77%',
                          }}
                        />
                      ) : (
                        <Image source={Logo} />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      width: Dimensions.get('window').width,
                      paddingBottom: 40,
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        alignItems: 'flex-end',
                        marginRight:
                          orientation === 'PORTRAIT'
                            ? h > 1018 && h < 1019
                              ? '10%'
                              : '5%'
                            : Platform.OS === 'android'
                            ? h === 540
                              ? w === 1152
                                ? '3%'
                                : '10%'
                              : '2%'
                            : '5%',
                        marginTop:
                          orientation === 'PORTRAIT'
                            ? Platform.OS === 'android'
                              ? w === 480
                                ? '9%'
                                : w === 540
                                ? '8%'
                                : '12%'
                              : h === 736
                              ? '14%'
                              : h === 667
                              ? '16%'
                              : '18%'
                            : Platform.OS === 'android'
                            ? h === 312
                              ? w === 640
                                ? '5%'
                                : w === 740
                                ? '5%'
                                : '5%'
                              : w === 1080
                              ? '3%'
                              : w === 960
                              ? '2%'
                              : w === 1200
                              ? h === 492
                                ? '3%'
                                : '3%'
                              : '4%'
                            : w === 667
                            ? '6%'
                            : w === 736
                            ? '5%'
                            : w === 568
                            ? '7%'
                            : '4%',
                      }}>
                      <Icon
                        name="menu"
                        type="MaterialIcons"
                        style={{
                          color: '#C69D74',
                          fontSize:
                            w === 270
                              ? 40
                              : h === 360
                              ? 50
                              : w === 640
                              ? 50
                              : 60,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            },
          }}
        />
      </Acc.Navigator>
    );
  };

  return (
    <DrawerHome.Navigator
      initialRouteName="Accueil"
      drawerStyle={{
        backgroundColor: 'transparent',
        width: '93%',
      }}
      drawerType="front"
      drawerContent={props => <SideBar {...props} />}
      drawerContentOptions={{
        width: Dimensions.get('window').width,
        activeBackgroundColor: '#3D4C28',
        inactiveBackgroundColor: '#3D4C28',
        activeTintColor: 'white',
        inactiveTintColor: 'white',
      }}>
      <DrawerHome.Screen
        component={PasswordModification}
        name="PasswordModif"
        options={{
          headerShown: true,
          headerTransparent: true,
          header: navigation => {
            return (
              <View
                style={{
                  width: Dimensions.get('window').width,
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  zIndex: 1000,
                  height:
                    orientation === 'PORTRAIT'
                      ? Platform.OS == 'ios'
                        ? h / 7
                        : h / 8
                      : Platform.OS == 'ios'
                      ? h / 5
                      : h / 8,
                }}>
                <View
                  style={{
                    zIndex: 10000,
                    marginLeft:
                      orientation === 'PORTRAIT'
                        ? h > 1018 && h < 1019
                          ? 480
                            ? '4%'
                            : '4%'
                          : '4%'
                        : Platform.OS === 'android'
                        ? w > 965 && w < 966
                          ? '8%'
                          : '2%'
                        : '5%',
                    marginTop:
                      orientation === 'PORTRAIT'
                        ? Platform.OS === 'android'
                          ? h > 1018 && h < 1019
                            ? 480
                              ? '0%'
                              : '0%'
                            : '2%'
                          : h === 736
                          ? '5%'
                          : h === 667
                          ? w === 375
                            ? '5%'
                            : '5%'
                          : h === 568
                          ? '3%'
                          : '9%'
                        : h === 540
                        ? w === 1152
                          ? '1%'
                          : '4%'
                        : w === 667
                        ? '1%'
                        : h === 480
                        ? '1%'
                        : w > 683 && w < 684
                        ? '1%'
                        : h === 432
                        ? '1%'
                        : h === 312
                        ? '0%'
                        : w > 753 && w < 754
                        ? '1%'
                        : h > 411 && h < 412
                        ? '1%'
                        : w > 718 && w < 719
                        ? '1%'
                        : w > 737 && w < 738
                        ? '1%'
                        : w > 759 && w < 760
                        ? '1%'
                        : h === 492
                        ? '0.5%'
                        : '0%',
                  }}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Connexion')}>
                    {orientation === 'LANDSCAPE' &&
                    Platform.OS === 'android' ? (
                      <Image
                        source={Logo}
                        style={{
                          width:
                            h === 432
                              ? w > 986 && w < 987
                                ? 160
                                : w > 1000 && w < 1100
                                ? 159
                                : w === 816
                                ? 160
                                : 140
                              : h > 411 && h < 412
                              ? 160
                              : h > 392 && h < 393
                              ? 150
                              : w === 1170
                              ? 190
                              : 130,
                          height:
                            h === 312
                              ? '94%'
                              : h === 432
                              ? w === 960
                                ? '89%'
                                : w === 816
                                ? '94%'
                                : '95%'
                              : h > 411 && h < 412
                              ? '95%'
                              : h > 392 && h < 393
                              ? '95%'
                              : w === 1170
                              ? '93%'
                              : w === 800
                              ? '89%'
                              : '77%',
                        }}
                      />
                    ) : (
                      <Image source={Logo} />
                    )}
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    width: Dimensions.get('window').width,
                    paddingBottom: 40,
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.dispatch(DrawerActions.toggleDrawer())
                    }
                    style={{
                      alignItems: 'flex-end',
                      marginRight:
                        orientation === 'PORTRAIT'
                          ? h > 1018 && h < 1019
                            ? '10%'
                            : '5%'
                          : Platform.OS === 'android'
                          ? h === 540
                            ? w === 1152
                              ? '3%'
                              : '10%'
                            : '2%'
                          : '5%',
                      marginTop:
                        orientation === 'PORTRAIT'
                          ? Platform.OS === 'android'
                            ? w === 480
                              ? '9%'
                              : w === 540
                              ? '8%'
                              : '12%'
                            : h === 736
                            ? '14%'
                            : h === 667
                            ? '16%'
                            : '18%'
                          : Platform.OS === 'android'
                          ? h === 312
                            ? w === 640
                              ? '5%'
                              : w === 740
                              ? '5%'
                              : '5%'
                            : w === 1080
                            ? '3%'
                            : w === 960
                            ? '2%'
                            : w === 1200
                            ? h === 492
                              ? '3%'
                              : '3%'
                            : '4%'
                          : w === 667
                          ? '6%'
                          : w === 736
                          ? '5%'
                          : w === 568
                          ? '7%'
                          : '4%',
                    }}>
                    <Icon
                      name="menu"
                      type="MaterialIcons"
                      style={{
                        color: '#C69D74',
                        fontSize:
                          w === 270 ? 40 : h === 360 ? 50 : w === 640 ? 50 : 60,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
        }}
      />
      <DrawerHome.Screen
        component={AccBis}
        name="Accueil"
        options={{
          drawerLabel: 'Accueil',
          headerShown: false,
          drawerIcon: () => {
            return (
              <Icon
                name="right"
                type="AntDesign"
                style={{
                  alignSelf: 'center',
                  position: 'absolute',
                  right: 5,
                  color: 'white',
                  fontSize: 20,
                  marginRight: orientation === 'PORTRAIT' ? '1%' : '2%',
                }}
              />
            );
          },
        }}
      />
      <DrawerHome.Screen
        component={ConnexionB}
        name="Connexion"
        options={{
          drawerLabel: 'Connexion',
          headerShown: false,
          drawerIcon: () => {
            return (
              <Icon
                name="right"
                type="AntDesign"
                style={{
                  alignSelf: 'center',
                  position: 'absolute',
                  right: 5,
                  color: 'white',
                  fontSize: 20,
                  marginRight: orientation === 'PORTRAIT' ? '1%' : '2%',
                }}
              />
            );
          },
        }}
      />

      <DrawerHome.Screen
        name="Inscription"
        component={InscriptionB}
        options={{
          drawerLabel: 'Inscription',
          drawerIcon: () => {
            return (
              <Icon
                name="right"
                type="AntDesign"
                style={{
                  alignSelf: 'center',
                  position: 'absolute',
                  right: 5,
                  color: 'white',
                  fontSize: 20,
                  marginRight: orientation === 'PORTRAIT' ? '1%' : '2%',
                }}
              />
            );
          },
        }}
      />

      <DrawerHome.Screen
        component={ReglementBisBis}
        name="Reglement"
        options={{
          drawerIcon: () => {
            return (
              <Icon
                name="right"
                type="AntDesign"
                style={{
                  alignSelf: 'center',
                  position: 'absolute',
                  right: 5,
                  color: 'white',
                  fontSize: 20,
                  marginRight: orientation === 'PORTRAIT' ? '1%' : '2%',
                }}
              />
            );
          },
        }}
      />
    </DrawerHome.Navigator>
  );
};

export default HomeNav;
