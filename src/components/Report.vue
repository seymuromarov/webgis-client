<template>
  <div>
    <h3 class="centerize margin-bottom-1halfrem margin-top-halfrem">
      Report
    </h3>

    <table class="table popupTable">
      <thead>
        <tr class="fields centerize">
          <th class="paddingLeft">Field</th>
          <th class="paddingRight">Value</th>
        </tr>
      </thead>
      <tbody class="popupTableBody">
        <tr class="centerize" v-for="key in Object.keys(result)" :key="key">
          <td class="paddingLeft">
            {{ key }}
          </td>
          <td class="paddingRight">
            {{ result[key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Report",
  props: {
    result: {
      type: Object,
    },
  },
};
</script>
