const mapper = {
  mapBunchs: bunchs => {
    let mapResult = bunchs.map((item, index) => {
      return {
        ...item,
        isSelected: false,
        isColorEnabled: true
      };
    });
    return mapResult;
  }
};

export default {
  ...mapper
};
