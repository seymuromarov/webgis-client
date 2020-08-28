<template>
  <div class="map-controls" id="map-controls">
    {{/* Top controls */}}
    <div class="map-controls--horizontal">
      {{/* Search */}}
      <div class="search">
        <div class="search__logo">
          <img src="../assets/images/ac_logo.svg" alt="Azercosmos logo" />
        </div>
        <div class="control-select">
          <input
            type="text"
            placeholder="Search"
            class="control-select__input"
            :class="{ 'control-select__input--expanded': searchExpanded }"
            v-model="searchInputValue"
          />
          <div class="control-select__results custom-scrollbar">
            <ul>
              <li
                v-for="(city, index) in citiesToShow"
                :key="index"
                @click="onCitySelect(city)"
              >
                {{ city.city }}
              </li>
            </ul>
          </div>
        </div>

        <button
          class="control__button search__button"
          @click="searchExpanded = !searchExpanded"
        >
          <img :src="icons.search" alt="Home" />
        </button>
      </div>

      {{/* Coordinates */}}
      <div
        class="control__button-group control__button-group--horizontal coordinates"
      >
        <div class="control-select">
          <input
            type="text"
            placeholder="Mode"
            class="control-select__input control-select__input--expanded"
            v-model="coordinatesMode"
          />
          <div class="control-select__results custom-scrollbar">
            <ul>
              <li @click="onModeSelect('metric')">
                Metric
              </li>
              <li @click="onModeSelect('horseric')">
                Horseric
              </li>
            </ul>
          </div>
        </div>

        <div class="coordinate">
          <label for="coordinate-x">X:</label>
          <input id="coordinate-x" v-model="coordinates.lng" placeholder="x" />
        </div>

        <div class="coordinate">
          <label for="coordinate-y">Y:</label>
          <input id="coordinate-y" v-model="coordinates.lat" placeholder="y" />
        </div>

        <button class="control__button" @click="goToCoordinates">
          <img :src="icons.compass" alt="Go to coordinate" />
        </button>
      </div>
    </div>

    {{/* Zoom */}}
    <div class="control__button-group control__button-group--vertical">
      <button class="control__button" @click="zoomIn">
        <img :src="icons.plus" alt="Zoom in" />
      </button>
      <button class="control__button" @click="zoomOut">
        <img :src="icons.minus" alt="Zoom out" />
      </button>
    </div>

    {{/* History */}}
    <div class="control__button-group control__button-group--vertical">
      <button class="control__button" @click="zoomToCenter">
        <img :src="icons.home" alt="Home" />
      </button>
      <button
        class="control__button"
        @click="historyBack"
        :disabled="!isPreviousExist"
      >
        <img :src="icons.arrow_left" alt="Back" />
      </button>
      <button
        class="control__button"
        @click="historyNext"
        :disabled="!isNextExist"
      >
        <img :src="icons.arrow_right" alt="Next" />
      </button>
    </div>

    {{/* Scale */}}
    <div class="control__button-group scale">
      <input
        v-model="scale"
        :style="{ width: scaleWidth + 'px' }"
        @focus="scaleFocus"
        @blur="scaleBlur"
      />
    </div>
  </div>
</template>

<script>
import { fromLonLat } from "ol/proj";
import { mapController, historyController } from "@/controllers";
import cities from "../data/cities.json";
import { icons } from "@/constants/assets.js";

export default {
  name: "MapControls",
  data() {
    return {
      icons,

      cities,
      searchExpanded: false,
      searchInputValue: "",
      coordinatesMode: "metric",
      coordinates: {
        lat: "40.395278",
        lng: "49.882222",
      },
      // scale: "50 km",
      // scaleWidth: "123",
    };
  },

  methods: {
    onCitySelect(city) {
      this.map.getView().setCenter(
        //[city.lng, city.lat]
        fromLonLat([parseFloat(city.lng), parseFloat(city.lat)])
      );
      this.map.getView().setZoom(11);
      this.searchInputValue = city.city;
    },
    onModeSelect(mode) {
      this.coordinatesMode = mode;
    },
    goToCoordinates() {
      this.map
        .getView()
        .setCenter(
          fromLonLat([
            parseFloat(this.coordinates.lng),
            parseFloat(this.coordinates.lat),
          ])
        );
      this.map.getView().setZoom(11);
    },
    zoomIn() {
      this.map.getView().setZoom(this.map.getView().getZoom() + 1);
    },
    zoomOut() {
      this.map.getView().setZoom(this.map.getView().getZoom() - 1);
    },
    zoomToCenter() {
      this.map.getView().setCenter(fromLonLat([47.82858, 40.3598414]));
      this.map.getView().setZoom(8);
      this.searchInputValue = "";
    },
    historyBack() {
      historyController.historyBack(this);
    },
    historyNext() {
      historyController.historyNext(this);
    },
    scaleFocus() {
      this.scale = this.scale.replace(/[^0-9.]/g, "");
      console.log("scaleFocus -> this.scale", this.scale);
    },
    scaleBlur() {
      const s = this.scale.replace(/[^0-9.]/g, "");
      console.log("scaleBlur ->  this.scale", this.scale);
      console.log("scaleBlur -> s", s);
      this.setScale(s);
    },
    getScale() {
      var res = mapController.getCurrentResolution();
      return (res / 10).toFixed(2);
    },
    setScale(val) {
      console.log("setScale -> val", val);
      mapController.setCurrentResolution(val);
    },
  },
  computed: {
    scaleOptions() {
      return mapController.getScaleLineOptions();
    },
    scale() {
      return this.getScale() + " km";
    },
    scaleWidth() {
      var width = this.scaleOptions.width;
      return width;
    },
    isNextExist() {
      return historyController.getHistoryIsNextExist();
    },
    isPreviousExist() {
      return historyController.getHistoryIsPreviousExist();
    },
    map: {
      get() {
        return mapController.getMap();
      },
      set(payload) {
        mapController.setMap(payload);
      },
    },
    citiesToShow() {
      return this.cities
        .filter((x) =>
          x.city.toLowerCase().includes(this.searchInputValue.toLowerCase())
        )
        .sort((a, b) => {
          if (a.city > b.city) {
            return 1;
          } else if (a.city < b.city) {
            return -1;
          }
          return 0;
        });
    },
  },
};
</script>

