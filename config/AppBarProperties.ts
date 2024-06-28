import { Component, PropertyType } from '~/enums'

export const appBarLayoutConfig = [
  {
    groupName: 'Positioning',
    props: [
      {
        name: 'location',
        title: 'Location',
        component: Component.SELECT,
        items: ['top', 'bottom'],
        multiple: false,
        default: 'top',
        description: 'Aligns the component towards the top or bottom.',
      },
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
        default: false,
        description: 'Applies position: absolute to the component.',
      },
      {
        name: 'floating',
        title: 'Floating',
        type: PropertyType.PROP,
        component: Component.SWITCH,
        default: false,
        description: 'Applies display: inline-flex to the component.',
      },
    ],
  },
  {
    groupName: 'Appearance',
    props: [
      // next version
      // {
      //   name: 'border',
      //   type: 'string | number | boolean',
      //   default: false,
      //   description: 'Designates the border-radius applied to the component. This can be xs, sm, md, lg, xl.',
      // },
      // {
      //   name: 'color',
      //   type: 'string',
      //   default: 'undefined',
      //   description: 'Applies specified color to the control - supports utility colors or css color.',
      // },
      // {
      //   name: 'theme',
      //   type: 'string',
      //   default: 'undefined',
      //   description: 'Specify a theme for this component and all of its children.',
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
        name: 'flat',
        title: 'Flat',
        component: Component.SWITCH,
        default: false,
        type: PropertyType.PROP,
        description: 'Removes the component’s box-shadow.',
      },
      {
        name: 'image',
        title: 'Image',
        component: Component.SWITCH,
        default: undefined,
        activeValue: 'https://picsum.photos/1920/1080?random',
        type: PropertyType.PROP,
        description: 'Specifies a v-img as the component’s background.',
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
      // {
      //   name: 'extended',
      //   type: 'boolean',
      //   default: false,
      //   description: 'Use this prop to increase the height of the toolbar without using the extension slot.',
      // },
      // {
      //   name: 'extension-height',
      //   type: 'string | number',
      //   default: 48,
      //   description: 'Designate an explicit height for the extension slot.',
      // },
      {
        name: 'height',
        component: Component.NUMBER_SELECTOR,
        type: PropertyType.PROP,
        default: 64,
        description: 'Designates a specific height for the toolbar.',
      },
      {
        name: 'density',
        title: 'Density',
        component: Component.SELECT,
        multiple: false,
        items: ['default', 'prominent', 'comfortable', 'compact'],
        type: PropertyType.PROP,
        clearable: true,
        description: 'Adjusts the vertical height used by the component.',
      },
      {
        name: 'collapse',
        title: 'Collapse',
        component: Component.SWITCH,
        default: false,
        type: PropertyType.PROP,
        description: 'Morphs the component into a collapsed state, reducing its maximum width.',
      },

    ],
  },
  {
    groupName: 'Scrolling',
    props: [
      {
        name: 'scroll-behavior',
        title: 'Scroll Behaviour',
        component: Component.SELECT,
        multiple: true,
        items: ['fade-image', 'hide', 'collapse', 'elevate', 'inverted'],
        type: PropertyType.PROP,
        clearable: true,
        description: 'Specify an action to take when the scroll position reaches scroll-threshold.',
      },
      {
        name: 'scroll-threshold',
        title: 'Scroll Threshold',
        component: Component.NUMBER_SELECTOR,
        default: 300,
        minValue: 0,
        maxValue: 1000,
        type: PropertyType.PROP,
        description: 'The amount of scroll distance down before scroll-behavior activates.',
      },
    ],
  },
  // {
  //   groupName: 'General',
  //   props: [
  //     {
  //       name: 'title',
  //       title: 'Title',
  //       component: Component.TEXT,
  //       type: PropertyType.PROP,
  //       default: 'Vuetify Layout Designer',
  //       description: 'Specify a title text for the component.',
  //     },
  //     // hasActions: {
  //     //   category: 'BASIC',
  //     //   text: "Actions",
  //     //   ui: UI.CHECKBOX,
  //     //   default: false,
  //     //   type: 'slot'
  //     // },
  //     // {
  //     //   name: 'name',
  //     //   type: 'string',
  //     //   default: 'undefined',
  //     //   description: 'Assign a specific name for layout registration.',
  //     // },
  //     // {
  //     //   name: 'tag',
  //     //   type: 'string',
  //     //   default: 'header',
  //     //   description: 'Specify a custom tag used on the root element.',
  //     // }
  //   ],
  // },
]
