<script>
export default {
  name: "DynamicFormInput",
  props: {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  render(createElement) {
    var step = 1;
    var inputType = "text";
    switch (this.type) {
      case "int":
        inputType = "number";
        break;
      case "string":
        inputType = "string";
        break;
      case "double":
        inputType = "number";
        step = "0.01";
        break;
    }
    let element = createElement("input", {
      domProps: {
        value: this.value,
        name: this.name,
      },
      attrs: {
        type: inputType,
        ...(inputType === "double" && { step }),
      },

      on: {
        change: (event) => {
          let target = event.target;
          let val = target.value;
          let name = target.name;

          this.$emit("onChange", name, val);
        },
      },
    });

    return element;
  },
};
</script>
