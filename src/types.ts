export interface Product {
  product_id: number;
  product_group: string;
  product_category: string;
  product_type: string;
  product: string;
  product_description: string;
  unit_of_measure: string;
  current_wholesale_price: number;
  current_retail_price: string;
  tax_exempt_yn: string;
  promo_yn: string;
  new_product_yn: string;
  img_url: string;
}

export interface Person {
  id: number;
  name: string;
  role: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
}
