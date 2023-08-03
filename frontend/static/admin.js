async function loadStuff(api) {
  const req = await fetch(api);
  const res = await req.json();
  return res;
}

function addEl(parent, type, atr1, atr1Name, atr2, atr2Name, atr3, atr3Name) {
  let el = document.createElement(type);
  if (atr1 != undefined) el.setAttribute(atr1, atr1Name);
  if (atr2 != undefined) el.setAttribute(atr2, atr2Name);
  if (atr3 != undefined) el.setAttribute(atr3, atr3Name);
  if (parent != undefined) parent.appendChild(el);
  return el;
}

const page = window.location.pathname;


if (page === "/api/admin") {
  renderAdminPage();
}

async function renderAdminPage() {
  const body = document.body;
  body.innerHTML = `  <div id="root"></div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
        crossorigin="anonymous" defer ></script>`;
  const root = document.querySelector(`#root`);

  let pizzaList = await loadStuff("/api/pizza");
  let ordersMain = await loadStuff("/api/orders");
  let orders = ordersMain["orderList"];

  adminMain(orders, pizzaList);
}

function adminMain(orders, pizzaList) {
  const adminContent = addEl(root, "div", "id", "admin-order-container");
  orders.map((element) => {
    const list = addEl(adminContent, "div", "class", "admin-pizza-order");
    const orderIDs = addEl(list, "div", "class", "individual-id");
    const contectOverflowControl = addEl(list, "div", "class", "overflow-control");
  
    
    element.pizzas.map((el) => {
      const names = addEl(contectOverflowControl, "div", "class", "actual-commands");
      names.innerHTML = `- ${pizzaList[el.id]["name"]} x ${[el.qty]}`;
    })
    
    const client = addEl(contectOverflowControl, `div`, `class`, `patron`);
    const orderDate = addEl(contectOverflowControl, `div`, `class`, `actual-date`);
    const orderClock = addEl(contectOverflowControl, `div`, `class`, `actual-clock`);
    const orderAddress = addEl(contectOverflowControl, `div`, `class`, `contact-data`);
    const completedButton = addEl(list, `button`, `class`, `complete-button`);
    
    orderIDs.innerHTML = `Order Number: ${element.id}`;
    client.innerHTML = `Client: ${element["customer"]["name"]}`;
    orderDate.textContent = `Date: ${element["date"]["day"]}/${element["date"]["month"]}/${element["date"]["year"]}`;
    orderClock.innerHTML = `Hour: ${element["date"]["hour"]}:${element["date"]["minute"]}`;
    orderAddress.innerHTML = `Address: ${element["customer"]["fullAddress"]}`;
    completedButton.innerHTML = `Complete Order`;

    const delPack = { id: element.id };
    completedButton.addEventListener("click", () => {
      setTimeout(() => {
        fetch("/api/delete/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(delPack),
        }).catch((error) => {
          console.error("Error:", error);
        });
      }, Math.floor(Math.random() * 1000));
      list.remove();
    });
  });
}