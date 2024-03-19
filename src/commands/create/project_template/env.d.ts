/// <reference types="vite/client" />
interface key {
  [key: string]: any;
}
declare interface RouterRes {
  path: string;
  name: string;
  meta: key;
  component: string;
  children?: Router | undefined;
}
