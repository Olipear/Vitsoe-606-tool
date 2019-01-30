const rules = [
  {
    conditions: {
      all: [
        {
          fact: 'num-bays',
          operator: 'greaterThan',
          value: 1,
        },
        {
          fact: 'num-components',
          operator: 'greaterThan',
          value: 0,
        },
        {
          fact: 'new-component',
          path: '.shelf_type',
          operator: 'equal',
          value: 'metalshelf',
        },
        {
          fact: 'mixed-metalshelf-depths',
          operator: 'equal',
          value: true,
        },
      ],
    },
    event: {
      type: 'warnings',
      params: {
        message:
          'Metal shelves of differing depths should not be added to the same row.',
      },
    },
  },
  {
    conditions: {
      all: [
        {
          fact: 'new-component',
          path: '.shelf_category',
          operator: 'equal',
          value: 'cabinets',
        },
        {
          fact: 'new-component',
          path: '.shelf_type',
          operator: 'notEqual',
          value: 'cabinet_uao',
        },
        {
          fact: 'new-pin',
          operator: 'greaterThan',
          value: 15,
        },
      ],
    },
    event: {
      type: 'warnings',
      params: {
        message:
          'Drawered and fold-down door cabinets should not be placed too high.',
      },
    },
  },
  {
    conditions: {
      all: [
        {
          fact: 'new-component',
          path: '.shelf_type',
          operator: 'equal',
          value: 'table',
        },
        {
          fact: 'new-pin',
          operator: 'notEqual',
          value: 6,
        },
      ],
    },
    event: {
      type: 'errors',
      params: {
        message:
          'Due to the standard leg size, integrated tables must be placed 81cm (approx 31⅘in) from the ground.',
      },
    },
  },
  {
    conditions: {
      all: [
        {
          fact: 'new-component',
          path: '.shelf_type',
          operator: 'equal',
          value: 'deskshelf',
        },
        {
          fact: 'new-pin',
          operator: 'notEqual',
          value: 5,
        },
      ],
    },
    event: {
      type: 'warnings',
      params: {
        message:
          'The optimal position for a desk shelf is 74cm (approx 29⅒in) from the ground.',
      },
    },
  },
  {
    conditions: {
      all: [
        {
          fact: 'new-component',
          path: '.pins_occupied',
          operator: 'greaterThan',
          value: 2,
        },
        {
          fact: 'new-pin',
          operator: 'lessThanMinusOne',
          value: {
            fact: 'new-component',
            path: '.pins_occupied',
          },
        },
      ],
    },
    event: {
      type: 'errors',
      params: {
        message: 'Parts must not hang below the bottom of the system.',
      },
    },
  },
  {
    conditions: {
      all: [
        {
          fact: 'overlapping',
          operator: 'equal',
          value: true,
        },
      ],
    },
    event: {
      type: 'errors',
      params: {
        message: 'Parts must not overlap other parts.',
      },
    },
  },
]

export { rules }
