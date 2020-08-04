<template>
  <transition name="fade">
    <div
      :id="name"
      class="Modal modal--overlay"
      v-show="visible"
      v-if="isMounted"
      @click.self="hide"
    >
      <div class="modal__content" :style="contentStyle">
        <div class="modal__header">
          <div class="header__title">{{ title }}</div>
          <div class="header__close">
            <i class="fas fa-times" @click="hide" />
          </div>
        </div>
        <div class="modal__body custom-scrollbar">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * # How to use #
 *
 * <Modal
 *      name="🐮"
 *      :title="'Moodal'"
 *      :width="400"
 *      :height="100"
 *      :minWidth="200"
 *      :minHeight="100"
 *      :maxWidth="1920"
 *      :maxheight="1080"
 *      v-on:beforeOpen=""
 *      v-on:beforeClose=""
 *      v-on:beforeShow=""
 *      v-on:beforeHide=""
 *      v-on:afterOpen=""
 *      v-on:afterClose=""
 *      v-on:afterShow=""
 *      v-on:afterHide=""
 * >
 *     Hey I am Moodal
 * </Modal>
 *
 * $moodal.🐮.open() - Mount to the DOM
 * $moodal.🐮.close() - Unmount from the DOM
 * $moodal.🐮.show() - Show
 * $moodal.🐮.hide() - Hide
 */

import Vue from "vue";

export default {
  name: "Moodal",
  props: {
    name: {
      type: String,
    },
    height: {
      type: [Number, String],
    },
    width: {
      type: [Number, String],
    },
    minHeight: {
      type: Number,
      default: 100,
    },
    minWidth: {
      type: Number,
      default: 200,
    },
    maxHeight: {
      type: Number,
      default: window.innerHeight,
    },
    maxWidth: {
      type: Number,
      default: window.innerWidth,
    },
    title: {
      type: String,
      default: "",
    },
    mounted: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isMounted: this.mounted,
      visible: false,
    };
  },
  computed: {
    contentStyle() {
      let style = [];

      if (this.width) {
        let width = "";

        if (typeof this.width === "number") {
          width = this.width + "px";
        } else if (typeof this.width === "string") {
          width = this.width;
        }

        style.push(`width: ${width};`);
      }
      if (this.height) {
        let height = "";

        if (typeof this.height === "number") {
          height = this.height + "px";
        } else if (typeof this.height === "string") {
          height = this.height;
        }

        style.push(`height: ${height};`);
      }
      if (this.minWidth) {
        style.push(`min-width: ${this.minWidth}px;`);
      }
      if (this.minHeight) {
        style.push(`min-height: ${this.minHeight}px;`);
      }
      if (this.maxWidth) {
        style.push(`max-width: ${this.maxWidth}px;`);
      }
      if (this.maxHeight) {
        style.push(`max-height: ${this.maxHeight < window.innerHeight}px;`);
      }

      return style.join(" ");
    },
  },
  methods: {
    // Mount to the DOM
    open() {
      this.$emit("beforeOpen");
      this.isMounted = true;
      this.show();
      this.$emit("afterOpen");
    },
    // Unmount from the DOM
    close() {
      this.$emit("beforeClose");
      this.isMounted = false;
      this.hide();
      this.$emit("afterClose");
    },
    // Show
    show() {
      this.$emit("beforeShow");
      this.visible = true;
      this.$emit("afterShow");
    },
    // Hide
    hide() {
      this.$emit("beforeHide");
      this.visible = false;
      this.$emit("afterHide");
    },
  },
  created() {
    if (!this.$moodal) {
      Vue.prototype.$moodal = {};
    }
    this.$moodal[this.name] = this;

  },
};
</script>
