<template>
  <div>
    <tree-item
      :data="data"
      :options="options"
      :checkeds="checkedIds"
      @setCheckeds="setCheckeds"
      @onChange="onChange"
    />
  </div>
</template>

<script>
import TreeItem from "./components/TreeItem";
export default {
  name: "Tree",
  components: { TreeItem },
  data() {
    return { checkedIds: [] };
  },
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
    this.checkedIds = this.checkeds ? this.checkeds : [];
  },
  methods: {
    onChange(item, status) {
      this.$emit("onCheckboxChange", item, status);
    },
    setCheckeds(checkeds) {
      this.checkedIds = checkeds;
    },
    getCheckeds() {
      return this.checkedIds;
    },
  },
};
</script>
<style lang="scss"></style>
