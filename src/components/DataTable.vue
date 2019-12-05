<template>
    <div v-if="isVisible" class="tableDiv howMuchWidthHaveMap">
        <div class="tableHeader">
            <div class="row">
                <div class="col-2">
                    <p class="text-left" style="margin-top: 5px;">{{ tableName }}</p>
                </div>
                <div class="col-10">
                    <download-excel
                            v-if="tableHeaders"
                            class="fas fa-file-excel icon excelDataIcon excelIcon makeMePoint"
                            :data="featuresToExcel()"
                            :fields="checkedColumnsToExcel()"
                            type="xls"
                            :name="'test' + '_report.xls'"
                    >
                        <i></i>
                    </download-excel>
                    <i
                            class="fas fa-columns tableColumns makeMePoint"
                            @click="togglePopup"
                    >
                    </i>
                    <i
                            class="fas fa-times tableClose makeMePoint"
                            @click="toggleIsVisible"
                    />
<!-- 
                    <i
                            v-if="tableName.trim() == 'CropMap2019_vector'"
                            class="fas fa-filter tableSimpleFilter makeMePoint"
                            style="color:blue"
                            @click="showSimpleFilterModal"
                    /> -->
                    <i
                            class="fas fa-filter tableFilter makeMePoint"
                            @click="showFilterModal"
                    />

                    <div class="tableShowColumns" v-if="isColumnPopupShowing">
                        <div class="columnsDiv">
                            <div v-for="(alias, index) in tableHeaders" :key="index">
                                <input
                                        @click="selectColumns(alias, index, $event)"
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
                            v-for="(alias, index) in tableHeaders"
                            :key="index"
                    >
                        {{ alias }}
                    </th>
                </tr>
                </thead>
                <tbody class="tableBody">
                <tr v-for="(data, index) in tableData" :key="index">
                    <td
                            class="makeMePoint"
                            @click="showDataModal(data)"
                            v-show="checkedColumnsData.includes(key)"
                            v-for="(attr, key) in data.attributes"
                            :key="key"
                    >
                        {{ attr }}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <!-- <modal
                name="data-modal"
                transition="nice-modal-fade"
                :min-width="200"
                :min-height="200"
                :delay="100"
                :draggable="true"
        >
            <p class="tableModalHeader">{{ tableName }}</p>
            <div class="row" style="overflow: auto">
                <table class="table popupTable">
                    <thead>
                    <tr class="fields">
                        <th class="paddingLeft">Field</th>
                        <th class="paddingRight">Value</th>
                    </tr>
                    </thead>
                    <tbody class="popupTableBody">
                    <tr v-for="(value, key) in selectedData" :key="key">
                        <td class="paddingLeft">
                            {{ tableHeadersWithAlias[key] }}
                        </td>
                        <td class="paddingRight">{{ value }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </modal> -->

        <modal
                name="simple-data-filter-modal"
                transition="nice-modal-fade"
                :min-width="200"
                :min-height="200"
                :height="400"
                :delay="100"
                :draggable="false"
                
        >
            <p class="tableModalHeader">{{ tableName }}</p>

            <div class="row" style="margin: 5px;">
                <div class="form-group col-md-12">
                    <label for="exampleInputPassword1">Classname</label>
                    <div class="row">
                        <div
                                class="btn-group btn-group-toggle  col-md-12"
                                data-toggle="buttons"
                        >
                            <multiselect v-model="cropMap2019value" :options="cropMap2019Options" :multiple="true"
                                         :close-on-select="false" :clear-on-select="false"
                            />


                        </div>
                    </div>
                </div>

                <div class="form-group col-md-12">
                    <label for="exampleInputPassword1">Arithmetic Operation</label>
                    <div class="row">
                        <div
                                class="btn-group btn-group-toggle col-md-12"
                                data-toggle="buttons"
                        >
           
                            <label
                                    :class="{
                  'btn btn-sm btn-outline-secondary': true,
                  active: cropArithmeticOperation.trim() == 'sum'
                }"
                            >
                                <input
                                        type="radio"
                                        id="sum"
                                        value="sum"
                                        v-model="cropArithmeticOperation"
                                        checked="checked"
                                />
                                Sum
                            </label>
                            <label
                                    :class="{
                  'btn btn-sm btn-outline-secondary': true,
                  active: cropArithmeticOperation.trim() == 'avg'
                }"
                            >
                                <input
                                        type="radio"
                                        id="avg"
                                        value="avg"
                                        v-model="cropArithmeticOperation"
                                />
                                Average
                            </label>
                            <label
                                    :class="{
                  'btn btn-sm btn-outline-secondary': true,
                  active: cropArithmeticOperation.trim() == 'min'
                }"
                            >
                                <input
                                        type="radio"
                                        id="min"
                                        value="min"
                                        v-model="cropArithmeticOperation"
                                />
                                Min
                            </label>
                            <label
                                    :class="{
                  'btn btn-sm btn-outline-secondary': true,
                  active: cropArithmeticOperation.trim() == 'max'
                }"
                            >
                                <input
                                        type="radio"
                                        id="max"
                                        value="max"
                                        v-model="cropArithmeticOperation"
                                />
                                Max
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p style="text-align: center">
                        {{reportResult}}
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-check">
                        <input class="form-check-input " type="checkbox"
                        :id="isSeperate"
                        v-model="isSeperate" 
                        aria-label="">
                        <label class="form-check-label" for="isSeparate"  
                      
                        >Give Seperate report?</label>

                    </div>                 
                </div>
                   <div class="col-md-12">
                    <div class="form-check">
                        <input class="form-check-input " type="checkbox"
                        :id="isIncludeBBOX"
                        v-model="isIncludeBBOX" 
                        aria-label="">
                        <label class="form-check-label" for="isIncludeBBOX"  
                      
                        >Include Last Selected BBOX?</label>

                    </div>                 
                </div>
                <div class="col-md-12">
                  <div v-if="filteredDatas.length>0">
                     <div class="alert alert-primary" role="alert">                      
                      <p v-for="(data , index) in filteredDatas" :key="index" >
                            {{data.key}} : {{data.value}}
                      </p>                  
                      </div>
                  </div>
                  
                       <button
                            class="btn btn-outline-info filterApplyButton "
                            @click="applyFilter"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </modal>
    </div>
    <!--        </div>-->
