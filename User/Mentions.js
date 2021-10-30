import React, {useEffect} from 'react';
import {Dimensions, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {useState} from 'react';

let Mentions = props => {
  let [orientation, setOrientation] = useState('PORTRAIT');

  let w = Dimensions.get('window').width;
  let h = Dimensions.get('window').height;

  useEffect(() => {
    if (w < h) {
      setOrientation('PORTRAIT');
    } else {
      setOrientation('LANDSCAPE');
    }
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
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: orientation === 'PORTRAIT' ? '90%' : '95%',
          }}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-SemiBold',
                fontSize: w === 270 ? 20 : 26,
                color: '#636A28',
              }}>
              Mentions légales
            </Text>
          </View>

          <View style={{marginTop: 20}}>
            <View>
              <Text style={{fontFamily: 'Poppins-Bold'}}>Siège social : </Text>
            </View>
            <View>
              <Text style={{fontFamily: 'Poppins-Regular'}}>SIDAM</Text>
            </View>
            <View>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                274 RUE Louis LEPINE – Pôle d’Activités des Costières – BP57 -
                30600 Vauvert –
              </Text>
            </View>
            <View>
              <Text style={{marginTop: 15}}>Téléphone : 04 66 88 29 06</Text>
            </View>
            <View>
              <Text style={{marginTop: 10}}>FAX : 04 66 88 97 62</Text>
            </View>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              Responsable de la publication : SIDAM SAS
            </Text>
          </View>
          <View style={{marginTop: 30}}>
            <View>
              <Text style={{fontFamily: 'Poppins-Bold'}}>
                Réalisation de l’application :
              </Text>
              <Text>
                <View>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>SUNCHA</Text>
                </View>
                <View>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    393, Rue Charles Lindbergh 34130 Mauguio
                  </Text>
                </View>
              </Text>
              <View>
                <Text style={{fontFamily: 'Poppins-Regular'}}>
                  Téléphone : {''}
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      textDecorationLine: 'underline',
                    }}>
                    04 67 15 13 90
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
              Protection accordée par les droits d’auteur
            </Text>
            <View>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                Cette application est protégée par la législation française et
                internationale en matière de droits d’auteur. Toute
                représentation ou reproduction quelconque de tout ou partie de
                cette application ou des informations de cette application sans
                autorisation est illicite et constitue une contrefaçon
                sanctionnée pénalement par les dispositions du code de la
                propriété intellectuelle.
              </Text>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View>
              <Text style={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
                Protection accordée aux bases de données
              </Text>
              <View>
                <Text style={{fontFamily: 'Poppins-Regular'}}>
                  Les bases de données de cette application, dont SIDAM est le
                  producteur, sont protégées par les dispositions de code de la
                  propriété intellectuelle issues de la loi n°98-536 du 1er
                  juillet 1998 sur la protection juridique des bases de données.
                  En conséquence, toute extraction ou réutilisation quelconque
                  d’une partie qualitativement ou quantitativement substantielle
                  du contenu d’une quelconque des bases de données de cette
                  application est illicite et il en est de même de toute
                  extraction répétée et systématique d’une partie
                  qualitativement ou quantitativement non substantielle du
                  contenu d’une quelconque des bases de données de cette
                  application.
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View style={{marginTop: 30}}>
              <Text style={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
                Protection des marques et des logos
              </Text>
            </View>
            <View>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                Toute utilisation quelconque sans autorisation d’une ou
                plusieurs marques et/ou d’un ou plusieurs logos ou visuels de
                cette application est illicite et constitue une contrefaçon
                sanctionnée pénalement par les dispositions du code de la
                propriété intellectuelle.
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{display: 'flex', flexDirection: 'column', marginTop: 30}}>
              <View>
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
                  Exploitation des informations
                </Text>
              </View>

              <View>
                <Text style={{fontFamily: 'Poppins-Regular'}}>
                  SIDAM ne peut être tenue responsable d’aucune manière de
                  l’interprétation et/ou de l’usage d’une ou plusieurs
                  informations contenues dans cette application, et des
                  conséquences de cette interprétation et/ou de cet usage.
                  L’exploitation éventuelle par un utilisateur quelconque d’une
                  ou plusieurs informations de cette application est faite sous
                  la seule responsabilité de cet utilisateur, et SIDAM ne peut
                  être tenue responsable d’aucune manière en relation avec cette
                  exploitation et/ou les conséquences de celle-ci.
                </Text>
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <View>
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
                  POLITIQUE DE CONFIDENTIALITÉ.{' '}
                </Text>
              </View>
              <View>
                <Text style={{fontFamily: 'Poppins-Regular'}}>
                  SIDAM met à disposition les registres suivants, visant à
                  identifier l’ensemble des bases de données hébergées sur ses
                  serveurs, ainsi que le type de données collectées, conservées,
                  leur durée de conservation, de mise à jour.
                </Text>
              </View>
            </View>
            <View>
              <View>
                <View>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
                    2 bases de données distinctes{' '}
                  </Text>
                </View>
                <View>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    • Base de données « Commercial », où figurent des copies et
                    retraitements de données issues de la prospection
                    commerciale / du CRM : échanges emails, coordonnées,
                    informations sur des sociétés, etc.
                  </Text>
                </View>
                <View>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    • Base de données « Communication » où sont stockées des
                    listes de destinataires pour les emailings et newsletters,
                    avec des adresses mails collectées manuellement en ligne.
                  </Text>
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <View>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
                    Durée de conservation/mise à jour des données personnelles
                    collectées
                  </Text>
                </View>
                <View>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Lorsqu’un formulaire est soumis sur l’application, les
                    données sont conservées pendant une durée de cinq ans après
                    leur dernière mise à jour impliquant le consentement
                    explicite de l’utilisateur.
                  </Text>
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <View>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
                    Confidentialité des données personnelles
                  </Text>
                </View>
                <View>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Les données personnelles collectées sont uniquement
                    destinées à la société SIDAM et seront uniquement exploitées
                    dans le cadre de la soumission effective d’un formulaire de
                    l’application.Ces données ne seront jamais commercialisées à
                    des tiers, louées ou transmises, en dehors des cas suivants
                    :• Insultes et/ou propos portant atteinte à l’ordre public
                    ou aux bonnes mœurs.• Poursuites pénales engagées contre
                    vous : les données pourront être transmises à la demande de
                    la justice.
                  </Text>
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <View>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
                    Sécurité et stockage des données personnelles{' '}
                  </Text>
                </View>
                <View>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    Les données sont stockées sur les serveurs de l’hébergeur
                    neoIP :660 Avenue de la gare – 34560 Montbazin – FranceIl
                    s’agit d’un protocole permettant de chiffrer (sécuriser) le
                    contenu des échanges entre le navigateur du visiteur de
                    l’application et les serveurs hébergeant ce dernier. Ceci
                    permet donc d’éviter que les données personnelles transitant
                    à l’issue de la soumission d’un formulaire puissent être
                    facilement lues par des tiers. Remarque : aucune
                    transmission ou stockage de données n’est jamais totalement
                    sécurisé. Nous ne pouvons donc pas garantir la sécurité
                    infaillible de l’information transmise ou stockée sur les
                    serveurs d’hébergement. Droit d’accès, de rectification ou
                    suppression des données personnellesConformément à la loi
                    Informatique et Libertés du 6 janvier 1978 modifiée, ainsi
                    qu’au Règlement Européen Général sur la Protection des
                    Données 2016/679 (RGPD), vous disposez des droits d’accès,
                    de rectification et de suppression des données personnelles
                    vous concernant, que vous pouvez exercer en utilisant le
                    formulaire de contact de l’application ou en nous faisant
                    parvenir un e-mail à l’adresse électronique
                    info@ste-sidam.com
                  </Text>
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
                  LES CRÉDITS • Conception du site Internet : Agence
                  Suncha• Photographies : SIDAM, CZ, Smith & Wesson, Magtech,
                  Sellier & Bellot.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop: 30}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Mentions;
