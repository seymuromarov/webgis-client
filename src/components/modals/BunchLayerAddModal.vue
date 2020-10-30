<template>
  <CustomModal
    name="computedLayerModal"
    :title="$t('form.bunchLayerForm.modalTitle')"
    :width="400"
    :minHeight="300"
  >
    <Loader v-if="loading" />
    <div>
      <form>
        <div class="row mt-3">
          <div class="col-md-12">
            <div class="form-group" ref="computedForm">
              <label for="label">{{ $t("form.bunchLayerForm.label") }}</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': submitted && !$v.data.label.required }"
                :placeholder="$t('form.bunchLayerForm.label')"
                id="label"
                v-model="data.label"
              />
              <div
                v-if="submitted && !$v.data.label.required"
                class="invalid-feedback"
              >
                {{ $t("form.bunchLayerForm.validationMessages.labelRequired") }}
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <label for="layers">{{ $t("form.bunchLayerForm.layers") }}</label>
              <treeselect
                v-model="data.layers"
                :multiple="true"
                :show-count="true"
                :options="dynamicOptions"
                :placeholder="$t('form.bunchLayerForm.layers')"
                :class="{ 'is-invalid': submitted && !$v.data.layers.required }"
                :limit="4"
                :disable-branch-nodes="true"
                search-nested
              />
              <div
                v-if="submitted && !$v.data.layers.required"
                class="invalid-feedback"
              >
                {{
                  $t("form.bunchLayerForm.validationMessages.layersRequired")
                }}
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <button
              type="button"
              class="btn btn-primary float-right"
              @click="add"
            >
              {{ $t("button.add") }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </CustomModal>
</template>

<script>
import Multiselect from "vue-multiselect";
import bunch from "@/api/bunch";
import { layerController, bunchController } from "@/controllers";
import { layerHelper } from "@/helpers";
import { required } from "vuelidate/lib/validators";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "ComputedLayersModal",
  components: {
    Multiselect,
    Treeselect,
  },
  updated() {
    var a = this.dynamicOptons;
  },
  data() {
    return {
      value: null,
      loading: false,
      submitted: false,
      data: {
        label: "",
        layers: [],
      },
    };
  },
  validations: {
    data: {
      label: { required },
      layers: { required },
    },
  },
  methods: {
    resetData() {
      this.data = {
        label: "",
        layers: [],
      };
    },
    add() {
      this.submitted = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;

        bunch
          .add(this.data)
          .then((response) => {
            bunchController.add(response.data);
            this.resetData();
            this.$moodal.computedLayerModal.hide();
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
  computed: {
    dynamicOptions() {
      let options = layerController.getDynamicLayerAsTreeSelect();
      return options;
    },
  },
};
</script>
<style lang="scss">
#computedLayerModal .modal__body {
  overflow: unset;
}
</style>
