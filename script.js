/**
 * TonVendas - Frontend JavaScript Atualizado
 * Gerencia exibição de produtos com imagens e sincronização automática
 */

const API_URL = '/api/data';
const REFRESH_INTERVAL_SELECT = document.getElementById('refresh-interval');
const PRODUCTS_CONTAINER = document.getElementById('products-container');
const COMPARISON_TABLE = document.getElementById('comparison-table');
const CONTACT_CONTAINER = document.getElementById('contact-container');
const LAST_UPDATED = document.getElementById('last-updated');
const FOOTER_LAST = document.getElementById('footer-last');

let refreshIntervalId = null;

// Mapeamento de imagens dos produtos
const PRODUCT_IMAGES = {
  'T2 Max': 'https://page.gensparksite.com/v1/base64_upload/140c39ce0f395fc84452408a09bbbc4a',
  'T3 Max': 'https://page.gensparksite.com/v1/base64_upload/29cbc866f1422c695e589e4d37b6ea04',
  'T3 Smart Max': 'https://page.gensparksite.com/v1/base64_upload/765d88fb3144306fdb87de695ab8ff9a',
  'T3 Smart': 'https://page.gensparksite.com/v1/base64_upload/c3bbb971d2cabb6789221296a8d6f620'
};

// Slogans personalizados por produto
const PRODUCT_SLOGANS = {
  'T2 Max': 'A maquininha compacta que tá sempre com você',
  'T3 Max': 'A maquininha parceira do empreendedor brasileiro',
  'T3 Smart Max': 'A maquininha completa que nunca te deixa na mão',
  'T3 Smart': 'Tecnologia inteligente para vender mais'
};

// Taxas de exemplo (serão substituídas pela API real)
const MOCK_RATES = {
  pix: '0,00%',
  debito: '0,59%',
  credito: '0,59%',
  credito12x: '7,99%'
};

/**
 * Formata data ISO para formato brasileiro
 */
