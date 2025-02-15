import * as styled from 'styled-components';

// Mock styled-components
const styled = (tag: any) => {
  const styledComponent = (strings: TemplateStringsArray, ...args: any[]) => {
    return tag;
  };
  return styledComponent;
};

// Add all HTML and SVG elements
const domElements = [
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body',
  'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details',
  'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2',
  'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd',
  'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav',
  'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp',
  'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub',
  'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u',
  'ul', 'var', 'video', 'wbr', 'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop',
  'svg', 'text', 'tspan'
];

domElements.forEach(domElement => {
  styled[domElement] = styled(domElement);
});

// Mock ThemeProvider
const ThemeProvider = ({ children }: { children: React.ReactNode }) => children;

// Mock other styled-components exports
const css = (...args: any[]) => '';
const keyframes = (...args: any[]) => '';
const createGlobalStyle = (...args: any[]) => ({ globalStyle: null });
const isStyledComponent = () => true;

// Export all the styled-components exports
module.exports = {
  ...styled,
  default: styled,
  createGlobalStyle,
  css,
  keyframes,
  ThemeProvider,
};
