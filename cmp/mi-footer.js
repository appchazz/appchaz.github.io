class MiFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Fernando Vazquez Garcia Tello.
      </p>`;
 }
customElements.defin("mi-footer", MiFooter);
