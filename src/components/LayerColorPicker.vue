<template>
    <div class="colorPickers  colorPickers--dark">
        <ul class="nav">
            <li class="nav-item">
                <a class="nav-link"
                   href="#"
                   :class="{ active: !isBorder }"
                   @click="borderClick(false)">Fill Color</a>
            </li>
            <li class="nav-item">
                <a class="nav-link"
                   href="#"
                   :class="{ active: isBorder }"
                   @click="borderClick(true)">Border Color</a>
            </li>
        </ul>

        <ColorScheme v-if="isBorder" v-model="borderColor"></ColorScheme>
        <ColorScheme v-else v-model="fillColor"></ColorScheme>

        <div class="colorPickerButton">
            <button class="btn btn-sm btn--cancel" type="button" @click="onClose">
                Close
            </button>
            <button class="btn btn-sm btn--save" type="button" @click="onSave">
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
    ColorScheme: Chrome
  },
  mounted() {},
  data() {
    return {
      isBorder: false,
      borderColor: {
        hsl: {
          h: 0,
          s: 0,
          l: 0,
          a: 1
        },
        hex: "#000000",
        hex8: "#000000FF",
        rgba: {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        },
        hsv: {
          h: 0,
          s: 0,
          v: 0,
          a: 1
        },
        oldHue: 0,
        source: "hex",
        a: 1
      },
      fillColor: {
        hsl: {
          h: 0,
          s: 0,
          l: 0,
          a: 1
        },
        hex: "#000000",
        hex8: "#000000FF",
        rgba: {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        },
        hsv: {
          h: 0,
          s: 0,
          v: 0,
          a: 1
        },
        oldHue: 0,
        source: "hex",
        a: 1
      }
    };
  },
  methods: {
    borderClick(status) {
      this.isBorder = status;
    },
    onSave() {
      var { hex8 } = this.borderColor;
      const border = { hex8 };

      var { hex8 } = this.fillColor;
      const fill = { hex8 };
      let colorObj = {
        borderColor: border,
        fillColor: fill
      };
      this.$emit("onSave", colorObj);
    },

    onClose() {
      this.$emit("onClose");
    }
  }
};
</script>
