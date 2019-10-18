import {emlakUsers} from "../constants/permissions";

class LayerHelper {
    constructor(self) {
        this.data = self;
    }

    creator = (layers) => {
        let baseLayers = [];
        console.log(this.data.username)

        let dynamicLayers = [];
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
                    'layers': null,
                    'apiFrom': 'internal'

                })
            }
        }


        //just for now
        if (emlakUsers.includes(this.data.username)) {
            dynamicLayers.push({
                'name': "UQODIYA_EKIN",
                'order': layers.length + 1,
                'layersVisibility': false,
                'collapseVisibility': false,
                'layers': null,
                'apiFrom': 'emlak'
            })
        }


        return {baseLayers, dynamicLayers};
    }

    add = (service, index, dynamic = false, params) => {

    }

    delete = () => {

    }
    setColor = () => {

    }

    setLayout = () => {

    }

}

export default LayerHelper;