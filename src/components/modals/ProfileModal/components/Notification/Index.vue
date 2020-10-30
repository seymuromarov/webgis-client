<template>
  <div class="notification-content">
    <div v-if="notifications.length > 0">
      <div class="row">
        <div class="col-md-12">
          <paginate
            :page-count="pageCount"
            :page-range="5"
            :click-handler="onPageChange"
            :prev-text="$t('button.pagination.prev')"
            :next-text="$t('button.pagination.next')"
            :container-class="'pagination'"
            :page-class="'page-item'"
          >
          </paginate>
        </div>
      </div>
      <div class="row  notification-content-scroll custom-scrollbar">
        <div
          v-for="(item, index) in notifications"
          :key="index"
          class="col-md-12 mt-1"
        >
          <NotificationCard
            :label="item.label"
            :isReaded="item.isReaded"
            :description="item.description"
            :date="item.dateCreated"
            :type="item.type"
            :createdBy="item.createdBy.userName"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-md-12">
          <div class="alert alert-info" role="alert">
            You dont have any notifications.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NotificationCard from "./components/NotificationCard";
import notification from "@/api/notification";
export default {
  name: "Notification",
  components: { NotificationCard },
  data() {
    return {
      limitQuery: {
        page: 1,
        limit: 3,
      },
      notifications: [],
      totalCount: 0,
    };
  },
  async mounted() {
    await this.getNotifications();
  },
  methods: {
    async getNotifications() {
      notification.getAll(this.limitQuery).then(async (response) => {
        this.totalCount = response.data.totalCount;
        this.notifications = response.data.items;
        await new Promise(async (resolve, reject) => {
          for (let i = 0; i < this.notifications.length; i++) {
            const item = this.notifications[i];
            if (!item.isReaded) await notification.setReaded(item.id);
          }
          resolve();
        });
        this.$store.dispatch("setNotificationCounts");
      });
    },
    async onPageChange(num) {
      this.limitQuery.page = num;
      await this.getNotifications();
    },
  },
  computed: {
    pageCount() {
      return this.totalCount / this.limitQuery.limit;
    },
  },
};
</script>

<style lang="scss" scoped>
.notification-content {
  &.notification-content-scroll {
    position: relative;
    height: auto;
    width: 100%;
    overflow: auto;
  }
}
</style>
