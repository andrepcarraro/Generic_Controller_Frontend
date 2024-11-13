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

  //Tau - Constante de tempo de resposta do processo
  tau: number;

  //Valor aplicado do disturbio ao processo
  disturb: number;

  //Valor que indica o numero de ciclos que o processo demora para começar a responder ao controle
  processDeadTime: number;
}


export interface OutputModel { output: number, processVariable: number, setPoint: number }