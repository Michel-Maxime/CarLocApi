export default interface IResponseBuilder<T, U> {
  sendResponse(a: string): { message: string };

  sendItem(a: T): U;

  sendItems(a: T[]): U[];
}
