export const ACCESSORY_CATEGORIES = [
  {
    value: "helmets",
    label: "خوذ",
    description: "حماية وأداء في كل رحلة.",
    image: "/images/accessories/helmet.jpg",
  },
  {
    value: "riding-gear",
    label: "ملابس ومستلزمات القيادة",
    description: "استعد لكل رحلة.",
    image: "/images/accessories/gear.webp",
  },
  {
    value: "spare-parts",
    label: "قطع غيار",
    description: "قطع مصممة لترافقك في الطريق.",
    image: "/images/accessories/parts.jpg",
  },
  {
    value: "bike-accessories",
    label: "إكسسوارات الدراجات",
    description: "أضف لمستك إلى كل تفصيل.",
    image: "/images/accessories/BikeAccessories.webp",
  },
];

export const ACCESSORY_CATEGORY_VALUES = ACCESSORY_CATEGORIES.map(
  ({ value }) => value,
);

export function isAccessoryCategory(value) {
  return ACCESSORY_CATEGORY_VALUES.includes(value);
}
