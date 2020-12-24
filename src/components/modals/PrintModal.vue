<template>
  <CustomModal
    name="printModal"
    :title="$t('form.printForm.modalTitle')"
    width="50%"
    :minHeight="500"
    @beforeShow="onModalOpen"
    @afterHide="onModalClose"
  >
    <form>
      <div id="mapPrint" class="row">
        <div class="col-md-12">
          <h3 class="text-center">{{ $t("form.printForm.options") }}</h3>
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
              <label class="d-block">{{ $t("form.printForm.title") }}</label>

              <input
                type="text"
                class="form-control"
                id="title"
                :placeholder="$t('form.printForm.title')"
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
                <label class="d-block">{{ $t("form.printForm.scale") }}</label>
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
                <label class="d-block">{{
                  $t("form.printForm.coordinate")
                }}</label>
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
              {{ $t("button.print") }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </CustomModal>
</template>

<script>
import { jsPDF } from "jspdf";
import { mapController, layerController } from "@/controllers";
import { layerHelper } from "@/helpers";
import { hexToRgba } from "@/utils";
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
  async created() {},
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
    selectedDynamics() {
      return layerController.getSelectedDyanmics();
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
    async print() {
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
      const rectangleY = 39;
      const rectangleWidth = pageWidth - 20;
      const rectangleHeight = pageHeight - 50;

      const extentFontSize = 8;
      const extentX = 20;
      const extentY = pageHeight - 90;

      const scaleFontSize = 8;
      const scaleX = 20;
      const scaleY = pageHeight - 100;

      const timeFontSize = 8;
      const timeX = 20;
      const timeY = pageHeight - 75;

      const imageX = 20;
      const imageY = 70;

      const logoImageX = 10;
      const logoImageY = 10;
      const logoImageWidth = 40;
      const logoImageHeight = 8;

      const compassImageWidth = 20;
      const compassImageHeight = 20;
      const compassImageX =
        rectangleX + rectangleWidth - (10 + compassImageWidth);
      const compassImageY = 45;

      if (this.hasTitle) {
        pdf.setFontSize(titleFontSize);
        pdf.text(this.title, titleX, titleY, { align: "center", maxWidth: 80 });
      }
      //add options
      let optionsStartY = extentY;

      if (this.hasExtent) {
        var coordinateTitle = this.$t("form.printForm.coordinate");
        pdf.setFontSize(extentFontSize);
        pdf.text(`${coordinateTitle} : `, extentX, optionsStartY);
        pdf.setFontSize(extentFontSize - 1);

        var maxWidth =
          (pageWidth - (extentX + pdf.getTextWidth(coordinateTitle))) / 2;

        pdf.text(
          this.currentExtent.join(" , "),
          extentX + pdf.getTextWidth(coordinateTitle) + 5,
          optionsStartY,
          {
            maxWidth,
          }
        );
        optionsStartY += 8;
      }

      if (this.hastScale) {
        var scaleTitle = this.$t("form.printForm.scale");
        pdf.setFontSize(scaleFontSize);
        pdf.text(
          `${scaleTitle} : ` + this.currentResolution + " km",
          scaleX,
          optionsStartY
        );
        optionsStartY += 5;
      }

      pdf.setFontSize(timeFontSize);
      var currentdate = new Date();
      var dateTitle = this.$t("general.date");
      var timeTitle = this.$t("general.time");
      var datetime =
        `${dateTitle} : ` +
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        `  ${timeTitle} : ` +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      pdf.text(datetime, timeX, optionsStartY);
      optionsStartY += 5;

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

      //legenda
      if (this.selectedDynamics.length > 0) {
        var legendaTitleX = pageWidth / 2 + 20;
        // var legendaTitleStartY = pageHeight - 90;
        var legendaTitleFontSize = 10;

        var legendaConditionTitleFontSize = 8;
        var legendaConditionTitleX = legendaTitleX + 10;

        var colorBoxRectX = legendaTitleX + 5;
        var colorBoxRectWidth = 2;
        var colorBoxRectHeight = 2;

        var legendaTextsStartY = pageHeight - 90;
        this.selectedDynamics.forEach((item) => {
          pdf.setFontSize(legendaTitleFontSize);

          pdf.text(item.name, legendaTitleX, legendaTextsStartY);
          legendaTextsStartY += 5;
          var conditions = layerController.getLayerColorConditionList(item);

          for (let i = 0; i < conditions.length; i++) {
            const condition = conditions[i];

            //break if last condition y big than rectangle end y
            if (legendaTextsStartY > rectangleY + rectangleHeight) break;
            var borderRgba = hexToRgba(condition.borderColor);
            var fillRgba = hexToRgba(condition.fillColor);

            pdf.setDrawColor(borderRgba.r, borderRgba.g, borderRgba.b);
            pdf.setFillColor(fillRgba.r, fillRgba.g, fillRgba.b);
            pdf.rect(
              colorBoxRectX,
              legendaTextsStartY - colorBoxRectWidth,
              colorBoxRectWidth,
              colorBoxRectHeight,
              "FD"
            );

            pdf.setFontSize(legendaConditionTitleFontSize);

            pdf.text(
              condition.title,
              legendaConditionTitleX,
              legendaTextsStartY
            );
            legendaTextsStartY += 5;
          }

          //for padding legenda header titles
          legendaTextsStartY += 5;
        });
      }

      pdf.autoPrint(); // <<--------------------- !!
      window.open(pdf.output("bloburl"));
    },
  },
};
</script>

<style lang="scss" scoped>
.option-content {
  padding: 1rem 0;
}
.disable-content {
  background-color: #9e9e9e66;
}
</style>
