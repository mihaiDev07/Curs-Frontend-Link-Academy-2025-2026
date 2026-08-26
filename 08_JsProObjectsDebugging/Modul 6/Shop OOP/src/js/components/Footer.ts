import { Component } from "./Component";

interface FooterProps {
  siteYear?: number;
  siteOwner?: string;
  siteLink?: string;
}

export class Footer extends Component<FooterProps> {
  render(): HTMLElement {
    const footer = document.createElement("div");
    footer.classList = "container";
    footer.innerHTML = `
    <p class="m-0 text-center text-white">
    <img src='./assets/images/logo.png' style="max-width: 200px; ">
    <span>2020 - ${this.props.siteYear} Copyright - ${this.props.siteOwner}. All rights reserved.</span>
    </p>
    `;

    return footer;
  }
}
