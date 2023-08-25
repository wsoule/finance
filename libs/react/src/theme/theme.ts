import { defineStyle, defineStyleConfig, extendTheme, SystemStyleInterpolation, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false
};

const headerTheme: SystemStyleInterpolation = defineStyle({
  alignContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  display: 'flex',
  height: '2rem',
  padding: '0.5em',
  fontSize: '1rem',
  _light: {
    _hover: {
      backgroundColor: '#EDF2F7'
    }
  },
  transition: 'all 200ms',

  _dark: {
    _hover: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
    }
  }
}
);

const headerDefault = defineStyleConfig({
  variants: {
    'nav-bar': headerTheme
  }
});

const components = {
  Heading: headerDefault
};

export const theme = extendTheme({
  config,
  components
});
