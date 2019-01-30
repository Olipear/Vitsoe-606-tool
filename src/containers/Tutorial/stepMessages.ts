export const stepMessages = {
  stage1: [
    {
      stepId: 'addSpaceName',
      stepMessage: 'Please enter a name for your space',
      systemKey: 'systemName',
    },
    {
      stepId: 'addHeight',
      stepMessage: 'Please enter a height',
      systemKey: 'environment.height',
    },
    {
      stepId: 'addWidth',
      stepMessage: 'Please enter a width',
      systemKey: 'environment.width',
    },
  ],
  stage2: [
    {
      stepId: 'addTrack',
      stepMessage:
        'Please add a track by dragging one from the left on to the wall',
    },
  ],
  stage3: [
    {
      stepId: 'addComponent',
      stepMessage:
        'Optionally choose a filter to narrow down your choice and drag it on to the tracks',
    },
  ],
}
