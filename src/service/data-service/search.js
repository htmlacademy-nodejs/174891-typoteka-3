'use strict';

class SearchService {
  constructor(offers = []) {
    this._offers = offers;
  }

  searchOffers(searchText) {
    return this._offers.filter((offer) => offer.title.includes(searchText));
  }
}

module.exports = SearchService;
