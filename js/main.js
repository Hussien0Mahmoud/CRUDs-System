
const  productNameInput=document.getElementById('productNameInput')
const  productCategoryInput=document.getElementById('productCategoryInput')
const  productPriceInput=document.getElementById('productPriceInput')
const  productDiscountInput=document.getElementById('productDiscountInput')
const  productQuantityInput=document.getElementById('productQuantityInput')
const  productDescriptionInput=document.getElementById('productDescriptionInput')
const  addProductBtn=document.getElementById('addProductBtn')
const  updateProductBtn=document.getElementById('updateProductBtn')
const searchInput=document.getElementById('searchInput')

let productContainer=[]

// function to display data from local storage

if (localStorage.getItem('products')) {
    productContainer= JSON.parse(localStorage.getItem('products'))
    displayProduct()
}

// function to Add Product to Local Storage
function addProduct(){
    if(checkProductName()){
        const product={
            name:productNameInput.value,
            category:productCategoryInput.value,
            price:productPriceInput.value,
            discount:productDiscountInput.value,
            qyuantity:productQuantityInput.value,
            description:productDescriptionInput.value,
        }
        productContainer.push(product)
        console.log(productContainer)
        localStorage.setItem('products',JSON.stringify(productContainer))
        displayProduct()
        clearInputs()
    }else{
        alert("Sorry, enter name more than 4 letters")
    }
}

addProductBtn.addEventListener("click",addProduct)

// Function to Display Product

function displayProduct(){
    let data=``;
    for (let i = 0; i < productContainer.length; i++) {
        data+=`
        <tr>
            <th>${productContainer[i].name} </th>
            <th>${productContainer[i].category} </th>
            <th>${productContainer[i].price} </th>
            <th>${productContainer[i].discount} </th>
            <th>${productContainer[i].qyuantity} </th>
            <th>${productContainer[i].description} </th>
            <th><button onclick='setForm(${i})'  class="fas fa-pen-to-square btn btn-success"></th>
            <th><button onclick='deleteProduct(${i})' class="fas fa-xmark btn btn-danger"></th>
        </tr>
        `
        document.getElementById('showData').innerHTML=data
    }
}


// Remove Product
function deleteProduct(productIndex){
    productContainer.splice(productIndex,1)
    localStorage.setItem('products',JSON.stringify(productContainer))
    displayProduct()
    // console.log(`delete ${productIndex}`)
}


//Clear Data from inputs 
function clearInputs(){
    productNameInput.value=''
    productCategoryInput.value=''
    productPriceInput.value=''
    productDiscountInput.value=''
    productQuantityInput.value=''
    productDescriptionInput.value=''
}

// Search for product
function searchProduct(term){

    let data=``;
    for (let i = 0; i < productContainer.length; i++) {
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase()))
        {
            data+=`
        <tr>
            <th>${productContainer[i].name} </th>
            <th>${productContainer[i].category} </th>
            <th>${productContainer[i].price} </th>
            <th>${productContainer[i].discount} </th>
            <th>${productContainer[i].qyuantity} </th>
            <th>${productContainer[i].description} </th>
            <th><button  class="fas fa-pen-to-square btn btn-success"></th>
            <th><button onclick='deleteProduct(${i})' class="fas fa-xmark btn btn-danger"></th>
        </tr>
        `
        }
        document.getElementById('showData').innerHTML=data
}
}

searchInput.addEventListener('input',()=>{
    searchProduct(searchInput.value)
})


let x=0;
// Set Data
function setForm(productIndex){
    x=productIndex
    // console.log("setForm" + productIndex)
    productNameInput.value=productContainer[productIndex].name;
    productCategoryInput.value=productContainer[productIndex].category;
    productPriceInput.value=productContainer[productIndex].price;
    productDiscountInput.value=productContainer[productIndex].discount;
    productQuantityInput.value=productContainer[productIndex].qyuantity;
    productDescriptionInput.value=productContainer[productIndex].description;
    addProductBtn.classList.add('d-none')
    updateProductBtn.classList.remove('d-none')
}


function updateProduct(){
    console.log(x)
    productContainer[x].name= productNameInput.value
    productContainer[x].category =productCategoryInput.value
    productContainer[x].price= productPriceInput.value
    productContainer[x].discount = productDiscountInput.value
    productContainer[x].qyuantity = productQuantityInput.value
    productContainer[x].description = productDescriptionInput.value

    addProductBtn.classList.remove('d-none')
    updateProductBtn.classList.add('d-none')
    localStorage.setItem('products',JSON.stringify(productContainer))
    displayProduct()
    clearInputs()
}

updateProductBtn.addEventListener('click',updateProduct)


// Regex 

function checkProductName(){
    let regx= /^\w{4,15}$/

    if(regx.test(productNameInput.value)){
        return true
    }else{
        false
    }

}

