// Variable que comprueba si el usuario se ha registrado como profesor
export let profesor = false;

/**
 * Función para comprobar el usuario
 */
export function getUser() {
    profesor = sessionStorage.getItem("token") ? true : false;
}

/**
 * Función que borra los datos de autenticación guardados
 */
export function logout() {
    sessionStorage.removeItem("token");
    profesor = false;
}