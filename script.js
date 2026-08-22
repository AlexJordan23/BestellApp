let items = [
    {
        "Kategorie": "Burger",
        "Gericht": "Veggie mushroom black burger",
        "Zutaten": "Mixed green salad, Tomatoes, Edamame, Mushrooms",
        "Preis": "16,90€",
        "Bild": "./assets/bilder/pictures/iloveimg-compressed/veggiemushroomblackburger.jpg"
    },

    {
        "Kategorie": "Burger",
        "Gericht": "All meat burger",
        "Zutaten": "Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ souce",
        "Preis": "15,90€",
        "Bild": "./assets/bilder/pictures/iloveimg-compressed/allmeatburger.jpg",
    },

    {
        "Kategorie": "Burger",
        "Gericht": "Beef red Burger",
        "Zutaten": "Beef, Cheese, Tomatoes, Lettuce, Onion",
        "Preis": "14,90€",
        "Bild": "./assets/bilder/pictures/iloveimg-compressed/beefredburger.jpg",
    },

    {
        "Kategorie": "Burger",
        "Gericht": "Blg chicken burger",
        "Zutaten": "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell pepper",
        "Preis": "15,90€",
        "Bild": "./assets/bilder/pictures/iloveimg-compressed/blgchickenburger.jpg",
    },

    {
        "Kategorie": "Pizza",
        "Gericht": "Pizza Margherita",
        "Zutaten": "Tomato Sauce, Mozzarella",
        "Preis": "11,90€",
        "Bild": "./assets/bilder/pictures/iloveimg-compressed/pizzamargehrita.jpg",
    },

    {
        "Kategorie": "Pizza",
        "Gericht": "Pizza Chorizo",
        "Zutaten": "Tomato slices, Mozzerella, Chorizo",
        "Preis": "13,90€",
        "Bild": "./assets/bilder/pictures/iloveimg-compressed/pizzachorizo.jpg",
    },

    {
        "Kategorie": "Pizza",
        "Gericht": "Funghi",
        "Zutaten": "Red onion, Olives, Button Mushrooms",
        "Preis": "12,90€",
        "Bild": "./assets/bilder/pictures/iloveimg-compressed/funghi.jpg",
    },

    {
        "Kategorie": "Pizza",
        "Gericht": "Quattro Formaggi with Chicken",
        "Zutaten": "Chicken, Mozzeralla, Gorganzola, Fontina, Parmigiano Reggiano",
        "Preis": "15,90€",
        "Bild": "./assets/bilder/pictures/iloveimg-compressed/quattroformaggiwithchicken.jpg",
    },

    {
        "Kategorie": "Salad",
        "Gericht": "Warm beef arugula salad",
        "Zutaten": "Beef, Arugula, Field salad, Greek feta, Cherry tomatoes, Sun-dried Tomatoes, Balsamic-vinegar dressing",
        "Preis": "16,90€",
        "Bild": "./assets/bilder/pictures/iloveimg-compressed/warmbeefarugulasalad.jpg",
    },

    {
        "Kategorie": "Salad",
        "Gericht": "Mini green Salad",
        "Zutaten": "Green salad, Cucumber, Carrots, Parsley, Radishes, cherry tomatoes",
        "Preis": "10,90€",
        "Bild": "./assets/bilder/pictures/iloveimg-compressed/minigreensalad.jpg",
    },

    {
        "Kategorie": "Salad",
        "Gericht": "Green Salad with sea food",
        "Zutaten": "Mixed greens, Cherry tomatoes, Red onion, Mussels, Squid rings, Shrimp, Dijon mustard-lemon dressing with dill",
        "Preis": "16,90€",
        "Bild": "./assets/bilder/pictures/iloveimg-compressed/greensaladwithseafood.jpg",
    },

    {
        "Kategorie": "Salad",
        "Gericht": "Vegan green salad with tofu",
        "Zutaten": "Green salad, Cherry tomatoes, Cucumber, Baby spinach, Edamame, Radishes, Bittercress, Tofu, Peanuts",
        "Preis": "14,90€",
        "Bild": "./assets/bilder/pictures/iloveimg-compressed/vegangreensaladwithtufo.jpg",
    },
]

let basket = [];





function getPriceAsNumber(priceString) {
    return parseFloat(priceString.replace(',', '.').replace('€', '').trim());
}

function getItemTemplate(indexItem) {

    return `
    
        <div class="item-card">
            ${items[indexItem].Bild ?
            `<img class="item-img" src="${items[indexItem].Bild}">`
            : ""}
            <div class="item-info">
                    <h2 class="item-name">${items[indexItem].Gericht}</h2>
                    <p class="item-zutaten">${items[indexItem].Zutaten}</p>
            </div>
            <div class="item-preis">
                    <span class="item-price">${items[indexItem].Preis}</span>
                    <button class="addtobasket" id="add-to-basket" onclick="addToBasket(${indexItem}, this)">Add to basket</button>
            </div>
        </div>
            <div>
            
    `;
}






