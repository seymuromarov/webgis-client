<template>
  <div v-if="basemaps.length > 0 || dynamics.length > 0" class="row">
    <div v-if="dynamics.length > 0" class="col-md-6">
      <div class="row">
        <div class="col-md-12">
          <h5>
            {{ $t("menu.dynamicLayers") }}
            <button
              type="button"
              :title="$t('button.reset')"
              class="btn btn-danger mr-5 float-right btn-sm"
              @click="resetDynamicTree"
            >
              <i class="fas fa-sync"></i>
            </button>
          </h5>
        </div>
        <div class="col-md-12">
          <tree
            ref="dynamicTree"
            :data="dynamics"
            :options="treeOptions"
            :checkeds="checkedDynamics"
          />
        </div>
      </div>
    </div>
    <div v-if="basemaps.length > 0" class="col-md-6">
      <div class="row">
        <div class="col-md-12">
          <h5>
            {{ $t("menu.baseLayers") }}
            <button
              type="button"
              :title="$t('button.reset')"
              class="btn btn-danger mr-5 float-right btn-sm"
              @click="resetBasemapTree"
            >
              <i class="fas fa-sync"></i>
            </button>
          </h5>
        </div>
        <div class="col-md-12">
          <tree
            ref="basemapTree"
            :data="basemaps"
            :options="treeOptions"
            :checkeds="checkedBasemaps"
          />
        </div>
      </div>
    </div>
    <div class="col-md-12 mt-5">
      <div class="row">
        <div class="col-md-6">
          <span>
            <strong class="text-muted">{{ $t("general.note") }} : </strong>
            <small class="text-muted">{{
              $t("general.changesWillBeAplliedAfterRefresh")
            }}</small></span
          >
        </div>
        <div class="col-md-6">
          <button
            type="button"
            class="btn btn-success  float-right btn-sm"
            @click="submit"
          >
            {{ $t("button.set") }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="row ">
      <div class="col-md-12">
        <div class="alert alert-info" role="alert">
          {{ $t("general.nodata") }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { layerController } from "@/controllers";
import { Tree } from "@/components";
import defaultLayer from "@/api/defaultLayer";
export default {
  name: "DefaultLayer",
  components: { Tree },
  data() {
    return {
      dynamics: [],
      basemaps: [],
      defaultLayers: [],
      checkedDynamics: [],
      checkedBasemaps: [],
      treeOptions: {
        collapsed: true,
        checkbox: true,
        labels: {
          children: "children",
          items: "layers",
          name: "name",
          id: "id",
        },
        conditions: {
          isCategory: (item) => {
            if (item && item.type === "category") return true;
            return false;
          },
          isCheckboxExist: (item) => {
            if (item && item.type !== "category") return true;
            return false;
          },
        },
      },
    };
  },
  mounted() {
    this.getDefaultLayers().then((defaultLayers) => {
      let checkedDynamics = defaultLayers
        .filter((c) => c.layer.mapTypeId == "dynamic")
        .map((c) => c.layer.id);
      this.checkedDynamics = checkedDynamics;
      let checkedBasemaps = defaultLayers
        .filter((c) => c.layer.mapTypeId == "basemap")
        .map((c) => c.layer.id);
      this.checkedBasemaps = checkedBasemaps;
      var dynamics = layerController.getDynamicLayerList();
      this.dynamics = dynamics;

      var basemaps = layerController.getBaseLayerList();
      this.basemaps = basemaps;
    });
  },
  methods: {
    resetDynamicTree() {
      this.$refs.dynamicTree.setCheckeds([]);
    },
    resetBasemapTree() {
      this.$refs.basemapTree.setCheckeds([]);
    },
    getDefaultLayers() {
      return new Promise((resolve, reject) => {
        defaultLayer.getAll().then((response) => {
          if (response.status == 200) {
            this.defaultLayers = response.data;
            resolve(response.data);
          } else {
            reject(new Error("Faild"));
          }
        });
      });
    },
    submit() {
      let data = [];
      var selectedDynamics = this.$refs.dynamicTree.getCheckeds();
      var selectedBasemaps = this.$refs.basemapTree.getCheckeds();

      selectedDynamics.forEach((c) => {
        data.push({ layerId: c });
      });
      selectedBasemaps.forEach((c) => {
        data.push({ layerId: c });
      });
      defaultLayer.set(data).then((response) => {
        if (response.status == 200) {
          this.$toasted.show("Default Layers Successfully Setted", {
            icon: {
              name: "fas fa-check",
            },
          });
        } else {
          this.$toasted.show("Failed!", {
            theme: "bubble",
            icon: {
              name: "fas fa-exclamation",
            },
          });
        }
      });
    },
  },
};
</script>
