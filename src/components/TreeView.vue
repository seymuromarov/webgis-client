<template class="tree-view">
  <div>
    <div style="text-align: left;">
      <div class="row">
        <div class="col-12 layerDiv">
          <span v-if="isCategory(item)" @click="toggle">
            <i class="icon-unchecked fas fa-layer-group "></i>
            <span class="serviceTitle layer-category-group">
              {{ item.name }}
            </span>
            <i v-if="isOpen" class="icon-checked fas fa-minus"></i>
            <i v-else class="icon-unchecked fas fa-plus"></i
          ></span>
          <span v-else>
            <input
              class="parentCheckbox"
              :id="item.name"
              :name="item.name"
              type="checkbox"
              @click="selectService(item, item.order, false, $event)"
            />
            <i class="checkbox-icon far fa-check-circle"></i>
            <label :for="item.name"></label>
            <span class="serviceTitle">
              {{ item.showingLabel }}
            </span>
          </span>
        </div>
      </div>
    </div>

    <ul v-show="isOpen" v-if="isCategory(item)">
      <li
        class="list-group-item"
        v-for="(element, index) in item.children"
        :key="index"
      >
        <treeItem :item="element"></treeItem>
      </li>
    </ul>
    <ul v-show="isOpen" v-if="isCategory(item)">
      <li
        class="list-group-item"
        v-for="(element, index) in item.layers"
        :key="index"
      >
        <treeItem :item="element" @selectService="selectService"></treeItem>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "treeItem",
  props: ["item"],
  data: function() {
    return {
      isOpen: false
    };
  },
  computed: {},

  methods: {
    toggle: function() {
      if (this.isCategory) {
        this.isOpen = !this.isOpen;
      }
    },
    selectService(service, index, dynamic, e) {
      this.$emit("selectService", service, index, dynamic, e);
    },
    isCategory: function(item) {
      return item.children && item.layers;
    }
  }
};
</script>
<style>
.tree-view.tree-item {
  cursor: pointer !important;
}

.tree-view ul {
  text-align: left;
  list-style-type: none;
}

.icon-unchecked {
  color: #c6c6c6;
}
.icon-checked {
  color: #008422;
}
</style>
