<template>
    <div class="colorPickers" v-show="!visibility">
        <ul class="nav">
            <li class="nav-item">
                <a
                    class="nav-link"
                    href="#"
                    :class="{ active: !isBorder }"
                    @click="borderClick(false)"
                    >Fill Color</a
                >
            </li>
            <li class="nav-item">
                <a
                    class="nav-link"
                    href="#"
                    :class="{ active: isBorder }"
                    @click="borderClick(true)"
                    >Border Color</a
                >
            </li>
        </ul>

        <ColorScheme v-if="isBorder" v-model="borderColor"></ColorScheme>
        <ColorScheme v-else v-model="fillColor"></ColorScheme>

        <div class="colorPickerButton">
            <button
                class="btn btn-sm btn--cancel"
                type="button"
                @click="close()"
            >
                Close
            </button>
            <button class="btn btn-sm btn--save" type="button" @click="save">
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

        close() {
            this.$store.dispatch("SAVE_ACTIVE_COLOR_PICKER_ID", null);
        },
    },
    computed: {
        visibility() {
            return this.$store.state.colorPicker.colorPicker.visibility;
        },
    },
};
</script>
