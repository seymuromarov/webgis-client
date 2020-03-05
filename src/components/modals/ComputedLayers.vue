<template>
    <Modal name="computedLayerModal"
           title="Computed layers"
           :width="400"
           :height="'auto'">
        <form>
            <div class="form-group">
                <label for="label">Label</label>
                <input type="text" class="form-control" id="label" />
            </div>
            <div class="form-group">
                <label for="layers">Layers</label>
                <Multiselect id="layers"
                             v-model="value"
                             :options="dynamicLayersList"
                             :multiple="true"
                             :close-on-select="false"
                             :limit="4"
                             :maxHeight="200"
                             label="name"
                             track-by="name"
                             placeholder="Select layers" />
            </div>

            <button type="submit" class="btn btn-primary submit-btn">
                Add
            </button>
        </form>
    </Modal>
</template>

<script>
    import Modal from "../common/Modal";
    import Multiselect from "vue-multiselect";
    import { layerGetters } from "@/getters";
    export default {
        name: "ComputedLayersModal",
        components: {
            Modal,
            Multiselect,
        },
        data() {
            return {
                value: null,
                options: ["let", "the", "body", "set", "the", "flow"],
            };
        },
        computed: {
            multiselectLabel({ name }) {
                return name;
            },
            dynamicLayersList() {
                return layerGetters.getDynamicLayersWithoutCategory();
            },
        },
    };
</script>

<style lang="scss">
    // TODO Make this (.multiselect) styles global (without '!important')
    .multiselect {
        font-size: 14px !important;
    }

    .multiselect__option:after {
        line-height: 30px !important;
    }

    .multiselect__option--highlight {
        &, &:after

    {
        background: var(--primary-color-opacity-85) !important;
    }

    &.multiselect__option--selected {
        &, &:after

    {
        background: #e32222 !important;
    }

    }
    }

    .multiselect__placeholder {
        margin: 0 !important;
    }

    .multiselect__select {
        height: 30px !important;
    }

    .multiselect__option {
        padding: 6px 12px !important;
        min-height: 30px !important;
    }

    .multiselect__tags {
        min-height: 30px !important;
        padding: 2px 40px 0 8px !important;
    }

    .multiselect__tag {
        background: var(--primary-color-opacity-85) !important;
    }

    .multiselect__tag-icon:after {
        color: var(--white) !important;
    }

    .multiselect--active .multiselect__tags {
        padding: 8px 40px 0 8px !important;
    }

    .submit-btn {
        width: 20%;
        float: right;
    }

    #computedLayerModal .modal__body {
        overflow: unset;
    }
</style>
