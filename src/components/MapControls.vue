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
                {{
                  city.admin == city.city
                    ? city.admin
                    : `${city.admin} / ${city.city}`
                }}
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
        <v-select
          class="mode-select"
          label="title"
          v-model="selectedCoordinateMode"
          :options="coordinateOptions"
          :clearable="false"
          :searchable="false"
          @input="onChange"
        />

        <div class="coordinate">
          <label for="coordinate-x">X:</label>
          <input
            id="coordinate-x"
            v-model="coordinates.x"
            placeholder="x"
            @keyup.enter="goToCoordinate"
          />
        </div>

        <div class="coordinate">
          <label for="coordinate-y">Y:</label>
          <input
            id="coordinate-y"
            v-model="coordinates.y"
            placeholder="y"
            @keyup.enter="goToCoordinate"
          />
        </div>

        <button class="control__button" @click="goToCoordinate">
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
    <div class="control__button-group control__button-group--horizontal scale">
      <input
        v-model="scaleInput"
        :style="{ width: scaleWidth + 'px' }"
        @focus="scaleFocus"
        @blur="scaleBlur"
        @keyup.enter="setScale"
      />

      <button class="control__button" @click="setScale()">
        <img :src="icons.send" alt="Scale" />
      </button>
    </div>
  </div>
</template>

