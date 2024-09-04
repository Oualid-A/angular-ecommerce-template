/**
 * 1 visit the site
 * 2 choose a category
 * 3 add a product to the cart
 * 4 add the second product to the cart
 * 5 check if the product is added in the cart
 * 6 delete the product from the cart
 * 7 search for products
 */
describe("Marjane mall purchase", () => {
    const index = 0;
  
    beforeEach(() => {
      cy.visit("https://www.marjanemall.ma/");
      cy.fixture("products").as("data");
    });
  
    it.only("should add a product to cart directly", () => {
      cy.get("@data").then((data: any) => {
        // Choose a category
        cy.get(".category-slider-title")
          .contains(data.products[index].category)
          .click();
  
        // Check navigation
        cy.location("pathname").should("eq", data.products[index].productPath);
  
        // Select a product and add to cart
        cy.contains(data.products[index].name)
          .parents(".product-item-details")
          .within(() => {
            cy.get(".action").click();
          });
  
        // Check confirmation popup
        cy.get("#confirmBox").should("be.visible");
        //cy.wait(6000); // todo: should be changed 
  
        // Check existence of the product in the cart
        cy.get('[data-block="minicart"]').click();
        cy.get(".minicart-items-wrapper")
          .should("have.length", 1)
          .within(() => {
            cy.get(".product-item-name").should("contain", data.products[index].name);
            // Verify the quantity of the product
            cy.get(".details-qty .item-qty")
              .invoke("val")
              .should("eq", data.products[index].quantity.toString());
          });
      });
    });
  
    it("should search for a product and add it to cart", () => {
      cy.get("@data").then((data: any) => {
        // Search for a product
        cy.get("#autocomplete-0-input").type(`${data.products[index].searchTerm}{enter}`);
        cy.get(".page-title").should("contain", data.products[index].searchTerm);
  
        // Select a product and add to cart
        cy.contains(data.products[index].name)
          .parents(".product-item-details")
          .within(() => {
            cy.get(".action").click();
          });
  
        // Check confirmation popup
        cy.get("#confirmBox").should("be.visible");
        cy.wait(6000);
  
        // Check existence of the product in the cart
        cy.get('[data-block="minicart"]').click();
        cy.get(".minicart-items-wrapper")
          .should("have.length", 1)
          .within(() => {
            cy.get(".product-item-name").should("contain", data.products[index].name);
            // Verify the quantity of the product
            cy.get(".details-qty .item-qty")
              .invoke("val")
              .should("eq", data.products[index].quantity.toString());
          });
      });
    });
  
    it("should add multiple products to the cart", () => {
      const productIndexes = [0, 1];
      cy.get("@data").then((data: any) => {
        // Choose a category
        cy.get(".category-slider-title")
        .contains(data.products[0].category)
        .click();
        
        // Check navigation
        cy.location("pathname").should("eq", data.products[0].productPath);
        
        productIndexes.forEach((productIndex) => {
          // Select a product and add to cart
          cy.contains(data.products[productIndex].name)
            .parents(".product-item-details")
            .within(() => {
              cy.get('.action').eq(productIndex).click();
            });
  
          // Check confirmation popup
          cy.get("#confirmBox").should("be.visible");
          cy.wait(6000);
        });
  
        // Navigate to the cart to check items
        cy.get('[data-block="minicart"]').click();
  
        productIndexes.forEach((productIndex) => {
          cy.get(".minicart-items-wrapper").within(() => {
            cy.get(".product-item-name").should("contain", data.products[productIndex].name);
            // Verify the quantity of the product
            cy.get(".details-qty .item-qty")
              .invoke("val")
              .should("eq", data.products[productIndex].quantity.toString());
          });
        });
      });
    });
  
    it("should delete a product from the cart", () => {
      const productIndexes = [0, 1];
      cy.get("@data").then((data: any) => {
        // Choose a category
        cy.get(".category-slider-title")
        .contains(data.products[0].category)
        .click();
        
        // Check navigation
        cy.location("pathname").should("eq", data.products[0].productPath);
        
        productIndexes.forEach((productIndex) => {
          // Select a product and add to cart
          cy.contains(data.products[productIndex].name)
            .parents(".product-item-details")
            .within(() => {
              cy.get('.action').eq(productIndex).click();
            });
  
          // Check confirmation popup
          cy.get("#confirmBox").should("be.visible");
          cy.wait(6000);
        });
  
        // Navigate to the cart to check items
        cy.get('[data-block="minicart"]').click();
  
        productIndexes.forEach((productIndex) => {
          cy.get(".minicart-items-wrapper").within(() => {
            cy.get(".product-item-name").should("contain", data.products[productIndex].name);
            // Verify the quantity of the product
            cy.get(".details-qty .item-qty")
              .invoke("val")
              .should("eq", data.products[productIndex].quantity.toString());
          });
        });
        // delete the first product in the cart
        cy.get(".minicart-items-wrapper").within(() => {
          cy.get(".product-item-name").should("contain", data.products[0].name);
          cy.get('.secondary').eq(0).click()
        });
        // confirm deleting
        cy.get('.modal-inner-wrap').should('be.visible')
        cy.get('button').contains('Valider').click()
        // check cart length
        cy.get(".minicart-items-wrapper").should("have.length", 1)
        cy.get(".product-item-name").should("contain", data.products[1].name);
      });
    })
  })
  