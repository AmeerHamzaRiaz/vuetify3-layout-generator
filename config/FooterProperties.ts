import { Component, PropertyGroup, PropertyType, UI } from '~/enums'

export const footerLayoutProperties = [
  {
    groupName: 'Positioning',
    props: [
      {
        name: 'order',
        title: 'Order',
        type: PropertyType.PROP,
        component: Component.NUMBER_SELECTOR,
        default: 0,
        maxValue: 5,
        minValue: -5,
        description: 'Adjust the order of the component in relation to its registration order.',
      },
      {
        name: 'absolute',
        title: 'Absolute',
        component: Component.SWITCH,
        type: PropertyType.PROP,
        default: true,
        description: 'Applies position: absolute to the component.',
      },
      {
        name: 'app',
        title: 'App',
        component: Component.SWITCH,
        type: PropertyType.PROP,
        default: true,
        description: 'Determines the position of the footer. If true, the footer is fixed at the bottom of the viewport; otherwise, it is at the bottom of the page.',
      },
    ],
  },
  {
    groupName: 'Appearance',
    props: [
      {
        name: 'border',
        title: 'Border',
        items: ['xs', 'sm', 'md', 'lg', 'xl'],
        component: Component.SELECT,
        default: false,
        type: PropertyType.PROP,
        description: 'Designates the border-radius applied to the component. This can be xs, sm, md, lg, xl.',
      },
      // {
      //   name: 'color',
      //   type: 'string',
      //   default: 'undefined',
      //   description: 'Applies specified color to the control - supports utility colors or css color.',
      // },
      {
        name: 'elevation',
        title: 'Elevation',
        component: Component.NUMBER_SELECTOR,
        default: 0,
        minValue: 0,
        maxValue: 24,
        type: PropertyType.PROP,
        description: 'Designates an elevation applied to the component between 0 and 24.',
      },
      {
        name: 'rounded',
        title: 'Rounded',
        component: Component.SELECT,
        items: [0, 'xs', 'sm', 'true', 'lg', 'xl', 'pill', 'circle', 'shaped'],
        type: PropertyType.PROP,
        multiple: false,
        description: 'Designates the border-radius applied to the component.',
      },
      {
        name: 'tile',
        title: 'Tile',
        component: Component.SWITCH,
        type: PropertyType.PROP,
        description: 'Removes any applied border-radius from the component.',
      },
    ],
  },
  {
    groupName: 'Size and Dimension',
    props: [
      {
        name: 'height',
        title: 'Height',
        component: Component.NUMBER_SELECTOR,
        default: 50,
        minValue: 0,
        maxValue: 100,
        type: PropertyType.PROP,
      },
    ],
  },
]