<script>
import { fromLonLat } from "ol/proj";
import {
  mapController,
  historyController,
  toolController,
} from "@/controllers";
import cities from "../data/cities.json";
import { icons } from "@/constants/assets.js";
import { coordinateTypeEnum } from "@/enums";
export default {
  name: "MapControls",
  data() {
    return {
      icons,
      cities,
      searchExpanded: false,
      searchInputValue: "",
      // coordinateOptions: [],
      selectedCoordinateMode: null,
      coordinates: {
        x: 0,
        y: 0,
      },
      scaleInput: "",
    };
  },
  mounted() {
    this.selectedCoordinateMode = this.coordinateOptions[0];

    var coordinates = this.getCoordinates();
    this.setCoordinates(coordinates[0], coordinates[1]);
  },
  watch: {
    language(val) {
      if (this.coordinateOptions && this.coordinateOptions.length > 0) {
        var selected = this.coordinateOptions.find(
          (c) => c.key == this.selectedCoordinateMode.key
        );
        this.selectedCoordinateMode = selected;
      }
    },
    currentCenter(val) {
      this.coordinates.x = val[0];
      this.coordinates.y = val[1];
    },
    scaleOptions(value) {
      this.scaleInput =
        this.scaleValue.toFixed(2) + " " + this.scaleOptions.unit;
    },
  },
  computed: {
    language() {
      return this.$store.getters.language;
    },
    // selectedCoordinateMode: {
    //   get() {
    //     return this.selectedCoordinateMode;
    //   },
    //   set(val) {
    //     this.selectedCoordinateMode = val;
    //   },
    // },
    coordinateOptions() {
      return [
        {
          key: coordinateTypeEnum.GEOGRAPHIC,
          title: this.$i18n.t("coordinateType.geographical"),
        },
        {
          key: coordinateTypeEnum.METRIC,
          title: this.$i18n.t("coordinateType.metric"),
        },
      ];
    },
    currentCenter() {
      return this.getCoordinates();
    },
    scaleOptions() {
      return mapController.getScaleLineOptions();
    },

    scaleValue() {
      return mapController.getCurrentResolution();
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
          if (a.admin > b.admin) {
            return 1;
          } else if (a.admin < b.admin) {
            return -1;
          }
          return 0;
        });
    },
  },
  methods: {
    onChange() {
      var coordinates = this.getCoordinates();
      this.setCoordinates(coordinates[0], coordinates[1]);
    },

    setCoordinates(x, y) {
      this.coordinates.x = x;
      this.coordinates.y = y;
    },
    getCoordinates() {
      let coordinates = [];

      if (this.selectedCoordinateMode && this.selectedCoordinateMode.key) {
        coordinates = mapController.getCurrentCenter(
          this.selectedCoordinateMode.key
        );
      }

      return coordinates;
    },
    onCitySelect(city) {
      const center = [city.lng, city.lat];
      mapController.setCenter(center, coordinateTypeEnum.GEOGRAPHIC);
      mapController.setZoomLevel(11);

      this.searchInputValue = city.city;
    },

    goToCoordinate() {
      const x = this.coordinates.x;
      const y = this.coordinates.y;
      let center = [x, y];

      mapController.setCenter(center, this.selectedCoordinateMode.key);
      const featureName = "centerPoint";
      const featureOpts = {
        name: featureName,
      };

      toolController.deleteFeatureByName(featureName);
      toolController.addMarker(
        center,
        featureOpts,
        this.selectedCoordinateMode.key
      );
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
      this.scaleInput = this.convertToNum(this.scaleInput);
    },
    scaleBlur() {
      this.scaleInput = this.convertToNum(this.scaleInput);
      this.scaleInput = this.scaleInput + " " + this.scaleOptions.unit;
    },
    setScale() {
      mapController.setCurrentResolution(this.convertToNum(this.scaleInput));
    },
    getScale() {
      var res = mapController.getCurrentResolution();
      return res;
    },
    convertToNum(val) {
      return val.replace(/[^0-9.]/g, "");
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
      font-size: 1.4rem;
      &::placeholder {
        color: rgba(255, 255, 255, 0.8);
      }

      &.control-select__input--expanded {
        padding: 0 0.8rem;
        width: 20rem;
      }
    }

    &:focus-within .control-select__results,
    .control-select__results:active {
      max-height: 15rem;
      overflow: auto;
    }

    &__results {
      max-height: 0rem;
      position: absolute;
      background-color: var(--primary-color-opacity-85);
      left: 0;
      right: 0;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      overflow: hidden;
      transition: max-height 0.1s ease-in-out;
      ul {
        margin: 0;
        padding: 0.3rem 0;
        list-style-type: none;
        li {
          padding: 0.2rem 1rem;
          color: var(--white);
          font-size: 1.4rem;
          &:hover {
            background-color: var(--primary-color-lighten-200);
            cursor: pointer;
          }
        }
      }
    }
  }

  .control__button-group {
    margin: 1rem;
    display: flex;
    align-items: self-start;

    &--vertical {
      flex-direction: column;

      .control__button {
        &:first-of-type {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }

        &:last-of-type {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
      }
    }

    &--horizontal {
      flex-direction: row;

      .control__button {
        &:first-of-type {
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
        }

        &:last-of-type {
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
      }
    }

    .control__button {
      margin: 0;
      border-radius: 0;
    }
  }

  .control__button {
    margin: 1rem;
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
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
      width: 1.8rem;
      height: 1.8rem;
      object-fit: contain;
      object-position: center;
    }
  }

  .search {
    display: flex;
    margin: 1rem;
    .search__logo {
      background-color: var(--primary-color);
      padding: 0.7rem 1.4rem;
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
      display: flex;
      align-items: center;
      img {
        height: 2.4rem;
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

    .mode-select {
      min-width: 12rem;

      &.vs--single.vs--open .vs__selected {
        position: initial;
      }

      &.vs--open .vs__dropdown-toggle {
        height: 100%;
        border-radius: 0.5rem 0 0 0;
      }

      .vs__dropdown-toggle {
        height: 100%;
        border-radius: 0.5rem 0 0 0.5rem;
        border: 0;
        background-color: var(--primary-color-opacity-85);

        .vs__selected {
          color: var(--white);
        }
      }

      .vs__dropdown-menu {
        min-width: unset;
        overflow: hidden;
        background-color: var(--primary-color-opacity-85);

        li {
          padding: 0.2rem 0.8rem;
          color: var(--white);
          &:hover {
            background-color: var(--primary-color-opacity-95);
          }
        }
      }

      .vs__open-indicator {
        fill: var(--white);
      }
    }

    .control-select:focus-within .control-select__input {
      border-bottom-left-radius: 0;
    }

    .coordinate {
      display: flex;

      label {
        height: 100%;
        padding: 0 0.8rem;
        background-color: var(--primary-color-opacity-85);
        color: var(--white);
        font-size: 1.4rem;
        display: flex;
        align-items: center;
        transition: all 0.2s ease-in-out;
      }

      input {
        height: 100%;
        width: 10rem;
        padding: 0 0.4rem;
        background-color: var(--primary-color-opacity-85);
        border: 0;
        color: var(--white);
        transition: all 0.2s ease-in-out;
        font-size: 1.4rem;
      }

      &:focus-within {
        label,
        input {
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
    border-radius: 0.5rem;
    background-color: var(--primary-color-opacity-50);

    input {
      margin: 0.4rem;
      background-color: transparent;
      border: 0.1rem solid #fff;
      border-radius: 0rem;
      border-top: 0;
      text-align: center;
      color: #fff;
      font-size: 1.4rem;
    }

    .control__button {
      padding: 0.4rem 0.8rem;
      border-top-left-radius: 0;
      background-color: var(--primary-color-opacity-85);
      border-bottom-left-radius: 0;
    }
  }
}
</style>
