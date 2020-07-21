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
        <div class="col-md-4">
          <div
            class="nav nav-tabs flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              class="nav-link"
              :class="{ active: activeTab === 'profile' }"
              @click="() => (activeTab = 'profile')"
              >Profile</a
            >
            <a
              class="nav-link"
              :class="{ active: activeTab === 'notification' }"
              @click="() => (activeTab = 'notification')"
              >Notifications</a
            >
            <a
              class="nav-link"
              :class="{ active: activeTab === 'favoritequery' }"
              @click="() => (activeTab = 'favoritequery')"
              >Favorite Queries</a
            >
            <a
              class="nav-link"
              :class="{ active: activeTab === 'favoritelayer' }"
              @click="() => (activeTab = 'favoritelayer')"
              >Favorite Layers</a
            >
          </div>
        </div>

        <div class="col-md-8">
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
        </div>
      </div>
    </div>
  </CustomModal>
</template>

<script>
import Notification from "./components/Notification/Index";
import FavoriteQuery from "./components/FavoriteQuery/Index";
import FavoriteLayer from "./components/FavoriteLayer";
import Profile from "./components/Profile";
export default {
  name: "ProfileModal",
  components: { Notification, FavoriteQuery, Profile, FavoriteLayer },
  data() {
    return {
      activeTab: "profile",
    };
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
    }
  }
}
</style>
