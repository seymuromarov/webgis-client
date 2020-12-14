<template>
  <div class="favoritequery-content">
    <div v-if="favoriteQueries.length > 0">
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
      <div class="row  favoritequery-content-scroll custom-scrollbar">
        <div
          v-for="(item, index) in favoriteQueries"
          :key="index"
          class="col-md-12 mt-1"
        >
          <FavoriteQueryCard
            :id="item.id"
            :label="item.label"
            :query="item.query"
            :layerLabel="item.layer.label"
            :applyText="$t('button.apply')"
            :deleteText="$t('button.delete')"
            :date="item.dateCreated"
            @onApplyClick="onApplyClick"
            @onDeleteClick="onDeleteClick"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-md-12">
          <div class="alert alert-info" role="alert">
            {{ $t("general.nodata") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FavoriteQueryCard from "./components/FavoriteQueryCard";
import favoriteQuery from "@/api/favoriteQuery";

import {
  layerController,
  mapController,
  serviceController,
  modalController,
} from "@/controllers";
import { notifyService } from "@/services";
export default {
  name: "FavoriteQuery",
  components: { FavoriteQueryCard },
  data() {
    return {
      limitQuery: {
        page: 1,
        limit: 1,
      },
      favoriteQueries: [],
      totalCount: 0,
    };
  },
  mounted() {
    this.getFavoriteQueries();
  },
  methods: {
    getFavoriteQueries() {
      favoriteQuery.getAll(this.limitQuery).then((response) => {
        this.totalCount = response.totalCount;
        this.favoriteQueries = response.items;
      });
    },
    onApplyClick(id) {
      var item = this.favoriteQueries.find((c) => c.id == id);
      const service = layerController.getDynamicLayer(item.layer.id);
      if (service) {
        serviceController.setQuery(service, item.query);

        if (!service.isSelected) {
          serviceController.selectService(service, true);
        } else mapController.refreshService(service.id);
        modalController.hideProfileModalModal();
        notifyService.success("Query Successfully Applied");
      }
    },
    onDeleteClick(id) {
      favoriteQuery.delete(id).then((response) => {
        notifyService.success("Successfully Deleted");

        if (this.favoriteQueries.length === 1) {
          this.limitQuery.page -= 1;
        }
        this.getFavoriteQueries();
      });
    },
    onPageChange(num) {
      this.limitQuery.page = num;
      this.getFavoriteQueries();
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
.favoritequery-content {
  &.favoritequery-content-scroll {
    position: relative;
    height: auto;
    width: 100%;
    overflow: auto;
  }
}
</style>
