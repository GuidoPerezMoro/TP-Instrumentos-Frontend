// CartInstrumento.ts
import { Instrumento } from "./Instrumento";

export default interface CartInstrumento extends Instrumento {
  cantidad: number;
}