<template>
    <div class="colorPickers" v-show="visibility">
        <ul class="nav">
            <li class="nav-item">
                <a class="nav-link active" href="#" @click="borderClick(true)"
                    >Border Color</a
                >
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" @click="borderClick(false)"
                    >Fill Color</a
                >
            </li>
        </ul>

        <div class="colorPicker" v-if="isBorder">
            <h5>Border Color</h5>
            <ColorScheme v-model="borderColor"></ColorScheme>
        </div>
        <div class="colorPicker" v-else>
            <h5>Fill Color</h5>
            <ColorScheme v-model="fillColor"></ColorScheme>
        </div>

        <div class="colorPickerButton">
            <button
                class="btn btn-sm btn-danger"
                type="button"
                @click="setColorPickerVisibility(false)"
            >
                Close
            </button>
            <button class="btn btn-sm btn-primary" type="button" @click="save">
                Save
            </button>
        </div>
    </div>
</template>
<script>
import { Chrome } from "vue-color";

export default {
    name: "color",
    props: {},
    components: {
        ColorScheme: Chrome,
    },
    mounted() {},
    data() {
        return {
            isBorder: false,
            borderColor: {
                hex8: "#000000",
                rgba: { r: 255, g: 255, b: 255, a: 1 },
            },
            fillColor: {
                hex8: "#ffffff00",
                rgba: { r: 255, g: 255, b: 255, a: 1 },
            },
        };
    },
    methods: {
        borderClick(status) {
            this.isBorder = status;
        },
        save() {
            this.$store.dispatch("SAVE_COLORPICKER_FILLCOLOR", this.fillColor);
            this.$store.dispatch(
                "SAVE_COLORPICKER_BORDERCOLOR",
                this.borderColor
            );
            this.$emit("saveColor");
        },

        setColorPickerVisibility(status) {
            this.$store.dispatch("SAVE_COLORPICKER_VISIBILITY", status);
        },
    },
    computed: {
        visibility() {
            return this.$store.state.colorPicker.colorPicker.visibility;
        },
    },
};
</script>
