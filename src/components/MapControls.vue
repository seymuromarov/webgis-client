<template>
    <div class="map-controls" id="map-controls">
        <div class="search">
            <div class="search__logo">
                <img src="../assets/images/ac_logo.svg" alt="Azercosmos logo" />
            </div>
            <div class="search__select">
                <input type="text"
                       placeholder="Search"
                       class="search__input"
                       :class="{ 'search__input--expanded': searchExpanded }"
                       v-model="searchInputValue" />
                <div class="search__results custom-scrollbar">
                    <ul>
                        <li v-for="(city, index) in citiesToShow"
                            :key="index"
                            @click="onCitySelect(city)">
                            {{ city.city }}
                        </li>
                    </ul>
                </div>
            </div>

            <button class="control__button search__button"
                    @click="searchExpanded = !searchExpanded">
                <img src="../assets/images/icons/search.svg" alt="Home" />
            </button>
        </div>

        <div class="control__button--group">
            <button class="control__button" @click="zoomIn">
                <img src="../assets/images/icons/plus.svg" alt="Home" />
            </button>
            <button class="control__button" @click="zoomOut">
                <img src="../assets/images/icons/minus.svg" alt="Home" />
            </button>
        </div>

        <div class="control__button--group">
            <button class="control__button" @click="zoomToCenter">
                <img src="../assets/images/icons/home.svg" alt="Home" />
            </button>
            <button class="control__button"
                    @click="historyBack"
                    :disabled="!previousHistoryEvent">
                <img src="../assets/images/icons/arrow_left.svg" alt="Back" />
            </button>
            <button class="control__button"
                    @click="historyNext"
                    :disabled="!nextHistoryEvent">
                <img src="../assets/images/icons/arrow_right.svg" alt="Next" />
            </button>
        </div>
    </div>
</template>

<script>
    import { fromLonLat } from "ol/proj";
    import cities from "../data/cities.json";

    export default {
        name: "MapControls",
        props: {
            map: {
                type: Object,
            },
            mapHelpers: {
                type: Object,
            },
            nextHistoryEvent: {},
            previousHistoryEvent: {},
        },
        data() {
            return {
                searchExpanded: false,
                cities,
                searchInputValue: "",
            };
        },
        methods: {
            onCitySelect(city) {
                this.map
                    .getView()
                    .setCenter(
                        fromLonLat([parseFloat(city.lng), parseFloat(city.lat)])
                    );
                this.map.getView().setZoom(11);
                this.searchInputValue = city.city;
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
                this.mapHelpers.historyBack(this);
            },
            historyNext() {
                this.mapHelpers.historyNext(this);
            },
        },
        computed: {
            citiesToShow() {
                return this.cities
                    .filter(x =>
                        x.city
                            .toLowerCase()
                            .includes(this.searchInputValue.toLowerCase())
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
        & > *

    {
        align-self: flex-start;
        pointer-events: auto;
    }

    .search {
        display: flex;
        margin: 10px;
        .search__logo

    {
        background-color: #1b2537;
        padding: 7px 14px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        display: flex;
        align-items: center;
        img

    {
        height: 24px;
    }

    }

    .search__select {
        position: relative;
        .search__input

    {
        height: 100%;
        width: 0;
        padding: 0;
        background-color: rgba(27, 37, 55, 0.85);
        border: 0;
        color: #ffffff;
        transition: all 0.2s ease-in-out;
        transition-delay: 0.1s;
        font-size: 14px;
        &::placeholder

    {
        color: rgba(255, 255, 255, 0.8);
    }

    &.search__input--expanded {
        padding: 0 8px;
        width: 200px;
    }

    }

    &:focus-within .search__results,
    .search__results:active {
        max-height: 150px;
        overflow: auto;
    }

    .search__results {
        max-height: 0px;
        position: absolute;
        background-color: rgba(42, 53, 75, 0.85);
        left: 0;
        right: 0;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        overflow: hidden;
        transition: max-height 0.1s ease-in-out;
        ul

    {
        margin: 0;
        padding: 3px 0;
        list-style-type: none;
        li

    {
        padding: 2px 10px;
        color: #ffffff;
        font-size: 14px;
        &:hover

    {
        background-color: #586276;
        cursor: pointer;
    }

    }
    }
    }
    }

    .search__button {
        margin: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    }

    .control__button {
        margin: 10px;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: rgba(27, 37, 55, 0.85);
        color: #ffffff;
        &:hover

    {
        background-color: rgba(27, 37, 55, 0.95);
    }

    &:disabled {
        img

    {
        opacity: 0.6;
    }

    }

    img {
        width: 18px;
        height: 18px;
        object-fit: contain;
        object-position: center;
    }

    }

    .control__button--group {
        margin: 10px;
        display: flex;
        flex-direction: column;
        align-items: self-start;
        .control__button

    {
        margin: 0;
        border-radius: 0;
        &:first-of-type

    {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    &:last-of-type {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    }
    }
    }
</style>
