export const MOTORCYCLE_ACCESSORIES = [
  {
    value: "helmets",
    label: "Helmets",
    description: "Protection meets performance.",
    image: "/images/accessories/helmet.jpg",
  },
  {
    value: "riding-gear",
    label: "Riding Gear",
    description: "Gear up for every journey.",
    image: "/images/accessories/gear.webp",
  },
  {
    value: "spare-parts",
    label: "Spare Parts",
    description: "Parts built for the ride.",
    image: "/images/accessories/parts.jpg",
  },
  {
    value: "bike-accessories",
    label: "Bike Accessories",
    description: "Upgrade every detail.",
    image: "/images/accessories/BikeAccessories.webp",
  },
];

export const MOTORCYCLE_ACCESSORY_VALUES = MOTORCYCLE_ACCESSORIES.map(
  ({ value }) => value,
);

export function isMotorcycleAccessory(value) {
  return MOTORCYCLE_ACCESSORY_VALUES.includes(value);
}
