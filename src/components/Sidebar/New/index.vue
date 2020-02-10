<template>
    <div class="NewSidebar">
        <!-- Menu -->
        <div class="menu">
            <div class="menu--top">
                <div class="menu__item" v-for="item in topMenu" :key="item.key">
                    <button class="menu__item__button" @click="item.click">
                        <img
                            :src="
                                require(`../../../assets/images/icons/${item.image}`)
                            "
                            alt=""
                            :class="{ active: activeMenu === item.key }"
                        />
                    </button>
                </div>
            </div>
            <div class="menu--bottom">
                <div
                    class="menu__item"
                    v-for="item in bottomMenu"
                    :key="item.key"
                >
                    <button class="menu__item__button" @click="item.click">
                        <img
                            :src="
                                require(`../../../assets/images/icons/${item.image}`)
                            "
                            alt=""
                            :class="{ active: activeMenu === item.key }"
                        />
                    </button>
                </div>
            </div>
        </div>

        <div class="user-profile" v-show="activeMenu === 'profile'">
            <div class="user__name">{{ userName }}</div>
            <div class="logout" @click="logout">
                <i title="Log out" class="fas fa-power-off"></i>
            </div>
        </div>

        <!-- Layer Types -->
        <div class="layer-types" v-show="activeMenu === 'layerTypes'">
            <div class="layer-types__item">None</div>
            <div class="layer-types__item">Satellite</div>
            <div class="layer-types__item">Cray</div>
            <div class="layer-types__item">Street</div>
        </div>

        <!-- Dynamic Layers -->
        <div class="map-list layers" v-show="activeMenu === 'dynamicLayers'">
            <div class="list__header">Dynamic layers</div>

            <ul class="list__content list__content--parent">
                <LayerTree
                    v-for="(layer, index) in dynamicLayersList"
                    :key="index"
                    :data="layer"
                    @selectLayer="selectLayer"
                    @selectSubLayer="selectSubLayer"
                    @getTableData="getTableData"
                />
            </ul>
        </div>

        <!-- Basemaps -->
        <div class="map-list layers" v-show="activeMenu === 'baseMap'">
            <div class="list__header">Basemaps</div>

            <ul class="list__content list__content--parent">
                <LayerTree
                    v-for="(layer, index) in baselayerList"
                    :key="index"
                    :data="layer"
                    @selectLayer="selectLayer"
                    @selectSubLayer="selectSubLayer"
                    @getTableData="getTableData"
                />
            </ul>
        </div>
    </div>
</template>

<script>
import LayerTree from "./LayerTree";

export default {
    name: "NewSidebar",
    components: {
        LayerTree,
    },
    data() {
        return {
            activeMenu: "",
            layerTypesVisible: false,
        };
    },
    computed: {
        userName() {
            return this.$cookie.get("username");
        },
        topMenu() {
            return [
                {
                    key: "profile",
                    label: "Profile",
                    image: "user.svg",
                    click: () => {
                        this.toggleActiveMenu("profile");
                    },
                },
                {
                    key: "edit",
                    label: "Edit",
                    image: "pencil.svg",
                    click: () => {},
                },
                {
                    key: "dynamicLayers",
                    label: "Dynamic Layers",
                    image: "layer.svg",
                    click: () => {
                        this.toggleActiveMenu("dynamicLayers");
                    },
                },
                {
                    key: "baseMap",
                    label: "Basemaps",
                    image: "map.svg",
                    click: () => {
                        this.toggleActiveMenu("baseMap");
                    },
                },
            ];
        },
        bottomMenu() {
            return [
                {
                    key: "information",
                    label: "Information",
                    image: "information.svg",
                    click: () => {},
                },
                {
                    key: "layerTypes",
                    label: "Layer Types",
                    image: "hamburger.svg",
                    click: () => {
                        this.toggleActiveMenu("layerTypes");
                    },
                },
                {
                    key: "picture",
                    label: "picture",
                    image: "picture.svg",
                    click: () => {},
                },
                {
                    key: "fileDownload",
                    label: "File download",
                    image: "file_download.svg",
                    click: () => {},
                },
                {
                    key: "fullscreen",
                    label: "Full screen",
                    image: "fullscreen.svg",
                    click: this.fullScreen,
                },
            ];
        },
        dynamicLayersList() {
            return this.$store.getters.dynamicLayerList;
        },
        baselayerList() {
            return this.$store.getters.baseLayerList;
        },
    },
    methods: {
        logout() {
            this.$cookie.delete("token");
            this.$cookie.delete("username");
            this.$router.push("/login");
        },
        fullScreen() {
            if (
                window.innerWidth == screen.width &&
                window.innerHeight == screen.height
            ) {
                document.exitFullscreen();
            } else {
                document.querySelector("body").requestFullscreen();
            }
        },
        toggleActiveMenu(menu) {
            if (this.activeMenu === menu) {
                this.activeMenu = "";
            } else {
                this.activeMenu = menu;
            }
        },
        selectLayer(item, order, isDynamic, event) {
            this.$emit("selectLayer", item, order, isDynamic, event);
        },
        selectSubLayer(service, index, id, event) {
            console.log("asd");
            this.$emit("selectSubLayer", service, index, id, event);
        },
        getTableData(parent, itemId, itemName, query) {
            this.$emit("getTableData", parent, itemId, itemName, query);
        },
    },
};
</script>

