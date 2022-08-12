//cart//---->
let carts = document.querySelectorAll('.add-cart')
let products = [
    {
        name: 'Chocolate',
        tag: 'ChocolateDoughnut',
        price: 15,
        inCart: 0
    },
    {
        name: 'Coconut',
        tag: 'CoconutDoughnut',
        price: 5,
        inCart: 0
    },
    {
        name: 'Strawberry',
        tag: 'StrawberryDoughnut',
        price: 2,
        inCart: 0
    },
    {
        name: 'Candy',
        tag: 'CandyDoughnut',
        price: 20,
        inCart: 0
    },
    {
        name: 'Sprinkle',
        tag: 'SprinkleDoughnut',
        price: 40,
        inCart: 0
    },
    {
        name: 'KitKat',
        tag: 'KitKatDoughnut',
        price: 40,
        inCart: 0
    }
];
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');


    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price)
    }
    else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <div class="product">
                    <ion-icon name="close-circle"></ion-icon>
                    <img src="./images/${item.tag}.jpg"></img>
                    <span>${item.name}</span>
                    <div class="price">$${item.price},00</div>
                    <div class="quantity">
                    <ion-icon id="p2button" class="decrease" name="caret-back-circle-outline"></ion-icon>
                    <span id="number">${item.inCart}</span>
                <ion-icon id="p1button" class="increase" name="caret-forward-circle-outline"></ion-icon>
                </div>
                <div class="total">
                    $${item.inCart * item.price},00
                </div>
                </div>
                `;
        });
        productContainer.innerHTML += `
            <div class="basketTotalContainer>
                <h2 class ="basketTotalTitle" style  = "padding-left:510px">
                    Basket Total
                </h2>
                $${cartCost},00
            </div>
        `;
    }

}
onLoadCartNumbers();
displayCart();
const p1button = document.querySelector('#p1button');
const p2button = document.querySelector('#p2button');
const number = document.querySelector('#number')
let p1price = 0;
let p2price = 0;
p1button.addEventListener('click', function () {
    p1price += 1;
    number.textContent = p1price;
})
p2button.addEventListener('click', function () {
    p2price -= 0;
    number.textContent = p2price;
})
p1button.addEventListener('click', function () {
    if (p1price == 7) {
        alert("You are over your limit !! LESS SUGAR MORE ENJOYMENT")
    }
})