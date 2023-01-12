export abstract class CommonFunctions {

  public static extractErrorMessage(err: any): string {
    try {
      return err.errorMessage || err.error?.title || err?.message || [...new Set(err?.error?.errors)]?.join(', ');
    } catch (e) {
      return '';
    }
  }

}
