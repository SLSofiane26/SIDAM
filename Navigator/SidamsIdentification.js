import {
  View,
  Text,
  Dimensions,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-date-picker';
import CZ from '../assets/CZ.png';
import SW from '../assets/sw.png';
import MAG from '../assets/MAG.png';
import SEL from '../assets/SEL.png';
import {Icon} from 'native-base';

let SidamsIdentification = props => {
  let [orientation, setOrientation] = useState(null);
  let [date, setDate] = useState(false);
  let [majeurBis, setMajeurBis] = useState(false);
  let [error, setMajeurError] = useState(false);
  let [age, setAge] = useState(new Date());
  let [DD, setDD] = useState(false);

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

  let handleDate = date => {
    setAge(date);
    setDate(false);
    setDD(true);
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

  let dateBBB = null;

  let dateBBBC = null;

  if (age) {
    let mois = new Date(age).getMonth() + 1;
    let jours = new Date(age).getDate();
    let annee = new Date(age).getFullYear();

    if (jours < 10) {
      jours = '0' + jours;
    }

    if (mois < 10) {
      mois = '0' + mois;
    }

    dateBBB = `${jours}/${mois}/${annee}`;

    dateBBBC = dateBBB.toString();
  }

  let handleDateBis = date => {
    setAge(date);
    dateC = true;
  };

  if (error) {
    setTimeout(() => {
      setMajeurError(false);
    }, 2000);
  }

  let handleMajeur = () => {
    if (age) {
      let d = new Date(age).getTime();
      let today = new Date().getTime();
      let an = today - d;
      let majeur = an / 31536000000;

      if (majeur >= 18) {
        props.navigation.navigate('Validate');
      } else {
        setMajeurBis(true);
      }
    } else {
      setMajeurError(true);
    }
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: '#999D3B',
      }}
      contentContainerStyle={{
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: w,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          marginTop:
            orientation === 'PORTRAIT'
              ? Platform.OS === 'android'
                ? h > 737 && h < 738
                  ? '7%'
                  : h > 683 && h < 684
                  ? '0%'
                  : h === 592
                  ? '1%'
                  : h === 1152
                  ? '30%'
                  : h > 1018 && h < 1019
                  ? '25%'
                  : h === 912
                  ? '12%'
                  : h > 938 && h < 939
                  ? '18%'
                  : w === 270
                  ? h === 432
                    ? '3%'
                    : '5%'
                  : h === 640
                  ? '0%'
                  : h === 752
                  ? '10%'
                  : h === 712
                  ? '10%'
                  : h > 753 && h < 754
                  ? '10%'
                  : h > 771 && h < 772
                  ? '10%'
                  : h > 718 && h < 719
                  ? '10%'
                  : h === 816
                  ? '10%'
                  : h > 759 && h < 760
                  ? '10%'
                  : h > 748 && h < 749
                  ? '10%'
                  : h === 692
                  ? '10%'
                  : h > 774 && h < 775
                  ? '10%'
                  : h === 1024
                  ? '25%'
                  : h === 672
                  ? '5%'
                  : h === 1182
                  ? '30%'
                  : h > 701 && h < 702
                  ? '10%'
                  : h === 732
                  ? '10%'
                  : h === 1122
                  ? '30%'
                  : h === 1008
                  ? '28%'
                  : '20%'
                : h > 900
                ? '20%'
                : h === 667
                ? '2%'
                : h === 736
                ? '5%'
                : h === 568
                ? '5%'
                : '15%'
              : h === 540
              ? '4%'
              : 0,
        }}>
        <View
          style={{
            width:
              orientation === 'PORTRAIT'
                ? h === 568
                  ? '70%'
                  : '65%'
                : Platform.OS === 'ios'
                ? '60%'
                : '40%',
          }}>
          <Text
            style={{
              fontFamily: 'OpenSans-ExtraBold',
              fontSize: w === 270 ? 20 : 30,
              textAlign: 'center',
              color: 'white',
            }}>
            EXTENSION DE GARANTIE DE VOS ARMES
          </Text>
        </View>
        <View
          style={{
            marginTop: orientation === 'PORTRAIT' ? '5%' : '3%',
            alignItems: 'center',
          }}>
          {h === 432 && Platform.OS === 'android' ? (
            <Image source={SEL} style={{width: 200, height: 23}} />
          ) : (
            <Image source={SEL} />
          )}

          <Image source={MAG} />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '5%',
            }}>
            {h === 432 && Platform.OS === 'android' ? (
              <Image
                source={SW}
                style={{
                  width: w === 270 ? 125 : 140,
                  marginLeft:
                    w === 270
                      ? '0%'
                      : orientation === 'PORTRAIT'
                      ? '10%'
                      : '4%',
                  height: w === 270 ? 50 : 56,
                }}
              />
            ) : (
              <Image source={SW} />
            )}

            {h === 432 && Platform.OS === 'android' ? (
              <Image source={CZ} style={{width: 130, height: 51}} />
            ) : (
              <Image source={CZ} />
            )}
          </View>
        </View>
        <View>
          {error && (
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              Veuilez saisir votre jour de naissance
            </Text>
          )}
        </View>
        <View
          style={{
            width: '100%',
            alignContent: 'center',
            alignItems: 'center',
            marginTop:
              orientation === 'PORTRAIT'
                ? Platform.OS === 'android'
                  ? '5%'
                  : '15%'
                : '0%',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Bold',
              fontSize: w === 270 ? 20 : 25,
              textAlign: 'center',
              marginTop:
                orientation === 'PORTRAIT'
                  ? date
                    ? Platform.OS === 'android'
                      ? '5%'
                      : '10%'
                    : '0%'
                  : Platform.OS === 'ios'
                  ? '10%'
                  : date
                  ? 50
                  : 50,
              width:
                orientation === 'PORTRAIT'
                  ? h === 1152
                    ? '80%'
                    : h === 912
                    ? '80%'
                    : h === 1182
                    ? '70%'
                    : h === 1032
                    ? '70%'
                    : h === 1122
                    ? '70%'
                    : '90%'
                  : '100%',
            }}>
            Application réservée aux plus de 18 ans
          </Text>
        </View>
      </View>
      {majeurBis && (
        <Text
          style={{
            color: 'white',
            fontFamily: 'Poppins-Regular',
            fontSize: w === 270 ? 12 : 16,
            textAlign: 'center',
            marginTop: 15,
          }}>
          Vous n'avez pas l'age requis pour accéder à cette application
        </Text>
      )}

      <View
        style={{
          marginTop: 10,
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => setDate(!date)}
          style={{
            backgroundColor: '#999D3B',
            marginTop: 10,
            borderWidth: 1,
            color: 'white',
            borderColor: '#3D4C28',
            width: orientation === 'PORTRAIT' ? w / 1.2 : w / 2,
            height: 50,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              paddingLeft: 10,
              fontFamily: 'Poppins-Regular',
              fontSize: w === 270 ? 11 : 14,
              color: 'white',
            }}>
            {DD ? dateBBBC : 'Quelle est votre date de naissance ?'}
          </Text>
        </TouchableOpacity>
        {Platform.OS === 'ios' ? (
          <DateTimePickerModal
            locale="fr-FR"
            isVisible={date}
            headerTextIOS="Date de naissance"
            confirmTextIOS="Confirmer"
            cancelTextIOS="Annuler"
            onConfirm={handleDate}
            onCancel={() => setDate(false)}
            mode="date"
            date={new Date()}
          />
        ) : (
          date && (
            <DatePicker
              date={age}
              onDateChange={handleDateBis}
              minimumDate={new Date('1920-12-31')}
              locale="fr"
              mode="date"
              androidVariant="nativeAndroid"
              textColor="white"
              fadeToColor="#999D3B"
              style={{
                marginTop: 10,
              }}
            />
          )
        )}
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => handleMajeur()}
          style={{
            backgroundColor: '#636A28',
            width: 200,
            height: w === 270 ? 30 : 40,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Text
            style={{
              textAlign: 'center',
              paddingTop: Platform.OS === 'ios' ? 0 : 2,
              color: 'white',
              fontFamily: 'Poppins-Regular',
              fontSize: w === 270 ? 14 : 16,
            }}>
            Confirmer
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
      {Platform.OS === 'android' && (
        <View
          style={{
            marginTop:
              orientation === 'PORTRAIT'
                ? date
                  ? '10%'
                  : h === 640
                  ? '10%'
                  : h === 592
                  ? '10%'
                  : h === 432
                  ? '10%'
                  : '0%'
                : date
                ? '5%'
                : '5%',
          }}></View>
      )}

      {orientation === 'LANDSCAPE' || majeurBis ? (
        <View style={{marginTop: Platform.OS === 'ios' ? '5%' : '0%'}}></View>
      ) : null}
    </ScrollView>
  );
};

export default SidamsIdentification;
