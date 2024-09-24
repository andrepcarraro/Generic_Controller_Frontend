export interface ControlParametersModel
{
    Kp: number,   // Proporcional
    Ti: number,   // Integral
    Td: number,   // Derivativo

    // Limites de 0% e 100%
    MinOutput: number,   // Representa 0%
    MaxOutput: number,   // Representa 100%

    // Modo automático ou manual
    AutoMode: boolean,

    // Ação direta ou reversa
    IsDirect: boolean,

    // SetPoint
    SetPoint: number, 
    // Saída atual no modo manual
    ManualOutput: number, 
}