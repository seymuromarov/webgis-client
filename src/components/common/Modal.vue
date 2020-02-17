<template>
    <transition name="fade">
        <div
            class="Modal modal--overlay"
            v-show="visible"
            v-if="mounted"
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
 *      ref="🐮"
 *      :title="'Moodal'"
 *      :width="400"
 *      :height="100"
 *      :minWidth="200"
 *      :minHeight="100"
 *      :maxWidth="1920"
 *      :maxheight="1080"
 *      v-on:afterOpen=""
 *      v-on:afterClose=""
 *      v-on:afterShow=""
 *      v-on:afterHide=""
 * >
 *     Hey I am Moodal
 * </Modal>
 *
 * $refs['🐮'].open() - Mount to the DOM
 * $refs['🐮'].close() - Unmount from the DOM
 * $refs['🐮'].show() - Show
 * $refs['🐮'].hide() - Hide
 */

export default {
    name: "Moodal",
    props: {
        height: {
            type: Number,
        },
        width: {
            type: Number,
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
    },
    data() {
        return {
            mounted: true,
            visible: false,
        };
    },
    computed: {
        contentStyle() {
            let style = [];

            if (this.width) {
                style.push(`width: ${this.width}px;`);
            }
            if (this.height) {
                style.push(`height: ${this.height}px;`);
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
                style.push(
                    `max-height: ${this.maxHeight < window.innerHeight}px;`
                );
            }

            return style.join(" ");
        },
    },
    methods: {
        // Mount to the DOM
        open() {
            this.mounted = true;
            this.$emit("afterOpen");
        },
        // Unmount from the DOM
        close() {
            this.mounted = false;
            this.$emit("afterClose");
        },
        // Show
        show() {
            this.visible = true;
            this.$emit("afterShow");
        },
        // Hide
        hide() {
            this.visible = false;
            this.$emit("afterHide");
        },
    },
};
</script>

<style lang="scss">
.Modal {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    pointer-events: all;

    &.modal--overlay {
        background-color: #1a253780;
    }

    .modal__content {
        // width: 50%;
        background-color: #ffffff;
        border-radius: 4px;
        text-align: left;
        pointer-events: all;
        display: flex;
        flex-direction: column;

        &.modal__content--width-auto {
            width: auto;
        }

        .modal__header {
            display: flex;
            justify-content: space-between;
            padding: 8px 16px;
            background: #1a2537;
            color: #ffffff;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;

            .header__title {
                font-weight: 600;
                font-size: 16px;
            }

            .header__close:hover {
                cursor: pointer;
            }
        }

        .modal__body {
            padding: 8px 16px;
            max-height: calc(100vh - 40px - 40px);
            overflow: auto;
            flex: 1;
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition-duration: 5s;
}
</style>
