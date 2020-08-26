<template>
  <div class="map-text">
    <div class="map-text__container">
      <input
        type="text"
        class="map-text__input"
        v-model="text"
        ref="mapTextInput"
        placeholder="Text"
        @keyup.enter="addText"
      />
      <button class="map-text__action--close map-text__button" @click="close" ref="close">
        <i class="fas fa-times"></i>
      </button>
      <button class="map-text__button" @click="addText">
        <i class="fas fa-check"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { toolController } from "@/controllers";

export default {
  name: "MapText",
  data() {
    return {
      text: '',
    };
  },
  computed: {
    pointCoordinates() {
      return toolController.getBbox();
    }
  },
  methods: {
    addText() {
      if(this.text.length) {
        toolController.addText(this.text, this.pointCoordinates);
        this.close();
      }
    },
    close() {
      this.$refs.close.click();
      this.text = '';
    }
  },
};
</script>

<style lang="scss">
.map-text {
  position: fixed;
  transform: translate(-50%, calc(-100% - 1rem));
  
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border-top: 0.5rem solid black;
    border-right: 0.5rem solid transparent;
    left: calc(50% - 0.5rem);
    top: 100%;
    border-left: 0.5rem solid transparent;
  }

  &__container{
    position: relative;
    display: flex;
  }
  
  &__input {
    width: 8rem;
    height: 2rem;
    text-align: center;

    &, &:hover, &:focus {
      background-color: var(--primary-color);
      color: var(--white);
      outline: none;
      box-shadow: none;
      border: none
    }
  }

  &__button{
    width: 2rem;
    border: 0;
    background-color: var(--primary-color);
    color: var(--white);
  }
}
</style>
