import { IProductColor } from './product-colors.interface';

export interface IProduct {
    api_featured_image: string
    brand: string;
    category: string | null;
    created_at: Date,
    currency: string | null;
    description: string;
    id: number;
    image_link: string,
    name: string;
    price: string | null;
    price_sign: string | null;
    product_api_url: string;
    product_colors: IProductColor[];
    product_link: string;
    product_type: string;
    rating: string | null;
    tag_list: string[];
    updated_at: Date;
    website_link: string;
}