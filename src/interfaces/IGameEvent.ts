import { GameEventType } from "@objects/Enums";
import { IGame } from "./IGame";

export interface IGameEvent extends IGame {
  type: GameEventType;
}
