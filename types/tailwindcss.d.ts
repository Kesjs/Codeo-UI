// Tailwind CSS class name support for React components
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    className?: string;
  }
  interface SVGProps<T> extends SVGPropsBase<T> {
    className?: string;
  }
}

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}