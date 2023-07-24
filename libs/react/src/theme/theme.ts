import { ThemeConfig, extendTheme, defineStyleConfig, defineStyle } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false
};

const headerTheme = defineStyle({
  color: 'yellow.500',

  _dark: {
    color: 'blue.500'

  }
}
);

const headerDefault = defineStyleConfig({
  variants: {
    'testing': headerTheme
  }
});

const components = {
  Heading: headerDefault
};

export const theme = extendTheme({
  config,
  components
});
