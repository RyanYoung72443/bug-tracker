import { LogState } from './log.model';
import { TechState } from './tech.model';

export interface AppStore {
  log: LogState;
  tech: TechState;
}
