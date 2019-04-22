// import 'ol/ol.css'
// import {Map, View} from 'ol';
// import {Tile as TileLayer, Image as ImageLayer} from 'ol/layer.js';
// import {OSM, TileArcGISRest, ImageArcGISRest} from 'ol/source.js';
// import {fromLonLat} from 'ol/proj';
//
// let token = "NozbfcjEYvYYZRhpgKE9S-TmHgSi0k_8p9VygfLGa10gXkmC2oPV8UZUyrs5pekh";
// let url = 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer';
// let azersky = "http://webgis.azercosmos.az/map.php?service=AzercosmosBasemap";
// let demir = "http://azcgisiis.gis.az/arcgis/rest/services/DəmirYoluBaki/MapServer";
// let mosaic = "http://azcgisiis.gis.az/arcgis/rest/services/AzerkyMosaic2017/MapServer";
//
// let layers = [
//     new TileLayer({
//         source: new OSM()
//     }),
//     // new ImageLayer({
//     //     source: new ImageArcGISRest({
//     //         ratio: 1,
//     //         params: {},
//     //         url: url
//     //     })
//     // }),
//     new TileLayer({
//         source: new TileArcGISRest({
//             url: azersky,
//             params: {
//                 "token": token
//             }
//         })
//     }),
//     new TileLayer({
//         source: new TileArcGISRest({
//             url: demir
//         })
//     })
//
// ];
//
// const mapLayer = new Map({
//     target: 'map',
//     layers: layers,
//     view: new View({
//         center: fromLonLat([49.882858, 40.3598414]),
//         zoom: 6
//     })
// });
