const distanceUnitOptions = {
  defaultUnit: "km",
  conversions: [
    {
      from: "km",
      to: "m",
      value: 1000,
    },
    {
      from: "m",
      to: "km",
      value: 1 / 1000,
    },
    {
      from: "cm",
      to: "km",
      value: (1 / 100) * (1 / 1000),
    },
  ],
};

export function distanceConvert(from, to, val) {
  if (
    from === distanceUnitOptions.defaultUnit &&
    to === distanceUnitOptions.defaultUnit
  )
    return val;

  var item = distanceUnitOptions.conversions.find(
    (c) => c.from == from && c.to == to
  );
  if (item) return val * item.value;
  else return 0;
}
