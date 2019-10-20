let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){

}

function updateSubtotal(cost){

    let subtotalHTML = document.querySelector("#currentSubtotal")
    let count = document.querySelector("#currentCount").value
    let newSubtotal = count * cost 

    subtotalHTML.innerHTML = MONEY_SYMBOL + ` ` + newSubtotal
    
}

function showPaymentTypeNotSelected(){

}

function hidePaymentTypeNotSelected(){

}

function showArticles(article){

    let tableContent = ""

    for(let i = 0; i < article.length; i++){

        let currentArticle = article[i];

        tableContent += `
        <tr>
        <td><img src="`+ currentArticle.src + `" width="100" height="100">`+ currentArticle.name + `</td>
        <td><div class="form-group w-25"><input type="number" value="`+ currentArticle.count + `" min="0" class="form-control" id="currentCount"></div></td>
        <td>`+ currentArticle.currency + ` `+ currentArticle.unitCost + `</td>
        <th id="currentSubtotal"> - </th>
        </tr>
        `
        document.querySelector("#articleContainer").innerHTML = tableContent

        let currentCount = document.querySelector("#currentCount")
    
        let articleCost = currentArticle.unitCost
    
        updateSubtotal(articleCost)

        currentCount.addEventListener("change", function(){
            updateSubtotal(articleCost)
        })
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


        }
        

    });

});