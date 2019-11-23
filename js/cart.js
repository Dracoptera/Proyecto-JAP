let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";
let SUCCESS = "¡Has completado la compra!"

let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){

    let boxSubtotal = document.querySelector("#boxSubtotal")
    let boxShipping = document.querySelector("#boxShipping")
    let boxTotal = document.querySelector("#boxTotal")

    let currentQuantity = document.querySelector("#currentCount").value
    subtotal = productUnitCost * currentQuantity
    let shippingCost = Math.floor(subtotal * shippingPercentage)
    total = Math.floor(subtotal + shippingCost)

    boxSubtotal.innerHTML = `${MONEY_SYMBOL} ${subtotal}`
    boxShipping.innerHTML = `${MONEY_SYMBOL} ${shippingCost}`
    boxTotal.innerHTML = `${MONEY_SYMBOL} ${total}`

}

function updateSubtotal(cost){

    let subtotalHTML = document.querySelector("#currentSubtotal")
    let count = document.querySelector("#currentCount").value
    subtotal = count * cost

    subtotalHTML.innerHTML = `${MONEY_SYMBOL} ${subtotal}`
    
}

function hideCreditCardPaymentType(){
    document.querySelector("#creditCardNumber").disabled = true
    document.querySelector("#creditCardSecurityCode").disabled = true
    document.querySelector("#expMonth").disabled = true 
    document.querySelector("#expYear").disabled = true 

    document.querySelector("#bankAccountNumber").disabled = false

}

function hideBankPaymentType(){

    document.querySelector("#bankAccountNumber").disabled = true

    document.querySelector("#creditCardNumber").disabled = false 
    document.querySelector("#creditCardSecurityCode").disabled = false
    document.querySelector("#expMonth").disabled = false 
    document.querySelector("#expYear").disabled = false 


}

function showArticles(article){

    let tableContent = ""

    for(let i = 0; i < article.length; i++){

        let currentArticle = article[i];

        tableContent += `
        <tr>
        <td><img src="${currentArticle.src}" width="100" height="100">${currentArticle.name}</td>
        <td><div class="form-group w-25"><input type="number" value="${currentArticle.count}" min="0" class="form-control" id="currentCount"></div></td>
        <td>${currentArticle.currency} ${currentArticle.unitCost}</td>
        <th id="currentSubtotal"> - </th>
        </tr>
        `
        document.querySelector("#articleContainer").innerHTML = tableContent

        let currentCount = document.querySelector("#currentCount")
    
        productUnitCost = currentArticle.unitCost
    
        updateSubtotal(productUnitCost)

        currentCount.addEventListener("change", function(){
            updateSubtotal(productUnitCost)
            updateTotalCosts()
        })
    }

}

function validateSubmit() {
    let cardNumber = document.querySelector("#creditCardNumber")
    let cvv = document.querySelector("#creditCardSecurityCode")
    let month = document.querySelector("#expMonth").value
    let year = document.querySelector("#expYear").value
    let bank = document.querySelector("#bankAccountNumber")
    let ccLength = 16
    let bankLength = 15
    let dateF = `${year}, ${month}`
    dateF = new Date(dateF)
    let today = new Date()

    if ((cardNumber !== "" && cardNumber.value.length === ccLength) && (cvv.value !== "" && cvv.value.length >= 3) && (dateF > today)) {
         paymentTypeSelected = true
         alert(SUCCESS)
     }



}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
             cart = resultObj.data;

            // Añadir items al carrito
            showArticles(cart.articles)
            updateSubtotal(productUnitCost)
            updateTotalCosts()
        }
        
        // Actualizar costos de envío en tiempo real
        document.querySelector("#premiumRadio").addEventListener("change", function(){
            shippingPercentage = 0.15
            updateTotalCosts()
        })
        document.querySelector("#expressRadio").addEventListener("change", function(){
            shippingPercentage = 0.07
            updateTotalCosts()
        })
        document.querySelector("#standardRadio").addEventListener("change", function(){
            shippingPercentage = 0.05
            updateTotalCosts()
        })


        document.querySelector("#purchaseBtn").addEventListener("click", function(){
            validateSubmit()
        })

    });

});