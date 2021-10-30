import {View, Image, Dimensions, Text, Platform} from 'react-native';
import React, {useRef, useState} from 'react';
import ImageMunition from '../assets/photo-munitions.jpg';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import {Icon} from 'native-base';
import {SafeAreaView} from 'react-native';
import FondB from '../assets/fond.jpg';

let SidamValidate = React.memo(function SidamValidate(props) {
  let [orientation, setOrientation] = useState(null);

  let w = Dimensions.get('window').width;
  let h = Dimensions.get('window').height;

  let cc = false;

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

  let _refScroll = useRef(null);

  let handleScroll = () => {
    _refScroll.current.scrollToEnd({
      index: 0,
      animated: true,
    });
  };

  let handleNavigate = () => {
    props.navigation.navigate('Accueil');
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

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View>
        <Image
          source={FondB}
          style={{
            width: Dimensions.get('window').width,
            position: 'absolute',
            height: h,
          }}
        />
      </View>
      <ScrollView
        ref={_refScroll}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignContent: 'center',
          alignItems: 'center',
          height: 'auto',
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
                ? h / 1.45
                : h / 1.5,
          }}
        />
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            flex: 1,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop:
                orientation === 'PORTRAIT'
                  ? Platform.OS === 'android'
                    ? w > 411 && w < 412
                      ? h > 771 && h < 772
                        ? '19%'
                        : h > 748 && h < 749
                        ? '18%'
                        : h > 774 && h < 775
                        ? '20%'
                        : h > 683 && h < 684
                        ? '13%'
                        : '12%'
                      : h > 718 && h < 759
                      ? w > 392 && w < 393
                        ? h > 718 && h < 719
                          ? '16%'
                          : '19%'
                        : h === 752
                        ? '19%'
                        : '15%'
                      : h > 718 && h < 719
                      ? '13%'
                      : h === 816
                      ? '20%'
                      : h > 760 && h < 800
                      ? '13%'
                      : h > 759 && h < 760
                      ? '20%'
                      : h === 592
                      ? w === 384
                        ? '9%'
                        : w === 360
                        ? '5%'
                        : '0%'
                      : w === 480
                      ? h > 938 && h < 939
                        ? '15%'
                        : w === 480
                        ? h > 1018 && h < 1019
                          ? '20%'
                          : h === 1024
                          ? '30%'
                          : h === 912
                          ? '15%'
                          : '25%'
                        : '20%'
                      : h === 1152
                      ? '22%'
                      : h === 912
                      ? '15%'
                      : h === 672
                      ? '12%'
                      : w === 270
                      ? '5%'
                      : h === 692
                      ? '15%'
                      : h === 712
                      ? '15%'
                      : h === 1182
                      ? '33%'
                      : h > 701 && h < 702
                      ? '15%'
                      : h === 1032
                      ? '30%'
                      : h === 1122
                      ? '30%'
                      : h > 830 && h < 831
                      ? '22%'
                      : '9%'
                    : h > 900
                    ? '20%'
                    : h === 667
                    ? '10%'
                    : h === 736
                    ? '13%'
                    : h === 896
                    ? '19%'
                    : h === 568
                    ? '8%'
                    : '17%'
                  : Platform.OS === 'android'
                  ? w > 753 && w < 754
                    ? '6%'
                    : h > 392 && h < 393
                    ? '6%'
                    : w > 986 && w < 987
                    ? '6%'
                    : h === 360
                    ? w === 752
                      ? '5%'
                      : '6%'
                    : w === 640
                    ? '3%'
                    : h === 432
                    ? w === 816
                      ? '7%'
                      : '6%'
                    : h === 312
                    ? '2%'
                    : w > 748 && w < 749
                    ? '7%'
                    : w > 774 && w < 775
                    ? '7%'
                    : h === 492
                    ? '7%'
                    : w === 800
                    ? '4%'
                    : '8%'
                  : w === 568
                  ? '2%'
                  : '6%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontFamily: 'OpenSans-SemiBold',
                fontSize:
                  h === 1152
                    ? 25
                    : h > 1018 && h < 1019
                    ? 23
                    : h === 912
                    ? 23
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
                    ? '60%'
                    : w === 568
                    ? '70%'
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
            width: '100%',
            marginTop: orientation === 'PORTRAIT' ? 0 : '10%',
          }}>
          <View>
            <View
              style={{
                display: 'flex',
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginTop:
                  orientation === 'PORTRAIT'
                    ? Platform.OS === 'android'
                      ? w > 411 && w < 412
                        ? '20%'
                        : h > 718 && h < 800
                        ? '19%'
                        : h === 816
                        ? '22%'
                        : w === 384
                        ? '10%'
                        : w === 480
                        ? h > 981 && h < 982
                          ? '30%'
                          : h === 912
                          ? '20%'
                          : '30%'
                        : h === 1152
                        ? '30%'
                        : h === 912
                        ? '20%'
                        : h === 712
                        ? '20%'
                        : h === 1182
                        ? '40%'
                        : h > 701 && h < 702
                        ? '15%'
                        : h === 1032
                        ? '35%'
                        : h === 1122
                        ? '40%'
                        : h > 830 && h < 831
                        ? '30%'
                        : '10%'
                      : h === 667
                      ? '20%'
                      : h === 736
                      ? '20%'
                      : h === 568
                      ? '15%'
                      : '30%'
                    : '10%',
                width: '95%',
                marginLeft: '3%',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: orientation === 'PORTRAIT' ? 'black' : 'white',
                  fontSize: w === 360 ? 13 : w === 270 ? 12 : 14,
                }}>
                1°) Créez gratuitement votre compte
              </Text>
              <Text
                style={{
                  marginTop: '2%',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: w === 360 ? 13 : w === 270 ? 12 : 14,
                  color: orientation === 'PORTRAIT' ? 'black' : 'white',
                }}>
                2°) Enregistrez vos nouvelles armes de marque CZ et Smith &
                Wesson dans votre coffre-fort virtuel
              </Text>
              <Text
                style={{
                  marginTop: '2%',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: w === 360 ? 13 : w === 270 ? 12 : 14,
                  color: orientation === 'PORTRAIT' ? 'black' : 'white',
                }}>
                3°) Enregistrez vos achats de munitions de marque SELLIER &
                BELLOT et MAGTECH pour chaque arme
              </Text>
              <Text
                style={{
                  marginTop: '2%',
                  fontFamily: 'Poppins-SemiBold',
                  textAlign: 'center',
                  color: 'red',
                  fontSize: w === 360 ? 13 : w === 270 ? 12 : 14,
                }}>
                Bénéficiez d'une extension de 3 mois de garanties par tranche de
                500 munitions achetées.
              </Text>
            </View>
            <View style={{alignSelf: 'flex-end', marginRight: '5%'}}>
              <TouchableOpacity onPress={() => handleScroll()}>
                <Icon
                  name="angle-double-down"
                  type="FontAwesome"
                  style={{
                    fontSize: w === 360 ? 60 : 80,
                    color: orientation === 'PORTRAIT' ? 'black' : 'white',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: '50%',
          }}></View>
        <View>
          <View
            style={{
              width: '97%',
              backgroundColor: 'white',
              marginTop:
                orientation === 'PORTRAIT'
                  ? '0%'
                  : Platform.OS === 'android'
                  ? '0%'
                  : '2%',
              padding: orientation === 'PORTRAIT' ? '2%' : '1%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-Bold',
                marginTop:
                  orientation === 'PORTRAIT'
                    ? '0%'
                    : Platform.OS === 'android'
                    ? '0%'
                    : '2%',
              }}>
              Détail de l'offre :{' '}
            </Text>
            <Text
              style={{
                marginTop:
                  orientation === 'PORTRAIT'
                    ? w === 384
                      ? '0%'
                      : '5%'
                    : Platform.OS === 'android'
                    ? '0%'
                    : '2%',
                fontFamily: 'Poppins-SemiBold',
                fontSize:
                  w === 360 || h == 568
                    ? 12
                    : h === 1152
                    ? 16
                    : w === 270
                    ? 12
                    : 14,
              }}>
              • A partir de la date d'achat de l'arme, la durée de garantie de
              l'arme est de 2 ans
            </Text>
            <Text
              style={{
                marginTop:
                  orientation === 'PORTRAIT'
                    ? w === 384
                      ? '0%'
                      : '5%'
                    : Platform.OS === 'android'
                    ? '0%'
                    : '2%',
                fontFamily: 'Poppins-SemiBold',
                fontSize:
                  w === 360 || h == 568
                    ? 12
                    : h === 1152
                    ? 16
                    : w === 270
                    ? 12
                    : 14,
              }}>
              • A partir de la date d'achat de l'arme, le détenteur doit dans
              les 3 mois acquérir 500 munitions correspondantes à ladite arme,
              dans les marques SELLIER & BELLOT et ou MAGTECH. La date butoir
              d'achat des 500 munitions est calculée de la façon suivante : date
              d'achat + 3 mois. Cette quantité peut être acquise en une ou
              plusieurs fois. Une fois ces 500 munitions déclarées, la durée de
              garantie initiale est automatiquement prolongée de 3 mois. (c'est
              à dire 2 ans date d'achat + 3 mois)
            </Text>
            <Text
              style={{
                marginTop:
                  orientation === 'PORTRAIT'
                    ? w === 384
                      ? '0%'
                      : '5%'
                    : Platform.OS === 'android'
                    ? '0%'
                    : '2%',
                fontFamily: 'Poppins-SemiBold',
                fontSize:
                  w === 360 || h == 568
                    ? 12
                    : h === 1152
                    ? 16
                    : w === 270
                    ? 12
                    : 14,
              }}>
              • Une nouvelle période d'acquisition de 500 munitions de 3 mois
              est automatiquement renouvelée tous les achats de 500 munitions.
              La date butoir d'acquisition est automatiquement prolongée de 3
              mois.
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#636A28',
              width: orientation === 'PORTRAIT' ? '60%' : '30%',
              height: 40,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 30,
              marginLeft: orientation === 'PORTRAIT' ? '20%' : '35%',
            }}
            onPress={() => handleNavigate()}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontFamily: 'OpenSans-SemiBold',
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
                    ? h === 640
                      ? 175
                      : w > 731 && w < 732
                      ? 170
                      : w === 270
                      ? 130
                      : w === 640
                      ? 165
                      : 172
                    : '85%',
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop:
              orientation === 'PORTRAIT'
                ? Platform.OS === 'android'
                  ? h > 683 && h < 684
                    ? '10%'
                    : h === 592
                    ? w === 384
                      ? '4%'
                      : '10%'
                    : h === 1152
                    ? '60%'
                    : h > 1018 && h < 1019
                    ? '60%'
                    : h === 912
                    ? '40%'
                    : h > 938 && h < 939
                    ? '40%'
                    : w === 270
                    ? '0%'
                    : w === 480
                    ? '40%'
                    : h === 1182
                    ? '50%'
                    : h === 1032
                    ? '40%'
                    : h === 1122
                    ? '60%'
                    : h > 830 && h < 831
                    ? '40%'
                    : '20%'
                  : h > 900
                  ? '40%'
                  : h === 667
                  ? '10%'
                  : h === 568
                  ? '10%'
                  : '30%'
                : Platform.OS === 'android'
                ? '5%'
                : '0%',
          }}></View>
      </ScrollView>
    </SafeAreaView>
  );
});

export default SidamValidate;
