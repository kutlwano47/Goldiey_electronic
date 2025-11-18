

// ---------- DATE & TIME ----------
function updateDateTime(){
  const datetime = document.getElementById('datetime');
  if(datetime){
    const now = new Date();
    datetime.textContent = now.toLocaleString();
  }
}
setInterval(updateDateTime,1000);
updateDateTime();

// ---------- CONTACT FORM VALIDATION ----------
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    let valid = true;

    // Name
    document.getElementById('errName').textContent = name ? '' : 'Name required';
    if(!name) valid = false;

    // Email: must end with @gmail.com
    document.getElementById('errEmail').textContent = email.endsWith('@gmail.com') ? '' : 'Invalid email (must end with @gmail.com)';
    if(!email.endsWith('@gmail.com')) valid = false;

    // Phone: must be exactly 10 digits
    document.getElementById('errPhone').textContent = phone.length === 10 ? '' : 'Invalid cellphone number (must be 10 digits)';
    if(phone.length !== 10) valid = false;

    // Message
    document.getElementById('errMessage').textContent = message ? '' : 'Message required';
    if(!message) valid = false;

    // Success
    if(valid){
      document.getElementById('feedback').textContent = 'Your message has been successfully sent';
      contactForm.reset();
    }
  });
}

// ---------- ORDER FORM VALIDATION ----------
const orderForm = document.getElementById('orderForm');
if(orderForm){
  orderForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const product = document.getElementById('productSelect').value;
    const quantity = document.getElementById('quantity').value.trim();

    let valid = true;

    // Name
    document.getElementById('errCustomerName').textContent = name ? '' : 'Name required';
    if(!name) valid = false;

    // Email must end with @gmail.com
    document.getElementById('errCustomerEmail').textContent = email.endsWith('@gmail.com') ? '' : 'Invalid email (must end with @gmail.com)';
    if(!email.endsWith('@gmail.com')) valid = false;

    // Phone must be exactly 10 digits
    document.getElementById('errCustomerPhone').textContent = phone.length === 10 ? '' : 'Invalid cellphone number (must be 10 digits)';
    if(phone.length !== 10) valid = false;

    // Product
    document.getElementById('errProductSelect').textContent = product ? '' : 'Please select a product';
    if(!product) valid = false;

    // Quantity
    document.getElementById('errQuantity').textContent = quantity>0 ? '' : 'Quantity must be at least 1';
    if(quantity <= 0) valid = false;

    // Success
    if(valid){
      document.getElementById('orderFeedback').textContent = 'Your order has been successfully submitted. You will receive an email';
      orderForm.reset();
    }
  });
}

// ---------- PRODUCTS PAGE FUNCTIONALITY ----------
const searchInput = document.getElementById('productSearch');
const categorySelect = document.getElementById('categoryFilter');
const productCards = document.querySelectorAll('.product-card');

function filterProducts(){
  const search = searchInput ? searchInput.value.toLowerCase() : '';
  const category = categorySelect ? categorySelect.value : 'all';

  productCards.forEach(card => {
    const name = card.querySelector('h4').textContent.toLowerCase();
    const cardCategory = card.dataset.category;

    let show = true;
    if(search && !name.includes(search)) show = false;
    if(category !== 'all' && cardCategory !== category) show = false;

    card.style.display = show ? 'block' : 'none';
  });
}

if(searchInput) searchInput.addEventListener('input', filterProducts);
if(categorySelect) categorySelect.addEventListener('change', filterProducts);

// ---------- ACCORDION ----------
const accordions = document.querySelectorAll('.accordion-btn');
accordions.forEach(btn => {
  btn.addEventListener('click', ()=>{
    const panel = document.getElementById(btn.dataset.target);
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  });
});

// ---------- BRAND FILTER ----------
const brandButtons = document.querySelectorAll('.brand-btn');
brandButtons.forEach(btn => {
  btn.addEventListener('click', ()=>{
    const brand = btn.dataset.brand;
    const parentPanel = btn.closest('.panel');
    const cards = parentPanel.querySelectorAll('.product-card');
    cards.forEach(card => {
      card.style.display = card.dataset.brand === brand ? 'block' : 'none';
    });
  });
});

// ---------- LIGHTBOX ----------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const viewButtons = document.querySelectorAll('.view-image');
const closeLightbox = document.getElementById('closeLightbox');

viewButtons.forEach(btn => {
  btn.addEventListener('click', ()=>{
    const card = btn.closest('.product-card');
    lightboxImg.src = card.querySelector('img').src;
    lightboxCaption.textContent = card.querySelector('h4').textContent;
    lightbox.style.display = 'flex';
  });
});

if(closeLightbox){
  closeLightbox.addEventListener('click', ()=>{
    lightbox.style.display = 'none';
  });
}
// FULLSCREEN LIGHTBOX JS
const lightboxFull = document.getElementById("lightboxFull");
const lbFullImg = document.getElementById("lbFullImg");
const lbFullCaption = document.getElementById("lbFullCaption");
const lbFullClose = document.getElementById("lbFullClose");

// open fullscreen viewer
document.querySelectorAll(".view-image").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".product-card");
        const img = card.querySelector("img");

        lbFullImg.src = img.src;
        lbFullCaption.textContent = card.querySelector("h4").textContent;
        lightboxFull.style.display = "flex";
        lightboxFull.setAttribute("aria-hidden", "false");
    });
});

// close viewer
function closeFullLightbox() {
    lightboxFull.style.display = "none";
    lbFullImg.src = "";
}

lbFullClose.addEventListener("click", closeFullLightbox);

lightboxFull.addEventListener("click", e => {
    if (e.target === lightboxFull) closeFullLightbox();
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeFullLightbox();
});

