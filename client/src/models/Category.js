/**
 * Category Model - Represents a book category
 */
export class Category {
  constructor({
    id,
    name,
    slug,
    image,
    icon,
    description,
    parentId = null,
    isActive = true,
    displayOrder = 0
  }) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.image = image;
    this.icon = icon;
    this.description = description;
    this.parentId = parentId;
    this.isActive = isActive;
    this.displayOrder = displayOrder;
  }

  // Check if category has parent
  hasParent() {
    return this.parentId !== null;
  }

  // Get category URL
  getUrl() {
    return `/categories/${this.slug}`;
  }
}

export default Category;
