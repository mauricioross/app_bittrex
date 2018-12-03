/**
 * @description constantes principales de la aplicación.
 */
module.exports = {
    /**
     * URL_DEFECTO es la url por defecto de la aplicación,
     * las urls son configuradas en los states de <modulo>/config
     * si una url no existe, por defecto se redireccionará a esta url:
     */
    URL_DEFECTO     : '/dashboard',
    /**
     * STATE_INICIAL es el state inicial, luego de la autenticación
     * los states son configurados en <modulo>/config
     */
    STATE_INICIAL   : 'main.dashboard',
}