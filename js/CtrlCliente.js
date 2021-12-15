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

const daocliente =
  getFirestore().
    collection("Cliente");
const params =
  new URL(location.href).
    searchParams;
const id = params.get("id");
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
    busca();
  }
}

/** Busca y muestra los datos que
 * corresponden al id recibido. */
async function busca() {
  try {
    const doc =
      await daoCliente.
        doc(id).
        get();
    if (doc.exists) {
      /**
       * @type {
          import("./tipos.js").
                  Alumno} */
      const data = doc.data();
      forma.telefono.value = data.telefono;
      forma.nombre.value = data.nombre || "";
      forma.direccion.value = data.direccion || "";
      forma.edad.value = data.edad || "";
      forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
    } else {
      throw new Error(
        "No se encontró.");
    }
  } catch (e) {
    muestraError(e);
    muestraClientes();
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
                Alumno} */
    const modelo = {
      telefono, 
      nombre,
      direccion,
      edad
    };
    await daoCliente.
      doc(id).
      set(modelo);
    muestraClientes();
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      await daoCliente.
        doc(id).
        delete();
      muestraClientes();
    }
  } catch (e) {
    muestraError(e);
  }
}

