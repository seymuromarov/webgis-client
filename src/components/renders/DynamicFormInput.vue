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
        step = ".01";
        break;
    }
    let options = {
      domProps: {
        value: this.value,
        name: this.name,
      },

      attrs: {
        type: inputType,
        ...(this.type === "double" && { step }),
      },

      on: {
        change: (event) => {
          let target = event.target;
          let val = target.value;
          let name = target.name;

          this.$emit("onChange", name, val);
        },
      },
    };
    if (inputType === "double") options.attrs["step"];
    console.log("render -> options", options);
    let element = createElement("input", options);

    return element;
  },
};
</script>
