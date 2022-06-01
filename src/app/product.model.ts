export class Product {
  public id: number;
  public title: string;
  public price: number;
  public category: string;
  public description: string;
  public rating: object;
  public imagePath: string;

  constructor(
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    rating:object,
    imagePath: string
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.rating = rating;
    this.category = category;
    this.description = description;
    this.imagePath = imagePath;
  }
}
