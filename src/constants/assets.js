function svgIconPathBuilder(name) {
  return require(`../assets/images/icons/${name}.svg`);
}

const icons = {
  arrow_down: svgIconPathBuilder("arrow_down"),
  arrow_left: svgIconPathBuilder("arrow_left"),
  arrow_right: svgIconPathBuilder("arrow_right"),
  arrow_up: svgIconPathBuilder("arrow_up"),
  circle: svgIconPathBuilder("circle"),
  color_fill: svgIconPathBuilder("color_fill"),
  color_picker: svgIconPathBuilder("color_picker"),
  delete: svgIconPathBuilder("delete"),
  file_download: svgIconPathBuilder("file_download"),
  fullscreen: svgIconPathBuilder("fullscreen"),
  grid: svgIconPathBuilder("grid"),
  hamburger: svgIconPathBuilder("hamburger"),
  home: svgIconPathBuilder("home"),
  information: svgIconPathBuilder("information"),
  layer: svgIconPathBuilder("layer"),
  line: svgIconPathBuilder("line"),
  list: svgIconPathBuilder("list"),
  map: svgIconPathBuilder("map"),
  minus: svgIconPathBuilder("minus"),
  mouse: svgIconPathBuilder("mouse"),
  pencil: svgIconPathBuilder("pencil"),
  picture: svgIconPathBuilder("picture"),
  place: svgIconPathBuilder("place"),
  plus: svgIconPathBuilder("plus"),
  point: svgIconPathBuilder("point"),
  polygon: svgIconPathBuilder("polygon"),
  rectangle: svgIconPathBuilder("rectangle"),
  reset: svgIconPathBuilder("reset"),
  search: svgIconPathBuilder("search"),
  square: svgIconPathBuilder("square"),
  user: svgIconPathBuilder("user"),
  world: svgIconPathBuilder("world"),
};

export { icons };