</template>

<script>
    import {mapState} from "vuex";
    import {Toggler} from "../helpers";
    import Multiselect from 'vue-multiselect'
    import LayerService from '../services/LayerService'
    import {getToken} from '../utils/token'
    export default {
        name: "DataTable",
        props: {},
        components: {
            Multiselect
        },
        data() {
            return {
                Toggler: null,
                isColumnPopupShowing: false,
                selectedData: null,
                cropArithmeticOperation: "sum",
                query: {
                    inSR: 3857,
                    outSR: 3857,
                    where: "1=1",
                    outStatistics: "",
                
                },
                cropMap2019Options: ['C E L T I K', 'P A M B I Q', 'S E K E R Ch', 'T A X I L', 'T U T U N'],
                cropMap2019value: null,

                filteredColumnName:'',
                filteredDatas:[],
                outStatisticFieldName:"Shape_Area_Sum",
                reportResult: null,

                isSeperate:false,
                isIncludeBBOX:false,

            };
        },
        mounted() {
            this.Toggler = new Toggler(this);
        },
        methods: {
            toggleIsVisible() {
                this.$store.dispatch("SAVE_DATATABLE_VISIBLE", !this.isVisible);
            },
            togglePopup() {
                this.isColumnPopupShowing = !this.isColumnPopupShowing;
            },
            showFilterModal() {
                this.$emit("showFilterModal");
            },
            showSimpleFilterModal() {
                this.$modal.show("simple-data-filter-modal", null, {
                    name: "dynamic-filter-modal",
                    resizable: false,
                    adaptive: true,
                    draggable: false
                });
            },
            showDataModal(data) {
                this.selectedData = data.attributes;
                this.$emit("mapSetCenter", data);
            },
            showColumnsChange() {
                this.Toggler.showColumnsChange();
            },
            featuresToExcel() {
                let features = [];
                for (let i = 0; i < this.tableData.length; i++) {
                    features[i] = this.tableData[i].attributes;
                }
                return features;
            },
            checkedColumnsToExcel() {
                let columns = {};

                for (let column in this.tableHeaders) {
                    if (this.checkedColumns.includes(this.tableHeaders[column])) {
                        columns[this.tableHeaders[column]] = this.tableStackedHeaders[column];
                    }
                }
                return columns;
            },
            selectColumns(alias, index, e) {
                if (e.target.checked) {
                    this.checkedColumns.push(alias);

                    this.checkedColumnsData.push(this.tableStackedHeaders[index]);
                } else {
                    this.checkedColumnsData = this.checkedColumnsData.filter(
                        data => data != alias
                    );
                    this.checkedColumns = this.checkedColumns.filter(data => data != alias);
                }
            },
            async applyFilter() {           

                if (this.cropArithmeticOperation !== "unset") {
                    // this.query.outStatistics = `[{statisticType: ${this.cropArithmeticOperation},onStatisticField: "Shape_Area",outStatisticFieldName: "Shape_Area_sum"}]`;
                    this.query.outStatistics =
                        '[{"statisticType": "' +
                        this.cropArithmeticOperation +
                        '", "onStatisticField": "Shape_Area", "outStatisticFieldName":'+'"'+this.outStatisticFieldName+'"}]';
                } else {
                    this.query.outStatistics = "";
                }

                let geometry = this.lastBBOXOfShape.toString();

                  console.log("TCL: applyFilter -> this.isIncludeBBOX", this.isIncludeBBOX)
            let data={
                  token:this.token,
                  name: this.serviceName,
                  layer:this.layerId,
                  ...(this.isIncludeBBOX&&{geometry})
              };
        
               if (this.cropMap2019value.length > 0) {
                    this.query.where = "";
                     this.filteredDatas=[];

                      if(this.isSeperate)
                      {
                         for (let i = 0; i < this.cropMap2019value.length; i++) {
                              this.query.where =
                                  "(Classname=" + "'" + this.cropMap2019value[i] + "')";
                          
                                data={
                                  ...data,
                                  ...this.query
                                }
                                var val=await this.sendRequest(data);
                                this.filteredDatas.push({
                                  key:this.cropMap2019value[i],
                                  value:val,
                                })
                          }
                         
                      }
                      else
                      {                        
                          for (let i = 0; i < this.cropMap2019value.length; i++) {
                              this.query.where +=
                                  "(Classname=" + "'" + this.cropMap2019value[i] + "')";

                              if (i < this.cropMap2019value.length - 1)
                                  this.query.where += " OR ";
                          }
                          data={
                            ...data,
                            ...this.query
                          }
                          var val=await this.sendRequest(data);
                          this.filteredDatas.push({
                            key:"Total",
                            value:val,
                          })
                      }
                  
                }
          
           
            },
             async sendRequest(data)
            {
              let response = await LayerService.getTableData(data);            
              let val=0;
              if(response.data.features.length>0)
              {
                val=response.data.features[0].attributes[this.outStatisticFieldName];
              }
                return val;
           
            }
            
        },

        computed: {
            isVisible() {
                return this.$store.state.dataTable.isVisible;
            },       
            layerId() {
                return this.$store.state.dataTable.layerId;
            },
            serviceName() {
                return this.$store.state.dataTable.serviceName;
            },
            tableName() {
                return this.$store.state.dataTable.tableName;
            },
            tableHeaders() {
                return this.$store.state.dataTable.tableHeaders;
            },
            tableStackedHeaders() {
                return this.$store.state.dataTable.tableStackedHeaders;
            },
            tableHeadersWithAlias() {
                return this.$store.state.dataTable.tableHeadersWithAlias;
            },
            tableData() {
                return this.$store.state.dataTable.tableData;
            },
            target() {
                return this.$store.state.dataTable.target;
            },
            checkedColumnsData() {
                return this.$store.state.dataTable.checkedColumnsData;
            },
            checkedColumns() {
                return this.$store.state.dataTable.checkedColumns;
            },
            lastBBOXOfShape() {
                return this.$store.state.dataTable.lastBBOXOfShape;
            },
            token() {
                 return getToken();
            },
           
        }
    };
</script>
