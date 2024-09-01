const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkBtn =document.getElementById("chekout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];
//ABRIR O MODAL DO CARRINHO
cartBtn.addEventListener("click",function(){
    updateCartModal();
    cartModal.style.display = "flex"

})

//FECHAR O MODAL QUANDO CLICA FORA 
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

//FECHAR O MODAL QUANDO CLICAR BTN FECHAR
closeModalBtn.addEventListener("click", function(){
       cartModal.style.display = "none"
}) 

//ADICIONAR ITEM NO CARRINHO
menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        // console.log(name)
        // console.log(price)

        //ADICIONAR NO CARRINHO
        addToCart(name, price)
    }
})

//FUNÇÃO PARA ADICIONAR NO CARRINHO
function addToCart(name, price){
    const exiteitem = cart.find(item => item.name === name)

    if(exiteitem){
        exiteitem.quantity += 1;
    }else{
        cart.push({
            name,
            price,
            quantity: 1
        })
    }
    
    updateCartModal()

}

//ATUALIZAR CARRINHO

function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;


    cart.forEach(item =>{
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex","justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
        <div>
        <p class="font-medium">${item.name}</p>
        <p>QTD: ${item.quantity}</p>
        <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>

      
        <button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>
       
        
        </div>
        `

        //CALCULO PARA SOMA DO TOTAL
        total += item.price * item.quantity
        cartItemsContainer.appendChild(cartItemElement)
    })

    //SOMAR TOTAL
    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerText = cart.length;
}

//FUNÇÃO PARA REMOVER O ITEM DO CARRINHO

cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name)
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();

    }
}

