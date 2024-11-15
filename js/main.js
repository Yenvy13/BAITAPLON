 // slide
document.addEventListener('DOMContentLoaded', function () {
  let slideIndex = 0;
  const slides = document.querySelector('.slides');
  const dots = document.querySelectorAll('.dot');

  function showSlide(index) {
      if (index >= dots.length) slideIndex = 0;
      if (index < 0) slideIndex = dots.length - 1;

      slides.style.transform = `translateX(${-slideIndex * 100}%)`;
      
      dots.forEach(dot => dot.classList.remove('active'));
      dots[slideIndex].classList.add('active');
  }

  function moveSlide(step) {
      slideIndex += step;
      showSlide(slideIndex);
  }

  function currentSlide(index) {
      slideIndex = index - 1;
      showSlide(slideIndex);
  }

  setInterval(() => {
      moveSlide(1);
  }, 5000);

  document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
  document.querySelector('.next').addEventListener('click', () => moveSlide(1));

  const sliderThumb = document.getElementById("sliderThumb");
  const sliderTrack = document.querySelector(".slider-track");
  const productList = document.getElementById("productList");

  sliderThumb.onmousedown = function (event) {
    event.preventDefault();

    const trackRect = sliderTrack.getBoundingClientRect();
    const maxLeft = trackRect.width - sliderThumb.offsetWidth;

    function onMouseMove(event) {
        let newLeft = event.clientX - trackRect.left - sliderThumb.offsetWidth / 2;

        if (newLeft < 0) newLeft = 0;
        if (newLeft > maxLeft) newLeft = maxLeft;

        sliderThumb.style.left = newLeft + "px";

        const scrollPercent = newLeft / maxLeft;

        const maxScrollLeft = productList.scrollWidth - productList.clientWidth;
        productList.scrollLeft = scrollPercent * maxScrollLeft;
    }

    document.addEventListener("mousemove", onMouseMove);

    document.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        document.onmouseup = null;
    };
};

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    function addToCart(productElement) {
  const productId = productElement.getAttribute('data-id');
  const productName = productElement.querySelector('h3').innerText;
  const productPrice = productElement.querySelector('.new-price').innerText.replace(/[^\d.-]/g, ''); // Lọc ký tự không phải số
  const productImage = productElement.querySelector('img').src;

  const price = parseFloat(productPrice);

  const product = {
    id: productId,
    name: productName,
    price: price,
    image: productImage
  };

  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName} đã được thêm vào giỏ hàng!`);
  }
  addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productElement = button.closest('.product');
    addToCart(productElement);
  });
});
});

  