class LayerHelper {
    constructor() {
      
    }

    creator=(layers)=>{
        let baseLayers=[];
        let dynamicLayers=[];
                for (let i = 0; i < layers.length; i++) {
                    if (layers[i].attributes['summary'] !== "Dynamic") {

                        if (
                            layers[i].attributes.title === "AzercosmosBasemap"
                            || layers[i].attributes.title === "Azersky2018"
                            || layers[i].attributes.title === "Azersky2019"
                        ) {
                            baseLayers.push({
                                'name': layers[i].attributes.title,
                                'order': i + 1,
                                'spaital': 3857
                            })
                        } else {
                            baseLayers.push({
                                'name': layers[i].attributes.title,
                                'order': i + 1,
                                'spaital': 32936
                            })
                        }
                    } else {
                       dynamicLayers.push({
                            'name': layers[i].attributes.title,
                            'order': i + 1,
                            'layersVisibility': false,
                            'collapseVisibility': false,
                            'layers': null
                        })
                    }
                }
                

                return {baseLayers ,dynamicLayers };
    }

    add=(service, index, dynamic = false, params)=>{

    }

    delete=()=>{
        
    }
    setColor=()=>{

    }

    setLayout=()=>{

    }

}

export default LayerHelper;