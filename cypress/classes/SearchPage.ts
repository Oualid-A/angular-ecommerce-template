class SearchPage {
  private searchInput = '#autocomplete-0-input';
  private title = '.page-title'

  searchProduct(searchTerm: string) {
    cy.get(this.searchInput).type(`${searchTerm}{enter}`);
    cy.get(this.title).should('contain', searchTerm);
  }
}

export default SearchPage;
