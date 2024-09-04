import CategoryPage from "../classes/CategoryPage";
import ProductPage from "../classes/ProductPage";
import SearchPage from "../classes/SearchPage";

describe("Marjane mall purchase", () => {
    const index = 0;
    const categoryPage = new CategoryPage();
    const productPage = new ProductPage();
    const searchPage = new SearchPage();
  
    beforeEach(() => {
      cy.visit("https://www.marjanemall.ma/");
      cy.fixture("products").as("data");
    });
  
    it("should add a product to cart directly", () => {
      cy.get("@data").then((data: any) => {
        // Choose a category
        categoryPage.selectCategory(data.products[index].category);
  
        // Check navigation
        categoryPage.checkNavigation(data.products[index].productPath);
  
        // Select a product and add to cart
        productPage.addProductToCart(data.products[index].name);
  
        // Check existence of the product in the cart
        productPage.checkProductInCart(data.products[index].name, data.products[index].quantity);
      });
    });
  
    it("should search for a product and add it to cart", () => {
      cy.get("@data").then((data: any) => {
        // Search for a product
        searchPage.searchProduct(data.products[index].searchTerm);
  
        // Select a product and add to cart
        productPage.addProductToCart(data.products[index].name);
  
        // Check existence of the product in the cart
        productPage.checkProductInCart(data.products[index].name, data.products[index].quantity);
      });
    });

  });