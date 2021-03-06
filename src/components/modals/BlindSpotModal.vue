<template>
  <CustomModal
    name="blindSpotModal"
    title="Blind Spot Detection"
    width="50%"
    :minHeight="500"
    @beforeShow="onModalOpen"
    @afterHide="onModalClose"
  >
    <form>
      <div class="form-group">
        <label>Layers</label>
        <v-select
          v-model="selectedLayer"
          :clearable="false"
          :options="layerOptions"
          @input="onChange"
        ></v-select>
      </div>
      <div class="form-group">
        <label>Columns</label>
        <v-select
          v-model="selectedColumn"
          :clearable="false"
          :options="columnOptions"
          :disabled="isColumnDisabled"
          @input="onColumnChange"
        ></v-select>
        <small class="form-text text-muted"
          >Only numeric columns will be shown.</small
        >
      </div>

      <div class="row" v-if="chartVisibility">
        <div class="col-md-12">
          <line-chart
            :chart-data="chartData"
            :options="chartOptions"
            :height="300"
          ></line-chart>
        </div>
      </div>
    </form>
  </CustomModal>
</template>

<script>
import { layerController, toolController } from "@/controllers";
import layer from "@/api/layer";
import datatable from "@/api/datatable";
import { LineChart } from "@/charts";
export default {
  name: "BlindSpotModal",
  components: { LineChart },
  data() {
    return {
      tableInfo: null,
      selectedLayer: null,
      selectedColumn: null,
      layerOptions: [],
      columnOptions: [],
      chartOptions: {
        title: {
          display: true,
          text: "",
        },
      },
      chartVisibility: false,
      chartData: null,
    };
  },
  computed: {
    isColumnDisabled() {
      return !(this.tableInfo && this.columnOptions.length > 0);
    },
    lineCoordinates() {
      return toolController.getBbox();
    },
  },
  created() {},
  methods: {
    reset() {
      this.tableInfo = null;
      this.selectedLayer = null;
      this.selectedColumn = null;
      this.layerOptions = [];
      this.columnOptions = [];
      this.chartVisibility = false;
      this.chartData = null;
    },
    onModalOpen() {
      this.layerOptions = layerController
        .getDynamicLayersWithoutCategory()
        .map((c) => {
          return {
            code: c.id,
            label: c.name,
          };
        });
    },
    onModalClose() {
      this.reset();
    },

    onChange(item) {
      datatable
        .getTableInfo(item.code)
        .then((response) => {
          this.tableInfo = response;
          this.columnOptions = this.tableInfo.columns
            .filter((c) => c.valueType == "int" || c.valueType == "double")
            .map((c) => {
              return {
                code: c.columnName,
                label: c.columnName,
              };
            });
        })
        .catch(() => {
          this.tableInfo = null;
          this.columnOptions = [];
          this.chartVisibility = false;
        })
        .finally(() => {
          this.chartOptions.title.text = item.label + " Data";
          this.selectedColumn = null;
          this.chartVisibility = false;
        });
    },
    async onColumnChange(item) {
      let data = await this.getData(
        this.selectedLayer.code,
        item.code,
        this.lineCoordinates
      );
      const column = item.code;

      if (data.totalCount > 0) {
        const label = column;
        const values = data.features.map((c) => {
          const val = c.attributes[column.toLowerCase()];
          return val;
        });
        this.renderGraph(column, values, values);
      } else {
        this.renderGraph(column, [], []);
      }
      this.chartVisibility = true;
    },
    renderGraph(label, labels, values) {
      this.chartData = {
        labels: labels.map((e) => this.stringFixed(e, 4)),
        datasets: [
          {
            label: label,
            borderColor: "rgba(50, 115, 220, 0.5)",
            backgroundColor: "rgba(50, 115, 220, 0.1)",
            data: values,
          },
        ],
      };
    },
    getData(id, column, coordinates) {
      let params = {
        geometryType: "linestring",
        extentCoordinates: JSON.stringify(coordinates),
        returnGeom: false,
        columns: [column],
        isAll: true,
      };
      return datatable.getData(id, params);
    },

    stringFixed(val, fix) {
      let splitedText = val.toString().split(".");
      let rasengan =
        splitedText[0] +
        (splitedText[1] != undefined ? "." : "") +
        (splitedText[1] != undefined
          ? splitedText[1].length > fix
            ? splitedText[1].substr(0, fix)
            : splitedText[1]
          : "");
      return rasengan;
    },
  },
};
</script>

<style></style>
