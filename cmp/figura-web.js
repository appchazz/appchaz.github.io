class FiguraWeb extends HTMLElemnt{
  connectedCallback(){
    this.x = 0;
    this.y = parseINT(this.getAttribute("y"),10);
    this.velocidad = pareseInt(this.getAttribute("velocidad"),10);
  }
  muevete(){
    this.style.right = `${this.x}px`;
    this.style.top = `${this.y}px`;
    this.x = this.x <document.documentElement.clientWidth ? 0 :
        this.x + this.velocidad;
  }
}
  customElements.define("figura-web", FiguraWeb);
