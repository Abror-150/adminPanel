export interface ZakasType {
  id: number;

  name: string;
  phone: string;
  adress: string;
  check: false;
  createdAt: string;
  Products: {
    id: string;
    name: string;
    image: string;
    price: number;
    depth: number;
    size: string;
  };
}
