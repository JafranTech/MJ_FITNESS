const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.addEventListener('mouseover', (e) => {
  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'INPUT') {
    cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
  }
});
document.addEventListener('mouseout', (e) => {
  cursor.style.transform = 'translate(-50%,-50%) scale(1)';
});

const carousel = document.querySelector('.carousel');
let idx = 0;
const slides = document.querySelectorAll('.slide');
function showNext(){
  idx = (idx + 1) % slides.length;
  carousel.style.transform = `translateX(-${idx * 100}%)`;
}
setInterval(showNext, 3500);

const form = document.getElementById('regForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  try {
    const res = await fetch('/api/register', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok) {
      formMsg.textContent = 'Welcome to IronPulse â€” See you at the grind!';
      form.reset();
    } else {
      formMsg.textContent = data.error || 'Failed to register';
    }
  } catch (err) {
    formMsg.textContent = 'Network error';
  }
});

document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const item = btn.dataset.item;
    const price = btn.dataset.price;
    try {
      const res = await fetch('/api/buy', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ item, price })
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = `/purchase.html?item=${encodeURIComponent(item)}&price=${price}&order=${data.orderId}`;
      } else {
        alert(data.error || 'Failed to create order');
      }
    } catch (err) {
      alert('Network error');
    }
  });
});

document.getElementById('year').textContent = new Date().getFullYear();