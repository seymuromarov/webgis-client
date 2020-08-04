<template>
  <CustomModal
    name="imageUploadModal"
    title="File Modal"
    width="50%"
    :minHeight="400"
    @beforeShow="onModalOpen"
    @afterHide="onModalClose"
  >
    <div class="row ">
      <div class="table-wrapper-scroll-y upload-content-scroll">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Filename</th>
              <th scope="col">Extension</th>
              <th scope="col">Size</th>
              <th scope="col">DateCreated</th>
              <th v-if="checkPermission(['data_add'])" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in files" :key="index">
              <th scope="row">{{ item.id }}</th>
              <td v-if="isImage(item.extension)" class="text-center">
                <img
                  :src="item.base64"
                  v-viewer="vieverOptions"
                  alt=""
                  border="3"
                  height="50"
                  width="50"
                />
              </td>
              <td v-else class="text-center">
                <i class="far fa-file-alt h1"></i>
              </td>
              <td>
                <button class="btn btn-primary btn-xs" @click="download(item)">
                  <i class="fas fa-download"></i>
                </button>
                {{ item.filename }}
                <span></span>
              </td>
              <td>{{ item.extension }}</td>
              <td>{{ item.size }}</td>
              <td>{{ item.dateCreated }}</td>
              <td>
                <button
                  v-if="checkPermission(['data_edit'])"
                  class="btn btn-danger btn-sm"
                  @click="deleteImage(item.id)"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="checkPermission(['data_add'])">
      <div class="row mt-3">
        <div class="col-md-12">
          <vue-dropzone
            ref="dropzone"
            id="dropzone"
            v-on:vdropzone-sending="sendingEvent"
            v-on:vdropzone-success="onSuccess"
            :options="dropzoneOptions"
          ></vue-dropzone>
        </div>
      </div>
      <div class="col-md-12">
        <button
          class="btn btn-danger btn-sm float-right mt-3"
          @click="clearDropzone"
        >
          Clear
        </button>
      </div>
    </div>
  </CustomModal>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import download from "downloadjs";
import Viewer from "v-viewer";
import { LAYER_DATA_IMAGE_URLS } from "@/config/urls";
import { tokenService } from "@/services";
import { tableController } from "@/controllers";
import image from "@/api/layerDataImage";
import checkPermission from "@/utils/permission";
export default {
  components: { vueDropzone: vue2Dropzone },
  props: {
    layerId: {
      type: Number,
      required: true,
    },
    gid: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      files: [],

      vieverOptions: { movable: false },
      vieverOptions: {
        movable: false,
        zoomable: true,
        rotatable: false,
        toolbar: false,
        scalable: false,

        button: false,
        navbar: false,
        title: false,
        tooltip: true,

        transition: true,
        fullscreen: false,
        keyboard: true,
      },
      imageExtensions: [
        ".jpg",
        ".jpeg",
        ".gif",
        ".png",
        ".bmp",
        // ".tif",
        // ".tiff",
      ],
      dropzoneOptions: {
        url: LAYER_DATA_IMAGE_URLS.ADD,
        thumbnailWidth: 150,
        maxFilesize: 2,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
        headers: { Authorization: `Bearer ${tokenService.getToken()}` },
        acceptedFiles: ".jpeg,.jpg,.png,.gif,.tif,.tiff,.bmp",
      },
    };
  },

  methods: {
    checkPermission,
    onSuccess(file, response) {
      this.getImages();
    },
    resetData() {
      this.files = [];
    },
    download(item) {
      download(
        item.base64,
        item.filename,
        this.getMimFromExtension(item.extension)
      );
    },
    getMimFromExtension(extension) {
      switch (extension.toLowerCase()) {
        case ".jpeg":
          return "image/jpeg";
        case ".jpg":
          return "image/jpeg";
        case ".png":
          return "image/png";
        case ".gif":
          return "image/gif";
        case ".tif":
          return "image/tiff";
        case ".tiff":
          return "image/tiff";
        case ".bmp":
          return "image/bmp";
        case ".txt":
          return "text/plain";
      }
    },
    async getImages() {
      var response = await image.getAll(this.layerId, this.gid);

      var data = response.data;
      await Promise.all(
        data.map(async (x) => {
          var base64 = await this.getBase64File(x.id);
          x.base64 =
            `data:${this.getMimFromExtension(x.extension)};base64,` + base64;
        })
      );

      this.files = data;
    },
    async getBase64File(id) {
      var s = await image.getFile(id);

      //  this.files.find(c=>c.id===id).base64=base64;
      return s.data;
    },
    isImage(extension) {
      return this.imageExtensions.includes(extension.toLowerCase());
    },
    deleteImage(id) {
      image.delete(id).then((response) => {
        this.getImages();
      });
    },
    onModalOpen() {
      this.resetData();
      this.getImages();
    },
    onModalClose() {
      this.resetData();
      this.clearDropzone();
    },

    clearDropzone() {
      this.$refs.dropzone.removeAllFiles();
    },
    sendingEvent(file, xhr, formData) {
      // formData.append("layerId", this.activeTableService.id);
      // formData.append("gid", this.editDataGid);
      // formData.append("file", file);
      formData.append("layerId", this.layerId);
      formData.append("gid", this.gid);
      formData.append("file", file);
    },
  },
};
</script>
<style scoped>
.upload-content-scroll {
  position: relative;
  height: 400px;
  width: 100%;
  overflow: auto;
}
.table-wrapper-scroll-y {
  display: block;
}
</style>
