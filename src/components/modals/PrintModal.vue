<template>
  <CustomModal
    name="printModal"
    title="Print"
    width="50%"
    :minHeight="500"
    @beforeShow="onModalOpen"
    @afterHide="onModalClose"
  >
    <!-- 
      1.print Duymesi
      2.azc logo
      3.miqyas +
      4.kompas 
      5.title +
      6.kordinatlar +
       -->
    <form>
      <div id="mapPrint" class="row">
        <div class="col-md-12">
          <h3 class="text-center">Options</h3>
        </div>

        <div class="col-md-12">
          <div
            class="row mb-3 option-content"
            :class="{ 'disable-content': !hasTitle }"
          >
            <div class="col-md-1 align-self-center">
              <input class="checkbox" type="checkbox" v-model="hasTitle" />
            </div>
            <div class="col-md-11">
              <label class="d-block">Title</label>

              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Enter title"
                v-model="title"
                :disabled="!hasTitle"
              />
            </div>
          </div>
          <div class="row mb-3" :class="{ 'disable-content': !hastScale }">
            <div class="col-md-1 align-self-center">
              <input class="checkbox" type="checkbox" v-model="hastScale" />
            </div>
            <div class="col-md-11">
              <div class="form-group">
                <label class="d-block">Scale</label>
                <span>
                  <small
                    ><strong> {{ currentResolution }}</strong></small
                  >
                </span>
              </div>
            </div>
          </div>

          <div class="row mb-3" :class="{ 'disable-content': !hasExtent }">
            <div class="col-md-1 align-self-center">
              <input class="checkbox" type="checkbox" v-model="hasExtent" />
            </div>
            <div class="col-md-11">
              <div class="form-group">
                <label class="d-block">Coordinate</label>
                <span>
                  <small
                    ><strong> {{ currentExtent }}</strong></small
                  >
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- <div v-if="base64img" class="col-md-12">
          <img :src="base64img" style="width:100%;height:auto;" />
        </div> -->
        <div class="col-md-12">
          <div class="form-group">
            <button
              type="button"
              class="btn btn-success float-right"
              @click="print"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </form>
  </CustomModal>
</template>

<script>
import { jsPDF } from "jspdf";

import { mapController } from "@/controllers";
import { logo, compass } from "@/constants/assets";

