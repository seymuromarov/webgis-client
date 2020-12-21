import Vue from "vue";
const vm = new Vue();
const success = (msg) => {
  vm.$snotify.success(msg);
};
const error = (msg) => {
  vm.$snotify.error(msg);
};
const info = (msg) => {
  vm.$snotify.info(msg);
};

const created = () => {
  success("Record Created Successfully!");
};
const updated = () => {
  success("Record Updated Successfully!");
};

const deleted = () => {
  success("Record Deleted Successfully!");
};

const areYouSureAlert = (title, confirmText, callback) => {
  vm.$swal
    .fire({
      icon: "warning",
      title: title,
      showCancelButton: true,
      confirmButtonText: confirmText,
    })
    .then((result) => {
      callback(result);
    });
};
const areYouSureDeleteRecord = (callback) => {
  areYouSureAlert("Do you want to delete this record?", "Delete", callback);
};

export default {
  success,
  error,
  info,
  created,
  updated,
  deleted,
  areYouSureAlert,
  areYouSureDeleteRecord,
};
