<template>
  <CustomModal
    name="imageUploadModal"
    :title="$t('form.fileForm.modalTitle')"
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
              <!-- <th scope="col">#</th> -->
              <th scope="col">{{ $t("form.fileForm.image") }}</th>
              <th scope="col">{{ $t("form.fileForm.filename") }}</th>
              <th scope="col">{{ $t("form.fileForm.extension") }}</th>
              <th scope="col">{{ $t("form.fileForm.size") }}</th>
              <th scope="col">{{ $t("form.fileForm.dateCreated") }}</th>
              <th v-if="checkPermission(['data_add'])" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in files" :key="index">
              <!-- <th scope="row">{{ item.id }}</th> -->
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
              <td>{{ readableFileSizeConverter(item.size, true) }}</td>
              <td>{{ item.dateCreated }}</td>
              <td>
                <button
                  v-if="checkPermission(['data_edit'])"
                  :title="$t('button.delete')"
                  class="btn btn-danger btn-sm"
                  @click="deleteImage(layerId, item.id)"
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
          :title="$t('button.clear')"
          @click="clearDropzone"
        >
          {{ $t("button.clear") }}
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
import { tokenService, notifyService } from "@/services";
import { tableController } from "@/controllers";
import image from "@/api/layerDataImage";
import checkPermission from "@/utils/permission";
import { readableFileSizeConverter } from "@/utils";
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
    // const dropzoneUploadEvent = async (files) => {
    //   const formData = new FormData();

    //   formData.append("layerId", this.layerId);
    //   formData.append("gid", this.gid);
    //   formData.append("file", files[0]);

    //   await image.add(formData);
    // };
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
        url: process.env.VUE_APP_BASE_API + LAYER_DATA_IMAGE_URLS.ADD,
        thumbnailWidth: 150,
        maxFilesize: 2,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
        headers: { Authorization: `Bearer ${tokenService.getToken()}` },
        acceptedFiles: ".jpeg,.jpg,.png,.gif,.tif,.tiff,.bmp",
      },
    };
  },

  methods: {
    readableFileSizeConverter,
    checkPermission,

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

      var data = response;
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
      return s;
    },
    isImage(extension) {
      return this.imageExtensions.includes(extension.toLowerCase());
    },
    deleteImage(layerId, id) {
      notifyService.areYouSureDeleteRecord((result) => {
        if (result.isConfirmed)
          image.delete(layerId, id).then((response) => {
            notifyService.deleted();
            this.getImages();
          });
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
    onSuccess(file, response) {
      this.getImages();
      this.clearDropzone();
    },
    sendingEvent(file, xhr, formData) {
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
  height: 40rem;
  width: 100%;
  overflow: auto;
}
.table-wrapper-scroll-y {
  display: block;
}
</style>
