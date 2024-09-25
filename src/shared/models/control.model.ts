export interface ControlParametersModel
{
    kp: number,   // Proporcional
    ti: number,   // Integral
    td: number,   // Derivativo

    // Limites de 0% e 100%
    minOutput: number,   // Representa 0%
    maxOutput: number,   // Representa 100%

    // Modo automático ou manual
    autoMode: boolean,

    // Ação direta ou reversa
    isDirect: boolean,

    // SetPoint
    setPoint: number, 
    // Saída atual no modo manual
    manualOutput: number, 
}