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
              <li class="nav-item" v-for="tab in tabs" :key="tab.key">
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
    };
  },

  computed: {
    tabs() {
      return [
        {
          key: "about",
          text: this.$t("menu.information.about.title"),
        },
        {
          key: "faq",
          text: this.$t("menu.information.faq"),
        },
        {
          key: "releaseNotes",
          text: this.$t("menu.information.releaseNotes"),
        },
        {
          key: "forum",
          text: this.$t("menu.information.forum.title"),
        },
        {
          key: "contact",
          text: this.$t("menu.information.contactUs.title"),
        },
      ];
    },
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
    // max-width: 650px;
    .modal-content {
      border: 0.0625rem solid var(--primary-color);
      .modal-header {
        padding: 0rem;
        border-bottom: 0;
        position: relative;
        background-color: var(--primary-color);
        .nav {
          width: 100%;
          &.nav-tabs {
            border-bottom: 0.0625rem solid #dee2e6;
            .nav-link {
              color: var(--white);
              padding: 0.35rem 1rem;
              &.active {
                border-color: var(--primary-color) var(--primary-color) #fff;
                color: var(--primary-color);
                font-weight: 500;
              }
            }
          }

          .close {
            position: absolute;
            right: 0.625rem;
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
        min-height: 25rem;
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
