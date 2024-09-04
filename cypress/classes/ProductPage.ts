class ProductPage {
  private productDetailsClass = '.product-item-details';
  private addToCartButton = '.action';
  private confirmationPopup = '#confirmBox';
  private minicartBlock = '[data-block="minicart"]';
  private minicartItemsWrapper = ".minicart-items-wrapper";
  private productNameClass = ".product-item-name";
  private quantityInputClass = ".details-qty .item-qty";
  private removeButtonClass = ".secondary";
  private modalInnerWrap = '.modal-inner-wrap';
  private confirmButton = 'button:contains("Valider")';

  addProductToCart(productName: string) {
    cy.contains(productName).parents(this.productDetailsClass).within(() => {
      cy.get(this.addToCartButton).click();
    });
    cy.get(this.confirmationPopup).should("be.visible");
    cy.wait(6000);
  }

  checkProductInCart(productName: string, quantity: number) {
    cy.get(this.minicartBlock).click();
    cy.get(this.minicartItemsWrapper).within(() => {
      cy.get(this.productNameClass).should("contain", productName);
      cy.get(this.quantityInputClass).invoke("val").should("eq", quantity.toString());
    });
  }

  removeProductFromCart(productName: string) {
    cy.get(this.minicartItemsWrapper).within(() => {
      cy.get(this.productNameClass).should("contain", productName);
      cy.get(this.removeButtonClass).first().click();
    });
    cy.get(this.modalInnerWrap).should('be.visible');
    cy.get(this.confirmButton).click();
  }

  checkCartLength(expectedLength: number) {
    cy.get(this.minicartItemsWrapper).should("have.length", expectedLength);
  }
}

export default ProductPage;
