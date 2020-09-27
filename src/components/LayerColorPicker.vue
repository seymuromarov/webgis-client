<template>
  <div class="colorPickers  colorPickers--dark">
    <ul class="nav">
      <li class="nav-item">
        <a
          class="nav-link"
          href="#"
          :class="{ active: isBorder }"
          @click="borderClick(true)"
          >{{ $t("colorPicker.borderColor") }}</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="#"
          :class="{ active: !isBorder }"
          @click="borderClick(false)"
          >{{ $t("colorPicker.fillColor") }}</a
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
      v-model="fill"
      style="display:inline-block;"
    ></ColorScheme>

    <div class="colorPickerButton">
      <button class="btn btn-sm btn--cancel" type="button" @click="onClose">
        {{ $t("button.close") }}
      </button>
      <button class="btn btn-sm btn--save" type="button" @click="onSave">
        {{ $t("button.save") }}
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
      let border = hex8;
      if (!border) border = this.borderColor;

      hex8 = this.fill.hex8;
      let fill = hex8;
      if (!fill) fill = this.fillColor;

      const colorObj = {
        borderColor: border,
        fillColor: fill,
      };
      this.$emit("onSave", colorObj);
    },

    onClose() {
      this.$emit("onClose");
    },
  },
};
</script>
