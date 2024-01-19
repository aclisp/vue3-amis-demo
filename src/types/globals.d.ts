// https://betterprogramming.pub/how-to-add-custom-types-to-the-window-with-typescript-8a5408da9e12

declare global {
  interface Window {
    amisRequire: (moduleId: string) => any
  }
}

export {}
