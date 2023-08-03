
async function loadStuff(api) {
  const req = await fetch(api);
  const res = await req.json();
  return res;
};

function addEl(parent, type, atr1, atr1Name, atr2, atr2Name, atr3, atr3Name) {
  let el = document.createElement(type);
  if (atr1 != undefined) el.setAttribute(atr1, atr1Name);
  if (atr2 != undefined) el.setAttribute(atr2, atr2Name);
  if (atr3 != undefined) el.setAttribute(atr3, atr3Name);
  if (parent != undefined) parent.appendChild(el);
  return el;
};

const page = window.location.pathname 
console.log(page);

if (page === "/api/main"){
  renderUserPage()
}

async function renderUserPage(){

  let pizzaList = await loadStuff("/api/pizza");
  let allergenList = await loadStuff("/api/allergen");
  
  let pizzas = [];
  
  console.log(pizzaList, allergenList);
  
  const root = document.querySelector("#root")
  const modal = addEl(root, "div", "id", "modal-element", "class", "modal")
  const modalBody = addEl(modal, "div", "id", "order-basket");
  
  const header = addEl(root, "div", "id", "header");
  const pageTitle = addEl(header, "div", "class", "pageTitle");
  const divButton = addEl(header, "div", "class", "btn-contain")
  const openBasket = addEl(divButton, "button", "id", "basket-button");
  const basketQty = addEl(divButton, "div", "class", "basket-qty");


  
  openBasket.innerHTML = `Buy now <svg id="cart-svg" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg>`;
  openBasket.addEventListener("click", () => {
    showBasketContent();
  })
  
  const pizzaListContainer = addEl(root, "div", "id", "pizza-list-container")
  
  pizzaList.map((element, index) => {
  
    pizzas.push({
      "id": element.id,
      "qty": 0,
      "price": element.price
    })
  
    const pizzaDiv = addEl(pizzaListContainer, "section", "class", "individual-pizza-box")
    const pizzaDivImage = addEl(pizzaDiv, "img", "src", `${element.url}`, "class", "pizza-image", "loading", "lazy")
    const pizzaDivName = addEl(pizzaDiv, "div", "class", "pizza-name")
    pizzaDivName.innerHTML = `${element.name}`
    const pizzaDivIngredients = addEl(pizzaDiv, "div", "class", "pizza-ingredients")
    pizzaDivIngredients.innerHTML = `Ingredients: ${element.ingredients.join(", ")}.`
    const finalPizzaSection = addEl(pizzaDiv, "div", "class", "control-qty")
    const minusBtn = addEl(finalPizzaSection, "div", "id", `minus${element.id}`, "class", "minus item");
    minusBtn.innerHTML = `<svg class="svg" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>`
    const qty = addEl(finalPizzaSection, "div", "id", `curQty${element.id}`, "class", "item");
    const plusBtn = addEl(finalPizzaSection, "div", "id", `plus${element.id}`, "class", "plus item");
    plusBtn.innerHTML = `<svg class="svg" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>`
    const button = addEl(finalPizzaSection, "div", "id", `add${element.id}`, "class", "cart item")
    button.innerHTML = `<svg class="svg" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M21,9h-1.42l-3.712-6.496l-1.736,0.992L17.277,9H6.723l3.146-5.504L8.132,2.504L4.42,9H3C2.688,9,2.395,9.146,2.205,9.393 c-0.189,0.248-0.252,0.57-0.17,0.87l2.799,10.264C5.071,21.395,5.865,22,6.764,22h10.473c0.898,0,1.692-0.605,1.93-1.475 l2.799-10.263c0.082-0.3,0.02-0.622-0.17-0.87C21.605,9.146,21.312,9,21,9z M17.236,20C17.236,20,17.236,20,17.236,20v1V20H6.764 L4.31,11H19.69L17.236,20z"></path><path d="M9 13H11V18H9zM13 13H15V18H13z"></path></svg>`
  
    qty.innerHTML = 1;
    basketQty.innerHTML = 0;
    pageTitle.innerHTML = "Cheesy Misfits Pizzeria";
  
    plusBtn.addEventListener("click", () => {
      let selectQty = Number(qty.innerHTML);
      if (selectQty < 25) {
        selectQty++; 
      }
      qty.innerHTML = selectQty;
    });
  
    minusBtn.addEventListener("click", () => {
      let selectQty = Number(qty.innerHTML);
      if (selectQty > 1) {
        selectQty--;
      }
      qty.innerHTML = selectQty;
    });
  
    button.addEventListener("click", () => {
      // console.log(Number(qty.innerHTML) + ` ${element.name}`);
      pizzas[element.id]["qty"] += Number(qty.innerHTML);
      qty.innerHTML = 1;
      updateCounter(pizzas);
    })
    
    
  
  })
  
  
  window.addEventListener("keypress", (event) => {
    let cartEmpty = true;
    if (event.key == "Enter") {
      pizzas.forEach(element => {
        if (element["qty"]) {
          console.log(element);
          cartEmpty = false;
        }
      })
    }
    if (cartEmpty) {
      console.log(`We aint got it, chief! Cart empty`)
    }
  })
  
  function showBasketContent() {
    updateCounter(pizzas);
    let isNotEmpty = false;
    modal.style.display = "none";
    modalBody.innerHTML = "";
    const orderContent = addEl(modalBody, "div", "class", "order-content");
    let priceDisplay = 0;
    pizzas.forEach((element, index) => {
      if (element.qty) {
        isNotEmpty = true;
        modal.style.display = "block";
        const individualItemBox = addEl(orderContent, "div", "class", "order-box");
  
        const individualItemPictureDiv = addEl(individualItemBox, "div", "class", "pizza-image-basket-div",);
        const individualItemPicture = addEl(individualItemPictureDiv, "img", "src", `${pizzaList[index].url}`, "class", "pizza-image-basket", "loading", "lazy");
        const individualItem = addEl(individualItemBox, "div", "class", "order-item");
  
        const pizzaType = addEl(individualItem, "div", "class", "pizza-type-basket");
        const cartControl = addEl(individualItem, "div", "class", "cart-control");
        const minusCart = addEl(cartControl, "div", "class", "minus-cart");
        const cartQty = addEl(cartControl, "div", "class", "qtyId");
        const plusCart = addEl(cartControl, "div", "class", "plus-cart");
        const price = addEl(individualItem, "div", "class", "pizza-price");
        pizzaType.innerHTML = `${pizzaList[index].name}`;
        plusCart.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>`;
        cartQty.innerHTML = `QTY: ${element.qty}`;
        minusCart.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>`;
        price.innerHTML = `${element.price * element.qty} RON`
        priceDisplay += element.price * element.qty;
  
        plusCart.addEventListener("click", () => {
          pizzas[index]["qty"] += 1;
          showBasketContent();
        });
        minusCart.addEventListener("click", () => {
          pizzas[index]["qty"] -= 1;
          showBasketContent();
        });
      };
    });

    const totalPrice = addEl(orderContent, "div", "class", "total-price");
    totalPrice.innerHTML = `Total Price: ${priceDisplay}`
  
  // Create the input 
  const inputCollection = addEl(orderContent, "div", "class", "data-col");
  
  // Create input fields for name, surname, email address, phone number, and address
  const nameInput = addEl(inputCollection, "input", "type", "text", "placeholder", "Name");
  const surnameInput = addEl(inputCollection, "input", "type", "text", "placeholder", "Surname");
  const emailInput = addEl(inputCollection, "input", "type", "email", "placeholder", "Email Address");
  const phoneNumberInput = addEl(inputCollection, "input", "type", "number", "placeholder", "Phone Number");
  const adressInput = addEl(inputCollection, "input", "type", "text", "placeholder", "Address");
        window.addEventListener("keyup", (event) => {
          if (event.key === "Escape") {
            modal.style.display = "none";
            orderContent.innerHTML = "";
          }
        });
    
        if (isNotEmpty) {
          const sendOrder = addEl(orderContent, "div", "class", "send-order");
          sendOrder.innerHTML = "Order";
          sendOrder.addEventListener("click", () => {
  
            if (nameInput.value.length > 0 && surnameInput.value.length > 0 && phoneNumberInput.value.length > 0 && emailInput.value.length > 0 && adressInput.value.length > 0) {
              const order = [];
              pizzas.forEach((element) => {
                if (element.qty) {
                  order.push({... element, price: element.qty * element.price});
                  element.qty = 0;
                }
              });
              console.log(order);
              modal.style.display = "none";
    
              const customer = createCustomer(`${nameInput.value + ' ' + surnameInput.value}`, `${phoneNumberInput.value}`, `${emailInput.value}`, `${adressInput.value}`)
              const orderPackage = sendOrderData(order, customer);
              basketQty.innerHTML = 0;
    
              fetch("/api/data", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(orderPackage),
              })
                .then(response => response.json())
                .then(responseData => {
                  console.log(responseData);
                })
                .catch(error => {
                  console.error("Error:", error);
                });
            }
  
  
          });
  
        }
  }
  
  function sendOrderData(pizzas, completeCustomer){
    const fullDate = new Date()
    return {
      "id": generateInteger(),
      "pizzas": pizzas,
      "date": {
        "year": fullDate.getFullYear(),
        "month": fullDate.getMonth() + 1,
        "day": fullDate.getDate(),
        "hour": fullDate.getHours(),
        "minute": fullDate.getMinutes(),
      },
      "customer": {
        ...completeCustomer
      },
  
    }
  }
  
  function createCustomer(fullName,phone,email,address){
   return {
      "name": fullName,
      "phone": phone,
      "email": email,
      "fullAddress": address,
    }
  }

  function updateCounter() {
    let initial = 0;
    pizzas.forEach((element) => {
      if (element.qty) {
        initial += element.qty;
      }
    });

    basketQty.innerHTML = initial;
  }

}

function generateInteger() {
  const currentDate = new Date();
  const timeValue = Math.floor(currentDate.getTime()%5);
  const randomValue = Math.floor(Math.random() * 10);

  const generatedNumber = timeValue.toString() + randomValue.toString().padStart(2, '0');
  const finalNumber = parseInt(generatedNumber);

  return Math.max(finalNumber, 1);
}


