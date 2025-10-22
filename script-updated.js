/**
 * TonVendas - Frontend JavaScript Atualizado
 * Informações corretas das maquininhas conforme site oficial Ton
 */

const PRODUCTS_CONTAINER = document.getElementById('products-container');
const COMPARISON_TABLE = document.getElementById('comparison-table');

// Imagens oficiais dos produtos
const PRODUCT_IMAGES = {
  'T2': 'https://sites-cms-deco-prd.s3.us-east-1.amazonaws.com/optimized/ton/8974cebf-7526-48d4-a1ad-008e17a4aee4/maquininha-t2-right.webp',
  'T3': 'https://sites-cms-deco-prd.s3.us-east-1.amazonaws.com/optimized/ton/4dcf89f3-d51d-49d4-a82f-20fc91abf48a/maquininha-t3-right.webp',
  'T3 Smart': 'https://sites-cms-deco-prd.s3.us-east-1.amazonaws.com/optimized/ton/d109918b-0c7e-4bf0-b016-e2202146e6de/maquininha-t3-smart-right.webp'
};

// Dados corretos das maquininhas conforme imagens fornecidas
const PRODUCTS_DATA = [
  {
    id: 'T2',
    name: 'T2',
    fullName: 'Maquininha T2',
    badge: 'COMPACTA',
    slogan: 'A maquininha compacta que tá sempre com você',
    connectivity: 'Chip 3G e Wi-Fi',
    nfc: 'Sim',
    receipt: 'SMS apenas',
    features: [
      'Frete e troca grátis pra todo o Brasil',
      'Com Chip 3G e Wi-Fi',
      'Receba por aproximação (NFC)',
      'Comprovante por SMS',
      'Venda pelo App com TapTon, Link e Pix',
      'Aceite Pix na Maquininha',
      'Chip com internet ilimitada e grátis',
      'Garantia ilimitada'
    ],
    highlight: {
      title: '📱 Ideal para vendas móveis',
      description: 'Perfeita para quem está sempre em movimento'
    },
    infoLink: 'https://www.ton.com.br/maquininha/t2',
    buyLink: 'https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_D195_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor'
  },
  {
    id: 'T3',
    name: 'T3',
    fullName: 'Maquininha T3',
    badge: 'POPULAR',
    slogan: 'A maquininha parceira do empreendedor brasileiro',
    connectivity: 'Chip 3G e Wi-Fi',
    nfc: 'Sim',
    receipt: 'Impresso ou SMS',
    features: [
      'Frete e troca grátis pra todo o Brasil',
      'Com Chip 3G e Wi-Fi',
      'Receba por aproximação (NFC)',
      'Comprovante impresso ou SMS',
      'Venda pelo App com TapTon, Link e Pix',
      'Aceite Pix na Maquininha',
      'Chip com internet ilimitada e grátis',
      'Garantia ilimitada'
    ],
    highlight: {
      title: '🖨️ Com impressora integrada',
      description: 'Emita comprovantes impressos para seus clientes'
    },
    infoLink: 'https://www.ton.com.br/maquininha/t3',
    buyLink: 'https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_S920_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor'
  },
  {
    id: 'T3-Smart',
    name: 'T3 Smart',
    fullName: 'Maquininha T3 Smart',
    badge: 'PREMIUM',
    slogan: 'A maquininha Android, mais rápida e com melhor bateria',
    connectivity: 'Chip 4G e Wi-Fi',
    nfc: 'Sim',
    receipt: 'Impresso ou SMS',
    features: [
      'Frete e troca grátis pra todo o Brasil',
      'Com Chip 4G e Wi-Fi',
      'Receba por aproximação (NFC)',
      'Comprovante impresso ou SMS',
      'Venda pelo App com TapTon, Link e Pix',
      'Aceite Pix na Maquininha',
      'Bateria de longa duração',
      'Sistema Android com Visor Touchscreen',
      'Chip com internet 4G ilimitada e grátis',
      'Garantia ilimitada'
    ],
    highlight: {
      title: '🚀 Tecnologia Android avançada',
      description: 'Tela touchscreen colorida, bateria de longa duração e conexão 4G'
    },
    infoLink: 'https://www.ton.com.br/maquininha/t3-smart',
    buyLink: 'https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_SMART_POS_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor'
  }
];

/**
 * Renderiza os cards das maquininhas
 */
function renderProducts(products) {
  if (!products || products.length === 0) {
    PRODUCTS_CONTAINER.innerHTML = `
      <div style="text-align:center;color:#666;padding:40px;grid-column:1/-1;">
        <p>Nenhum produto disponível no momento.</p>
      </div>
    `;
    return;
  }

  const html = products.map(product => {
    const imageSrc = PRODUCT_IMAGES[product.name] || PRODUCT_IMAGES['T3 Smart'];
    
    return `
      <div class="product-card">
        <div class="product-image-wrapper">
          <span class="product-badge">${product.badge}</span>
          <img src="${imageSrc}" alt="${product.fullName}" class="product-image" loading="lazy">
        </div>
        <div class="product-content">
          <h3 class="product-name">${product.fullName}</h3>
          <p class="product-slogan">${product.slogan}</p>
          
          <ul class="features-list">
            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>

          <div class="highlight-feature">
            <strong>${product.highlight.title}</strong>
            <span>${product.highlight.description}</span>
          </div>

          <a href="${product.buyLink}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn-primary">
            🛒 Pedir ${product.name}
          </a>
        </div>
      </div>
    `;
  }).join('');

  PRODUCTS_CONTAINER.innerHTML = html;
}

/**
 * Renderiza a tabela de comparação
 */
function renderComparisonTable(products) {
  if (!products || products.length === 0) {
    return;
  }

  const tbody = products.map(product => `
    <tr>
      <td><strong>${product.fullName}</strong></td>
      <td>${product.connectivity}</td>
      <td>${product.nfc}</td>
      <td>${product.receipt}</td>
      <td>${product.highlight.title}</td>
    </tr>
  `).join('');

  const thead = COMPARISON_TABLE.querySelector('thead');
  const table = COMPARISON_TABLE.parentElement;
  
  COMPARISON_TABLE.innerHTML = `
    ${thead.outerHTML}
    <tbody>${tbody}</tbody>
  `;
}

/**
 * Inicialização quando o DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ TonVendas inicializado - Dados sincronizados com Ton oficial');
  console.log('📦 Carregando', PRODUCTS_DATA.length, 'produtos...');
  
  // Simula um pequeno delay para mostrar o loading
  setTimeout(() => {
    renderProducts(PRODUCTS_DATA);
    renderComparisonTable(PRODUCTS_DATA);
    console.log('✅ Produtos carregados com sucesso!');
  }, 500);
});

// Log para debug
console.log('📱 TonVendas Script Carregado');
console.log('🔗 Links de compra com código de revendedor vinculado');
