export class Component<P = Record<string, unknown>> {
  props: P;
  element: HTMLElement | null;

  constructor(props = {} as P) {
    this.props = props;
    this.element = null;
  }

  render(): HTMLElement {
    throw new Error("Component should have a render() method!");
  }

  mount(container: Element) {
    this.element = this.render();
    container.appendChild(this.element);
  }
}
