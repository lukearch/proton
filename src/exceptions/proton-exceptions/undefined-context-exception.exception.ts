import { ProtonException } from '../../models/proton-exception.model';

export class UndefinedContextException extends ProtonException {
  constructor(property: string) {
    super(
      `Attempting to access an undefined property in the context: ${property}`
    );
  }
}
