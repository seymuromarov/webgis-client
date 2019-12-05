<template>
  
        <modal
                name="simple-data-filter-modal"
                transition="nice-modal-fade"
                :min-width="200"
                :min-height="200"
                :height="400"
                :delay="100"
                :draggable="false"
                ref="testmodal"
                
        >
            <p class="tableModalHeader">{{ serviceName }}</p>

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
 
    <!--        </div>-->
</template>

<script>

    import Multiselect from 'vue-multiselect'
    import LayerService from '../services/LayerService'
    import {getToken} from '../utils/token'
    export default {
        name: "SimpleFilterModal",
        props: ['isVisible'],
        components: {
            Multiselect
        },
        data() {
            return {               
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

        methods: {
  

            showSimpleFilterModal() {
                this.$modal.show("simple-data-filter-modal", null, {
                    name: "simple-data-filter-modal",
                    resizable: false,
                    adaptive: true,
                    draggable: false
                });
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
           
            layerId() {
                return this.$store.state.dataTable.layerId;
            },
            serviceName() {
                return this.$store.state.dataTable.serviceName;
            },
            tableName() {
                return this.$store.state.dataTable.tableName;
            },           
            lastBBOXOfShape() {
                return this.$store.state.dataTable.lastBBOXOfShape;
            },
            isSimpleFilterVisible() {
                return this.$store.state.dataTable.isSimpleFilterVisible;
            },
            token()
            {
                 return getToken();
            },
           
        }
    };
</script>
