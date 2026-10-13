/**
 * Challenge: Find the TypeScript errors
Read this code:
let productName: string = "Laptop";
let price: number = 50000;
let inStock: boolean = true;
let ratings: number[] = [4, 5, 3];

price = 45000;
inStock = "yes";
ratings = [4, "five", 3];


Your task: Identify the two incorrect assignments and fix them. Explain briefly why each is incorrect.
 */

let productName: string = "Laptop";
let price: number = 50000;
let inStock: boolean = true;
let ratings: number[] = [4, 5, 3];

price = 45000;
inStock = false;  
ratings = [4, 5, 3]; 

/**
 * Expatiation:
 *  inStock = false; — Valid because false is a boolean.
 * ratings = [4, 5, 3]; — Valid because every element is a number.
 */

