<template>
  <div>
    <ul v-for="(item, index) in data" :key="index" class="tree-ul">
      <li style="margin:10px 0px;">
        <span
          v-if="checkCategoryCondition(item)"
          class="tree-item"
          @click="
            () => {
              isOpen = !isOpen;
            }
          "
        >
          <strong>{{ item[getNameKey()] }}</strong>

          <i
            class=" m-1 "
            :class="{ 'fa fa-plus': !isOpen, 'fa fa-minus': isOpen }"
          ></i>
        </span>

        <span v-else class="tree-item"> {{ item[getNameKey()] }}</span>

        <input
          v-if="isCheckboxExist && checkCheckboxCondition(item)"
          type="checkbox"
          :checked="
            isCheckedsPropertyExist && checkeds.includes(item[getIdKey()])
          "
          class="form-check-input tree-checkbox"
          @change="
            (e) => {
              var status = e.target.checked;
              onChange(item, status);
            }
          "
        />

        <div v-if="item[getChildrenKey()]" v-show="isOpen">
          <tree-item
            :data="item[getChildrenKey()]"
            :options="options"
            :checkeds="checkeds"
            @onChange="onChange"
          />
        </div>
        <div v-if="item[getItemKey()]" v-show="isOpen">
          <tree-item
            :data="item[getItemKey()]"
            :options="options"
            :checkeds="checkeds"
            @onChange="onChange"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TreeItem",
  props: {
    data: {
      type: Array,
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
    onChange(item, status) {
      if (this.isCheckedsPropertyExist) {
        if (status) {
          if (!this.checkeds.includes(item.id)) {
            this.checkeds.push(item.id);
          }
        } else {
          if (this.checkeds.includes(item.id)) {
            let i = this.checkeds.findIndex((c) => c == item.id);
            this.checkeds.splice(i, 1);
          }
        }
        this.$emit("setCheckeds", this.checkeds);
      }

      this.$emit("onChange", item, status);
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

    checkCategoryCondition(item) {
      if (this.isOptionConditionsPropertyExist("isCategory")) {
        return this.options.conditions.isCategory(item);
      }
      return false;
    },
    checkCheckboxCondition(item) {
      if (this.isOptionCheckboxPropertyExist()) {
        return this.options.conditions.isCheckboxExist(item);
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
<style lang="scss">
.tree-ul {
  list-style: none;

  //  & .tree-li{
  //     list-style: none;
  //  }

  .tree-checkbox {
    /* Double-sized Checkboxes */
    -ms-transform: scale(1.5); /* IE */
    -moz-transform: scale(1.5); /* FF */
    -webkit-transform: scale(1.5); /* Safari and Chrome */
    -o-transform: scale(1.5); /* Opera */
    transform: scale(1.5);
    margin-left: 10px;
  }
}
.tree-item {
  border: 1px solid gray;
  padding: 3px 5px;
  border-radius: 5px;
  cursor: pointer;

  // .tree-open-btn :hover,
  // .tree-open-btn :focus {
  //   color: blue;
  // }
}
.tree-item:hover,
.tree-item:focus {
  transition: all 0.3s ease;
  color: white;
  background-color: var(--primary-color);
}
</style>
