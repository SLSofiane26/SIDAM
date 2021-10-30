import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Icon} from 'native-base';
import Logo from '../assets/logo.png';

let ReglementBis = props => {
  let [orientation, setOrientation] = useState(null);

  let cc = false;

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
        height: '100%',
      }}>
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          marginTop: '5%',
        }}>
        <View
          style={{
            width: orientation === 'PORTRAIT' ? '100%' : '95%',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              width: '100%',
              height: 20,
            }}>
            <Icon
              type="Entypo"
              name="chevron-left"
              style={{
                position: 'absolute',
                fontSize: 20,
                color: '#636A28',
                marginLeft: '2%',
                marginTop: 1,
              }}
            />
            <Text
              style={{
                color: '#636A28',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                marginLeft:
                  orientation === 'PORTRAIT'
                    ? w === 270
                      ? '10%'
                      : '7%'
                    : '5%',
              }}>
              Retour
            </Text>
          </TouchableOpacity>
          <Image source={Logo} />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 20,
              color: 'black',
            }}>
            CONDITIONS D’EXTENSION DE GARANTIE
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 20,
              color: 'black',
            }}>
            Armes de catégorie B
          </Text>
        </View>
        <View
          style={{
            marginTop: 5,
            width: '98%',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
                fontSize: 12,
              }}>
              274 rue Louis LEPINE – Pôle d’Activités des Costières – BP57 -
              30600 Vauvert – France – TEL 04 66 88 29 06 – FAX 04 66 88 97 62
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
                fontSize: 12,
              }}>
              RC NIMES 319 213 617 00040 – CODE APE 4649Z – FR 21 319 213 617
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
                fontSize: 12,
              }}>
              VALABLES A PARTIR DU 1er SEPTEMBRE 2021
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: 'blue',
              }}>
              Préambule
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
              }}>
              Les particuliers, acheteurs finaux d’armes bénéficient d’une
              garantie légale (dont les termes sont rappelés in fine) et
              éventuellement contractuelle, de la part du détaillant auprès de
              qui l’arme a été acquise et/ou du fabricant de celle-ci. {'\n'}
              {'\n'}La Société SIDAM est distributeur d’armes de catégorie B
              exclusivement auprès de professionnels armuriers et
              d’administrations publiques.{'\n'}
              {'\n'}
              La Société SIDAM a souhaité proposer aux particuliers,
              utilisateurs finaux de ces produits (ci-après « Client Final »)
              une extension de garantie (ci-après « l’Extension de Garantie »)
              conditionnée par l’acquisition récurrente d’un certain volume de
              Munitions dont SIDAM assure la distribution et correspondant aux
              dits Produits.{'\n'}
              {'\n'}
              Cette extension de garantie contractuelle est indépendante des
              garanties dont le Client Final bénéficie vis-à-vis de la personne
              auprès de qui il a acquis l’arme, et/ou du fabricant de celle-ci.
              {'\n'}
              {'\n'}Les présentes « Conditions d’Extension de garantie », sont
              applicables entre la Société SIDAM et le Client Final.{'\n'}
              {'\n'}Elles constituent un accord contractuel, dont Le Client
              Final reconnaît avoir pris connaissance et accepte d’être lié par
              celles-ci.
            </Text>
          </View>
          <View style={{marginTop: '2%'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: 'blue',
              }}>
              Article préliminaire–définition
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
              }}>
              Les termes et expressions commençant par une majuscule utilisée
              dans les présentes conditions d’Extension de Garantie ont la
              signification suivante : {'\n'}
              {'\n'}- Le « Produit» désigne exclusivement les armes de catégorie
              acquises neuves, par le Client Final dans les conditions précisées
              aux présentes. La liste des Produits concernés est indiquée dans
              l’Application.{'\n'}
              {'\n'}- L’« Application» désigne l’application mobile « SIDAM –
              Extension de garantie SIDAM » accessible depuis les plateformes de
              téléchargement d’applications pour mobiles.{'\n'}
              {'\n'}- Le « Client Final » désigne toute personne physique ayant
              acheté un Produit dans un cadre et pour un usage non
              professionnel.{'\n'}
              {'\n'}- « Revendeur Qualifié » désigne les personnes physiques ou
              morales exerçant l’activité d’armurier professionnel dans le
              respect de la réglementation applicable, ayant acquis les Produits
              ou les Munitions directement auprès de la Société SIDAM, avant de
              les revendre directement au Client Final.{'\n'}
              {'\n'}- « Munitions » désigne des munitions neuves des marques
              dont SIDAM assure la distribution du calibre correspondant au
              Produit et vendues par un Revendeur Qualifié après avoir été
              acquis par celui-ci auprès de SIDAM. La liste des marques de
              Munitions concernés est indiquée dans l’Application.{'\n'}
              {'\n'}- « Période d’Achat » a le sens précisé ci-après,
              {'\n'}
              {'\n'}- « Continuité d’Acquisition » et « Rupture de Continuité
              d’Acquisition » ont le sens précisé ci- après
            </Text>
          </View>
          <View style={{marginTop: '2%'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: 'blue',
              }}>
              Objet de la garantie
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
              }}>
              La présente Extension de Garantie concerne exclusivement les
              Produits acquis par le Client Final, sur le territoire français,
              dans le strict respect de la réglementation applicable, auprès
              d’un Revendeur Qualifié.
            </Text>
          </View>
          <View style={{marginTop: '3%'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: 'blue',
              }}>
              Conditions de la garantie
            </Text>
            <View style={{marginTop: '2%'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: '#00008B',
                }}>
                4.1 Etapes préalables
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                }}>
                Le Client doit renseigner l’ensemble des informations
                sollicitées dans l’interface de l’Application permettant de
                souscrire à l’Extension de Garantie.{'\n'}
                {'\n'}A ce titre il doit notamment préciser ses éléments
                d’indentification (nom, prénom, identité du Revendeurs Qualifié
                concerné, adresse mail, etc...) ainsi que ceux du Produit tels
                que sa marque, son modèle, et son numéro de série. La
                transmission des éléments justifiant de ces informations est
                nécessaire (pièces d’identité, facture et date d’acquisition du
                produit, etc...).{'\n'}
                {'\n'}Suite à la communication de ces éléments, SIDAM se réserve
                le droit de supprimer un compte ou des éléments de ce compte si
                des éléments transmis ne sont pas conformes et non éligibles,
                aux conditions de ce règlement. SIDAM ne sera engagé par
                l’Extension de Garantie vis-à-vis du Client Final,
                qu’exclusivement pour le ou les Produits pour lesquels les
                éléments transmis sont conformes aux conditions de ce règlement.
                Les confirmations d’éligibilités générées automatiquement par
                l’application peuvent être annulées si les éléments transmis ne
                sont pas conformes aux conditions de ce règlement.
              </Text>
            </View>
            <View style={{marginTop: '2%'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: '#00008B',
                }}>
                4.1 Prix/contrepartie
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                }}>
                L’Extension de Garantie est conditionnée à l’acquisition par le
                Client Final d’un Munitions dans les conditions qui suivent.
              </Text>
            </View>
            <View style={{marginTop: '2%'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: '#00008B',
                }}>
                4.3 Durée de la garantie
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: 'blue',
                }}>
                4.3.1 Date de début
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                }}>
                Le Client Final bénéficie d’une garantie légale et
                éventuellement contractuelle vis à vis du Revendeur Qualifié
                auprès de qui le Produit a été acquis et/ou vis-à-vis du
                fabricant de celui-ci. L’Extension de garantie proposée par
                SIDAM au Client Final a vocation à prendre effet à l’expiration
                de la garantie contractuelle du Fabricant du Produit, sans se
                cumuler, ni se substituer à celle-ci. La durée de garantie
                contractuelle du Fabricant est rappelée au Client Final lors de
                la confirmation de l’éligibilité du Produit à l’Extension de
                Garantie, via l’Application. L’Extension de Garantie proposée
                par SIDAM prendra effet à la Date d’expiration de la garantie
                contractuelle du Fabricant, telle qu’indiquée dans
                l’Application. Sa durée sera déterminée dans les conditions qui
                suivent.
              </Text>
            </View>
            <View style={{marginTop: '2%'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: 'blue',
                }}>
                4.3.2 Durée
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                }}>
                La durée de l’Extension de Garantie est déterminée en fonction
                d’une Continuité d’Acquisition de Munitions, par le Client
                Final, auprès d’un ou de Revendeur(s) Qualifié(s).{'\n'}
                {'\n'}Dans les (trois) 3 mois de la date d’acquisition du
                Produit par le Client Final, il devra avoir acquis au moins
                (cinq cent) 500 Munitions.{'\n'}
                {'\n'}Le Client Final devra transmettre des éléments
                justificatifs à SIDAM, via l’Application (facture nominative
                d’acquisition, numéro de lot indiqué sur la boite de munition)
                avant l’expiration de ce délai. Si ces conditions ne sont pas
                remplies, le Client final ne pourra pas bénéficier de
                l’Extension de garantie prévue aux présentes.{'\n'}
                {'\n'}Une fois ces conditions satisfaites, le Client final sera
                informé, via l’Application, de la nouvelle date à l’issue de
                laquelle, il devra avoir acquis au moins (cinq cent) 500
                nouvelles munitions.{'\n'}
                {'\n'}La durée de cette nouvelle période d’achat sera fixée par
                la formule suivante :{'\n'}
                {'\n'}Durée de la nouvelle période d’achat en mois = 3 x le
                nombre de lots entier de 500 munitions, acquis lors de la
                période d’achat précédente.{'\n'}
                {'\n'}
                Le Client Final devra transmettre les éléments justificatifs de
                l’acquisition de nouvelles munitions à SIDAM, via l’Application
                (facture nominative d’acquisition, numéro de lot indiquée sur la
                boite de munition) avant l’expiration de ce délai.{'\n'}
                {'\n'}La non-acquisition et/ou la non-justification de
                l’acquisition de la quantité de Munitions minimum requise dans
                la période d’achat constitue une Rupture de Continuité
                d’Acquisition.{'\n'}
                {'\n'}La date de la Rupture de Continuité d’Acquisition est
                fixée à la date butoir de la dernière période d’achat pour
                laquelle les conditions d’acquisition et de justification de la
                quantité de Munitions minimum ont été respectées{'\n'}
                {'\n'}La durée de l’Extension de Garantie est de (trois) 3 mois
                par lots entiers de 500 munitions achetées entre la date
                d’acquisition du Produit par le Client Final et la date de
                Rupture de Continuité d’Acquisition.{'\n'}
                {'\n'}Aussi, en cas de Rupture de la Continuité d’Acquisition,
                aucune acquisition ultérieure de Munitions ne pourra être
                retenue pour le calcul de la durée de l’Extension de Garantie.
                {'\n'}
                {'\n'}En l’absence de Rupture de la Continuité d’Acquisition la
                durée de l’Extension de Garantie continuera à s’allonger dans
                les conditions qui précédent.{'\n'}
                {'\n'}
                L’allongement de la durée de la Garantie pourra également
                prendre fin par notification unilatérale de SIDAM, moyennant un
                préavis de 3 (trois) mois, transmis au client via l’Application
                ou par tout autre moyen, notamment en cas d’arrêt de
                l’Application. Néanmoins, le Client final conservera le bénéfice
                de la durée de l’Extension de Garantie acquise, à la date
                d’effet de la notification.
              </Text>
            </View>
            <View style={{marginTop: '2%'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: 'blue',
                }}>
                Modalité de mise en oeuvre
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                }}>
                Afin de faire valoir ses droits, le Client Final devra informer
                par écrit la société SIDAM en lui adressant le formulaire prévu
                à cet effet dans l’Application, avant l’expiration du délai
                d’Extension de garantie.{'\n'}
                {'\n'}La Société SIDAM accusera réception de sa demande dans les
                72 heures et indiquera si le Client Final est éligible à la
                Garantie.{'\n'}
                {'\n'}Une fois que la Société SIDAM aura accusé réception de la
                demande, le Client final pourra déposer le Produit concerné chez
                le Revendeur Qualifié désigné dans l’Application, contre
                récépissé et engagement de ce dernier de l’expédier à SIDAM.
                {'\n'}
                {'\n'}Le Revendeur Qualifié expédiera à SIDAM le Produit.{'\n'}
                {'\n'}Dès réception du Produit, SIDAM l’examinera.{'\n'}
                {'\n'}SIDAM remplacera ou fera réparer le Produit ou pièces sous
                garantie jugés défectueux dans un délai de 2 mois, sous réserve
                de disponibilité des éléments par SIDAM et de son fournisseur.
                {'\n'}
                {'\n'}SIDAM réexpédiera le Produit au Revendeur Qualifié et en
                tiendra informé le Client Final via l’Application.
                {'\n'}
                {'\n'}Cette garantie couvre également les frais de main d'œuvre.
                Le remplacement des Produits ou pièces défectueux n'aura pas
                pour effet de prolonger la durée de la garantie, sauf si la
                période d’immobilisation dure au moins (septe) 7 jours, auquel
                cas elle viendra s’ajouter à la durée de garantie. Aucun
                remboursement ne sera possible.
              </Text>
            </View>
            <View style={{marginTop: '2%'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: 'blue',
                }}>
                Exclusion de garantie
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                }}>
                Toute garantie est exclue : {'\n'} {'\n'}- en cas de mauvaise
                utilisation, négligence ou défaut d'entretien, {'\n'} {'\n'}- en
                cas de Chutes, choix ou utilisation de solvants inappropriés,{' '}
                {'\n'} {'\n'}- en cas de non-respect des instructions et
                consignes de montage et d’utilisation des produits,  en cas
                d’usure normale du produit, d’accident ou de force majeure,{' '}
                {'\n'} {'\n'}- en cas d’utilisation des produits dans des
                conditions différentes de celles pour lesquelles ils ont été
                fabriqués, {'\n'} {'\n'}- pour les défauts et détériorations des
                produits consécutifs à des conditions anormales de stockage
                et/ou de conservation, {'\n'} {'\n'}- en cas de customisation de
                l’arme modifiant le processus de mise à feu et la fiabilité de
                celle-ci ; {'\n'} {'\n'}- en cas de modification du canon, de la
                carcasse, de la culasse, du barillet du Produit, {'\n'} {'\n'}-
                en cas de défauts et détériorations des produits provenant de
                choc, chute, défaut de surveillance, {'\n'} {'\n'}- en cas de
                défauts et détériorations des produits touchant les pièces
                d’usure, les pièces en plastique et en bois, {'\n'} {'\n'}- les
                produits et pièces présentant des traces de montage, {'\n'}{' '}
                {'\n'}- en cas de transformation, modification, altération du
                produit, {'\n'} {'\n'}- en cas d’utilisation de munitions non
                reconnues par la CIP ou rechargées. {'\n'} {'\n'}Aussi, si lors
                de la réception du Produit SIDAM constate qu’il entre dans l’un
                des cas d’exclusion ci- dessus, elle en informera le Client
                Final lui permettant de faire valoir ses observations sous un
                délai de (quarante-huit) 48 heures.
              </Text>
            </View>
            <View style={{marginTop: '2%'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: 'blue',
                }}>
                Transfert et reprise du bénéfice de la Garantie
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                }}>
                Le bénéfice de l’Extension de garantie est propre au Client
                Final qui n’aura pas la possibilité de transmettre, à titre
                onéreux, gratuit ou par voie de succession, en dehors des seuls
                cas limitatifs suivants.
              </Text>
            </View>
          </View>
          <View style={{marginTop: '2%'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: '#00008B',
              }}>
              7.1 Cession du Produit à une autre Client Final
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
              }}>
              En cas de cession du Produit à un autre Client Final, ce dernier
              pourra se voir transférer le bénéfice de l’Extension de garantie
              dans les conditions suivantes.
              {'\n'}
              {'\n'}Le nouveau Client Final devra procéder aux étapes
              d’identification prévues à l’article 4 ci avant via l’Application
              et justifier de l’acquisition du Produit auprès du précédent
              Client Final, ainsi que du respect de la réglementation applicable
              (enregistrement de la cession auprès des autorités et intervenants
              compétents etc..).
              {'\n'}
              {'\n'}Le Client Final (initialement bénéficiaire de la Garantie)
              devra confirmer par écrit à SIDAM qu’il a effectivement procédé à
              la cession du Produit au nouveau Client Final et qu’il accepte de
              lui transmettre le bénéfice des droits acquis à l’Extension de
              garantie.
              {'\n'}
              {'\n'}Suite à l’étude des renseignements communiqués, le nouveau
              Client Final recevra de SIDAM une confirmation, via l’Application,
              de l’éligibilité de l’arme à l’Extension de Garantie et du
              transfert à son bénéfice des droits acquis.{'\n'}
              {'\n'}SIDAM se réserve le droit de supprimer un compte ou des
              éléments de ce nouveau compte si des éléments transmis ne sont pas
              conformes et non éligibles, aux conditions de ce règlement. SIDAM
              ne sera engagé par l’Extension de Garantie vis-à-vis du Client
              Final, qu’exclusivement pour le ou les Produits pour lesquels les
              éléments transmis sont conformes aux conditions de ce règlement.
              Les confirmations d’éligibilités générées automatiquement par
              l’application peuvent être annulées si les éléments transmis ne
              sont pas conformes aux conditions de ce règlement.{'\n'}
              {'\n'}Le nouveau Client Final sera alors subrogé dans les droits
              acquis du Client Final à partir de la date à laquelle il aura
              acquis le Produit. Les conditions de Garanties seront conservées
              sans interruption, notamment celles afférentes à la Continuité
              d’Acquisition de Munitions.
            </Text>
          </View>
          <View style={{marginTop: '2%'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: '#00008B',
              }}>
              7.2 Cession à un revendeur Qualifié
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
              }}>
              En cas de cession du Produit à un Revendeur Qualifié, le bénéfice
              de l’Extension de Garantie pourra être transférée au nouveau
              Client Final, à qui le Revendeur Qualifié vendra le Produit, dans
              les conditions suivantes.{'\n'}
              {'\n'}Le Client Final de la Garantie devra indiquer par écrit à
              SIDAM, via l’Application, qu’il a effectivement procédé à la
              cession du Produits au Revendeur Qualifié, et qu’il accepte de
              transmettre le bénéfice des droits acquis à l’Extension de
              Garantie.{'\n'}
              {'\n'}Le nouveau Client Final, à qui le Revendeur Qualifié aura
              cédé le Produits devra procéder aux étapes d’identification
              prévues à l’article 4 ci avant, via l’Application, et justifier de
              l’acquisition du Produit auprès du Revendeur Qualifié, ainsi que
              du respect de la réglementation applicable (enregistrement de la
              cession auprès des autorités et intervenants compétents etc..).
              {'\n'}
              {'\n'}Suite à l’étude des renseignements communiqués, le nouveau
              Client Final recevra de SIDAM une confirmation, via l’Application,
              de l’éligibilité de l’arme à l’Extension de Garantie et le
              transfert à son bénéfice des droits acquis.{'\n'}
              {'\n'}SIDAM se réserve le droit de supprimer un compte ou des
              éléments de ce nouveau compte si des éléments transmis ne sont pas
              conformes et non éligibles, aux conditions de ce règlement. SIDAM
              ne sera engagé par l’Extension de Garantie vis-à-vis du Client
              Final, qu’exclusivement pour le ou les Produits pour lesquels les
              éléments transmis sont conformes aux conditions de ce règlement.
              Les confirmations d’éligibilités générées automatiquement par
              l’application peuvent être annulées si les éléments transmis ne
              sont pas conformes aux conditions de ce règlement.{'\n'}
              {'\n'}Le nouveau Client Final sera alors subrogé dans les droits
              acquis du Client Final à partir de la date à laquelle il aura
              acquis le Produit et les conditions de la garantie conservée,
              notamment celles afférentes à la Continuité d’Acquisition de
              Munitions, étant précisé que la période de détention du Produit
              par le Revendeur Qualifié ne sera pas prise en compte pour
              l’appréciation de la Continuité d’Acquisition des Munitions.
            </Text>
          </View>
          <View style={{marginTop: '2%'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: '#00008B',
              }}>
              Annulation de la garantie
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
              }}>
              Toute fausse déclaration, faux ou usage de faux, tromperie, ou
              tout autre manœuvre (réutilisation, falsification de facture ou
              autre...), aux fins notamment de bénéficier de conditions indues
              de garantie, entrainera l’annulation irrévocable de l’Extension de
              Garantie et pourra à tout moment, et en tout état de cause, être
              opposé par SIDAM pour refuser le bénéfice de l’Extension de
              Garantie.
            </Text>
          </View>
          <View style={{marginTop: '2%'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: '#00008B',
              }}>
              Garanties légales
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
              }}>
              Nous vous rappelons qu’en cas de défaut de conformité du bien au
              contrat, la garantie légale de conformité mentionnée aux articles
              L.217-4 à L.217-13 du Code de la Consommation et celle relative
              aux défauts de la chose vendue, mentionnée aux articles 1641 à
              1648 et 2232 du Code Civil, s’appliqueront conformément à la loi.
              {'\n'}
              {'\n'}Article L217-4 du code de la consommation : « Le vendeur
              livre un bien conforme au contrat et répond des défauts de
              conformité existant lors de la délivrance.
              {'\n'}
              {'\n'}Il répond également des défauts de conformité résultant de
              l’emballage, des instructions de montage ou de l’installation
              lorsque celle-ci a été mise à sa charge par le contrat ou a été
              réalisée sous sa responsabilité ».
              {'\n'}
              {'\n'}
              Article L217-5 du code de la consommation :{'\n'}
              {'\n'}« Le bien est conforme au contrat :{'\n'}
              {'\n'}1 - S’il est propre à l’usage habituellement attendu d’un
              bien semblable et, le cas échéant {'\n'}
              {'\n'}- s’il correspond à la description donnée par le vendeur et
              possède les qualités que celui-ci a présentées à l’acheteur sous
              forme d’échantillon ou de modèle ; -{'\n'}
              {'\n'}s’il présente les qualités qu’un acheteur peut légitimement
              attendre eu égard aux déclarations publiques faites par le
              vendeur, par le producteur ou par son représentant, notamment dans
              la publicité ou l’étiquetage ; {'\n'}
              {'\n'}2 - Ou s’il présente les caractéristiques définies d’un
              commun accord par les parties ou est propre à tout usage spécial
              recherché par l’acheteur, porté à la connaissance du vendeur et
              que ce dernier a accepté.».
              {'\n'}
              {'\n'} Article L217-12 du code de la consommation : « L’action
              résultant du défaut de conformité se prescrit par deux ans à
              compter de la délivrance du bien ».{'\n'}
              {'\n'}Article L217-16 du code de la consommation : « Lorsque
              l’acheteur demande au vendeur, pendant le cours de la garantie
              commerciale qui lui a été consentie lors de l’acquisition ou de la
              réparation d’un bien meuble, une remise en état couverte par la
              garantie, toute période d’immobilisation d’au moins sept jours
              vient s’ajouter à la durée de la garantie qui restait à courir.
              Cette période court à compter de la demande d’intervention de
              l’acheteur ou de la mise à disposition pour réparation du bien en
              cause, si cette mise à disposition est postérieure à la demande
              d’intervention ».{'\n'}
              {'\n'}Article 1641 du code civil : « Le vendeur est tenu de la
              garantie à raison des défauts cachés de la chose vendue qui la
              rendent impropre à l’usage auquel on la destine, ou qui diminuent
              tellement cet usage que l’acheteur ne l’aurait pas acquise, ou
              n’en aurait donné qu’un moindre prix, s’il les avait connus».
              {'\n'}
              {'\n'}Article 1648 du code civil : « L’action résultant des vices
              rédhibitoires doit être intentée par l’acquéreur dans un délai de
              deux ans à compter de la découverte du vice ».{'\n'}
              {'\n'}En cas d’action en garantie légale de conformité, le
              consommateur :{'\n'}
              {'\n'} - bénéficie d’un délai de deux ans à compter de la
              délivrance du bien pour agir, {'\n'}
              {'\n'}- peut choisir entre la réparation ou le remplacement du
              bien, sous réserve des conditions de coût prévues par l’article
              L.217-9 du code de la consommation, {'\n'}
              {'\n'}- est dispensé de rapporter la preuve de l’existence du
              défaut de conformité du bien durant les 6 mois suivant la
              délivrance du bien. Ce délai est porté à vingt-quatre mois à
              compter du 18 mars 2016, sauf pour les biens d’occasion.
              {'\n'}
              {'\n'}La garantie légale de conformité s’applique indépendamment
              de la garantie commerciale ou contractuelle.{'\n'}
              {'\n'}Dans le cas où le consommateur décide de mettre en œuvre la
              garantie des vices cachés de la chose vendue telle que prévue par
              l’article 1641 du code civil, il peut choisir entre la résolution
              de la vente ou une réduction du prix de vente conformément à
              l’article 1644 dudit code.
            </Text>
          </View>
          <View style={{marginTop: '2%'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: '#00008B',
              }}>
              Mode de règlement des litiges
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
              }}>
              Pour toute question relative à cette Extension de Garantie,
              n’hésitez pas, à nous contacter au 04.66.88.29.06 (tarif local) du
              lundi au vendredi entre 9H00-12h00 et 14H00-18H00 (sauf les jours
              fériés et interdiction législative, réglementaire ou
              conventionnelle).{'\n'}
              {'\n'}Si vous rencontrez une difficulté, nous vous invitons à vous
              adresser à nous et nous nous efforcerons de trouver avec vous une
              solution amiable.{'\n'}
              {'\n'}À défaut de trouver une solution vous donnant satisfaction,
              vous pourrez nous adresser une réclamation par courrier à
              l’adresse :{'\n'}
              {'\n'}SIDAM, 274 rue Louis LEPINE, pôle d’activités des costières
              – BP 57 ; 30600 VAUVERT {'\n'}
              {'\n'}SIDAM s’engage à répondre immédiatement, et au plus tard
              dans les 72 heures, à toute réclamation faite auprès du Service
              téléphonique, et à répondre dans un délai de 10 jour ouvrable aux
              réclamations faites par courrier.{'\n'}
              {'\n'}Si vous n’obtenez pas de réponse satisfaisante à votre
              réclamation, vous pouvez contacter le médiateur de la Fédération
              du e-commerce et de la vente à distance (FEVAD), selon les
              modalités indiquées à la page http://www. mediateurfevad.fr et
              dont les coordonnées sont les suivantes : 60 rue La Boétie 75008
              Paris.{'\n'}
              {'\n'}Conformément au Règlement (UE) n°524/2013, la Commission
              Européenne a mis en place une plateforme de Règlement en Ligne des
              Litiges, facilitant le règlement indépendant par voie
              extrajudiciaire des litiges en ligne entre consommateurs et
              professionnels de l’Union européenne. Cette plateforme est
              accessible au lien suivant: https://webgate.ec.europa.eu/odr/
              {'\n'}
              {'\n'}Les présentes sous mis que Droit français et en cas de
              persistance d’un différend, les Tribunaux français seront
              compétents pour en connaitre. Les règles françaises de droit
              commun seraient applicables.
            </Text>
          </View>
          <View style={{marginTop: '2%'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: 'blue',
              }}>
              Données personnelles
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
              }}>
              Les données vous concernant sont traitées par la société SIDAM
              responsable de traitement. {'\n'} {'\n'}Les données sont stockées
              sur les serveurs de l’hébergeur neoIP 660 Avenue de la gare –
              34560 Montbazin – France selon un protocole permettant de chiffrer
              (sécuriser) le contenu des échanges entre le navigateur du
              visiteur de l’application et les serveurs hébergeant ce dernier.
              Ceci permet donc d’éviter que les données personnelles transitant
              à l’issue de la soumission d’un formulaire puissent être
              facilement lues par des tiers. {'\n'} {'\n'}
              Vos données sont traitées principalement pour créer et gérer votre
              compte, vos demandes, vos informations d’achat et leur suivi,
              personnaliser nos services et effectuer des analyses statistiques,
              ainsi qu’à des fins de marketing et publicité ciblée (connaissance
              client, envoi de communications électroniques et profilage
              publicitaire par combinaison de données). {'\n'} {'\n'}Ces
              traitements peuvent être fondés sur différentes bases légales
              selon les finalités concernées.
              {'\n'} {'\n'}Vous gardez la possibilité de retirer votre
              consentement à tout moment. Les données collectées dans le cadre
              d’une commande sont susceptibles d’être communiquées à des fins
              d’analyse de détection de la fraude. {'\n'} {'\n'}En fonction de
              vos choix, certaines informations pourront également être
              transmises aux entités du groupe SIDAM à des fins de connaissance
              client et personnalisation de nos services, ou à des partenaires
              commerciaux à des fins de marketing ciblé et de profilage
              publicitaire par combinaison de données. Pour refuser le partage
              aux entités du groupe ou avec les partenaires, rendez-vous sur la
              rubrique « mon compte » de l’application. {'\n'}
              {'\n'}Vous pouvez également gérer vos données personnelles et
              exprimer vos choix, notamment concernant les cookies, en vous
              rendant dans la rubrique « mon compte ». de l’Application.{'\n'}
              {'\n'}Vous pouvez exercer vos droits (accès, rectification,
              suppression, opposition, limitation et portabilité le cas échéant)
              et définir le sort de vos données personnelles post mortem via
              l’Application ou par email (info@ste-sidam.com) ou contacter le
              Délégué à la Protection des Données de SIDAM par courrier : SIDAM,
              274 rue Louis Lépine, pôle d’activités des costières – BP57, 30600
              VAUVERT{'\n'}
              {'\n'}Vous disposez par ailleurs, du droit d’introduire une
              réclamation auprès de la Commission Nationale de l’Informatique et
              des Libertés (CNIL), notamment sur son site internet www.cnil.fr.
              La plupart des données vous concernant seront conservées pendant
              une durée de 5 ans à compter de votre dernière activité (ex. :
              achat, échéance de vos contrats), puis archivées avec un accès
              restreint pour une durée supplémentaire de 5 ans pour des raisons
              strictement limitées et autorisées par la loi (paiement, garantie,
              litiges ...). Vous êtes informés que vos données peuvent être
              transmises pour les besoins des finalités mentionnées ci-dessus à
              des sociétés situées en dehors de l’Union Européenne notamment
              pour les activités de service client, prestations informatiques,
              exploitation des données en lien avec les réseaux sociaux. Toute
              procédure requise pour sécuriser les données sera mise en œuvre
              avant de procéder à de tels transferts.
            </Text>
          </View>
          <View style={{marginTop: '2%'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: 'blue',
              }}>
              Droit de rétractation
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
              }}>
              Pour vos achats sur internet vous bénéficiez d’un délai de 15
              jours à compter de votre souscription aux présentes, pour vous
              rétracter. Pour plus d’informations sur l’exercice de ce droit et
              afin de télécharger le formulaire de rétractation, rendez-vous
              dans la rubrique « contact » de votre application.
            </Text>
          </View>
          <View style={{marginTop: '30%'}}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReglementBis;
