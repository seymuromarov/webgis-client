<template>
    <CustomModal name="detectorModal"
                 title="Change detection"
                 :minWidth="600"
                 :minHeight="400"
                 @afterHide="$emit('close')">
        <!-- <div class="detector-wrapper"> -->
        <div class="detector">
            <!-- <p class="detector-title"></p> -->
            <!-- <button @click="$emit('close')">&#x2715;</button> -->
            <multiselect v-model="selectedLayers"
                         :options="baseLayerList"
                         placeholder="Layers"
                         :close-on-select="false"
                         :multiple="true"
                         label="showingLabel"
                         track-by="name"
                         style="margin: 15px 0;"></multiselect>
            <div class="detector-list">
                <div :key="index"
                     v-for="(exported, index) in exportedImages"
                     class="detector-list-item">
                    <p>{{ exported.label }}</p>
                    <div class="image-wrapper">
                        <img :src="exported.image" />
                    </div>
                </div>
            </div>
        </div>
        <!-- </div> -->
    </CustomModal>
</template>

<script>
    import Multiselect from "vue-multiselect";
    import LayerService from "@/services/LayerService";
    import { URL } from "@/config/urls";
    import { Modal as CustomModal } from "../";
    import { layerController } from "@/controllers";

    export default {
        components: {
            Multiselect,
            CustomModal
        },
        props: {
            lastBBOXOfShape: {
                required: true,
                type: Array
            },
            token: {
                // required: true,
                type: String
            },
            visible: {
                type: Boolean
            }
        },
        watch: {
            selectedLayers: async function (layers) {
                this.exportedImages = [];

                for (let layer of layers) {
                    let url =
                        URL +
                        "/api/map/service/" +
                        layer.name +
                        "/MapServer/export" +
                        "?" +
                        `token=${this.token}&` +
                        `f=image&` +
                        `format=png8&` +
                        `transparent=true&` +
                        `size=1024,1024&` +
                        `bbox=${this.lastBBOXOfShape.toString()}&` +
                        `bboxsr=3857&` +
                        `imagesr=3857&` +
                        `dpi=90`;

                    this.exportedImages.push({
                        image: url,
                        label: layer.showingLabel
                    });
                }
            },
            visible(value) {
                if (value) {
                    this.selectedLayers = layerController.getSelectedBasemaps();

                    this.$moodal.detectorModal.show();
                } else {
                    this.$moodal.detectorModal.hide();
                }
            }
        },

        data() {
            return {
                selectedLayers: [],
                exportedImages: []
            };
        },
        computed: {
            baseLayerList() {
                return layerController.getBaseLayersWithoutCategory();
            }
            // selectedLayers() {

            // }
        }
    };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
