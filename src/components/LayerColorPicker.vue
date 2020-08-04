<template>
  <div class="colorPickers  colorPickers--dark">
    <ul class="nav">
      <li class="nav-item">
        <a
          class="nav-link"
          href="#"
          :class="{ active: isBorder }"
          @click="borderClick(true)"
          >Border Color</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="#"
          :class="{ active: !isBorder }"
          @click="borderClick(false)"
          >Fill Color</a
        >
      </li>
    </ul>

    <ColorScheme
      v-if="isBorder"
      :value="{ hex: borderColor }"
      @input="
        (val) => {
          border = val;
        }
      "
      style="display:inline-block;"
    ></ColorScheme>
    <ColorScheme
      v-else
      :value="{ hex: fillColor }"
      @input="
        (val) => {
          fill = val;
        }
      "
      style="display:inline-block;"
    ></ColorScheme>

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
  props: {
    borderColor: {
      type: String,
      default: "#2196F3FF",
    },
    fillColor: {
      type: String,
      default: "#000000FF",
    },
  },
  components: {
    ColorScheme: Chrome,
  },

  data() {
    return {
      isBorder: true,
      fill: {},
      border: {},
    };
  },
  methods: {
    borderClick(status) {
      this.isBorder = status;
    },
    onSave() {
      let hex8 = "";
      hex8 = this.border.hex8;
      const border = { hex8 };

      hex8 = this.fill.hex8;
      const fill = { hex8 };
      const colorObj = {
        border,
        fill,
      };
      this.$emit("onSave", colorObj);
    },

    onClose() {
      this.$emit("onClose");
    },
  },
};
</script>
