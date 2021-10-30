import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Accounts from '../User/Accounts';
import Add from '../User/Add';
import Factures from '../User/Factures';
import Contact from '../User/Contact';
import {Icon} from 'native-base';
import Logout from './Logout';
import Mentions from '../User/Mentions';
import {createStackNavigator} from '@react-navigation/stack';
import ArmesBis from '../User/ArmesBis';
import {
  Dimensions,
  Platform,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import AddArmes from '../User/AddArmes';
import DeleteArme from '../User/DeleteArme';
import {useState, useEffect} from 'react';
import UserModification from '../User/UserModification';
import UserAccount from '../User/UserAccount';
import ReglementBis from './ReglementBis';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import SideBar from './SideBar';
import Logo from '../assets/logo.png';

enableScreens();

let UserHome = createDrawerNavigator();

let ArmeB = createStackNavigator();

let AccountB = createStackNavigator();

let FactureB = createStackNavigator();

let Reglement = createStackNavigator();

let ContactB = createStackNavigator();

let MentionsB = createStackNavigator();

let UserNav = () => {
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

  let Contactbb = props => {
    return (
      <ContactB.Navigator
        initialRouteName="Contact"
        screenOptions={{
          header: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
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
                    onPress={() => props.navigation.navigate('Accueil')}>
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
        <ContactB.Screen component={Contact} name="Contact" />
      </ContactB.Navigator>
    );
  };

  let Mentionbb = props => {
    return (
      <MentionsB.Navigator
        initialRouteName="Mentions"
        screenOptions={{
          header: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
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
                    onPress={() => props.navigation.navigate('Accueil')}>
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
        <MentionsB.Screen component={Mentions} name="Mentions" />
      </MentionsB.Navigator>
    );
  };

  let FactureBB = props => {
    return (
      <FactureB.Navigator
        initialRouteName="MesFactures"
        screenOptions={{
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
                    onPress={() => props.navigation.navigate('Accueil')}>
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
        <FactureB.Screen component={Factures} name="MesFactures" />
      </FactureB.Navigator>
    );
  };

  let ReglementB = props => {
    return (
      <Reglement.Navigator initialRouteName="Reglement">
        <Reglement.Screen
          name="Reglement"
          component={ReglementBis}
          options={{
            headerShown: true,
            header: () => {
              return (
                <View
                  style={{
                    backgroundColor: 'white',
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
                      onPress={() => props.navigation.navigate('Accueil')}>
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
      </Reglement.Navigator>
    );
  };

  let Armebb = props => {
    return (
      <ArmeB.Navigator initialRouteName="Armes">
        <ArmeB.Screen
          name="Armes"
          component={ArmesBis}
          options={{
            headerTransparent: true,
            header: props => {
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
                      onPress={() => props.navigation.navigate('Accueil')}>
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
        <ArmeB.Screen
          name="AddBis"
          component={AddArmes}
          options={{
            headerTransparent: true,
            header: props => {
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
                      onPress={() => props.navigation.navigate('Accueil')}>
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

        <ArmeB.Screen
          component={Add}
          name="ArmesBis"
          options={{
            header: props => {
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
                      onPress={() => props.navigation.navigate('Accueil')}>
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

        <ArmeB.Screen
          component={DeleteArme}
          name="Delete"
          options={{
            headerTransparent: true,
            header: props => {
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
                      onPress={() => props.navigation.navigate('Accueil')}>
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
      </ArmeB.Navigator>
    );
  };

  let AccountBB = props => {
    return (
      <AccountB.Navigator
        initialRouteName="Accueil"
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
                    onPress={() => props.navigation.navigate('Accueil')}>
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
        <AccountB.Screen component={UserModification} name="Modification" />
        <AccountB.Screen component={UserAccount} name="UserAccount" />
        <AccountB.Screen component={Accounts} name="Accueil" />
      </AccountB.Navigator>
    );
  };

  return (
    <NavigationContainer independent={true}>
      <UserHome.Navigator
        initialRouteName="Accueil"
        drawerStyle={{
          backgroundColor: 'transparent',
          width: '93%',
        }}
        drawerType="front"
        drawerContent={props => <SideBar {...props} />}
        drawerContentOptions={{
          width: Dimensions.get('window').width,
          activeBackgroundColor: '#999D3B',
          inactiveBackgroundColor: '#3D4C28',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        }}>
        <UserHome.Screen
          name="Accueil"
          component={AccountBB}
          options={{
            drawerLabel: 'Accueil',
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

        <UserHome.Screen
          name="Add"
          component={Armebb}
          options={{
            drawerLabel: 'Mon coffre-fort',
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
        <UserHome.Screen
          name="Mes certificats de garantie"
          component={FactureBB}
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

        <UserHome.Screen
          name="Contact"
          component={Contactbb}
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
        <UserHome.Screen
          name="Reglement"
          component={ReglementB}
          options={{
            drawerLabel: 'Réglement',
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
        <UserHome.Screen
          name="Mentions légales"
          component={Mentionbb}
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
        <UserHome.Screen
          name="Déconnexion"
          component={Logout}
          options={{
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
      </UserHome.Navigator>
    </NavigationContainer>
  );
};

export default UserNav;
