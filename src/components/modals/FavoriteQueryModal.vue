<template>
  <CustomModal
    name="favoriteQueryModal"
    title="Profile"
    width="30%"
    :minHeight="300"
    @beforeShow="onModalOpen"
  >
    <form>
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="form-group">
            <label for="label">Label</label>
            <input
              type="text"
              class="form-control "
              :class="{ 'is-invalid': submitted && !$v.data.label.required }"
              id="label"
              required
              v-model="data.label"
            />
            <div
              v-if="submitted && !$v.data.label.required"
              class="invalid-feedback"
            >
              Label is required
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label for="query">Query</label>

            <textarea
              class="form-control"
              rows="4"
              cols="69"
              :value="data.query"
              disabled
            ></textarea>
          </div>
        </div>
        <div class="col-md-12">
          <button
            type="button"
            class="btn btn-primary float-right"
            @click="addFavoriteQuery"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  </CustomModal>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
import favoriteQuery from "@/api/favoriteQuery";
import { modalController } from "@/controllers";
export default {
  name: "FavoriteQueryModal",
  props: {
    layerId: {
      type: Number,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
  },
  watch: {
    query: {
      immediate: true,
      handler(val, oldVal) {
        this.data.query = val;
      },
    },
    layerId: {
      immediate: true,
      handler(val, oldVal) {
        this.data.layerId = val;
      },
    },
  },
  data() {
    return {
      submitted: false,
      data: {
        layerId: undefined,
        label: "",
        query: "",
      },
    };
  },
  validations: {
    data: {
      label: { required },
    },
  },
  mounted() {
    this.data.query = this.query;
    this.data.layerId = this.layerId;
  },
  methods: {
    onModalOpen() {
      this.submitted = false;
      this.data.label = "";
    },
    addFavoriteQuery() {
      this.submitted = true;

      this.$v.$touch();
      if (!this.$v.$invalid) {
        favoriteQuery.add(this.data).then((response) => {
          this.$toasted.show("Successfully Added", {
            icon: {
              name: "fas fa-check",
            },
          });
          modalController.hideFavoriteQueryModal();
        });
      }
    },
  },
};
</script>
