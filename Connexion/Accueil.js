import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import {Icon} from 'native-base';
import ImageMunition from '../assets/photo-munitions.jpg';
import FondB from '../assets/fond.jpg';

let Accueil = props => {
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

  return (
    <View style={{height: '100%', width: '100%'}}>
      <Image
        source={FondB}
        style={{
          width: Dimensions.get('window').width,
          position: 'absolute',
          height: '100%',
        }}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignContent: 'center',
          alignItems: 'center',
          flex: 0,
        }}>
        <Image
          source={ImageMunition}
          style={{
            position: 'absolute',
            width: Dimensions.get('window').width,
            height:
              orientation === 'PORTRAIT'
                ? Platform.OS === 'ios'
                  ? h / 2.3
                  : h / 2.1
                : Platform.OS === 'ios'
                ? '50%'
                : h / 1.65,
          }}
        />
        <View
          style={{
            width: Dimensions.get('window').width,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginTop:
              orientation === 'PORTRAIT'
                ? Platform.OS === 'android'
                  ? h > 718 && h < 750
                    ? h > 718 && h < 719
                      ? '19%'
                      : h > 748 && h < 749
                      ? '20%'
                      : h > 737 && h < 738
                      ? '20%'
                      : h === 732
                      ? '22%'
                      : '15%'
                    : h > 683 && h < 684
                    ? w > 411 && w < 412
                      ? '16%'
                      : '15%'
                    : h === 592
                    ? '12%'
                    : h === 1152
                    ? '30%'
                    : h > 1018 && h < 1019
                    ? '25%'
                    : h === 912
                    ? w === 480
                      ? '23%'
                      : '18%'
                    : w === 270
                    ? '11%'
                    : h === 672
                    ? '18%'
                    : h === 640
                    ? '15%'
                    : w === 480
                    ? h > 938 && h < 939
                      ? '22%'
                      : '28%'
                    : h === 1182
                    ? '35%'
                    : h === 1032
                    ? '28%'
                    : h === 1122
                    ? '32%'
                    : h > 830 && h < 831
                    ? '25%'
                    : h === 692
                    ? '20%'
                    : '22%'
                  : h > 900
                  ? '25%'
                  : h === 667
                  ? '13%'
                  : w === 414
                  ? h === 896
                    ? '25%'
                    : '16%'
                  : h === 568
                  ? '14%'
                  : '23%'
                : Platform.OS === 'android'
                ? h > 392 && h < 393
                  ? '5%'
                  : w > 986 && w < 987
                  ? '5%'
                  : w === 1152
                  ? '7%'
                  : h === 360
                  ? w === 752
                    ? '3%'
                    : w === 692
                    ? '3%'
                    : '4%'
                  : h === 384
                  ? '5%'
                  : w === 640
                  ? '1.5%'
                  : h === 432
                  ? '5%'
                  : h === 312
                  ? '1.2%'
                  : w > 748 && w < 749
                  ? '5%'
                  : w > 774 && w < 775
                  ? '5%'
                  : w === 800
                  ? '3%'
                  : '6%'
                : '6%',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              width:
                orientation === 'PORTRAIT'
                  ? Platform.OS === 'android'
                    ? h > 771 && h < 772
                      ? '100%'
                      : w === 480
                      ? h > 1018 && h < 1019
                        ? '90%'
                        : h > 938 && h < 939
                        ? '90%'
                        : '67%'
                      : w === 270
                      ? '100%'
                      : '85%'
                    : h === 568
                    ? '100%'
                    : '100%'
                  : Platform.OS === 'android'
                  ? '100%'
                  : '100%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize:
                  h === 1152
                    ? 25
                    : h > 1018 && h < 1019
                    ? 23
                    : h === 912
                    ? w === 480
                      ? 18
                      : 23
                    : h > 938 && h < 939
                    ? 23
                    : w === 270
                    ? 13
                    : h === 568
                    ? 15
                    : 17,
                color: 'white',
                fontFamily: 'OpenSans-SemiBold',
                width:
                  orientation === 'PORTRAIT'
                    ? w > 411 && w < 412
                      ? h > 748 && h < 749
                        ? '100%'
                        : h > 774 && h < 775
                        ? '100%'
                        : h > 683 && h < 684
                        ? '100%'
                        : '80%'
                      : h === 592
                      ? '100%'
                      : h === 1152
                      ? '98%'
                      : Platform.OS === 'android'
                      ? h === 672
                        ? '100%'
                        : h === 640
                        ? '100%'
                        : h === 432
                        ? '100%'
                        : w === 480
                        ? '100%'
                        : h === 692
                        ? '100%'
                        : h === 752
                        ? '100%'
                        : h === 712
                        ? '100%'
                        : h > 701 && h < 702
                        ? '100%'
                        : h === 732
                        ? '100%'
                        : h > 830 && h < 831
                        ? '100%'
                        : '90%'
                      : h === 568
                      ? '85%'
                      : '80%'
                    : '100%',
              }}>
              Bienvenue sur l'application SIDAM qui vous permet de bénéficier
              d'une
            </Text>
            <View
              style={{
                width: w / 1.7,
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize:
                    h === 1152
                      ? 40
                      : h > 1018 && h < 1019
                      ? 40
                      : h === 912
                      ? 40
                      : h > 938 && h < 939
                      ? 40
                      : w === 270
                      ? 25
                      : h === 568
                      ? 25
                      : 33,
                  fontFamily: 'OpenSans-ExtraBold',
                  textAlign: 'center',
                  color: 'white',
                  textTransform: 'uppercase',
                }}>
                extension
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize:
                    h === 1152
                      ? 40
                      : h > 1018 && h < 1019
                      ? 40
                      : h === 912
                      ? 40
                      : h > 938 && h < 939
                      ? 40
                      : w === 270
                      ? 25
                      : h === 568
                      ? 25
                      : 33,
                  fontFamily: 'OpenSans-ExtraBold',
                  textAlign: 'center',
                  color: 'white',
                  textTransform: 'uppercase',
                }}>
                de garantie
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize:
                    h === 1152
                      ? 40
                      : h > 1018 && h < 1019
                      ? 40
                      : h === 912
                      ? 40
                      : h > 938 && h < 939
                      ? 40
                      : w === 270
                      ? 25
                      : h === 568
                      ? 25
                      : 33,
                  fontFamily: 'OpenSans-ExtraBold',
                  textAlign: 'center',
                  color: 'white',
                  textTransform: 'uppercase',
                }}>
                de votre arme
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            width:
              w === 480
                ? '60%'
                : h === 912
                ? '60%'
                : h === 360
                ? w === 752
                  ? '60%'
                  : w === 692
                  ? '45%'
                  : '50%'
                : h === 1182
                ? '60%'
                : h === 1032
                ? '60%'
                : h === 1122
                ? '60%'
                : '70%',
            marginTop:
              orientation === 'PORTRAIT'
                ? Platform.OS === 'android'
                  ? h > 683 && h < 684
                    ? '20%'
                    : h === 592
                    ? '14%'
                    : w === 480
                    ? h > 1018 && h < 1019
                      ? '35%'
                      : w === 480
                      ? h === 912
                        ? '26%'
                        : '35%'
                      : '25%'
                    : h === 1152
                    ? '30%'
                    : w === 270
                    ? '15%'
                    : h === 1182
                    ? '38%'
                    : h === 1032
                    ? '30%'
                    : h === 1122
                    ? '35%'
                    : h > 830 && h < 831
                    ? '35%'
                    : '27%'
                  : h > 900
                  ? '30%'
                  : h === 667
                  ? '20%'
                  : Platform.OS === 'ios'
                  ? h === 568
                    ? '23%'
                    : h === 736
                    ? '20%'
                    : '28%'
                  : '25%'
                : Platform.OS === 'android'
                ? h === 312
                  ? '5%'
                  : '10%'
                : '10%',
          }}>
          <Text
            style={{
              color: '#636A28',
              textAlign: 'center',
              fontSize: w === 270 ? 20 : 27,
              fontFamily: 'OpenSans-ExtraBold',
            }}>
            Accéder à votre râtelier virtuel
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#636A28',
              width:
                orientation === 'PORTRAIT' ? '80%' : h === 360 ? '70%' : '50%',
              height: 40,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}
            onPress={() => props.navigation.navigate('Connexion')}>
            <Text
              style={{
                color: 'white',
                fontSize: w === 270 ? 14 : 17,
                fontFamily: 'OpenSans-SemiBold',
              }}>
              Se connecter
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
                        ? 130
                        : 175
                      : h === 360
                      ? 180
                      : h === 384
                      ? 180
                      : w === 640
                      ? 190
                      : 210
                    : '85%',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#6D9FB2',
              width:
                orientation === 'PORTRAIT' ? '80%' : h === 360 ? '70%' : '50%',
              height: 40,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
            onPress={() => props.navigation.navigate('Reglement')}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: w === 270 ? 14 : 17,
                fontFamily: 'OpenSans-SemiBold',
              }}>
              Réglement
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
                        ? 130
                        : 175
                      : h === 360
                      ? 180
                      : h === 384
                      ? 180
                      : w === 640
                      ? 180
                      : 210
                    : '85%',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 50}}></View>
      </ScrollView>
    </View>
  );
};

export default Accueil;
