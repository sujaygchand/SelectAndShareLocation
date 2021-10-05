export class Validation {
  static checkHTMLElementIsValid(
    elements: HTMLElement[],
    errorMessage: string
  ) {
    for (const element in elements) {
      if (element === null) throw new Error(errorMessage);
    }
  }
}
