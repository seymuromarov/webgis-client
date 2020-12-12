<template>
  <div class="row">
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-12 text-center">
          <h5>{{ $t("menu.profile.workspace.currentMapConfigurations") }}</h5>
        </div>
        <div class="col-md-12">
          <div class="m-1">
            <label class="font-weight-bold"
              >{{ $t("menu.profile.workspace.zoomLevel") }} :</label
            >
            <span>
              <span class="badge badge-primary ml-1">{{ zoomLevel }}</span>
            </span>
          </div>
          <div class="m-1">
            <label class="font-weight-bold"
              >{{ $t("menu.profile.workspace.mapXCoordinate") }} :</label
            >
            <span v-if="center && center[0]">
              <span class="badge badge-warning  ml-1"
                >{{ center[0] }}
              </span></span
            >
          </div>
          <div class="m-1">
            <label class="font-weight-bold"
              >{{ $t("menu.profile.workspace.mapYCoordinate") }} :</label
            >
            <span v-if="center && center[1]"
              ><span class="badge badge-warning  ml-1"> {{ center[1] }} </span>
            </span>
          </div>
          <div class="m-1">
            <label class="font-weight-bold"
              >{{ $t("menu.profile.workspace.selectedLayers") }} :</label
            >
            <span v-if="selectedLayers">
              <span v-for="(item, index) in selectedLayers" :key="index">
                <span class="badge badge-info ml-1">{{ item.name }}</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-12 text-center">
          <h5>{{ $t("menu.profile.workspace.savedMapConfigurations") }}</h5>
        </div>
        <div v-if="workspace" class="col-md-12">
          <div class="m-1">
            <label class="font-weight-bold"
              >{{ $t("menu.profile.workspace.zoomLevel") }} :</label
            >
            <span>
              <span class="badge badge-primary ml-1">{{
                workspace.zoomLevel
              }}</span>
            </span>
          </div>
          <div class="m-1">
            <label class="font-weight-bold"
              >{{ $t("menu.profile.workspace.mapXCoordinate") }} :</label
            >
            <span>
              <span class="badge badge-warning  ml-1"
                >{{ workspace.coordinateX }}
              </span></span
            >
          </div>
          <div class="m-1">
            <label class="font-weight-bold"
              >{{ $t("menu.profile.workspace.mapYCoordinate") }} :</label
            >
            <span
              ><span class="badge badge-warning  ml-1">
                {{ workspace.coordinateY }}
              </span>
            </span>
          </div>
          <div class="m-1">
            <label class="font-weight-bold"
              >{{ $t("menu.profile.workspace.selectedLayers") }} :</label
            >
            <span v-for="(item, index) in workspace.activeLayers" :key="index">
              <span class="badge badge-info ml-1">{{ item.label }}</span>
            </span>
          </div>
        </div>
        <div v-else>
          <div class="col-md-12">
            <div class="alert alert-info" role="alert">
              {{ $t("general.nodata") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12 mt-5">
      <div class="row">
        <!-- <div class="col-md-6">
          <span>
            <strong class="text-muted">Note : </strong>
            <small class="text-muted"
              >Changes will be applied after refresh.</small
            ></span
          >
        </div> -->
        <div class="col-md-12">
          <div class="float-right">
            <button class="btn btn-success m-1 btn-sm" @click="saveWorkspace">
              {{ $t("button.save") }}
            </button>
            <button
              v-if="workspace"
              class="btn btn-info m-1 btn-sm"
              @click="loadWorkspace"
            >
              {{ $t("button.load") }}
            </button>
            <button
              v-if="workspace"
              class="btn btn-danger m-1 btn-sm"
              @click="resetWorkspace"
            >
              {{ $t("button.reset") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapController,
  layerController,
  serviceController,
} from "@/controllers";
import { coordinateTypeEnum } from "@/enums";
import workspace from "@/api/workspace";
import { notifyService } from "@/services";
export default {
  name: "Workspace",

  data() {
    return {
      zoomLevel: 0,
      center: [],
      rotation: 0,
      selectedLayers: [],
      workspace: null,
    };
  },
  mounted() {
    this.getWorkspace();
    this.getCurrentConfigurations();
  },
  methods: {
    getCurrentConfigurations() {
      this.zoomLevel = mapController.getCurrentZoomLevel();
      this.center = mapController.getCurrentCenter(
        coordinateTypeEnum.GEOGRAPHIC
      );
      this.rotation = mapController.getCurrentRotation();
      this.selectedLayers = layerController.getSelectedLayers();
    },
    getWorkspace() {
      workspace.get().then((response) => {
        if (response) this.workspace = response;
        else this.workspace = null;
      });
    },
    resetWorkspace() {
      workspace.reset().then((response) => {
        notifyService.success("Configurations Successfully Reseted");
        this.getWorkspace();
      });
    },
    async loadWorkspace() {
      if (this.workspace) {
        const zoom = this.workspace.zoomLevel;
        const center = [this.workspace.coordinateX, this.workspace.coordinateY];
        const activeLayers = this.workspace.activeLayers;
        mapController.setZoomLevel(zoom);
        mapController.setCenter(center, coordinateTypeEnum.GEOGRAPHIC);

        const currentSelecteds = layerController.getSelectedLayers();

        //disable all selecteds
        await new Promise((resolve, reject) => {
          if (currentSelecteds && currentSelecteds.length > 0) {
            currentSelecteds.forEach(async (element) => {
              await serviceController.selectService(element, false);
            });
          }
          resolve(currentSelecteds);
        });

        const layers = layerController
          .getLayersWithoutCategory()
          .filter((c) => activeLayers.map((e) => e.id).includes(c.id));
        //set active layers
        await new Promise((resolve, reject) => {
          layers.forEach(async (element) => {
            await serviceController.selectService(element, true);
          });
          resolve(layers);
        });

        this.getCurrentConfigurations();
      }
    },
    saveWorkspace() {
      let data = {
        zoomLevel: this.zoomLevel,
        coordinateX: this.center[0],
        coordinateY: this.center[1],
        activeLayers: this.selectedLayers.map((c) => c.id),
      };
      workspace.set(data).then((response) => {
        notifyService.success("Configurations Successfully Setted");
        this.getWorkspace();
      });
    },
  },
};
</script>
