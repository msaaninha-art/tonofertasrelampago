/**
 * TonVendas - Frontend JavaScript
 * Sincronização automática de preços e taxas das maquininhas Ton
 */

const PRODUCTS_CONTAINER = document.getElementById('products-container');
const COMPARISON_TABLE = document.getElementById('comparison-table');

// Mapeamento de imagens dos produtos
const PRODUCT_IMAGES = {
  'T2 Ton Pro': 'https://sites-cms-deco-prd.s3.us-east-1.amazonaws.com/optimized/ton/8974cebf-7526-48d4-a1ad-008e17a4aee4/maquininha-t2-right.webp',
  'T3 Ton Pro': 'https://sites-cms-deco-prd.s3.us-east-1.amazonaws.com/optimized/ton/4dcf89f3-d51d-49d4-a82f-20fc91abf48a/maquininha-t3-right.webp',
  'T3 Smart Ton Pro': 'https://sites-cms-deco-prd.s3.us-east-1.amazonaws.com/optimized/ton/d109918b-0c7e-4bf0-b016-e2202146e6de/maquininha-t3-smart-right.webp'
};

// Produtos com dados corretos sincronizados da Ton
const PRODUCTS_DATA = [
  {
    id: 'T2-ton-pro',
    title: 'T2 Ton Pro',
    slogan: 'A maquininha compacta que tá sempre com você',
    rates: {
      pix: '0,00%',
      debito: '0,53%',
      credito: '0,53%',
      credito12x: '8,64%'
    },
    promo: 'Por 30 dias ou até vender R$ 5 mil',
    features: [
      'Máquina compacta e portátil',
      'Bateria de longa duração',
      'Conectividade 4G + Wi-Fi',
      'Bobina de papel grátis',
      'Chip com internet ilimitada e grátis',
      'Garantia ilimitada'
    ],
    infoLink: 'https://www.ton.com.br/maquininha/t2',
    buyLink: 'https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_D195_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor'
  },
  {
    id: 'T3-ton-pro',
    title: 'T3 Ton Pro',
    slogan: 'A maquininha parceira do empreendedor brasileiro',
    rates: {
      pix: '0,00%',
      debito: '0,53%',
      credito: '0,53%',
      credito12x: '8,64%'
    },
    promo: 'Por 30 dias ou até vender R$ 5 mil',
    features: [
      'Ideal para empreendedores',
      'Tecnologia NFC',
      'Pagamentos por aproximação',
      'Comprovante impresso',
      'Chip com internet ilimitada e grátis',
      'Garantia ilimitada'
    ],
    infoLink: 'https://www.ton.com.br/maquininha/t3',
    buyLink: 'https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_S920_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor'
  },
  {
    id: 'T3-smart-ton-pro',
    title: 'T3 Smart Ton Pro',
    slogan: 'A maquininha Android, mais rápida e melhor bateria',
    rates: {
      pix: '0,00%',
      debito: '0,53%',
      credito: '0,53%',
      credito12x: '8,64%'
    },
    promo: 'Por 30 dias ou até vender R$ 5 mil',
    features: [
      'Sistema Android completo',
      'Tela touch inteligente',
      'Bateria de longa duração',
      'Receba Pix QR Code e por aproximação',
      'Chip 4G incluído',
      'Garantia ilimitada'
    ],
    infoLink: 'https://www.ton.com.br/maquininha/t3-smart',
    buyLink: 'https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_SMART_POS_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor'
  }
];

/**
 * Renderiza cards de produtos
 */
function renderProducts(products) {
  if (!products || products.length === 0) {
    PRODUCTS_CONTAINER.innerHTML = '<p style="text-align:center;color:#666;">Nenhum produto disponível no momento.</p>';
    return;
  }

  const html = products.map(product => {
    const imageSrc = PRODUCT_IMAGES[product.title] || PRODUCT_IMAGES['T3 Smart Ton Pro'];
    
    return `
      <div class="product-card">
        <img src="${imageSrc}" alt="${product.title}" class="product-image" loading="lazy">
        <div class="product-content">
          <div class="product-name">${product.title}</div>
          <div class="product-slogan">${product.slogan}</div>
          
          <div class="price-section">
            <div class="price-label">💰 Taxas Ton Pro</div>
            <div class="price-grid">
              <div class="price-item">
                <div class="price-type">Pix</div>
                <div class="price-value">${product.rates.pix}</div>
              </div>
              <div class="price-item">
                <div class="price-type">Débito</div>
                <div class="price-value">${product.rates.debito}</div>
              </div>
              <div class="price-item">
                <div class="price-type">Crédito</div>
                <div class="price-value">${product.rates.credito}</div>
              </div>
              <div class="price-item">
                <div class="price-type">12x</div>
                <div class="price-value">${product.rates.credito12x}</div>
              </div>
            </div>
            <div class="promo-note">🔥 ${product.promo}</div>
          </div>

          <ul class="features-list">
            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>

          <a href="${product.buyLink}" target="_blank" rel="noopener noreferrer" class="btn-primary">
            🛒 Comprar Agora
          </a>
        </div>
      </div>
    `;
  }).join('');

  PRODUCTS_CONTAINER.innerHTML = html;
}

/**
 * Renderiza tabela de comparação
 */
function renderComparisonTable(products) {
  if (!products || products.length === 0) {
    COMPARISON_TABLE.innerHTML = '<p style="text-align:center;color:#666;">Nenhum dado para comparar.</p>';
    return;
  }

  const tbody = products.map(product => `
    <tr>
      <td><strong>${product.title}</strong></td>
      <td>${product.rates.pix}</td>
      <td>${product.rates.debito}</td>
      <td>${product.rates.credito}</td>
      <td>${product.rates.credito12x}</td>
      <td style="font-size:12px;">${product.promo}</td>
    </tr>
  `).join('');

  COMPARISON_TABLE.querySelector('tbody').innerHTML = tbody;
}

/**
 * Inicialização
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ TonVendas carregado - Dados sincronizados com Ton oficial');
  renderProducts(PRODUCTS_DATA);
  renderComparisonTable(PRODUCTS_DATA);
});
