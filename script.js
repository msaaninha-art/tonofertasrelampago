/**
 * TonVendas - Frontend JavaScript
 * Gerencia a exibição de planos, comparação e contatos
 */

const API_URL = '/api/data';
const REFRESH_INTERVAL_SELECT = document.getElementById('refresh-interval');
const PLANS_CONTAINER = document.getElementById('plans');
const COMPARE_TABLE = document.getElementById('compare-table');
const CONTACT_LIST = document.getElementById('contact-list');
const LAST_UPDATED = document.getElementById('last-updated');
const FOOTER_LAST = document.getElementById('footer-last');

let refreshIntervalId = null;

/**
 * Formata data ISO para formato brasileiro
 */
function formatDate(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleString('pt-BR');
}

/**
 * Busca dados da API
 */
async function fetchData() {
  try {
    const response = await fetch(API_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error('Erro ao buscar dados');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    showError(error.message);
    return null;
  }
}

/**
 * Exibe mensagem de erro
 */
function showError(message) {
  PLANS_CONTAINER.innerHTML = `
    <div class="error-message">
      ⚠️ ${message}
      <br>
      <button class="btn" onclick="loadData()" style="margin-top: 10px;">Tentar Novamente</button>
    </div>
  `;
}

/**
 * Renderiza cards de planos
 */
function renderPlans(plans) {
  if (!plans || plans.length === 0) {
    PLANS_CONTAINER.innerHTML = '<p>Nenhum plano encontrado.</p>';
    return;
  }

  const html = plans
    .map(
      (plan) => `
    <div class="plan-card">
      <div>
        <div class="plan-name">${plan.title}</div>
        ${plan.slogan ? `<div class="plan-slogan">${plan.slogan}</div>` : ''}
        <div class="plan-price">${plan.rate}</div>
        ${
          plan.features && plan.features.length > 0
            ? `<div class="plan-features">${plan.features.join(' • ')}</div>`
            : plan.description
              ? `<div class="plan-features">${plan.description}</div>`
              : ''
        }
      </div>
      <a href="${plan.sellerLink || plan.link}" target="_blank" rel="noopener noreferrer" class="btn">
        Assine agora
      </a>
    </div>
  `
    )
    .join('');

  PLANS_CONTAINER.innerHTML = html;
}

/**
 * Renderiza tabela de comparação
 */
function renderComparisonTable(plans) {
  if (!plans || plans.length === 0) {
    COMPARE_TABLE.innerHTML = '<p>Nenhum plano para comparar.</p>';
    return;
  }

  const rows = plans
    .map(
      (plan) => `
    <tr>
      <td><strong>${plan.title}</strong></td>
      <td style="color: var(--ton-green); font-weight: 600;">${plan.rate}</td>
      <td>${plan.features?.join(', ') || plan.description || '—'}</td>
    </tr>
  `
    )
    .join('');

  const html = `
    <table>
      <thead>
        <tr>
          <th>Plano</th>
          <th>Taxa</th>
          <th>Benefícios</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  COMPARE_TABLE.innerHTML = html;
}

/**
 * Renderiza seção de contatos
 */
function renderContacts(contacts) {
  if (!contacts) {
    CONTACT_LIST.innerHTML = '<p>Contato não encontrado.</p>';
    return;
  }

  let html = '';

  if (contacts.phones && contacts.phones.length > 0) {
    html += `
      <div class="contact-item">
        <div class="contact-label">📞 Telefone</div>
        <div class="contact-value">
          ${contacts.phones.map((phone) => `<div>${phone}</div>`).join('')}
        </div>
      </div>
    `;
  }

  if (contacts.emails && contacts.emails.length > 0) {
    html += `
      <div class="contact-item">
        <div class="contact-label">✉️ E-mail</div>
        <div class="contact-value">
          ${contacts.emails.map((email) => `<div><a href="mailto:${email}">${email}</a></div>`).join('')}
        </div>
      </div>
    `;
  }

  if (contacts.helpLinks && contacts.helpLinks.length > 0) {
    html += `
      <div class="contact-item">
        <div class="contact-label">🔗 Links de Suporte</div>
        <div class="contact-value">
          ${contacts.helpLinks
            .map((link) => `<div><a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a></div>`)
            .join('')}
        </div>
      </div>
    `;
  }

  if (!html) {
    html = '<p>Contato não encontrado automaticamente. Consulte a Ton para suporte oficial.</p>';
  }

  CONTACT_LIST.innerHTML = html;
}

/**
 * Carrega e renderiza todos os dados
 */
async function loadData() {
  PLANS_CONTAINER.innerHTML = '<div id="loading">Carregando planos…</div>';
  COMPARE_TABLE.innerHTML = 'Carregando…';
  CONTACT_LIST.innerHTML = 'Carregando contatos…';

  const data = await fetchData();
  if (!data) return;

  // Atualizar timestamp
  const timestamp = formatDate(data.lastFetched);
  LAST_UPDATED.textContent = timestamp;
  FOOTER_LAST.textContent = timestamp;

  // Renderizar seções
  renderPlans(data.plans);
  renderComparisonTable(data.plans);
  renderContacts(data.contacts);
}

/**
 * Configura intervalo de atualização automática
 */
function setupAutoRefresh() {
  if (refreshIntervalId) clearInterval(refreshIntervalId);

  const interval = parseInt(REFRESH_INTERVAL_SELECT.value);
  if (interval === 0) return;

  refreshIntervalId = setInterval(() => {
    console.log(`[Auto-refresh] Atualizando dados (intervalo: ${interval} min)`);
    loadData();
  }, interval * 60 * 1000);
}

/**
 * Event listeners
 */
REFRESH_INTERVAL_SELECT.addEventListener('change', setupAutoRefresh);

/**
 * Inicialização
 */
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupAutoRefresh();
});


