// Logical book — metadata only, not a physical copy
class Book {
  constructor(
    public readonly isbn: string,
    public readonly title: string,
    public readonly author: string,
  ) {}
}

export default Book;