function formatDate(isoString) {
  if (!isoString) return 'Aguardando...';
  const date = new Date(isoString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Busca dados da API
 */
async function fetchData() {
  try {
    const response = await fetch(API_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error('Erro ao buscar dados da API');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    // Retorna dados mock em caso de erro
    return getMockData();
  }
}

/**
 * Dados mock para fallback
 */
function getMockData() {
  return {
    lastFetched: new Date().toISOString(),
    plans: [
      {
        id: 'plan-1',
        title: 'T2 Max',
        slogan: PRODUCT_SLOGANS['T2 Max'],
        rates: MOCK_RATES,
        features: [
          'Máquina compacta e portátil',
          'Bateria de longa duração',
          'Conectividade 4G + Wi-Fi',
          'Bobina de papel grátis'
        ],
        link: 'https://ton.com.br/maquininha/t2',
        sellerLink: 'https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_D195_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922'
      },
      {
        id: 'plan-2',
        title: 'T3 Max',
        slogan: PRODUCT_SLOGANS['T3 Max'],
        rates: MOCK_RATES,
        features: [
          'Ideal para empreendedores',
          'Tecnologia NFC',
          'Pagamentos por aproximação',
          'Suporte 24/7'
        ],
        link: 'https://ton.com.br/maquininha/t3',
        sellerLink: 'https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_S920_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922'
      },
      {
        id: 'plan-3',
        title: 'T3 Smart Max',
        slogan: PRODUCT_SLOGANS['T3 Smart Max'],
        rates: MOCK_RATES,
        features: [
          'Sistema Android completo',
          'Tela touch inteligente',
          'Chip 4G incluído',
          'Receba Pix QR Code e por aproximação'
        ],
        link: 'https://ton.com.br/maquininha/t3-smart',
        sellerLink: 'https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_SMART_POS_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922'
      }
    ],
    contacts: {
      phones: ['0800 541 4000'],
      emails: ['ajuda@ton.com.br'],
      helpLinks: ['https://ton.com.br/ajuda', 'https://api.whatsapp.com/send?phone=5508005414000']
    }
  };
}

/**
 * Renderiza cards de produtos
 */
function renderProducts(plans) {
  if (!plans || plans.length === 0) {
    PRODUCTS_CONTAINER.innerHTML = '<p style="text-align:center;color:#666;">Nenhum produto disponível no momento.</p>';
    return;
  }

  const html = plans.map(plan => {
    const imageSrc = PRODUCT_IMAGES[plan.title] || PRODUCT_IMAGES['T3 Smart'];
    const rates = plan.rates || MOCK_RATES;
    
    return `
      <div class="product-card">
        <img src="${imageSrc}" alt="${plan.title}" class="product-image" loading="lazy">
        <div class="product-content">
          <div class="product-name">${plan.title}</div>
          <div class="product-slogan">${plan.slogan || PRODUCT_SLOGANS[plan.title] || ''}</div>
          
          <div class="price-section">
            <div class="price-label">💰 Taxas Competitivas</div>
            <div class="price-grid">
              <div class="price-item">
                <div class="price-type">Pix</div>
                <div class="price-value">${rates.pix || rates.rate || '0,00%'}</div>
              </div>
              <div class="price-item">
                <div class="price-type">Débito</div>
                <div class="price-value">${rates.debito || rates.rate || '0,59%'}</div>
              </div>
              <div class="price-item">
                <div class="price-type">Crédito</div>
                <div class="price-value">${rates.credito || rates.rate || '0,59%'}</div>
              </div>
              <div class="price-item">
                <div class="price-type">12x</div>
                <div class="price-value">${rates.credito12x || '7,99%'}</div>
              </div>
            </div>
          </div>

          ${plan.features && plan.features.length > 0 ? `
            <ul class="features-list">
              ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          ` : ''}

          <a href="${plan.sellerLink || plan.link}" target="_blank" rel="noopener noreferrer" class="btn-primary">
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
function renderComparisonTable(plans) {
  if (!plans || plans.length === 0) {
    COMPARISON_TABLE.innerHTML = '<p style="text-align:center;color:#666;">Nenhum dado para comparar.</p>';
    return;
  }

  const rows = plans.map(plan => {
    const rates = plan.rates || MOCK_RATES;
    return `
      <tr>
        <td><strong>${plan.title}</strong></td>
        <td>${rates.pix || '0,00%'}</td>
        <td>${rates.debito || '0,59%'}</td>
        <td>${rates.credito || '0,59%'}</td>
        <td>${rates.credito12x || '7,99%'}</td>
        <td>${plan.features?.slice(0, 2).join(', ') || 'Diversos benefícios'}</td>
      </tr>
    `;
  }).join('');

  const html = `
    <thead>
      <tr>
        <th>Modelo</th>
        <th>Pix</th>
        <th>Débito</th>
        <th>Crédito</th>
        <th>12x</th>
        <th>Principais Benefícios</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  `;

  COMPARISON_TABLE.innerHTML = html;
}

/**
 * Renderiza seção de contatos
 */
function renderContacts(contacts) {
  if (!contacts) {
    CONTACT_CONTAINER.innerHTML = '<p style="text-align:center;color:#666;">Contatos indisponíveis.</p>';
    return;
  }

  let html = '';

  if (contacts.phones && contacts.phones.length > 0) {
    html += `
      <div class="contact-item">
        <div class="contact-label">📞 Telefone</div>
        <div class="contact-value">
          ${contacts.phones.map(phone => `<div><a href="tel:${phone}">${phone}</a></div>`).join('')}
        </div>
      </div>
    `;
  }

  if (contacts.emails && contacts.emails.length > 0) {
    html += `
      <div class="contact-item">
        <div class="contact-label">✉️ E-mail</div>
        <div class="contact-value">
          ${contacts.emails.map(email => `<div><a href="mailto:${email}">${email}</a></div>`).join('')}
        </div>
      </div>
    `;
  }

  if (contacts.helpLinks && contacts.helpLinks.length > 0) {
    html += `
      <div class="contact-item">
        <div class="contact-label">🔗 Suporte</div>
        <div class="contact-value">
          ${contacts.helpLinks.map(link => {
            const label = link.includes('whatsapp') ? '💬 WhatsApp' : '🌐 Central de Ajuda';
            return `<div><a href="${link}" target="_blank" rel="noopener noreferrer">${label}</a></div>`;
          }).join('')}
        </div>
      </div>
    `;
  }

  CONTACT_CONTAINER.innerHTML = html || '<p>Entre em contato através dos canais oficiais Ton.</p>';
}

/**
 * Carrega e renderiza todos os dados
 */
async function loadData() {
  PRODUCTS_CONTAINER.innerHTML = '<div style="text-align:center;padding:40px;"><div style="display:inline-block;width:40px;height:40px;border:4px solid #00D563;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;"></div></div>';
  
  const data = await fetchData();
  
  // Atualiza timestamp
  const timestamp = formatDate(data.lastFetched);
  LAST_UPDATED.textContent = `Última atualização: ${timestamp}`;
  FOOTER_LAST.textContent = `Última atualização: ${timestamp}`;
  
  // Renderiza seções
  renderProducts(data.plans);
  renderComparisonTable(data.plans);
  renderContacts(data.contacts);
}

/**
 * Configura intervalo de atualização automática
 */
function setupAutoRefresh() {
  if (refreshIntervalId) clearInterval(refreshIntervalId);
  
  const interval = parseInt(REFRESH_INTERVAL_SELECT.value);
  if (interval === 0) {
    console.log('[Auto-refresh] Desativado');
    return;
  }
  
  console.log(`[Auto-refresh] Configurado para ${interval} minutos`);
  refreshIntervalId = setInterval(() => {
    console.log(`[Auto-refresh] Atualizando dados...`);
    loadData();
  }, interval * 60 * 1000);
}

/**
 * Animação de loading (CSS inline)
 */
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

/**
 * Event Listeners
 */
REFRESH_INTERVAL_SELECT.addEventListener('change', setupAutoRefresh);

/**
 * Inicialização
 */
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupAutoRefresh();
});
