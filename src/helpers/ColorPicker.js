class ColorPicker {
    constructor(self) {
        this.data = self;
    }
    open(layer, sublayer, name, index) {
        this.data.colorPicker.visibility = true;
        this.data.colorPicker.sublayer = sublayer;
        this.data.colorPicker.layer = layer;
        this.data.colorPicker.service = name;
        this.data.colorPicker.index = index;
    }
    saveColor() {
        // this.changeColor(this.colorPicker.layer.drawingInfo.renderer.symbol, this.colors)
        // this.changeColor(this.colorPicker.layer.drawingInfo.renderer.symbol.outline, this.borderColors)
        this.data.deleteLayers(this.data.colorPicker.layer)
        this.data.colorPicker.visibility = false;
        let colors = [];
        let outlines = [];
        colors[0] = this.data.colors.rgba.r;
        colors[1] = this.data.colors.rgba.g;
        colors[2] = this.data.colors.rgba.b;
        colors[3] = 255 * this.data.colors.rgba.a;
        // colors[3] = 255;
        outlines[0] = this.data.borderColors.rgba.r;
        outlines[1] = this.data.borderColors.rgba.g;
        outlines[2] = this.data.borderColors.rgba.b;
        outlines[3] = 255 * this.data.borderColors.rgba.a;
        let color = "[" + colors[0] + "," + colors[1] + "," + colors[2] + "," + colors[3] + "]";
        let outline = "[" + outlines[0] + "," + outlines[1] + "," + outlines[2] + "," + outlines[3] + "]";
        if (typeof this.data.dynamicForColors[this.data.colorPicker.layer.name] === 'undefined') {
            this.data.dynamicForColors[this.data.colorPicker.layer.name] = [];
        }
        let layerDyn = '{"id":' + this.data.colorPicker.sublayer + ',"name":"","source":{"type":"mapLayer","mapLayerId": ' + this.data.colorPicker.sublayer + '},"drawingInfo":{"renderer":{"type":"simple","label":"","description":"","symbol":{"color":' + color + ',"outline":{"color":' + outline + ',"width":1.0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}}},"minScale":0,"maxScale":0},';
        this.data.dynamicForColors[this.data.colorPicker.layer.name][this.data.colorPicker.sublayer] = layerDyn;
        this.data.addLayers(this.data.colorPicker.layer, this.data.colorPicker.index, true, layerDyn)
    }
}

export default ColorPicker;