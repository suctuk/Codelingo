export const codeTheme = {
  colors: {
    // VSCode-inspired colors
    background: '#1E1E1E',
    sidebar: '#252526',
    primary: '#0098FF', // Bright blue for active elements
    secondary: '#569CD6', // Softer blue for secondary elements
    success: '#4EC9B0', // Teal for correct answers
    error: '#F44747', // Red for errors
    warning: '#CCA700', // Yellow for warnings
    text: {
      primary: '#D4D4D4',
      secondary: '#808080',
      accent: '#9CDCFE'
    },
    syntax: {
      keyword: '#569CD6',
      string: '#CE9178',
      number: '#B5CEA8',
      comment: '#6A9955',
      function: '#DCDCAA',
      class: '#4EC9B0',
      variable: '#9CDCFE'
    }
  },
  
  // Fonts
  fonts: {
    mono: '"Fira Code", "Consolas", monospace',
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    serif: 'Georgia, "Times New Roman", serif'
  },

  // Code editor styling
  editor: {
    fontFamily: '"Fira Code", "Consolas", monospace',
    fontSize: '14px',
    lineHeight: '1.5',
    padding: '16px',
    borderRadius: '8px',
    background: '#1E1E1E',
    border: '1px solid #3C3C3C'
  },

  // Terminal-style elements
  terminal: {
    background: '#1E1E1E',
    prompt: '#569CD6',
    output: '#D4D4D4',
    error: '#F44747',
    success: '#4EC9B0',
    fontSize: '14px',
    padding: '16px'
  },

  // Skill tree node themes based on programming concepts
  nodes: {
    basics: {
      icon: '{ }',
      color: '#569CD6',
      background: 'linear-gradient(135deg, #569CD6 0%, #3C3C3C 100%)'
    },
    functions: {
      icon: 'ƒ()',
      color: '#DCDCAA',
      background: 'linear-gradient(135deg, #DCDCAA 0%, #3C3C3C 100%)'
    },
    objects: {
      icon: '[ ]',
      color: '#4EC9B0',
      background: 'linear-gradient(135deg, #4EC9B0 0%, #3C3C3C 100%)'
    },
    advanced: {
      icon: '⚡',
      color: '#CCA700',
      background: 'linear-gradient(135deg, #CCA700 0%, #3C3C3C 100%)'
    }
  },

  // Animation timings
  animation: {
    fast: '0.2s',
    medium: '0.3s',
    slow: '0.5s'
  },

  // Code-specific decorations
  decorations: {
    lineNumber: {
      color: '#858585',
      fontSize: '12px',
      width: '40px',
      textAlign: 'right',
      paddingRight: '12px'
    },
    indent: {
      size: '20px',
      color: '#404040'
    },
    bracket: {
      matched: '#569CD6',
      unmatched: '#F44747'
    }
  },

  // Achievement badges with coding themes
  achievements: {
    firstFunction: {
      icon: 'ƒ()',
      color: '#DCDCAA',
      background: '#2D2D2D'
    },
    objectMaster: {
      icon: '{ }',
      color: '#4EC9B0',
      background: '#2D2D2D'
    },
    debugHero: {
      icon: '🐛',
      color: '#CCA700',
      background: '#2D2D2D'
    },
    algorithmAce: {
      icon: '⚡',
      color: '#569CD6',
      background: '#2D2D2D'
    }
  }
} as const;
