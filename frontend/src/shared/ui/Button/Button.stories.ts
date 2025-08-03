import Button, { ButtonSize, ButtonTheme } from './Button';

export default {
  title: 'shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Button',
  },
};

export const Black = {
  args: {
    theme: ButtonTheme.BLACK,
  },
};

export const Grey = {
  args: {
    theme: ButtonTheme.GREY,
  },
};

export const Clear = {
  args: {
    theme: ButtonTheme.CLEAR,
  },
};

export const Outline = {
  args: {
    theme: ButtonTheme.OUTLINE,
  },
};

export const BlackL = {
  args: {
    theme: ButtonTheme.BLACK,
    size: ButtonSize.L,
  },
};

export const GreyL = {
  args: {
    theme: ButtonTheme.GREY,
    size: ButtonSize.L,
  },
};

export const ClearL = {
  args: {
    theme: ButtonTheme.CLEAR,
    size: ButtonSize.L,
  },
};

export const OutlineL = {
  args: {
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.L,
  },
};

export const BlackS = {
  args: {
    theme: ButtonTheme.BLACK,
    size: ButtonSize.S,
  },
};

export const GreyS = {
  args: {
    theme: ButtonTheme.GREY,
    size: ButtonSize.S,
  },
};

export const ClearS = {
  args: {
    theme: ButtonTheme.CLEAR,
    size: ButtonSize.S,
  },
};

export const OutlineS = {
  args: {
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.S,
  },
};
