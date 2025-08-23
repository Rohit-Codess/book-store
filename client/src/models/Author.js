/**
 * Author Model - Represents an author
 */
export class Author {
  constructor({
    id,
    name,
    bio,
    image,
    birthDate,
    nationality,
    website,
    socialLinks = {},
    isFeatured = false
  }) {
    this.id = id;
    this.name = name;
    this.bio = bio;
    this.image = image;
    this.birthDate = birthDate;
    this.nationality = nationality;
    this.website = website;
    this.socialLinks = socialLinks;
    this.isFeatured = isFeatured;
  }

  // Get author's age
  getAge() {
    if (this.birthDate) {
      const today = new Date();
      const birth = new Date(this.birthDate);
      return today.getFullYear() - birth.getFullYear();
    }
    return null;
  }

  // Get author URL
  getUrl() {
    return `/authors/${this.id}`;
  }
}

export default Author;
