/* ShopEase shared JavaScript: product catalogue, filters, cart, theme and forms. */
"use strict";
const PRODUCTS = [
{
    id:1,name:"Classic White Sneakers",category:"Footwear",price:1299,oldPrice:1799,rating:4.8,reviews:124,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",badge:"Best seller",description:"Everyday sneakers designed for comfort, versatility and a clean, timeless look. A cushioned insole and durable sole make them easy to wear all day."
}
,
{
    id:2,name:"Smart Fitness Watch",category:"Electronics",price:2499,oldPrice:3299,rating:4.6,reviews:89,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",badge:"Popular",description:"Track your daily activity, check notifications and keep your routine on track with this sleek everyday smart watch."
}
,
{
    id:3,name:"Everyday Leather Tote",category:"Fashion",price:1899,oldPrice:2499,rating:4.7,reviews:76,image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=85",badge:"New",description:"A versatile tote with a spacious interior and a polished finish. Ideal for work, errands and weekend plans."
}
,
{
    id:4,name:"Wireless Headphones",category:"Electronics",price:3299,oldPrice:3999,rating:4.5,reviews:103,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",badge:"Top rated",description:"Enjoy your playlists and podcasts with comfortable over-ear padding, clear sound and a minimal design."
}
,
{
    id:5,name:"Minimal Desk Laptop",category:"Electronics",price:4599,oldPrice:5299,rating:4.4,reviews:48,image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85",badge:"Great value",description:"A practical laptop for everyday productivity, study sessions and browsing. Lightweight design fits into a busy routine."
}
,
{
    id:6,name:"Soft Knit Sweater",category:"Fashion",price:1499,oldPrice:1999,rating:4.7,reviews:67,image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85",badge:"Trending",description:"A soft knit layer with an easy fit. Pair it with your favourite jeans for a comfortable everyday outfit."
}
,
{
    id:7,name:"Everyday Backpack",category:"Accessories",price:999,oldPrice:1399,rating:4.5,reviews:55,image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",badge:"Value pick",description:"A roomy, functional backpack with space for everyday essentials, ideal for commuting, campus and short trips."
}
,
{
    id:8,name:"Sport Running Shoes",category:"Footwear",price:2199,oldPrice:2799,rating:4.8,reviews:112,image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=700&q=85",badge:"Best seller",description:"Lightweight running shoes with a supportive feel for walks, workouts and everyday movement."
}
,
{
    id:9,name:"Classic Sunglasses",category:"Accessories",price:799,oldPrice:1099,rating:4.3,reviews:41,image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",badge:"Sale",description:"A classic frame shape that adds an effortless finishing touch to casual and smart-casual looks."
}
,
{
    id:10,name:"Everyday Wrist Watch",category:"Accessories",price:1599,oldPrice:2199,rating:4.6,reviews:92,image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85",badge:"Popular",description:"A refined everyday watch with a clean dial and versatile design that works from weekdays to weekends."
}
,
{
    id:11,name:"Canvas Casual Shoes",category:"Footwear",price:1199,oldPrice:1599,rating:4.4,reviews:38,image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=85",badge:"Easy style",description:"Comfortable canvas shoes for relaxed days, with a simple silhouette that's easy to pair with anything."
}
,
{
    id:12,name:"Compact Camera",category:"Electronics",price:6999,oldPrice:7999,rating:4.5,reviews:29,image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=85",badge:"Creator pick",description:"A compact camera option for capturing travel, family moments and creative projects."
}
];
const CART_KEY = "shopease-cart";
const THEME_KEY = "shopease-theme";
const money = amount => new Intl.NumberFormat("en-IN", {
    style:"currency",currency:"INR",maximumFractionDigits:0
}
).format(amount);
const getProduct = id => PRODUCTS.find(product => product.id === Number(id));
function readCart(){
    try{
        const value=JSON.parse(localStorage.getItem(CART_KEY)||"[]");
        return Array.isArray(value)?value:[]
    }
    catch{
        return []
    }
}
function saveCart(cart){
    localStorage.setItem(CART_KEY,JSON.stringify(cart));
    updateCartCount()
}
function updateCartCount(){
    const count=readCart().reduce((sum,item)=>sum+item.quantity,0);
    document.querySelectorAll(".cart-count").forEach(el=>el.textContent=count)
}
function showToast(message,success=false){
    const old=document.querySelector(".toast");
    if(old)old.remove();
    const toast=document.createElement("div");
    toast.className="toast"+(success?" success":"");
    toast.textContent=message;
    document.body.appendChild(toast);
    setTimeout(()=>toast.remove(),2600)
}
function addToCart(id,quantity=1){
    const product=getProduct(id);
    if(!product)return;
    const cart=readCart();
    const item=cart.find(row=>row.id===product.id);
    if(item)item.quantity+=quantity;
    else cart.push({
        id:product.id,quantity:Math.max(1,quantity)
    }
    );
    saveCart(cart);
    showToast(`${product.name} added to cart`,true)
}
function productCard(product){
    return `<article class="product-card"><a class="product-image" href="product-details.html?id=${product.id}"><img src="${product.image}" alt="${product.name}" loading="lazy"><span class="product-badge">${product.badge}</span></a><div class="product-info"><span class="product-category">${product.category}</span><a class="product-title" href="product-details.html?id=${product.id}">${product.name}</a><div class="rating">★ ${product.rating} <span>(${product.reviews} reviews)</span></div><div class="price-row"><span class="price">${money(product.price)}</span><span class="old-price">${money(product.oldPrice)}</span></div><div class="card-actions"><button class="btn btn-primary" data-add="${product.id}">Add to Cart</button><a class="btn btn-outline" href="product-details.html?id=${product.id}">Details</a></div></div></article>`
}
function renderCards(container,products){
    if(container)container.innerHTML=products.map(productCard).join("")
}
function initProductsPage(){
    const grid=document.querySelector("[data-products]");
    if(!grid)return;
    const search=document.querySelector("#product-search"),range=document.querySelector("#price-range"),priceLabel=document.querySelector("#price-label"),sort=document.querySelector("#sort-products"),count=document.querySelector("#results-count"),empty=document.querySelector("#empty-state");
    let category=new URLSearchParams(location.search).get("category")||"All";
    const allowed=["All","Electronics","Fashion","Accessories","Footwear"];
    if(!allowed.includes(category))category="All";
    function update(){
        let results=PRODUCTS.filter(p=>(category==="All"||p.category===category)&&p.price<=Number(range.value)&&p.name.toLowerCase().includes(search.value.trim().toLowerCase()));
        if(sort.value==="price-low")results.sort((a,b)=>a.price-b.price);
        if(sort.value==="price-high")results.sort((a,b)=>b.price-a.price);
        if(sort.value==="name")results.sort((a,b)=>a.name.localeCompare(b.name));
        renderCards(grid,results);
        count.textContent=`Showing ${results.length} of ${PRODUCTS.length} products`;
        priceLabel.textContent=money(Number(range.value));
        empty.classList.toggle("hidden",results.length!==0);
        document.querySelectorAll("[data-category]").forEach(btn=>btn.classList.toggle("selected",btn.dataset.category===category))
    }
    document.querySelectorAll("[data-category]").forEach(btn=>btn.addEventListener("click",()=>{
        category=btn.dataset.category;
        update()
    }
    ));
    search.addEventListener("input",update);
    range.addEventListener("input",update);
    sort.addEventListener("change",update);
    document.querySelector("#clear-filters")?.addEventListener("click",()=>{
        category="All";
        search.value="";
        range.value=10000;
        sort.value="featured";
        update()
    }
    );
    update()
}
function renderProductDetail(){
    const holder=document.querySelector("#product-detail");
    if(!holder)return;
    const id=new URLSearchParams(location.search).get("id")||"1";
    const product=getProduct(id);
    if(!product){
        holder.innerHTML="<p>Sorry, that product could not be found. <a class='text-link' href='products.html'>Browse products</a></p>";
        return
    }
    document.title=`${product.name} | ShopEase`;
    holder.innerHTML=`<div class="detail-image"><img src="${product.image}" alt="${product.name}"></div><div class="detail-copy"><span class="eyebrow">${product.category}</span><h1>${product.name}</h1><div class="rating">★ ${product.rating} <span>(${product.reviews} reviews)</span></div><div class="price-row"><span class="price">${money(product.price)}</span><span class="old-price">${money(product.oldPrice)}</span></div><p>${product.description}</p><div class="detail-meta"><span>✓ In stock</span><span>↗ Easy returns</span><span>♧ Secure checkout</span></div><p><b>Quantity</b></p><div class="detail-actions"><div class="quantity-control"><button type="button" data-qty-minus aria-label="Decrease quantity">−</button><input id="detail-quantity" type="number" min="1" max="99" value="1" aria-label="Quantity"><button type="button" data-qty-plus aria-label="Increase quantity">+</button></div><button class="btn btn-primary" data-add-detail="${product.id}">Add to Cart</button></div><a class="text-link" href="products.html">← Back to all products</a></div>`;
    const input=document.querySelector("#detail-quantity");
    document.querySelector("[data-qty-minus]").addEventListener("click",()=>input.value=Math.max(1,Number(input.value)-1));
    document.querySelector("[data-qty-plus]").addEventListener("click",()=>input.value=Math.min(99,Number(input.value)+1));
    document.querySelector("[data-add-detail]").addEventListener("click",()=>addToCart(product.id,Math.min(99,Math.max(1,Number(input.value)||1))));
}
function renderCart(){
    const holder=document.querySelector("#cart-content");
    if(!holder)return;
    const cart=readCart().filter(item=>getProduct(item.id));
    if(!cart.length){
        holder.innerHTML=`<section class="cart-items empty-cart"><div class="empty-icon">🛍️</div><h2>Your cart is waiting</h2><p>You haven't added anything yet. Discover something you'll love.</p><a class="btn btn-primary" href="products.html">Explore products →</a></section>`;
        return
    }
    const subtotal=cart.reduce((sum,item)=>sum+getProduct(item.id).price*item.quantity,0),shipping=subtotal>=999?0:99;
    holder.innerHTML=`<section class="cart-items"><h2>Cart Items (${cart.reduce((n,item)=>n+item.quantity,0)})</h2>${cart.map(item=>{const p=getProduct(item.id);return `<article class="cart-item"><a href="product-details.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a><div><h3><a href="product-details.html?id=${p.id}">${
        p.name
    }
    </a></h3><small>${
        p.category
    }
    </small><div class="quantity-control"><button data-cart-minus="${p.id}" aria-label="Decrease quantity">−</button><input value="${item.quantity}" readonly aria-label="Quantity"><button data-cart-plus="${p.id}" aria-label="Increase quantity">+</button></div></div><div class="cart-item-side"><b>${
        money(p.price*item.quantity)
    }
    </b><button class="remove-item" data-remove="${p.id}">Remove</button></div></article>`}).join("")}</section><aside class="order-summary"><h2>Order Summary</h2><div class="summary-line"><span>Subtotal</span><b>${money(subtotal)}</b></div><div class="summary-line"><span>Shipping</span><b>${shipping===0?"FREE":money(shipping)}</b></div>${subtotal<999?`<div class="summary-line"><span>Free shipping</span><span>Above ₹999</span></div>`:""}<div class="summary-line total"><span>Total</span><strong>${money(subtotal+shipping)}</strong></div><button class="btn btn-primary" id="checkout-button">Proceed to Checkout →</button><p class="summary-note">🔒 Secure checkout · Demo website</p></aside>`;
    holder.querySelectorAll("[data-cart-minus]").forEach(btn=>btn.addEventListener("click",()=>changeQuantity(Number(btn.dataset.cartMinus),-1)));
    holder.querySelectorAll("[data-cart-plus]").forEach(btn=>btn.addEventListener("click",()=>changeQuantity(Number(btn.dataset.cartPlus),1)));
    holder.querySelectorAll("[data-remove]").forEach(btn=>btn.addEventListener("click",()=>{
        saveCart(readCart().filter(item=>item.id!==Number(btn.dataset.remove)));
        renderCart();
        showToast("Item removed from cart")
    }
    ));
    holder.querySelector("#checkout-button").addEventListener("click",()=>showToast("Checkout demo: connect a payment provider to accept orders."))
}
function changeQuantity(id,delta){
    const cart=readCart();
    const item=cart.find(row=>row.id===id);
    if(!item)return;
    item.quantity+=delta;
    saveCart(item.quantity<1?cart.filter(row=>row.id!==id):cart);
    renderCart()
}
function applyTheme(){
    document.body.classList.toggle("dark",localStorage.getItem(THEME_KEY)==="dark");
    document.querySelectorAll(".theme-toggle").forEach(btn=>btn.textContent=document.body.classList.contains("dark")?"☀":"☾")
}
function initTheme(){
    applyTheme();
    document.querySelectorAll(".theme-toggle").forEach(btn=>btn.addEventListener("click",()=>{
        localStorage.setItem(THEME_KEY,document.body.classList.contains("dark")?"light":"dark");
        applyTheme()
    }
    ))
}
function initMenu(){
    const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".main-nav");
    if(toggle&&nav)toggle.addEventListener("click",()=>{
        const open=nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded",String(open));
        toggle.textContent=open?"×":"☰"
    }
    )
}
function initForms(){
    document.querySelector("#contact-form")?.addEventListener("submit",event=>{
        event.preventDefault();
        const form=event.currentTarget;
        document.querySelector("#contact-message").textContent="Thanks! Your message has been validated. This demo form is not connected to a mail server.";
        form.reset()
    }
    );
    document.querySelectorAll(".newsletter-form").forEach(form=>form.addEventListener("submit",event=>{
        event.preventDefault();
        showToast("Thanks for subscribing!",true);
        form.reset()
    }
    ))
}
document.addEventListener("click",event=>{
    const button=event.target.closest("[data-add]");
    if(button)addToCart(Number(button.dataset.add))
}
);
document.addEventListener("DOMContentLoaded",()=>{
    document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
    updateCartCount();
    initTheme();
    initMenu();
    initForms();
    renderCards(document.querySelector("[data-featured]"),PRODUCTS.slice(0,4));
    initProductsPage();
    renderProductDetail();
    renderCart()
}
);
