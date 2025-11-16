const umkmData = [
  {
    slug: 'dollin',
    name: 'Dollin',
    category: 'kuliner',
    description:
      'menawarkan donat dengan varian toping yang beragam dan memiliki cita rasa yang khas.',
    location: 'Wonogiri, Jawa Tengah',
    products: ['Donat tradisional', 'Donat kering', 'Donat lembut'],
  },
  {
    slug: 'kedai-gus-aab',
    name: 'Kedai Gus Aab',
    category: 'kuliner',
    description: 'kedai sederhana yang menawarkan Mie Jebew beserta cirengnya yang menjadi cirikhasnya',
    location: 'Sampang, Jawa Timur',
    products: ['Mie jebew', 'Cireng', 'Siomay jebew'],
  },
  {
    slug: 'pawon-butian',
    name: 'Pawon Butian',
    category: 'kuliner',
    description: 'menawarkan berbagai makanan dan minuman dengan citarasa khas dari bahan berkualitas',
    location: 'Sampang, Jawa Timur',
    products: ['Dimsum_mentai', 'burger', 'kebab'],
  },
  {
    slug: 'batik-suramadu',
    name: 'Batik Suramadu',
    category: 'fashion',
    description: 'Batik tulis motif kontemporer dengan pewarna alami dan sentuhan modern.',
    location: 'Surabaya, Jawa Timur',
    products: ['Kemeja batik premium', 'Selendang sutra', 'Totebag motif mega mendung'],
  },
  {
    slug: 'maklor-crisa',
    name: 'Maklor Crisa',
    category: 'kuliner',
    description: 'Aneka maklor dengan berbagai varian rasa',
    location: 'Tulungagung, Jawa Timur',
    products: ['Balado', 'BBQ', 'Keju'],
  },
  {
    slug: 'monteku',
    name: 'Monteku',
    category: 'kriya',
    description:
      'Monteku adalah studio kriya yang menyediakan berbagai macam aneka manikan',
    location: 'Surabaya, Jawa Timur',
    products: ['Bulu Ostrich', 'Acrylic Line', 'Mata Sampan'],
  },
  {
    slug: 'butik-griya-rungkut',
    name: 'Butik Griya Rungkut',
    category: 'fashion',
    description: 'Butik Griya Rungkut menyediakan berbagai macam aksesori fashion untuk wanita',
    location: 'Surabaya, Jawa Timur',
    products: ['Dafanya Scarf', 'Sidra Pants', 'Blouse Daiba'],
  },
  {
    slug: 'rotan-sumber-makmur',
    name: 'Rotan Sumber Makmur',
    category: 'kriya',
    description: 'Rotan Sumber Makmur menyediakan berbagai macam furnitur rotan yang ringan dan tahan lama',
    location: 'Surabaya, Jawa Timur',
    products: ['Lampu gantung bambu', 'Kursi santai minimalis', 'Peralatan makan ramah bumi'],
  },
  {
    slug: 'lontong-balap-pak-gendut',
    name: 'Lontong Balap Pak Gendut',
    category: 'kuliner',
    description: 'Lontong Balap Pak Gendut menyediakan berbagai macam lontong balap yang ringan dan tahan lama',
    location: 'Surabaya, Jawa Timur',
    products: ['Lontong balap', 'Sate Ayam', 'Es Degan'],
  },
  {
    slug: 'warung-bebek-restu-ibu',
    name: 'Warung Bebek Restu Ibu',
    category: 'kuliner',
    description: 'Warung Bebek Restu Ibu menyediakan bebek goreng dengan baluran bumbu hitam khas madura',
    location: 'Bangkalan, Jawa Timur',
    products: ['Bebek Bumbu', 'Ayam Bumbu', 'Bebek Serundeng'],
  },
];

const grid = document.getElementById('umkmGrid');
const searchInput = document.getElementById('searchUMKM');
const filterButtons = document.querySelectorAll('[data-filter]');
const yearEl = document.getElementById('year');
const headerEl = document.querySelector('header');
let activeCategory = 'all';

yearEl.textContent = new Date().getFullYear();

const renderCards = (list) => {
  if (!list.length) {
    grid.innerHTML = `
      <article class="umkm-card" style="grid-column: 1 / -1; text-align: center;">
        <p>Tidak ditemukan UMKM yang sesuai kata kunci.</p>
      </article>`;
    return;
  }

  grid.innerHTML = list
    .map(
      (item, index) => `
    <article class="umkm-card" data-aos="fade-up" data-aos-delay="${index * 60}">
      <p class="umkm-card__category">${item.category}</p>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <ul class="umkm-card__products">
        ${item.products.map((product) => `<li>• ${product}</li>`).join('')}
      </ul>
      <div class="umkm-card__footer">
        <p class="umkm-card__location">📍 ${item.location}</p>
        <a class="btn btn-outline" href="detail/${item.slug}.html">Lihat detail</a>
      </div>
    </article>`
    )
    .join('');

  if (window.AOS && typeof window.AOS.refresh === 'function') {
    window.AOS.refresh();
  }
};

const applyFilters = () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = umkmData.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesKeyword =
      item.name.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.location.toLowerCase().includes(keyword) ||
      item.products.some((product) => product.toLowerCase().includes(keyword));
    return matchesCategory && matchesKeyword;
  });

  renderCards(filtered);
};

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((button) => button.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.filter;
    applyFilters();
  });
});

searchInput.addEventListener('input', () => {
  applyFilters();
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    headerEl.classList.add('scrolled');
  } else {
    headerEl.classList.remove('scrolled');
  }
});

renderCards(umkmData);