export default {
  name: "PrintModal",
  data() {
    return {
      title: "",
      hasTitle: true,
      hasExtent: true,
      hastScale: true,
      hasTime: true,
      hasLogo: true,

      dims: {
        a0: [1189, 841],
        a1: [841, 594],
        a2: [594, 420],
        a3: [420, 297],
        a4: [297, 210],
        a5: [210, 148],
      },
      pdfDims: {
        a4: [595.28, 841.89],
      },

      format: "a4",
      resolution: "72",
      base64img: "",

      padding: 22,
      headerFontSize: 22,
      subHeaderFontSize: 22,
      contentFontSize: 22,
      logo,
      compass,
    };
  },
  computed: {
    dim() {
      return this.dims[this.format];
    },
    currentExtent() {
      return mapController.getCurrentExtent();
    },
    currentResolution() {
      return mapController.getCurrentResolution().toFixed(2);
    },
    imageWidth() {
      return Math.round((this.dim[0] * this.resolution) / 25.4);
    },
    imageHeight() {
      return Math.round((this.dim[1] * this.resolution) / 25.4);
    },
  },
  methods: {
    onModalOpen() {
      var width = this.imageWidth;
      var height = this.imageHeight;
      var map = mapController.getMap();
      var size = map.getSize();
      var viewResolution = map.getView().getResolution();

      map.once("rendercomplete", () => {
        var mapCanvas = document.createElement("canvas");
        mapCanvas.width = width;
        mapCanvas.height = height;
        var mapContext = mapCanvas.getContext("2d");
        Array.prototype.forEach.call(
          document.querySelectorAll(".ol-layer canvas"),
          function(canvas) {
            if (canvas.width > 0) {
              var opacity = canvas.parentNode.style.opacity;
              mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
              var transform = canvas.style.transform;
              // Get the transform parameters from the style's transform matrix
              var matrix = transform
                .match(/^matrix\(([^\(]*)\)$/)[1]
                .split(",")
                .map(Number);
              // Apply the transform to the export map context
              CanvasRenderingContext2D.prototype.setTransform.apply(
                mapContext,
                matrix
              );
              mapContext.drawImage(canvas, 0, 0);
            }
          }
        );
        this.base64img = mapCanvas.toDataURL("image/png");

        map.setSize(size);
        map.getView().setResolution(viewResolution);
        document.body.style.cursor = "auto";
      });

      // Set print size
      var printSize = [width, height];
      map.setSize(printSize);
      var scaling = Math.min(width / size[0], height / size[1]);
      map.getView().setResolution(viewResolution / scaling);
    },
    onModalClose() {},
    print() {
      var pdf = new jsPDF({
        format: this.format,
      });

      var pageWidth = pdf.internal.pageSize.width;
      var pageHeight = pdf.internal.pageSize.height;

      //coordinates
      const titleX = pageWidth / 2;
      const titleY = 20;
      const titleFontSize = 14;

      const rectangleX = 10;
      const rectangleY = 69;
      const rectangleWidth = pageWidth - 20;
      const rectangleHeight = pageHeight - 80;

      const scaleFontSize = 8;
      const scaleX = 20;
      const scaleY = pageHeight - 30;

      const extentFontSize = 8;
      const extentX = 20;
      const extentY = pageHeight - 30;

      const timeFontSize = 8;
      const timeX = 20;
      const timeY = pageHeight - 20;

      const imageX = 20;
      const imageY = 100;

      const logoImageX = 10;
      const logoImageY = 10;
      const logoImageWidth = 40;
      const logoImageHeight = 8;

      const compassImageWidth = 20;
      const compassImageHeight = 20;
      const compassImageX =
        rectangleX + rectangleWidth - (10 + compassImageWidth);
      const compassImageY = 75;

      if (this.hasTitle) {
        pdf.setFontSize(titleFontSize);
        pdf.text(this.title, titleX, titleY, { align: "center", maxWidth: 80 });
      }
      //add options
      let optionsStartY = timeY;
      if (this.hastScale) {
        optionsStartY -= 10;
        pdf.setFontSize(scaleFontSize);
        pdf.text(
          "Miqyas : " + this.currentResolution + " km",
          scaleX,
          optionsStartY
        );
      }
      if (this.hasExtent) {
        optionsStartY -= 10;
        pdf.setFontSize(extentFontSize);
        pdf.text("Kordinat : ", extentX, optionsStartY);
        pdf.setFontSize(extentFontSize - 1);
        pdf.text(this.currentExtent.join(" , "), extentX + 13, optionsStartY);
      }
      //

      pdf.setFontSize(timeFontSize);
      var currentdate = new Date();
      var datetime =
        "Tarix : " +
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        "  Saat : " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      pdf.text(datetime, timeX, timeY);

      pdf.rect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);

      // pdf.setFontSize(16);
      // pdf.text("Sub Header", pageWidth - 50, 40);

      pdf.addImage(
        this.logo,
        "PNG",
        logoImageX,
        logoImageY,
        logoImageWidth,
        logoImageHeight
      );

      pdf.addImage(
        this.compass,
        "PNG",
        compassImageX,
        compassImageY,
        compassImageWidth,
        compassImageHeight
      );

      console.log(pdf.getTextWidth("sa"));

      var imgWidth = this.imageWidth;
      var imgHeight = this.imageHeight;

      const widthRatio = pageWidth / imgWidth;
      const heightRatio = pageHeight / imgHeight;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = imgWidth * ratio;
      const canvasHeight = imgHeight * ratio;

      const marginX = (pageWidth - imgWidth) / 2;
      const marginY = (pageHeight - imgHeight) / 2;

      pdf.addImage(
        this.base64img,
        "PNG",
        imageX,
        imageY,
        canvasWidth - 40,
        canvasHeight - 20
      );

      // pdf.save("map.pdf");
      pdf.autoPrint(); // <<--------------------- !!
      window.open(pdf.output("bloburl"));
    },
  },
};
</script>

//
<style lang="scss" scoped>
.option-content {
  padding: 10px 0px;
}
.disable-content {
  background-color: #9e9e9e66;
}
</style>
