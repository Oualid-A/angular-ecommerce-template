class CategoryPage {
  private category = ".category-slider-title"

    selectCategory(categoryName: string) {
      cy.get(this.category).contains(categoryName).click();
    }
  
    checkNavigation(url: string) {
      cy.location("pathname").should("eq", url);
    }
  }
  
  export default CategoryPage;
  