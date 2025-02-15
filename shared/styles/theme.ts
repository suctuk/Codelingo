export const theme = {
  colors: {
    primary: '#58CC02', // Duolingo green
    primaryDark: '#46A302',
    primaryLight: '#89E219',
    secondary: '#1CB0F6', // Duolingo blue
    secondaryDark: '#0C8AD9',
    error: '#FF4B4B',
    warning: '#FFC800',
    success: '#58CC02',
    background: '#FFFFFF',
    surface: '#F7F7F7',
    text: {
      primary: '#4B4B4B',
      secondary: '#777777',
      disabled: '#BBBBBB',
      inverse: '#FFFFFF',
    },
    border: '#E5E5E5',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
  typography: {
    fontFamily: {
      regular: 'DINRoundPro',
      medium: 'DINRoundPro-Medium',
      bold: 'DINRoundPro-Bold',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
    },
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  animations: {
    duration: {
      short: 150,
      medium: 300,
      long: 500,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
  mascots: {
    robot: {
      happy: require('../assets/mascots/robot-happy.png'),
      sad: require('../assets/mascots/robot-sad.png'),
      excited: require('../assets/mascots/robot-excited.png'),
      thinking: require('../assets/mascots/robot-thinking.png'),
    },
    computer: {
      happy: require('../assets/mascots/computer-happy.png'),
      sad: require('../assets/mascots/computer-sad.png'),
      excited: require('../assets/mascots/computer-excited.png'),
      thinking: require('../assets/mascots/computer-thinking.png'),
    },
    // Add more mascots here
  },
};
