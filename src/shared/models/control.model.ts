export interface ControlParametersModel {
  kp: number; // Proporcional
  ti: number; // Integral
  td: number; // Derivativo

  // Limites de 0% e 100%
  minOutput: number; // Representa 0%
  maxOutput: number; // Representa 100%

  // Ação direta ou reversa
  isDirect: boolean;

  // SetPoint
  setPoint: number;

  //Tempo entre as interações do controlador em milissegundos
  cycleTime: number;
}


export interface OutputModel {output: number, processVariable: number, setPoint: number}