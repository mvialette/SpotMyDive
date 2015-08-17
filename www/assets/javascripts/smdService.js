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
                        name : 'Roche-à-la-Stelle',
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
                        name : 'Calanque-de-Seynerolles',
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
                        zoneGeographique : 'La Ciotat'
                     },
                     {
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
                        name : 'Ile rousse (est)',
                        classname: 'tombant',
                        GPS: {
                            WGS84 : '43°07\'929"N 05°43\'685"E',
                            //latitude :  43.1338,
                            //longitude : 5.7281166666667,
                            valide : false
                        },
                        description : '*** ambiance superbe',
                        profondeurMax : '20',
                        zoneInteret : '5-20',
                        icone : 'tombant',
                        zoneGeographique : 'Bandol'
                     },
                     {
                        name : 'non-identifie',
                        classname: 'épave',
                        GPS: {
                            latitude :  43.119833333333,
                            longitude : 5.7495,
                            valide : false
                        },
                        description : '??? ',
                        profondeurMax : '??',
                        zoneInteret : '??-??',
                        icone : 'épave',
                        zoneGeographique : 'Bandol'
                     },
                 /* LES SPOTS DE BANYULS */
                    {
                        name : 'Cap Gros',
                        classname: 'svg-1',
                        GPS: {
                            valide : false
                        },
                        description : '???',
                        profondeurMax : '30',
                        zoneInteret : '10-30',
                        icone : 'tombant',
                        zoneGeographique : 'Banyuls'
                    },
                    {
                        name : 'Cap Béar',
                        classname: 'svg-1',
                        GPS: {
                            valide : false
                        },
                        description : '???',
                        profondeurMax : '30',
                        zoneInteret : '15-30',
                        icone : 'tombant',
                        zoneGeographique : 'Banyuls'
                    },
                    {
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
                         name : 'Roland Isabelle',
                         classname: 'svg-1',
                         GPS: {
                             valide : false,
                             WGS84 : '42°28\'590"N 03°11\'977"E'
                         },
                         description : 'Dans la réserve de Cerbère-Banyuls',
                         profondeurMax : '40',
                         zoneInteret : '??',
                         icone : 'epave',
                         zoneGeographique : 'Banyuls'
                     },
                    {
                         name : 'L\'étoile du nord',
                         classname: 'svg-1',
                         GPS: {
                             valide : false,
                             WGS84 : '42°31\'307"N 03°08\'048"E'
                         },
                         description : 'A la sortir du port de port vendres',
                         profondeurMax : '38',
                         zoneInteret : '??',
                         icone : 'epave',
                         zoneGeographique : 'Banyuls'
                     },
                    {
                         name : 'Pelle mécanique',
                         classname: 'svg-1',
                         GPS: {
                             valide : false,
                             WGS84 : '42°28\'051"N 03°08\'021"E'
                         },
                         description : 'A la sortir du port Banyuls',
                         profondeurMax : '11',
                         zoneInteret : '??',
                         icone : 'epave',
                         zoneGeographique : 'Banyuls'
                     },
                     {
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

          /*
     var getAllSpots = function(){


     // $http.get('./assets/json/spots.json')
     //     .then(function(results) {
     //         spots = results;
      //    });

     }
     */

      return {
          getAllSpots:getAllSpots
      }
  }]);

