<template>
    <transition name="fade">
        <div
            class="modal overlay"
            id="infoModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="infoModalLabel"
            aria-hidden="true"
            v-show="isOpen"
            @click.self="$emit('close')"
        >
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <ul class="nav nav-tabs">
                            <!-- List item -->
                            <li
                                class="nav-item"
                                v-for="tab in tabs"
                                :key="tab.key"
                            >
                                <a
                                    class="nav-link"
                                    :class="{ active: tab.key === activeTab }"
                                    href="#"
                                    @click="changeTab(tab.key)"
                                    >{{ tab.text }}</a
                                >
                            </li>

                            <!-- Close button -->
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                @click="$emit('close')"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </ul>
                    </div>

                    <!-- Modal Body -->
                    <div class="modal-body" v-if="isOpen">
                        <About v-if="activeTab === 'about'" />
                        <FAQ v-if="activeTab === 'faq'" />
                        <ReleaseNotes v-if="activeTab === 'releaseNotes'" />
                        <Contact v-if="activeTab === 'contact'" />
                        <Forum v-if="activeTab === 'forum'" />
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import About from "./About";
import FAQ from "./FAQ";
import ReleaseNotes from "./ReleaseNotes";
import Contact from "./Contact";
import Forum from "./Forum/index";
import API from "../../services/InfoService";

export default {
    name: "InfoModal",
    components: {
        About,
        FAQ,
        ReleaseNotes,
        Contact,
        Forum,
    },
    props: {
        isOpen: {
            required: true,
            type: Boolean,
        },
    },
    data() {
        return {
            activeTab: "about",
            tabs: [
                {
                    key: "about",
                    text: "About",
                },
                {
                    key: "faq",
                    text: "FAQ",
                },
                {
                    key: "releaseNotes",
                    text: "Release notes",
                },
                {
                    key: "forum",
                    text: "Forum",
                },
                {
                    key: "contact",
                    text: "Contact us",
                },
            ],
        };
    },
    methods: {
        changeTab(tab) {
            this.activeTab = tab;
        },
    },
};
</script>

<style lang="scss">
#infoModal {
    display: block;
    overflow: auto;
    &.overlay {
        background-color: rgba(0, 0, 0, 0.5);
    }
    .modal-dialog {
        max-width: 650px;
        .modal-content {
            border: 1px solid #1b2537;
            .modal-header {
                padding: 0px;
                border-bottom: 0;
                position: relative;
                background-color: #1b2537;
                .nav {
                    width: 100%;

                    &.nav-tabs {
                        border-bottom: 1px solid #dee2e6;
                        .nav-link {
                            color: #ffffff;
                            padding: 0.35rem 1rem;
                            &.active {
                                border-color: #1b2537 #1b2537 #fff;
                                color: #1b2537;
                                font-weight: 500;
                            }
                        }
                    }
                    .close {
                        position: absolute;
                        right: 10px;
                        height: 100%;
                        padding: 0;
                        margin: 0;
                        color: #fff;
                        opacity: 1;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
            .modal-body {
                text-align: left;
                min-height: 400px;
            }
        }
    }
}

// Animations
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
</style>
