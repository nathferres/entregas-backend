const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }

    generateId() {
        if (this.products.length === 0) return 1;
        const maxId = Math.max(...this.products.map(p => p.id));
        return maxId + 1;
    }

    addProduct(product) {
        const newProduct = {
            id: this.generateId(),
            ...product
        };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id) || null;
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) return null;

        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
        this.saveProducts();
        return this.products[productIndex];
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) return false;

        this.products.splice(productIndex, 1);
        this.saveProducts();
        return true;
    }
}

module.exports = ProductManager;
