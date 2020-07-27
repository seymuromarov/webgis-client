<template>
  <CustomModal
    name="profileModal"
    title="Profile"
    width="70%"
    :minHeight="600"
    @beforeShow="onModalOpen"
  >
    <div id="profileModal">
      <div class="row">
        <div class="col-md-3">
          <div
            class="nav nav-tabs flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              role="button"
              class="nav-link"
              :class="{ active: activeTab === 'profile' }"
              @click="() => (activeTab = 'profile')"
              >Profile
            </a>
            <a
              role="button"
              class="nav-link"
              :class="{ active: activeTab === 'notification' }"
              @click="() => (activeTab = 'notification')"
              >Notifications
              <span
                v-if="notificationCount > 0"
                class="badge badge-danger float-right"
                >{{ notificationCount }}</span
              >
            </a>
            <a
              role="button"
              class="nav-link"
              :class="{ active: activeTab === 'favoritequery' }"
              @click="() => (activeTab = 'favoritequery')"
              >Favorite Queries</a
            >
            <a
              role="button"
              class="nav-link"
              :class="{ active: activeTab === 'favoritelayer' }"
              @click="() => (activeTab = 'favoritelayer')"
              >Favorite Layers</a
            >
            <a
              role="button"
              class="nav-link"
              :class="{ active: activeTab === 'defaultlayer' }"
              @click="() => (activeTab = 'defaultlayer')"
              >Default Layers</a
            >
            <a
              role="button"
              class="nav-link"
              :class="{ active: activeTab === 'workspace' }"
              @click="() => (activeTab = 'workspace')"
              >Workspace</a
            >
          </div>
        </div>

        <div class="col-md-9">
          <div v-if="activeTab === 'profile'" class="tab-content">
            <div
              class="tab-pane fade show "
              :class="{ active: activeTab === 'profile' }"
            >
              <Profile />
            </div>
          </div>
          <div v-if="activeTab === 'notification'" class="tab-content">
            <div
              class="tab-pane fade show "
              :class="{ active: activeTab === 'notification' }"
            >
              <Notification />
            </div>
          </div>
          <div v-if="activeTab === 'favoritequery'" class="tab-content">
            <div
              class="tab-pane fade show "
              :class="{ active: activeTab === 'favoritequery' }"
            >
              <FavoriteQuery />
            </div>
          </div>
          <div v-if="activeTab === 'favoritelayer'" class="tab-content">
            <div
              class="tab-pane fade show "
              :class="{ active: activeTab === 'favoritelayer' }"
            >
              <FavoriteLayer />
            </div>
          </div>
          <div v-if="activeTab === 'defaultlayer'" class="tab-content">
            <div
              class="tab-pane fade show "
              :class="{ active: activeTab === 'defaultlayer' }"
            >
              <DefaultLayer />
            </div>
          </div>
          <div v-if="activeTab === 'workspace'" class="tab-content">
            <div
              class="tab-pane fade show "
              :class="{ active: activeTab === 'workspace' }"
            >
              <Workspace />
            </div>
          </div>
        </div>
      </div>
    </div>
  </CustomModal>
</template>

<script>
import Notification from "./components/Notification/Index";
import FavoriteQuery from "./components/FavoriteQuery/Index";
import FavoriteLayer from "./components/FavoriteLayer";
import DefaultLayer from "./components/DefaultLayer";
import Profile from "./components/Profile";
import Workspace from "./components/Workspace";

import { menuController } from "@/controllers";
export default {
  name: "ProfileModal",
  components: {
    Notification,
    FavoriteQuery,
    Profile,
    FavoriteLayer,
    DefaultLayer,
    Workspace,
  },
  data() {
    return {
      activeTab: "profile",
    };
  },
  computed: {
    notificationCount() {
      return menuController.getNotificationCount();
    },
  },
  methods: {
    onModalOpen() {
      this.activeTab = "profile";
    },
  },
};
</script>
<style lang="scss" scoped>
#profileModal {
  .nav {
    width: 100%;
    &.nav-tabs {
      .nav-link {
        cursor: pointer;
        margin-top: 5px;
        color: var(--primary-color);
        padding: 0.35rem 1rem;
        &.active {
          background-color: var(--primary-color);

          border-color: var(--primary-color) var(--primary-color) #fff;
          color: var(--white);

          font-weight: 500;
        }
      }
      .nav-link:hover {
        transition: all 0.3s ease;
        border-color: var(--primary-color);
      }

      .nav-link:hover .dropdown-menu {
        display: block;
      }
    }
  }
}
</style>
