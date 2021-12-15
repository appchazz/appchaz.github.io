class MiFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Fernando Vazquez Garcia Tello.
      </p>`;
     `<figura-web id="hamburguesa" y="0" velocidad="2">
      🍔
      </figura-web>
      <script>
        setInterval(() => {
          hamburguesa.muevete();
        },120)`;
            
    setInterval
  }
 }
customElements.defin("mi-footer", MiFooter);
