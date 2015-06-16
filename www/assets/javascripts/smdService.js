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
         /*

      $http.get('./assets/json/spots.json')
          .then(function(results) {
              spots = results;
          });

          */

         var spots = [
            /* LES SPOTS DE MARSEILLE */
            {
                  name : 'Arche-de-planier',
                  classname: 'svg-1',
                  GPS: {
                      latitude :  43.197966666667,
                      longitude : 5.2235666666667,
                      valide : false
                  },
                  description : '43°11.878’ N 05°13.414’ E (WGS84)',
                  profondeurMax : '50 m',
                  zoneInteret : '40m-50m',
                  icone : 'tombant-40-60',
                  zoneGeographique : 'Marseille'
              },
              {
                  name : 'Chaouen',
                  classname : 'svg-1',
                  GPS : {
                      latitude :  43.1985,
                      longitude : 5.2283333333333,
                      valide : false
                  },
                  description : '43°11.910’ N 05°13.700’ E (WGS84)',
                  profondeurMax : '36 m',
                  zoneInteret : '6-36 m',
                  icone : 'epave-20-40',
                  zoneGeographique : 'Marseille'
              },
            /* LES SPOTS DE LA CIOTAT */
                {
                 name : 'Port de la Madrague',
                 classname: 'svg-1',
                 GPS: {
                     valide : false,
                     WGS84 : '43° 10\' 100N, 5° 41\' 600E'
                 },
                 description : 'Port ',
                 icone : 'port',
                 zoneGeographique : 'Saint Cyr sur Mer'
             },
             {
                name : 'FIGUEROLLES m',
                classname: 'tombant',
                GPS: {
                    latitude :  43.166283333333,
                    longitude : 5.5963,
                    valide : false
                },
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
                icone : 'tombant',
                zoneGeographique : 'La Ciotat'
             },
             {
                name : 'Grotte-des-3-pépés',
                classname: 'tombant',
                GPS: {
                    latitude :  43.176583333333,
                    longitude : 5.6102833333333,
                    valide : false
                },
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
                icone : 'tombant',
                zoneGeographique : 'La Ciotat'
             },
             {
                name : 'La-piscine',
                classname: 'tombant',
                GPS: {
                    latitude :  43.1625,
                    longitude : 5.61485,
                    valide : false
                },
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
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
                description : '??? (WGS84)',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
                icone : 'tombant',
                zoneGeographique : 'La Ciotat'
             },
             {
                name : 'P38',
                classname: 'svg-1',
                GPS: {
                    latitude :  43.167666666667,
                    longitude : 5.6696666666667,
                    valide : false,
                    WGS84 : '43° 10\' 060N, 5° 40\' 180E'
                },
                description : 'A la découverte d’une épave datant de la seconde guerre mondiale et très bien conservée ! Reposant à l’envers par 38m de fond, ce magnifi que avion de la Seconde Guerre mondiale a été abattu par les allemands le 27 janvier 1944.',
                profondeurMax : '39 m',
                zoneInteret : '37m-39m',
                icone : 'épave',
                zoneGeographique : 'La Ciotat'
             },
             {
                name : 'Tunnels (Les)',
                classname: 'svg-1',
                GPS: {
                    latitude :  43.154716666667,
                    longitude : 5.6834666666667,
                    valide : false,
                    WGS84 : '43° 9\' 283N, 5° 41\' 008E'
                },
                description : 'Deux tunnels et une grotte sont creusés dans la falaise. Un est très large 10m de diamètre, l\'autre 4m et donc nécessite une lampe La longueur est de près de 50m. Plongée qui ne nécessite pas une configuration spéléo, mais toujours prudence!! En cas de houle les ondes de pression sont très désagréables aux oreilles et à la cage thoracique. Beaucoup de vie à l\'entrée des tunnels. Possibilité de se mettre d\'un côté ou de l\'autre du cap en fonction de la houle et la météo.',
                profondeurMax : '20 m',
                zoneInteret : '5m-15m',
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
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
                icone : 'tombant',
                zoneGeographique : 'Les Lecques'
             },
             {
                name : 'Ile rousse',
                classname: 'tombant',
                GPS: {
                    latitude :  43.1338,
                    longitude : 5.7281166666667,
                    valide : false
                },
                description : '*** ambiance superbe',
                profondeurMax : '20 m',
                zoneInteret : '5m-20m',
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
                description : '??? (WGS84) ',
                profondeurMax : '?? m',
                zoneInteret : '??m-??m',
                icone : 'épave',
                zoneGeographique : 'Bandol'
             },
         /* LES SPOTS DE BANYULS */
            {
                name : 'Cap Gros',
                classname: 'svg-1',
                GPS: {
                    valide : false,
                    WGS84 : '???'
                },
                description : '??? (WGS84)',
                profondeurMax : '30 m',
                zoneInteret : '10m-30m',
                icone : 'tombant',
                zoneGeographique : 'Banyuls'
            },
            {
                name : 'Cap Béar',
                classname: 'svg-1',
                GPS: {
                    valide : false,
                    WGS84 : '???'
                },
                description : '??? (WGS84)',
                profondeurMax : '30 m',
                zoneInteret : '15m-30m',
                icone : 'tombant',
                zoneGeographique : 'Banyuls'
            },
            {
                name : 'Alice Robert',
                classname: 'svg-1',
                GPS: {
                    valide : false,
                    WGS84 : '42° 35\' 360N, 03° 07\' 580E'
                },
                description : 'Dit le bananier',
                profondeurMax : '48 m',
                zoneInteret : '35m-48m',
                icone : 'epave',
                zoneGeographique : 'Banyuls'
            },
            {
                name : 'Saumur',
                classname: 'svg-1',
                GPS: {
                    valide : false,
                    WGS84 : '42° 31\' 540N, 03° 08\' 051E'
                },
                description : '',
                profondeurMax : '48 m',
                zoneInteret : '35m-48m',
                icone : 'epave',
                zoneGeographique : 'Banyuls'
            },
             {
                 name : 'L\'astrée',
                 classname: 'wreck',
                 GPS: {
                     valide : false,
                     WGS84 : '42° 31\' 715N, 03° 08\' 20E'
                 },
                 description : 'proche port vendres',
                 profondeurMax : '48 m',
                 zoneInteret : '37m-48m',
                 icone : 'epave',
                 zoneGeographique : 'Banyuls'
             },
             {
                   name : 'Le saint-lucien',
                   classname: 'wreck',
                   GPS: {
                       valide : true,
                       WGS84 : '42° 31\' 679N, 03° 08\' 014E'
                   },
                   description : '',
                   profondeurMax : '37 m',
                   zoneInteret : '33-35m',
                   icone : 'epave',
                   zoneGeographique : 'Banyuls'
             },
             {
                 name : 'Roland Isabelle',
                 classname: 'svg-1',
                 GPS: {
                     valide : false,
                     WGS84 : '42° 28\' 590N, 03° 11\' 977E'
                 },
                 description : 'Dans la réserve de Cerbère-Banyuls',
                 profondeurMax : '40 m',
                 zoneInteret : '??',
                 icone : 'epave',
                 zoneGeographique : 'Banyuls'
             },
            {
                 name : 'L\'étoile du nord',
                 classname: 'svg-1',
                 GPS: {
                     valide : false,
                     WGS84 : '42° 31\' 307N, 03° 08\' 048E'
                 },
                 description : 'A la sortir du port de port vendres',
                 profondeurMax : '38 m',
                 zoneInteret : '??',
                 icone : 'epave',
                 zoneGeographique : 'Banyuls'
             },
            {
                 name : 'Pelle mécanique',
                 classname: 'svg-1',
                 GPS: {
                     valide : false,
                     WGS84 : '42° 28\' 51N, 03° 08\' 21E'
                 },
                 description : 'A la sortir du port Banyuls',
                 profondeurMax : '11 m',
                 zoneInteret : '??',
                 icone : 'epave',
                 zoneGeographique : 'Banyuls'
             },
             {
                  name : 'Cerbère "L\'épave"',
                  classname: 'svg-1',
                  GPS: {
                      valide : false,
                      WGS84 : '42° 26\' 450N, 03° 10\' 117E'
                  },
                  description : '',
                  profondeurMax : '15 m',
                  zoneInteret : '10m-15m',
                  icone : 'epave',
                  zoneGeographique : 'Cerbère'
              }
         ];
         return spots;
     }

      return {
          getAllSpots:getAllSpots
      }
  }]);

