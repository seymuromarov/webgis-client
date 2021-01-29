<template>
  <li style="margin: 0.625rem 0rem;">
    <span
      v-if="checkCategoryCondition()"
      class="tree-item"
      @click="
        () => {
          isOpen = !isOpen;
        }
      "
    >
      <strong>{{ node[getNameKey()] }}</strong>

      <i
        class=" m-1 "
        :class="{ 'fa fa-plus': !isOpen, 'fa fa-minus': isOpen }"
      ></i>
    </span>

    <span v-else class="tree-item"> {{ node[getNameKey()] }}</span>

    <input
      v-if="isCheckboxExist && checkCheckboxCondition()"
      type="checkbox"
      :checked="isCheckedsPropertyExist && checkeds.includes(node[getIdKey()])"
      class="form-check-input tree-checkbox"
      @change="
        (e) => {
          var status = e.target.checked;
          onChange(node, status);
        }
      "
    />

    <div v-if="node[getChildrenKey()]" v-show="isOpen">
      <ul v-for="(item, index) in node[getChildrenKey()]" :key="index">
        <tree-item
          :node="item"
          :options="options"
          :checkeds="checkeds"
          @onChange="onChange"
        />
      </ul>
    </div>
    <div v-if="node[getItemKey()]" v-show="isOpen">
      <ul v-for="(item, index) in node[getItemKey()]" :key="index">
        <tree-item
          :node="item"
          :options="options"
          :checkeds="checkeds"
          @onChange="onChange"
        />
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  name: "TreeItem",
  props: {
    node: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
    },
    checkeds: {
      type: Array,
    },

    /*
    options:{
      collapsed:true,
      labels:{
        items:'items',
        children:'children'
        name:'label'
        id:'id'
      },
      conditions:{
        isCategory:func(item) => bool,
        isCheckboxExist:func(item) => bool,
      }


    }
    */
  },
  mounted() {},
  data() {
    return {
      isOpen: false,
    };
  },
  watch: {
    data: {
      deep: true,
      handler(val, oldVal) {
        this.data = val;
      },
    },
    options: {
      deep: true,
      handler(val, oldVal) {
        this.options = val;
      },
    },
    checkeds: {
      deep: true,
      handler(val, oldVal) {
        this.checkeds = val;
      },
    },
  },
  mounted() {
    this.isOpen = !this.isCollapsed;
  },

  computed: {
    isCheckboxExist() {
      return (
        this.options && this.options.checkbox && this.options.checkbox == true
      );
    },
    isCollapsed() {
      return this.options && this.options.collapsed;
    },
    isCheckedsPropertyExist() {
      return this.options && this.checkeds;
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    onChange(node, status) {
      if (this.isCheckedsPropertyExist) {
        if (status) {
          if (!this.checkeds.includes(node.id)) {
            this.checkeds.push(node.id);
          }
        } else {
          if (this.checkeds.includes(node.id)) {
            let i = this.checkeds.findIndex((c) => c == node.id);
            this.checkeds.splice(i, 1);
          }
        }
        this.$emit("setCheckeds", this.checkeds);
      }
      this.$emit("onChange", node, status);
    },

    getChildrenKey() {
      if (this.isOptionLabelsPropertyExist("children")) {
        return this.options.labels.children;
      }
      return null;
    },
    getItemKey() {
      if (this.isOptionLabelsPropertyExist("items")) {
        return this.options.labels.items;
      }
      return null;
    },
    getNameKey() {
      if (this.isOptionLabelsPropertyExist("name")) {
        return this.options.labels.name;
      }
      return null;
    },
    getIdKey() {
      if (this.isOptionLabelsPropertyExist("id")) {
        return this.options.labels.id;
      }
      return null;
    },

    checkCategoryCondition() {
      if (this.isOptionConditionsPropertyExist("isCategory")) {
        return this.options.conditions.isCategory(this.node);
      }
      return false;
    },
    checkCheckboxCondition() {
      if (this.isOptionCheckboxPropertyExist()) {
        return this.options.conditions.isCheckboxExist(this.node);
      }
      return false;
    },

    //validatior functions

    isOptionLabelsPropertyExist(key) {
      return this.options && this.options.labels && this.options.labels[key];
    },
    isOptionConditionsPropertyExist(key) {
      return (
        this.options && this.options.conditions && this.options.conditions[key]
      );
    },
    isOptionCheckboxPropertyExist(key) {
      return this.options && this.options.checkbox;
    },
  },
};
</script>
