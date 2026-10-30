const N = 21;
const premiumLimit = N * 100;

const grid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const sortButton = document.getElementById("sort-btn");
const noProducts = document.getElementById("no-products");
const categoryRadios = document.querySelectorAll('input[name="category"]');
const products = Array.from(grid.querySelectorAll(".product-item"));

let ascending = true;

function getPrice(product) {
    const priceText = product.querySelector(".price").textContent;
    return Number(priceText.replace(/[^0-9.]/g, ""));
}

function getName(product) {
    return product.querySelector(".product-name").textContent.trim().toLowerCase();
}

products.forEach(function(product) {
    const price = getPrice(product);

    if (price > premiumLimit) {
        const label = document.createElement("span");
        label.className = "premium-label";
        label.textContent = "Premium";

        const productInfo = product.querySelector(".product-info");
        productInfo.prepend(label);
    }
});

function filterProducts() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = document.querySelector('input[name="category"]:checked').value;

    let visibleCount = 0;

    products.forEach(function(product) {
        const productName = getName(product);
        const productCategory = product.dataset.category;

        const matchesSearch = productName.includes(searchText);
        const matchesCategory = selectedCategory === "all" || productCategory === selectedCategory;

        product.classList.toggle("search-hidden", !matchesSearch);

        if (matchesSearch && matchesCategory) {
            visibleCount++;
        }
    });

    noProducts.hidden = visibleCount !== 0;
    grid.hidden = visibleCount === 0;
}

searchInput.addEventListener("input", filterProducts);

categoryRadios.forEach(function(radio) {
    radio.addEventListener("change", filterProducts);
});

sortButton.addEventListener("click", function() {
    const sortedProducts = products.slice().sort(function(a, b) {
        const priceA = getPrice(a);
        const priceB = getPrice(b);

        if (ascending) {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    });

    sortedProducts.forEach(function(product) {
        grid.appendChild(product);
    });

    if (ascending) {
        sortButton.textContent = "Price: Low to High ↑";
    } else {
        sortButton.textContent = "Price: High to Low ↓";
    }

    ascending = !ascending;
    filterProducts();
});

filterProducts();
