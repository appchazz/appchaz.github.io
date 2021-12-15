import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraClientes
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoCliente =
  getFirestore().
    collection("Cliente");
/** @type {HTMLFormElement} */
const forma = document["forma"];
getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guarda);
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const telefono = getString(
        formData, "telefono").trim();  
    const nombre = getString(formData, "nombre").trim();
    const direccion = getString(formData, "direccion").trim();
    const edad = getString(formData, "edad").trim();
    /**
     * @type {
        import("./tipos.js").
                Cliente} */
    const modelo = {
      telefono,
      nombre,
      direccion,
      edad 
    };
    await daoCliente.
      add(modelo);
    muestraClientes();
  } catch (e) {
    muestraError(e);
  }
}

