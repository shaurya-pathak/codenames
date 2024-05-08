// Import extendTheme and theme tools from Chakra UI
import { extendTheme } from '@chakra-ui/react';

// Define your custom colors
const colors = {
  primary: '#f72585',   // Vibrant Pink
  secondary: '#7209b7', // Deep Purple
  tertiary: '#3a0ca3',  // Darker Purple
  accent1: '#4361ee',   // Bright Blue
  accent2: '#4cc9f0',   // Cyan
};

// Extend the default theme
const theme = extendTheme({
  colors,
  components: {
    Button: {
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'primary' : 'secondary',
          color: 'white',
        }),
        outline: {
          borderColor: 'primary',
          color: 'primary',
          _hover: {
            bg: 'primary',
            color: 'white',
          },
        },
      },
    },
    // You can add more component customizations here
  },
  // You can also customize other theme aspects like typography, breakpoints, etc.
});

export default theme;
