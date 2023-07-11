import { Box } from '@chakra-ui/layout';
import { FC, PropsWithChildren } from 'react';

export type WrapperPropsSize = 'small' | 'medium' | 'large' |'full';

export interface WrapperProps extends PropsWithChildren{
  size?: WrapperPropsSize;
}

export const Wrapper: FC<WrapperProps> = ({ children, size }) => {
  if (size === 'full'){
    return (
      <Box
        marginX='auto'
        marginY='1rem'
        width='100%'
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      marginX='auto'
      marginY='1rem'
      maxWidth={`${wrapperSizeToPixels(size)}px`}
      width='100%'
    >
      {children}
    </Box>
  );
};

export function wrapperSizeToPixels(size: WrapperPropsSize = 'medium'): number {
  switch (size) {
    case 'full': {
      return -1;
    }
    case 'large': {
      return 1000;
    }
    case 'medium': {
      return 800;
    }
    case 'small': {
      return 400;
    }
    default: {
      const neverSize: never = size;
      throw new Error(`Invalid size '${neverSize}' provided to Wrapper.sizeToPixels`);
    }
  }
}

export default Wrapper;
