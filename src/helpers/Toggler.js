class Toggler {
    constructor(self) {
        this.data = self;
    }

    setLatLongShowForm() {
        this.data.latLongFormShow = !this.data.latLongFormShow;
    }

    cityInputToggle() {
        this.data.citySearchInputShow = !this.data.citySearchInputShow;
    }
    showColumnsChange() {
        this.data.showColumnsBoolean = !this.data.showColumnsBoolean;
    }
}

export default Toggler;