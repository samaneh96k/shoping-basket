//data
let allProducts = [
    { id: 1, title: ' شکت کلاه دار', price: 255, img: '../Images/market-img/1663584046-mciSjd1g9jIwcWd4.jpg', count: 1 },
    { id: 2, title: ' شلوار جاگر', price: 300, img: '../Images/market-img/1663757482-82n7T1vl3Zro3Q9M.jpg', count: 1 },
    { id: 3, title: ' هودی تدی', price: 349, img: '../Images/market-img/1664704905-GjA0BDfLU1VG8DhO.jpg', count: 1 },
    { id: 4, title: ' کت جین', price: 210, img: '../Images/market-img/1665215065-axMwwcjSK4Wzoj1s.jpg', count: 1 },
    { id: 5, title: 'بلوز بافت', price: 450, img: '../Images/market-img/1665480865-xd2bSLGnuguviUI3.jpg', count: 1 },
    { id: 6, title: 'پافر مموری کلاه دار', price: 120, img: '../Images/market-img/1665482030-op6A1XSLXuRxn3oy.jpg', count: 1 },
    { id: 7, title: 'ست بلوز و شلوار بافت', price: 560, img: '../Images/market-img/1665656556-zAnBoDs6Mdst7GdE.jpg', count: 1 },
    { id: 8, title: 'ست بلوز شلوار', price: 380, img: '../Images/market-img/1665812625-TrRu29JlS4KzEQ3l.jpg', count: 1 },
    { id: 9, title: 'پلیور بافت میشا', price: 470, img: '../Images/market-img/1665816086-Oie6fMRL2KdgwCLQ.jpg', count: 1 },
    { id: 10, title: 'بلوز دورس', price: 359, img: '../Images/market-img/1665901158-teyFepPHHlOjr1RP.jpg', count: 1 },
    { id: 11, title: 'شکت فوتر فشن', price: 279, img: '../Images/market-img/1665904567-hJ8pJKVT2yhIx3dG.jpg', count: 1 },
    { id: 12, title: 'شلوار نیم بگ', price: 199, img: '../Images/market-img/1665909705-zUAtVHFgPFQOyYh5.jpg', count: 1 },
]
//basket array
let userBasket = [];
//Select Elements
let $ = document
const shopItemsContainer = $.querySelector('.shop-items')
const bastekProductsContainer = $.querySelector('.cart-items')
const removeAllProductsBtn = $.querySelector('#remove-all-products')
const cartTotalPriceElem = $.querySelector('.cart-total-price')
//Get All Product and create Elements From Array
function getAllProduct() {
    allProducts.forEach(function (product) {
        let productContainer = $.createElement('div')
        productContainer.classList.add('shop-item')
    
        let productTitleSpan = $.createElement('span')
        productTitleSpan.classList.add('shop-item-title')
        productTitleSpan.innerHTML = product.title
    
        let productImageElem = $.createElement('img')
        productImageElem.classList.add('shop-item-image')
        productImageElem.setAttribute('src', product.img)
    
        let productDetailsContainer = $.createElement('div')
        productDetailsContainer.classList.add('shop-item-details')
    
        let productPriceSpan = $.createElement('span')
        productPriceSpan.innerHTML = product.price + '  تومان' 
        productPriceSpan.classList.add('shop-item-price')
    
        let prodcutAddButton = $.createElement('button')
        prodcutAddButton.innerHTML = 'افزودن به سبد خرید  '
        prodcutAddButton.className = 'btn btn-primary shop-item-button'
        prodcutAddButton.addEventListener('click', function () {
            addProductToBasketArray(product.id)
        })
    
        productDetailsContainer.append( prodcutAddButton,productPriceSpan)
        productContainer.append( productImageElem,productTitleSpan, productDetailsContainer)
        shopItemsContainer.append(productContainer)
    
    })
}
//Get products from basket array
function getBasketItems() {       
    if (localStorage.getItem('basket')) {
        userBasket = JSON.parse(localStorage.getItem('basket'));
        console.log('userBasket local', userBasket)
    }
basketProductsGenerator(userBasket)
calcTotalPrice(userBasket)
}
//add to cart
function addProductToBasketArray(productId) {
    let result = userBasket.find(item => {
      return  item.id === productId
            
      
    });
  
        if (result) {
            alert("It is in your shopping cart")
            
        }
        else {
            let mainProduct = allProducts.find(function (product) {
                return product.id === productId
            })
            userBasket.push(mainProduct)
            localStorage.setItem('basket', JSON.stringify(userBasket));
            basketProductsGenerator(userBasket)
            calcTotalPrice(userBasket)
        }
    

        // Item doesnt exist in cart. Add it, and save.
      
    

    console.log("2",userBasket);
}
//creat basket items
function basketProductsGenerator (userBasketArray) {
    bastekProductsContainer.innerHTML = ''

    userBasketArray.forEach (function (product) {

        let basketProductContainer = $.createElement('div')
        basketProductContainer.classList.add('cart-row')

        let basketProductDetailsContainer = $.createElement('div')
        basketProductDetailsContainer.className = 'cart-item cart-column'

        let basketProductImg = $.createElement('img')
        basketProductImg.setAttribute('src', product.img)
        basketProductImg.setAttribute('width', "100")
        basketProductImg.setAttribute('height', "100")
        basketProductImg.classList.add('cart-item-image')

        let basketProductTitleSpan = $.createElement('span')
        basketProductTitleSpan.classList.add('cart-item-title')
        basketProductTitleSpan.innerHTML = product.title

        basketProductDetailsContainer.append(basketProductImg, basketProductTitleSpan)

        let basketProductPriceSpan = $.createElement('span')
        basketProductPriceSpan.className = 'cart-price cart-column'
        basketProductPriceSpan.innerHTML = product.price + "  تومان  ";

        let basketProductInputsContainer = $.createElement('div')
        basketProductInputsContainer.className = 'cart-quantity cart-column'

        let basketProductInput = $.createElement('input')
        basketProductInput.className = 'cart-quantity-input'
        basketProductInput.value = product.count
        basketProductInput.setAttribute('type', 'number')
        basketProductInput.addEventListener('change', function () {
            updateProductCount(product.id, basketProductInput.value)
        })

        let basketProductRemoveBtn = $.createElement('button')
        basketProductRemoveBtn.className = 'btn btn-danger'
        basketProductRemoveBtn.innerHTML = 'حذف'
        basketProductRemoveBtn.addEventListener('click', function () {
            removeProductFromBasket(product.id)
        })

        basketProductInputsContainer.append(basketProductInput, basketProductRemoveBtn)

        basketProductContainer.append(basketProductDetailsContainer, basketProductPriceSpan, basketProductInputsContainer)

        bastekProductsContainer.append(basketProductContainer)

    })
}
//remove from basket
function removeProductFromBasket(productId) {

    userBasket = userBasket.filter(function (product) {
        return product.id !== productId
    })
  
    

    localStorage.setItem('basket', JSON.stringify(userBasket));
    basketProductsGenerator(userBasket)
    calcTotalPrice(userBasket)
    
    console.log(allProducts)
}
//remove All
removeAllProductsBtn.addEventListener('click', function () {
    userBasket = []
    localStorage.setItem('basket', JSON.stringify(userBasket));
    basketProductsGenerator(userBasket)
    calcTotalPrice(userBasket)

})

function calcTotalPrice (userBasketArray) {
    let totalPriceValue = 0

    userBasketArray.forEach(function (product) {
        totalPriceValue += product.count * product.price
    })

    cartTotalPriceElem.innerHTML = totalPriceValue +" تومان "
}
//updating basket
function updateProductCount(productId, newCount) {
    
    console.log("product id: " + productId + ' new count: ' + newCount);
    let basket = [...userBasket];
    console.log(newCount)
    basket.forEach(function (product) {
        if (product.id === productId &&  parseInt(newCount)>0) {
            product.count = parseInt(newCount);
        } else if (parseInt(newCount) <= 0) {
       
            removeProductFromBasket(productId);
        
        }
    })
    basketProductsGenerator(basket);
    calcTotalPrice(basket);
}
//On Load
getAllProduct();
getBasketItems();