import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  RefreshControl,
  Image,
} from 'react-native';
import {Text} from 'native-base';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import {API_URL} from '@env';
import {useSelector} from 'react-redux';
import {Icon} from 'native-base';
import RevoSW from '../assets/3.png';
import PistCZ from '../assets/2.png';
import PistSW from '../assets/1.png';
import CaraSW from '../assets/4.png';
import CaraCZ from '../assets/5.png';
import Spinner from 'react-native-spinkit';

let FactureBis = React.memo(function FactureBis(props) {
  let [factures, setFactures] = useState(null);
  let [orientation, setOrientation] = useState(null);
  let [loading, setLoading] = useState(false);
  let [refreshFacture, setRefreshFacture] = useState(false);

  let token = useSelector(state => state.token);

  let cc = false;

  let w = Dimensions.get('window').width;
  let h = Dimensions.get('window').height;

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

  //permet de renvoyer sont certificat par email//
  let handleDownloadBis = async data => {
    setLoading(true);
    let b = {};
    b.file = data.file;
    await axios({
      method: 'POST',
      baseURL: `${API_URL}/api/pdfbis`,
      headers: {'x-auth-token': token},
      data: b,
    })
      .then(res => {
        setFactures(true);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  //permet de télécharger sont certificat sur son téléphone//
  let handleDownload = async (data, dataB) => {
    let {dirs} = RNFetchBlob.fs;
    let dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DCIMDir;

    let configOptions = Platform.select({
      ios: {
        fileCache: true,
        title: 'EXTENSIONDEGARANTIE.pdf',
        path: `${dirToSave}/EXTENSIONDEGARANTIE.pdf`,
        appendExt: 'pdf',
      },
      android: {
        fileCache: true,
        notification: true,
        mediaScannable: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: 'EXTENSIONDEGARANTIE.pdf',
          path: `${dirToSave}/EXTENSIONDEGARANTIE.pdf`,
        },
      },
    });

    RNFetchBlob.config(configOptions)
      .fetch('GET', `${API_URL}${data}`)
      .then(res => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(configOptions.path, res.dataB, 'base64');
          RNFetchBlob.ios.previewDocument(configOptions.path);
          handleDownloadBis(dataB);
        } else {
          handleDownloadBis(dataB);
        }
      });
  };

  let ItemBis = item => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <TouchableOpacity>
            {item.item.type === 'REVOLVERSMITHWESSON' && (
              <Image source={RevoSW} />
            )}
            {item.item.type === 'PISTOLETSMITHWESSON' && (
              <Image source={PistSW} />
            )}
            {item.item.type === 'CARABINESMITHWESSON' && (
              <Image source={CaraSW} />
            )}
            {item.item.type === 'PISTOLETCZ' && <Image source={PistCZ} />}
            {item.item.type === 'CARABINECZ' && <Image source={CaraCZ} />}
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              marginTop: 13,
              fontSize: 16,
              color: 'black',
              marginTop: 13,
              fontFamily: 'Poppins-Regular',
            }}>
            Type :{' '}
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontFamily: 'Poppins-Bold',
              }}>
              {item.item.type === 'PISTOLETSMITHWESSON' &&
                'Pistolet Smith&Wesson'}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontFamily: 'Poppins-Bold',
              }}>
              {item.item.type === 'CARABINESMITHWESSON' &&
                'Carabine Smith&Wesson'}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontFamily: 'Poppins-Bold',
              }}>
              {item.item.type === 'REVOLVERSMITHWESSON' &&
                'Revolver Smith&Wesson'}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontFamily: 'Poppins-Bold',
              }}>
              {item.item.type === 'PISTOLETCZ' && 'Pistolet CZ'}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontFamily: 'Poppins-Bold',
              }}>
              {item.item.type === 'CARABINECZ' && 'Carabine CZ'}
            </Text>
          </Text>
          <Text
            style={{
              marginTop: 15,
              textAlign: 'left',
              fontSize: 16,
              color: 'black',
              marginTop: 3,
              fontFamily: 'Poppins-Regular',
            }}>
            Modèle :{' '}
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontFamily: 'Poppins-Regular',
              }}>
              {item.item.modele}
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            item.item.valider ? handleDownload(item.item.file, item.item) : null
          }
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            backgroundColor: item.item.valider ? '#999D3B' : '#6D9FB2',
            marginTop: orientation === 'PORTRAIT' ? 15 : 15,
            height: 50,
            width:
              orientation === 'PORTRAIT' ? '55%' : h === 320 ? '35%' : '30%',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              width:
                orientation === 'PORTRAIT'
                  ? h === 568
                    ? w / 1.6
                    : w === 480
                    ? w / 2.5
                    : w === 540
                    ? w / 2.5
                    : w / 2
                  : Platform.OS === 'android'
                  ? w > 986 && w < 987
                    ? '80%'
                    : w === 592
                    ? '100%'
                    : w > 1018 && w < 1019
                    ? '70%'
                    : h === 432
                    ? '60%'
                    : h === 480
                    ? '70%'
                    : w === 800
                    ? '80%'
                    : h === 492
                    ? '60%'
                    : w > 878 && w < 879
                    ? '70%'
                    : '90%'
                  : w === 736
                  ? '80%'
                  : w === 568
                  ? h === 320
                    ? '100%'
                    : '60%'
                  : w === 667
                  ? '85%'
                  : '75%',
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 17,
            }}>
            {item.item.valider
              ? 'Télécharger mon certificat de garantie'
              : 'En cours de validation'}
          </Text>
          <Icon
            name="right"
            type="AntDesign"
            style={{
              fontSize: 15,
              color: 'white',
              position: 'absolute',
              paddingLeft: orientation === 'PORTRAIT' ? '85%' : '80%',
            }}
          />
        </TouchableOpacity>

        <View style={{marginTop: 20}}></View>
      </View>
    );
  };

  if (factures) {
    setTimeout(() => {
      setFactures(null);
    }, 5000);
  }

  let refrechF = () => {
    setRefreshFacture(true);
    props.handleFetch();
    setTimeout(() => {
      setRefreshFacture(false);
    }, 1000);
  };

  return (
    props.dataFacture && (
      <View
        style={{
          marginTop:
            Platform.OS === 'android'
              ? h > 830 && h < 831
                ? orientation === 'PORTRAIT'
                  ? '10%'
                  : '4%'
                : '2%'
              : orientation === 'PORTRAIT'
              ? '8%'
              : '2%',
        }}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshFacture}
              onRefresh={refrechF}
              colors={['#999D3B']}
              tintColor={['#999D3B']}
              title="Chargement"
            />
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(items, index) => {
            return items._id;
          }}
          style={{
            zIndex: 100,
            height: '100%',
          }}
          data={props.dataFacture}
          numColumns={1}
          renderItem={ItemBis}
        />
        <View
          style={{position: 'absolute', alignSelf: 'center', zIndex: 10000}}>
          <Spinner
            isVisible={loading}
            size={150}
            type="WanderingCubes"
            color={'#999D3B'}
          />
        </View>

        {factures && (
          <View
            style={{
              marginTop: 50,
              position: 'absolute',
              alignSelf: 'center',
              backgroundColor: 'white',
              zIndex: 10000,
            }}>
            <Text
              style={{
                color: '#999D3B',
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                zIndex: 1000,
                textAlign: 'center',
              }}>
              Certificat de garantie envoyé par email
            </Text>
          </View>
        )}
      </View>
    )
  );
});

export default FactureBis;
