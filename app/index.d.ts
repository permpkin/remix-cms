export {};

declare global {
  interface Window {
    env: {[key: string]: String}
  }
}