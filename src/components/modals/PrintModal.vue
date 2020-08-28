<template>
  <CustomModal
    name="printModal"
    title="Print"
    width="50%"
    :minHeight="500"
    @beforeShow="onModalOpen"
    @afterHide="onModalClose"
  >
    <form>
      <div id="mapPrint" class="row">
        <div class="col-md-12">
          <h3 class="text-center">header</h3>
        </div>
        <div v-if="base64img" class="col-md-12">
          <img :src="base64img" style="width:100%;height:auto;" />
        </div>
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
export default {
  name: "PrintModal",
  data() {
    return {
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
    };
  },
  computed: {
    dim() {
      return this.dims[this.format];
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
      pdf.setFontSize(22);
      pdf.text("Header", pageWidth / 2, 20, "center");

      pdf.rect(10, 49, pageWidth - 20, pageHeight - 60);

      pdf.setFontSize(16);
      pdf.text("Sub Header", pageWidth - 50, 40);
      pdf.setFontSize(8);
      pdf.text("Tarix : 8/26/2020  Saat 3:55:35 PM", 20, pageHeight - 20);

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
        20,
        60,
        canvasWidth - 40,
        canvasHeight - 20
      );

      // pdf.save("map.pdf");
      window.open(pdf.output("bloburl"));
    },
  },
};
</script>

<style></style>
