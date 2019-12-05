<template>
    <div class="detector-wrapper">
        <div class="detector">
            <p class="detector-title">Change Detection</p>
            <button @click="$emit('close')">&#x2715;</button>
            <multiselect
                v-model="selectedLayers"
                :options="baseLayerList"
                placeholder="Layers"
                :close-on-select="false"
                :multiple="true"
                label="showingLabel"
                track-by="label"
                style="margin: 15px 0;"
            ></multiselect>
            <div class="detector-list">
                <div
                    :key="index"
                    v-for="(exported, index) in exportedImages"
                    class="detector-list-item">
                    <p>{{ exported.label }}</p>
                    <div class="image-wrapper">
                        <img :src="exported.image">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { LAYER_URLS } from '@/config/baseUrl'
import LayerService from '@/services/LayerService'

export default {
    components: {
        Multiselect
    },
    props: {
        bbox: {
            required: true,
            type: Array
        },
        token: {
            required: true,
            type: String
        }
    },
    watch: {
        selectedLayers: async function (layers) {
            this.exportedImages = []

            for (let layer of layers) {
                let url = LAYER_URLS.GET_DRAWN_AREA_IMAGE({ name: layer.label }) + "?"
                    + `token=${this.token}&`
                    + `f=image&`
                    + `format=png8&`
                    + `transparent=true&`
                    + `size=1024,1024&`
                    + `bbox=${this.bbox.toString()}&`
                    + `bboxsr=3857&`
                    + `imagesr=3857&`
                    + `dpi=90`

                this.exportedImages.push({ image: url, label: layer.showingLabel })
            }
        }
    },
    created: async function () {
        let response = await LayerService.getUserRelatedLayers();
        this.baseLayerList = response.data;
    },
    data () {
        return {
            selectedLayers: [],
            baseLayerList: [],
            exportedImages: []
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>