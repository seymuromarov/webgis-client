<template>
  <!--        <div class="" >-->

  <div v-if="isVisible" class="tableDiv howMuchWidthHaveMap">
    <!-- <div class="tableHeader">
      <div class="row">
        <div class="col-2">
          <p class="text-left" style="margin-top: 5px;">{{ header }}</p>
        </div>
        <div class="col-10">
          <download-excel
            v-if="tableFeaturesHeader"
            class="fas fa-file-excel icon excelDataIcon excelIcon makeMePoint"
            :data="featuresToExcel"
            :fields="checkedColumnsToExcel"
            type="xls"
            :name="'test' + '_report.xls'"
          >
            <i></i>
          </download-excel>
          <i
            class="fas  fa-columns tableColumns makeMePoint"
            @click="showColumnsChange"
          >
          </i>
          <i
            class="fas fa-times tableClose makeMePoint"
            @click="isShowing = false"
          ></i>
          <i
            class="fas fa-filter tableFilter makeMePoint"
            @click="showFilterModal"
          ></i>
          <div class="tableShowColumns" v-if="isColumnPopupShowing">
            <div class="columnsDiv">
              <div v-for="(alias, index) in tableHeaders" :key="index">
                <input
                  @click="selectColumns(alias, key, $event)"
                  type="checkbox"
                  :id="alias"
                  :value="alias"
                  v-model="checkedColumns"
                  checked="checked"
                />
                <label> {{ alias }} </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tableContent">
      <table class="selfTable table">
        <thead class="tableHeader">
          <tr>
            <th
              v-show="checkedColumns.includes(alias)"
              v-for="(alias, index) in tableFeaturesHeader"
              :key="index"
            >
              {{ alias }}
            </th>
          </tr>
        </thead>
        <tbody class="tableBody">
          <tr v-for="(data, index) in tableFeaturesData" :key="index">
            <td
              class="makeMePoint"
              @click="showDataModal(data)"
              v-show="checkedColumnsData.includes(key)"
              v-for="(attr, index) in data.attributes"
              :key="index"
            >
              {{ attr }}
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
  </div>
  <!--        </div>-->
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DataTable",
  props: {},
  components: {},

  mounted() {},
  data() {
    return {
      isVisible: this.$store.state.isVisible,
      isColumnPopupShowing: false,
      isFilterOpen: false,
      header: "",
      tableHeaders: []
    };
  },
  //   computed: mapState({
  //     isVisible: state => state.isVisible
  //   }),
  methods: {}
};
</script>
