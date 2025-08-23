/**
 * Publisher Model - Represents a publisher
 */
export class Publisher {
  constructor({
    id,
    name,
    logo,
    description,
    website,
    establishedYear,
    headquarters,
    isFeatured = false
  }) {
    this.id = id;
    this.name = name;
    this.logo = logo;
    this.description = description;
    this.website = website;
    this.establishedYear = establishedYear;
    this.headquarters = headquarters;
    this.isFeatured = isFeatured;
  }

  // Get publisher URL
  getUrl() {
    return `/publishers/${this.id}`;
  }

  // Get years in business
  getYearsInBusiness() {
    if (this.establishedYear) {
      return new Date().getFullYear() - this.establishedYear;
    }
    return null;
  }
}

export default Publisher;