<style lang="scss">
.NewSidebar {
    width: 56px;
    padding: 16px;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background-color: #1b2537;
    box-shadow: -2px 0 4px rgba(0, 0, 0, 0.25);
    color: #ffffff;

    .user-profile {
        position: absolute;
        right: 56px;
        top: 0;
        border-bottom-left-radius: 5px;
        background-color: rgba(27, 37, 55, 0.85);
        padding: 16px;
        text-align: left;
        display: flex;
        align-items: center;

        .user__name {
            margin-right: 16px;
            white-space: nowrap;
        }

        .logout {
            padding: 4px;
            line-height: 16px;
            cursor: pointer;
        }
    }

    .menu {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .menu__item {
            margin: 16px 0;

            &:first-of-type {
                margin-top: 0;
            }

            &:last-of-type {
                margin-bottom: 0;
            }

            .menu__item__button {
                background: transparent;
                border: none;
                padding: 0;
                margin: 0;
                img {
                    width: 20px;
                    height: 20px;
                    object-fit: contain;
                    object-position: center;
                    opacity: 0.6;
                    &.active,
                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }
    }

    .layer-types {
        position: absolute;
        right: 60px;
        bottom: 82px;
        border-radius: 5px;
        background-color: rgba(27, 37, 55, 0.85);
        padding: 5px 0;
        .layer-types__item {
            padding: 0 12px;
            font-size: 12px;
            text-align: left;
            &:hover {
                background-color: rgba(255, 255, 255, 0.15);
                cursor: pointer;
            }
        }
    }

    .map-list {
        position: absolute;
        right: 56px;
        top: 0;
        bottom: 0;
        min-width: 250px;
        text-align: left;
        background-color: rgba(42, 53, 75, 0.85);
        // border-radius: 5px 0 0 5px;

        .list__header {
            background-color: #1b2537;
            padding: 10px 16px;
            font-size: 16px;
            font-weight: 500;
            // border-top-left-radius: 5px;
        }

        .list__content {
            list-style-type: none;
            padding: 0;
            margin: 0;
            // border-bottom-left-radius: 5px;

            &::-webkit-scrollbar {
                width: 5px;
            }

            &::-webkit-scrollbar-track {
                background: #1b2537;
            }

            &::-webkit-scrollbar-thumb {
                background: #9096a1;
                border-radius: 5px;
                height: 30px;
            }

            &::-webkit-scrollbar-thumb:hover {
                background: #555;
            }

            &.list__content--parent {
                max-height: calc(100vh - 44px);
                overflow: auto;
            }

            .list__item {
                font-size: 14px;

                &:hover {
                    background-color: rgba(255, 255, 255, 0.15);
                }

                .item__header {
                    padding: 8px 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    white-space: nowrap;
                    .title {
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                    }
                    i:hover {
                        cursor: pointer;
                    }
                    .icons {
                        & > * {
                            margin-left: 8px;
                        }

                        &:hover {
                            cursor: pointer;
                        }
                    }
                }

                .pre {
                    width: 24px;
                    text-align: center;
                    margin-right: 22px;
                }
            }
        }
    }
}
</style>