<style lang="scss">
.map-controls {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  text-align: initial;
  pointer-events: none;

  & > * {
    align-self: flex-start;
    pointer-events: auto;
  }

  &--horizontal {
    display: flex;
    align-items: flex-start;
  }

  button:focus,
  input:focus {
    outline: none;
  }

  .control-select {
    position: relative;

    &__input {
      height: 100%;
      width: 0;
      padding: 0;
      background-color: var(--primary-color-opacity-85);
      border: 0;
      color: var(--white);
      transition: all 0.2s ease-in-out;
      transition-delay: 0.1s;
      font-size: 14px;
      &::placeholder {
        color: rgba(255, 255, 255, 0.8);
      }

      &.control-select__input--expanded {
        padding: 0 8px;
        width: 200px;
      }
    }

    &:focus-within .control-select__results,
    .control-select__results:active {
      max-height: 150px;
      overflow: auto;
    }

    &__results {
      max-height: 0px;
      position: absolute;
      background-color: var(--primary-color-opacity-85);
      left: 0;
      right: 0;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      overflow: hidden;
      transition: max-height 0.1s ease-in-out;
      ul {
        margin: 0;
        padding: 3px 0;
        list-style-type: none;
        li {
          padding: 2px 10px;
          color: var(--white);
          font-size: 14px;
          &:hover {
            background-color: var(--primary-color-lighten-200);
            cursor: pointer;
          }
        }
      }
    }
  }

  .control__button-group {
    margin: 10px;
    display: flex;
    align-items: self-start;

    &--vertical {
      flex-direction: column;

      .control__button {
        &:first-of-type {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        &:last-of-type {
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
    }

    &--horizontal {
      flex-direction: row;

      .control__button {
        &:first-of-type {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        &:last-of-type {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
    }

    .control__button {
      margin: 0;
      border-radius: 0;
    }
  }

  .control__button {
    margin: 10px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: var(--primary-color-opacity-85);
    color: var(--white);
    &:hover {
      background-color: var(--primary-color-opacity-85);
    }

    &:disabled {
      img {
        opacity: 0.6;
      }
    }

    &:active {
      background-color: var(--primary-color-opacity-95);
    }

    img {
      width: 18px;
      height: 18px;
      object-fit: contain;
      object-position: center;
    }
  }

  .search {
    display: flex;
    margin: 10px;
    .search__logo {
      background-color: var(--primary-color);
      padding: 7px 14px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      display: flex;
      align-items: center;
      img {
        height: 24px;
      }
    }

    .search__button {
      margin: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .coordinates {
    display: flex;
    align-items: stretch !important;

    .control-select {
      &:after {
        position: absolute;
        content: "";
        top: 19px;
        right: 10px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-color: #fff transparent transparent transparent;
      }

      &__input {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;

        &--expanded {
          width: 80px;
        }
      }
    }

    .control-select:focus-within .control-select__input {
      border-bottom-left-radius: 0;
    }

    .coordinate {
      display: flex;

      label {
        height: 100%;
        padding: 0 0.5rem;
        background-color: var(--primary-color-opacity-85);
        color: var(--white);
        font-size: 14px;
        display: flex;
        align-items: center;
      }

      input {
        height: 100%;
        width: 100px;
        padding: 0 0.25rem;
        background-color: var(--primary-color-opacity-85);
        border: 0;
        color: var(--white);
        transition: all 0.2s ease-in-out;
        transition-delay: 0.1s;
        font-size: 14px;

        &:focus {
          background-color: var(--primary-color-opacity-95);
        }
      }
    }

    .control__button {
      &:first-of-type {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
      }
    }
  }

  .scale {
    position: absolute;
    bottom: 0;
    border-radius: 5px;
    background-color: var(--primary-color-opacity-50);

    input {
      margin: 4px;
      background-color: transparent;
      border: 1px solid #fff;
      border-radius: 0px;
      border-top: 0;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
