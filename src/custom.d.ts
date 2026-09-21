// Allow importing .jsx React components and some asset files from TypeScript files
declare module '*.jsx' {
  import * as React from 'react';
  const Component: React.ComponentType<any>;
  export default Component;
}

declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg';
declare module '*.jpg';
declare module '*.jpeg';
