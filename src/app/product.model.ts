export class Product {
  public id: number;
  public title: string;
  public price: number;
  public category: string;
  public description: string;
  public imagePath: string;

  constructor(
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    imagePath: string
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
    this.description = description;
    this.imagePath = imagePath;
  }
}
