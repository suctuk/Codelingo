import React from 'react';

interface StyledComponent<P = any> extends React.ForwardRefExoticComponent<P> {
  withConfig: (config: any) => StyledComponent<P>;
  attrs: (attrs: any) => StyledComponent<P>;
}

const styled = (Component: string | React.ComponentType<any>) => {
  const templateFunction = (strings?: TemplateStringsArray, ...args: any[]): StyledComponent => {
    const StyledComponent = React.forwardRef((props: any, ref: any) => {
      const ElementType = typeof Component === 'string' ? Component : Component;
      return React.createElement(ElementType, { ...props, ref }, props.children);
    }) as StyledComponent;

    StyledComponent.displayName = `Styled(${typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Component'})`;
    StyledComponent.withConfig = () => StyledComponent;
    StyledComponent.attrs = () => StyledComponent;

    return StyledComponent;
  };

  return templateFunction;
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
] as const;

domElements.forEach(domElement => {
  (styled as any)[domElement] = styled(domElement);
});

// Mock ThemeProvider
const ThemeProvider: React.FC<{ theme: any; children: React.ReactNode }> = ({ children }) => {
  return React.createElement(React.Fragment, null, children);
};

// Mock other styled-components exports
const css = (...args: any[]) => '';
const keyframes = (...args: any[]) => '';
const createGlobalStyle = (...args: any[]) => ({ globalStyle: null });
const isStyledComponent = () => true;

export default styled;
export {
  ThemeProvider,
  css,
  keyframes,
  createGlobalStyle,
  isStyledComponent
};