function renderItem() {
    let burgerbox = document.getElementById('burger_box')
    burgerbox.innerHTML = "";
    let pizzabox = document.getElementById('pizza_box')
    pizzabox.innerHTML = "";
    let saladbox = document.getElementById('salad_box')
    saladbox.innerHTML = "";
    for (let indexItem = 0; indexItem < items.length; indexItem++) {
        if (items[indexItem].Kategorie === "Pizza") {
            pizzabox.innerHTML += getItemTemplate(indexItem);
        }
        else if (items[indexItem].Kategorie === "Burger") {
            burgerbox.innerHTML += getItemTemplate(indexItem);
        }
        else if (items[indexItem].Kategorie === "Salad") {
            saladbox.innerHTML += getItemTemplate(indexItem);
        }
    }
    renderBasket();
}

function addToBasket(index, button) {
    let item = items[index]
    let existingitem = basket.find(b => b.name === item.Gericht);


    if (existingitem) {
        existingitem.amount++;
    } else {
        basket.push({
            name: item.Gericht,
            price: getPriceAsNumber(item.Preis),
            amount: 1
        });
    }

    button.innerText = "Added 1";
    renderBasket();


}



function changeAmount(index, delta) {
    basket[index].amount += delta;
   
    if (basket[index].amount <= 0) {
        basket.splice(index, 1);
    }

    renderBasket();
}


function renderBasket() {
    let basketcontainer = document.getElementById('basket_wrapper');
    // Den neuen Container für das Dialog-Fenster (Mobile) holen
    let basketcontainerDialog = document.getElementById('basket_wrapper_dialog');

    let html = ''; // Wir speichern das HTML hier zwischen

    if (basket.length === 0) {
        html = `
            <div id="basket_orange">
                <h2 class="basket_ueberschrift">Your Basket</h2>
                <p class="basket_ueberschrift">Nothing here yet. Go ahead and choose something delicious!</p>
                <img class="twopng" src="./assets/bilder/pictures/shopping_cart.svg" alt="basket is empty">
            </div>
            `;
    } else {
        html = `<h2 class="basket_ueberschrift">Your Basket</h2>`
        let subtotal = 0;

        html += `
            <div class="basket-items">
        `;

        for (let i = 0; i < basket.length; i++) {
            let item = basket[i];
            let totalItemPrice = item.price * item.amount;
            subtotal += totalItemPrice;

            html += `
            <div class="dishes_basket_container">
                <p class="h2blackburger">${item.name}</p>
                <div class="betweenbox">
                    <div id="Basket Orange" class="amountbox">
                        <button onclick="changeAmount(${i}, -1)" class="delete-itembutton">
                            <svg width="24" height="24" viewBox="0 0 24 24"xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="5" fill="transparent"/>
                                <path class="deletepath" d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17ZM14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17Z" />
                            </svg>
                        </button>
                        <p class="amount">${item.amount}</p>
                        <button onclick="changeAmount(${i}, 1)" class="delete-itembutton">
                            <svg width="12" height="13" viewBox="0 0 12 13" xmlns="http://www.w3.org/2000/svg">
                                <path class="deletepath" d="M11.448 7.27204H7.08001V12.72L4.53601 12.624V7.27204H0.192011L1.05202e-05 5.20804H4.53601V3.91006e-05L7.08001 0.0720396V5.20804H11.208L11.448 7.27204Z"/>
                            </svg>
                        </button>
                    </div>
                    <p>${totalItemPrice.toFixed(2).replace('.', ',')} €</p>
                </div>
            </div>
            `
        }

        let deleveryCost = 2.50;
        let total = subtotal + deleveryCost;

        html += `
            <div class="flexboxwrapper">
                <p class="basketschrift">Subtotal</p>
                <p class="basketschrift">${subtotal.toFixed(2).replace('.', ',')} €</p>
            </div>
            <div class="flexbox">
                <p class="basketschrift">Versandkosten</p>
                <p class="basketschrift">${deleveryCost.toFixed(2).replace('.', ',')} €</p>
            </div>
            <div class="flexboxwrapper">
                <p>Total</p>
                <p>${total.toFixed(2).replace('.', ',')} €</p>
            </div>
            <button onclick="openconfirmed()" class="buynowbutton">Buy Now (${total.toFixed(2).replace('.', ',')}) </button>
        `
    }

    // Beide Container mit dem aktualisierten HTML befüllen, sofern sie existieren
    if (basketcontainer) {
        basketcontainer.innerHTML = html;
    }

    if (basketcontainerDialog) {
        basketcontainerDialog.innerHTML = html;
    }
}





function openBasket() {
    const dialogRef = document.getElementById("myDialog");
    dialogRef.showModal();
    dialogRef.classList.add("opened");
    renderItem();
}

function closeBasket() {
    const dialogRef = document.getElementById("myDialog");
    dialogRef.close();
    dialogRef.classList.remove("opened");
}

function openconfirmed() {
    const dialog2Ref = document.getElementById("myDialog2");
    dialog2Ref.showModal();
    dialog2Ref.classList.add("opened");
    
}

function closeconfirmed() {
    const dialog2Ref = document.getElementById("myDialog2");
    dialog2Ref.close();
    dialog2Ref.classList.remove("opened");
}





