'use strict';

/**
 * Global methods
 *
 */
var parseDate = function(dateObject){
    var theDate = new Date(parseInt(dateObject));
    return theDate.getDate() + "/" + (theDate.getMonth() + 1) + "/"
        + theDate.getFullYear(); // jQuery.datepicker.parseDate(
    // "yy-mm-dd", d);
};

var logMessage = function(message) {
    var debug = false;
    //var debug = true;

    if (debug === true) {
        alert(message);
    }
}

var formatTimestamp = function(d) {
    // padding function
    var s = function(p) {
        return ('' + p).length < 2 ? '0' + p : '' + p;
    };

    var dateTmp = null;
    // default parameter
    if (typeof d === 'undefined') {
        dateTmp = new Date();
    } else if (typeof d === 'number') {
        dateTmp = new Date(d);
    } else if (typeof d === 'string') {
        dateTmp = new Date(parseInt(d));
    }

    return s(dateTmp.getDate()) + '/' + s(dateTmp.getMonth() + 1) + '/'
        + dateTmp.getFullYear();
}

/**
 * End of global methods
 */

var appServices = angular.module('SpotMyDiveServices', []);

appServices.factory('SpotDataService', ['$q', '$http', function($q, $http){

    var getAllSpots = function(){

        var allSpotsTmp = [
                      /* LES SPOTS DE MARSEILLE */
                           {
                          id: '00001',
                          name : 'Arche-de-planier',
                          classname: 'svg-1',
                          GPS: {
                              valide : false,
                              WGS84 : '43°11\'878"N 05°13\'414"E'
                          },
                          description : 'Epave',
                          profondeurMax : '50',
                          zoneInteret : '40-50',
                          icone : 'tombant-40-60',
                          zoneGeographique : 'Marseille'
                          },
                          {
                              id: '00002',
                              name : 'Chaouen',
                              classname : 'svg-1',
                              GPS : {
                                  WGS84:'43°11\'910"N 05°13\'700"E',
                                  valide : false
                              },
                              description : 'une autre epave',
                              profondeurMax : '36',
                              zoneInteret : '6-36',
                              icone : 'epave-20-40',
                              zoneGeographique : 'Marseille'
                          },
                        /* LES SPOTS DE LA CIOTAT */
                            {
                             id: '00003',
                             name : 'Port de la Madrague',
                             classname: 'svg-1',
                             GPS: {
                                 valide : false,
                                 WGS84 : '43°10\'100"N 05°41\'600"E'
                             },
                             description : 'Port ',
                             profondeurMax : '2',
                             icone : 'port',
                             zoneGeographique : 'Saint Cyr sur Mer'
                         },
                         {
                            id: '00004',
                            name : 'FIGUEROLLES',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.166283333333,
                                longitude : 5.5963,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '40',
                            zoneInteret : '??-??',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00005',
                            name : 'Bec-de-l_aigle (Le)',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.161066666667,
                                longitude : 5.6077333333333,
                                valide : false
                            },
                            description : '??? (WGS84)',
                            profondeurMax : '35',
                            zoneInteret : '20-35',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00006',
                            name : 'Mugel',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.16385,
                                longitude : 5.60855,
                                valide : false
                            },
                            description : 'Soit également appellé : la piscine. Bien pour débutant',
                            profondeurMax : '15',
                            zoneInteret : '5-15',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00007',
                            name : 'Baracan',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.158666666667,
                                longitude : 5.61,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '45',
                            zoneInteret : '30-45',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00008',
                            name : 'Grotte-des-3-pépés',
                            classname: 'tombant',
                            GPS: {
                                WGS84 : '43°09\'793"N 05°36\'011"E',
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '20',
                            zoneInteret : '15-20',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00009',
                            name : 'Canonier-Sud (Le)',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.1603,
                                longitude : 5.6123666666667,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '40',
                            zoneInteret : '15-40',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00010',
                            name : 'Canonnier-Nord (Le)',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.162533333333,
                                longitude : 5.6134166666667,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '25',
                            zoneInteret : '10-25',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00011',
                            name : 'La-piscine',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.162517,
                                longitude : 5.61485,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '20',
                            zoneInteret : '10-20',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00012',
                            name : 'Tombant-aux-langoustes',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.159016666667,
                                longitude : 5.6157166666667,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '45',
                            zoneInteret : '30-45',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00013',
                            name : 'Anse-du-canon',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.157566666667,
                                longitude : 5.6184833333333,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '20',
                            zoneInteret : '5-20',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00014',
                            name : 'Grand-Moure (Le)',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.1567,
                                longitude : 5.6189333333333,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '45',
                            zoneInteret : '30-42',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00015',
                            name : 'Roche à la Stelle',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.156883333333,
                                longitude : 5.61905,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '50',
                            zoneInteret : '45-50',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00016',
                            name : 'Calanque de Seynerolles',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.15915,
                                longitude : 5.6195166666667,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '25',
                            zoneInteret : '5-25',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00017',
                            name : 'Petit-Moure',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.15755,
                                longitude : 5.6196666666667,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '35',
                            zoneInteret : '20-35',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00018',
                            name : 'Rousteau-sud',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.1565,
                                longitude : 5.6216666666667,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '50',
                            zoneInteret : '30-50',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00019',
                            name : 'Rousteau-nord',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.157166666667,
                                longitude : 5.6221666666667,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '25',
                            zoneInteret : '15-25',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00020',
                            name : 'Pierre-du-Levant (La)',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.154666666667,
                                longitude : 5.6223333333333,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '60',
                            zoneInteret : '40-60',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                            id: '00021',
                           name : 'Sec-des-rosiers (Le)',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.155166666667,
                                longitude : 5.6235,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '40',
                            zoneInteret : '25-40',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                           id: '00022',
                            name : 'Pierre-de-jas (La)',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.156333333333,
                                longitude : 5.6238333333333,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '40',
                            zoneInteret : '30-40',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                           id: '00023',
                            name : 'Voilier-Pilotine',
                            classname: 'épave',
                            GPS: {
                                latitude :  43.1646,
                                longitude : 5.6245,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '43',
                            zoneInteret : '40-43',
                            icone : 'épave',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                           id: '00024',
                            name : 'Pain-de-sucre',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.155833333333,
                                longitude : 5.6246666666667,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '52',
                            zoneInteret : '30-52',
                            icone : 'tombant',
                            zoneGeographique : 'La Ciotat'
                         },
                         {
                           id: '00025',
                            name : 'P38',
                            classname: 'svg-1',
                            GPS: {
                                //latitude :  43.167666666667,
                                //longitude : 5.6696666666667,
                                valide : false,
                                WGS84 : '43° 10\'060"N 05°40\'180"E'
                            },
                            description : 'A la découverte d’une épave datant de la seconde guerre mondiale et très bien conservée ! Reposant à l’envers par 38m de fond, ce magnifi que avion de la Seconde Guerre mondiale a été abattu par les allemands le 27 janvier 1944.',
                            profondeurMax : '39',
                            zoneInteret : '37-39',
                            icone : 'épave',
                            zoneGeographique : 'Les Lecques'
                         },
                         {
                           id: '00026',
                            name : 'Tunnels (Les)',
                            classname: 'svg-1',
                            GPS: {
                                //latitude :  43.154716666667,
                                //longitude : 5.6834666666667,
                                valide : false,
                                WGS84 : '43°09\'283"N 05°41\'008"E'
                            },
                            description : 'Deux tunnels et une grotte sont creusés dans la falaise. Un est très large 10m de diamètre, l\'autre 4m et donc nécessite une lampe La longueur est de près de 50m. Plongée qui ne nécessite pas une configuration spéléo, mais toujours prudence!! En cas de houle les ondes de pression sont très désagréables aux oreilles et à la cage thoracique. Beaucoup de vie à l\'entrée des tunnels. Possibilité de se mettre d\'un côté ou de l\'autre du cap en fonction de la houle et la météo.',
                            profondeurMax : '20',
                            zoneInteret : '5-15',
                            icone : 'tombant',
                            zoneGeographique : 'Les Lecques'
                         },
                         {
                            id: '00027',
                           name : 'Seiche d\'Alon',
                            classname: 'tombant',
                            GPS: {
                                latitude :  43.144483333333,
                                longitude : 5.7085833333333,
                                valide : false
                            },
                            description : '',
                            profondeurMax : '20',
                            zoneInteret : '10-20',
                            icone : 'tombant',
                            zoneGeographique : 'Les Lecques'
                         },
                         {
                           id: '00028',
                            name : 'Ile rousse (est)',
                            classname: 'tombant',
                            GPS: {
                                WGS84 : '43°07\'929"N 05°43\'685"E',
                                //latitude :  43.1338,
                                //longitude : 5.7281166666667,
                                valide : false
                            },
                            description : 'ambiance superbe',
                            profondeurMax : '20',
                            zoneInteret : '5-20',
                            icone : 'tombant',
                            zoneGeographique : 'Bandol'
                         },
                     /* LES SPOTS DE BANYULS */
                        {
                          id: '00029',
                            name : 'Cap Gros',
                            classname: 'svg-1',
                            GPS: {
                                latitude :  42.526392,
                                longitude : 3.100551,
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '42',
                            zoneInteret : '6-42',
                            icone : 'tombant',
                            zoneGeographique : 'Banyuls'
                        },
                        {
                          id: '00030',
                            name : 'Cap Béar (sud)',
                            classname: 'svg-1',
                            GPS: {
                                WGS84: '42° 30\'814"N 03°08\'168" E',
                                valide : false
                            },
                            description : '???',
                            profondeurMax : '30',
                            zoneInteret : '15-30',
                            icone : 'tombant',
                            zoneGeographique : 'Banyuls'
                        },
                        {
                          id: '00031',
                            name : 'Alice Robert',
                            classname: 'svg-1',
                            GPS: {
                                valide : false,
                                WGS84:'42°35\'360"N 03°07\'580"E'
                            },
                            description : 'Dit le bananier',
                            profondeurMax : '48',
                            zoneInteret : '35-48',
                            icone : 'epave',
                            zoneGeographique : 'Banyuls'
                        },
                        {
                          id: '00032',
                            name : 'Saumur',
                            classname: 'svg-1',
                            GPS: {
                                valide : false,
                                WGS84 : '42°31\'540"N 03°08\'051"E'
                            },
                            description : '',
                            profondeurMax : '48',
                            zoneInteret : '35-48',
                            icone : 'epave',
                            zoneGeographique : 'Banyuls'
                        },
                         {
                           id: '00033',
                             name : 'L\'astrée',
                             classname: 'wreck',
                             GPS: {
                                 valide : false,
                                 WGS84 : '42°31\'715"N 03°08\'020"E'
                             },
                             description : 'proche port vendres',
                             profondeurMax : '48',
                             zoneInteret : '37-48',
                             icone : 'epave',
                             zoneGeographique : 'Banyuls'
                         },
                         {
                           id: '00034',
                               name : 'Le saint-lucien',
                               classname: 'wreck',
                               GPS: {
                                   valide : true,
                                   WGS84 : '42°31\'679"N 03°08\'014"E'
                               },
                               description : '',
                               profondeurMax : '37',
                               zoneInteret : '33-35',
                               icone : 'epave',
                               zoneGeographique : 'Banyuls'
                         },
                         {
                           id: '00035',
                             name : 'Roland Isabelle',
                             classname: 'svg-1',
                             GPS: {
                                 valide : false,
                                 WGS84 : '42°28\'590"N 03°11\'977"E'
                             },
                             description : 'Dans la réserve de Cerbère-Banyuls',
                             profondeurMax : '40',
                             zoneInteret : '??-??',
                             icone : 'epave',
                             zoneGeographique : 'Banyuls'
                         },
                        {
                          id: '00036',
                             name : 'L\'étoile du nord',
                             classname: 'svg-1',
                             GPS: {
                                 valide : false,
                                 WGS84 : '42°31\'307"N 03°08\'048"E'
                             },
                             description : 'A la sortir du port de port vendres',
                             profondeurMax : '38',
                             zoneInteret : '??-??',
                             icone : 'epave',
                             zoneGeographique : 'Banyuls'
                         },
                        {
                          id: '00037',
                             name : 'Pelle mécanique',
                             classname: 'svg-1',
                             GPS: {
                                 latitude :  42.481320,
                                 longitude : 3.137831,
                                 valide : false
                                 //WGS84 : '42°28\'470"N 03°08\'210"E'
                             },
                             description : 'A la sortir du port Banyuls',
                             profondeurMax : '11',
                             zoneInteret : '??-??',
                             icone : 'epave',
                             zoneGeographique : 'Banyuls'
                         },
                         {
                           id: '00038',
                              name : 'Cerbère "L\'épave"',
                              classname: 'svg-1',
                              GPS: {
                                  valide : false,
                                  WGS84 : '42°26\'450"N 03°10\'117"E'
                              },
                              description : '',
                              profondeurMax : '15',
                              zoneInteret : '10-15',
                              icone : 'epave',
                              zoneGeographique : 'Cerbère'
                          }
                           ];
            return  allSpotsTmp;
          };

      return {
          getAllSpots:getAllSpots
      }
  }]);

appServices.factory('CacheService', function(){

    var place = null;

    var setPlace = function(somePlace){
      place = somePlace;
    };

    var getPlace = function(){
      return place;
    };
    ///

    var spotsToDisplay = null;

    var setSpotsToDisplay = function(someSpots){
      spotsToDisplay = someSpots;
    };

    var getSpotsToDisplay = function(){
      return spotsToDisplay;
    };

  //
  var currentSpot = null;

    var setCurrentSpot = function(oneSpot){
      currentSpot = oneSpot;
    };

    var getCurrentSpot = function(){
      return currentSpot;
    };

    return {
      setSpotsToDisplay:setSpotsToDisplay,
      getSpotsToDisplay:getSpotsToDisplay,
      setPlace:setPlace,
      getPlace:getPlace,
      setCurrentSpot:setCurrentSpot,
      getCurrentSpot:getCurrentSpot
    }
});

appServices.factory('GPSService', ['$filter', function($filter){

    //== Methods ==//
  var parseDMS = function(input){

    //alert(input);
    var parts = input.split(/[^\d\w]+/);

    var degreeNorth = parts[0];
   //alert('degreeNorth='+degreeNorth);

    var minuteNorth = parts[1];
   //alert('minuteNorth='+minuteNorth);

    var secondNorth = parts[2];
   //alert('secondNorth='+secondNorth);

    var directionNorth = parts[3];
 //alert('directionNorth='+directionNorth);

    var convertedLat = convertDMSToDD(degreeNorth, minuteNorth, secondNorth, directionNorth);
    //alert('convertedLat'+convertedLat);

    var degreeEast = parts[4];
   //alert('degreeEast='+degreeEast);

    var minuteEast = parts[5];
   //alert('minuteEast='+minuteEast);

    var secondEast = parts[6];
   //alert('secondEast='+secondEast);

    var directionEast = parts[7];
 //alert('directionEast='+directionEast);

    var convertedLng = convertDMSToDD(degreeEast, minuteEast, secondEast, directionEast);

    return 'lat='+convertedLat + ', long='+convertedLng;

    //var lng = convertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
    //alert(lng);
  };

  var parseDMSToDD = function(input, latitudeOrLongitude){

    //alert(input);
    var parts = input.split(/[^\d\w]+/);

     var convertedValue = null;

     if(latitudeOrLongitude == 'Lat'){
       var degreeNorth = parts[0];
     //alert('degreeNorth='+degreeNorth);

      var minuteNorth = parts[1];
     //alert('minuteNorth='+minuteNorth);

      var secondNorth = parts[2];
     //alert('secondNorth='+secondNorth);

      var directionNorth = parts[3];
   //alert('directionNorth='+directionNorth);

      convertedValue = convertDMSToDD(degreeNorth, minuteNorth, secondNorth, directionNorth);
     }else{
       //alert('convertedLat'+convertedLat);

        var degreeEast = parts[4];
       //alert('degreeEast='+degreeEast);

        var minuteEast = parts[5];
       //alert('minuteEast='+minuteEast);

        var secondEast = parts[6];
       //alert('secondEast='+secondEast);

        var directionEast = parts[7];
     //alert('directionEast='+directionEast);

        convertedValue = convertDMSToDD(degreeEast, minuteEast, secondEast, directionEast);
     }

    return convertedValue;

    //var lng = convertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
    //alert(lng);
  };

  var convertDMSToDD = function(degrees, minutes, millisecond, direction) {
 //alert('millisecond'+millisecond+', seconds'+seconds);
    var min = minutes + '.' + millisecond;
    //alert(min);
    //alert(min/60);
    var dd = parseFloat(degrees) + parseFloat(min/60);
    //alert(dd);
    //var dd = degrees + minutes/60 + Math.round(seconds/(60*60));

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
  }

  var convertDDToDMS = function(value, latOrLong) {

    var degree = Math.floor(value);

    var reste = parseFloat(value) - degree;

    var min = reste * 60;

    var minRoundTo3 = $filter('number')(min, 3);

    var direction = 'N';
    if(latOrLong == 'Lat'){
      direction = 'N';
    }else if(latOrLong == 'Long'){
      direction = 'E';
    }

    return degree+'°' + minRoundTo3 +'\' '+direction;
  }

  /**
  Module pour le calcul de distance
  */
  var toRad = function(n) {
  return n * Math.PI / 180;
};

  var getDistance = function(fromLat, fromLon, toLat, toLon) {
  /*
  var fromLat = from[0];
  var fromLon = from[1];
  var toLat = to[0];
  var toLon = to[1];
  */
  // return 'fromLat='+fromLat+'fromLon='+fromLon+'toLat'+toLat+'toLon'+toLon;

  var dLat = toRad(toLat - fromLat);
  var dLon = toRad(toLon - fromLon);
  var fromLat = toRad(fromLat);
  var toLat = toRad(toLat);

  //return 'dLat='+dLat+'dLon='+dLon+'fromLat'+fromLat+'toLat'+toLat;

  var a = Math.pow(Math.sin(dLat / 2), 2) +
          (Math.pow(Math.sin(dLon / 2), 2) * Math.cos(fromLat) * Math.cos(toLat));
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var RADIUS = 6371;
  return RADIUS * c;

};

  var toGPSWGS84InDMD = function(spotTmp){

    var resultInDMD = '';

     if (typeof spotTmp.GPS.WGS84 === 'undefined') {
       if (typeof spotTmp.GPS.latitude === 'undefined' || typeof spotTmp.GPS.longitude === 'undefined') {
         resultInDMD = '';
       }else{
         var latTmp = spotTmp.GPS.latitude;
         var longTmp = spotTmp.GPS.longitude;

         //resultInDMD = latTmp + ' ' + longTmp;

         var latString = convertDDToDMS(latTmp, 'Lat');
         var longString = convertDDToDMS(longTmp, 'Long');

         resultInDMD = latString + ' ' + longString;
       }

     }else{
       resultInDMD = spotTmp.GPS.WGS84;
     }

    return resultInDMD;
  }

  return {
      parseDMS:parseDMS,
      parseDMSToDD:parseDMSToDD,
      convertDMSToDD:convertDMSToDD,
      convertDDToDMS:convertDDToDMS,
      getDistance:getDistance,
      toGPSWGS84InDMD:toGPSWGS84InDMD
    }
}]);