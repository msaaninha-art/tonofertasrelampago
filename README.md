# 🚀 TonVendas - Site de Vendas de Maquininhas Ton

Site de vendas de maquininhas Ton com dados sincronizados automaticamente com o site oficial da Ton.

## 📋 O que foi corrigido

### ✅ **PROBLEMA RESOLVIDO:**
- **Taxas e preços incorretos** foram corrigidos
- **Links de venda** agora direcionam para seus links de afiliado
- **Dados sincronizados** com as páginas oficiais da Ton
- **Layout organizado** e responsivo

---

## 📊 **DADOS ATUALIZADOS (Extraídos da Ton em 22/10/2025)**

### **Ton Pro (T2, T3, T3 Smart):**
- **Pix:** 0,00%
- **Débito:** 0,53%
- **Crédito:** 0,53%
- **Crédito 12x:** 8,64%
- **Promoção:** Por 30 dias ou até vender R$ 5 mil

### **Ton Max - MEI e PJ:**
- Taxas de acordo com suas vendas mensais
- Link: https://www.ton.com.br/MEI-PJ

---

## 📁 **ARQUIVOS DO PROJETO**

### 1️⃣ **index.html** (Principal)
Versão completa com HTML e JavaScript separado.
- Arquivo HTML principal
- Usa `script.js` externo
- Ideal para sites hospedados

### 2️⃣ **script.js** 
JavaScript com dados dos produtos e funções de renderização.
- Dados hardcoded dos produtos
- Funções de renderização
- Fácil de atualizar

### 3️⃣ **index-standalone.html** (Autônomo)
Arquivo único HTML com tudo incluído (sem necessidade de JavaScript externo).
- **RECOMENDADO para GitHub Pages**
- Tudo em um arquivo só
- Fácil de hospedar

---

## 🔗 **MAPEAMENTO DE LINKS**

### **Seus Links de Venda (Afiliado):**

1. **T2 Ton Pro**
   - Link de venda: https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_D195_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor
   - Fonte de dados: https://www.ton.com.br/maquininha/t2

2. **T3 Ton Pro**
   - Link de venda: https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_S920_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor
   - Fonte de dados: https://www.ton.com.br/maquininha/t3

3. **T3 Smart Ton Pro**
   - Link de venda: https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_SMART_POS_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor
   - Fonte de dados: https://www.ton.com.br/maquininha/t3-smart

4. **T3 Smart Ton Max - MEI e PJ**
   - Link de venda: https://ton.com.br/checkout/cart/?productId=TONMAXMEI_TIER_SMART_POS&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonmaxmei_tier&utm_medium=invite_share&utm_source=revendedor
   - Fonte de dados: https://www.ton.com.br/MEI-PJ

---

## 🚀 **COMO USAR NO GITHUB PAGES**

### **Opção 1: Arquivo Standalone (RECOMENDADO)**

1. Faça upload do arquivo `index-standalone.html` para seu repositório GitHub
2. Renomeie para `index.html` no GitHub
3. Ative o GitHub Pages nas configurações do repositório
4. Pronto! Seu site estará no ar

### **Opção 2: Arquivos Separados**

1. Faça upload de `index.html` e `script.js` para seu repositório
2. Mantenha os dois arquivos na mesma pasta
3. Ative o GitHub Pages
4. Pronto!

---

## 🔄 **COMO ATUALIZAR OS DADOS**

### **Se as taxas da Ton mudarem:**

#### **Opção A: Arquivo Standalone (index-standalone.html)**
1. Abra o arquivo `index-standalone.html`
2. Procure por cada ocorrência das taxas:
   ```html
   <div class="price-value">0,00%</div>  <!-- Pix -->
   <div class="price-value">0,53%</div>  <!-- Débito -->
   <div class="price-value">0,53%</div>  <!-- Crédito -->
   <div class="price-value">8,64%</div>  <!-- 12x -->
   ```
3. Substitua pelos novos valores
4. Salve e faça upload para o GitHub

#### **Opção B: Arquivo JavaScript (script.js)**
1. Abra o arquivo `script.js`
2. Procure pelo objeto `PRODUCTS_DATA`
3. Atualize as taxas em `rates`:
   ```javascript
   rates: {
     pix: '0,00%',        // ← Altere aqui
     debito: '0,53%',     // ← Altere aqui
     credito: '0,53%',    // ← Altere aqui
     credito12x: '8,64%'  // ← Altere aqui
   }
   ```
4. Salve e faça upload para o GitHub

---

## 🎨 **PERSONALIZAÇÃO**

### **Alterar Cores:**
No início do arquivo HTML, encontre `:root` e modifique:
```css
:root {
  --ton-green: #00D563;      /* Verde principal */
  --ton-dark-green: #00A84F; /* Verde escuro */
  --bg: #f7fafc;             /* Cor de fundo */
}
```

### **Adicionar Novo Produto:**
No arquivo `script.js`, adicione no array `PRODUCTS_DATA`:
```javascript
{
  id: 'novo-produto',
  title: 'Nome do Produto',
  slogan: 'Slogan do produto',
  rates: {
    pix: '0,00%',
    debito: '0,53%',
    credito: '0,53%',
    credito12x: '8,64%'
  },
  promo: 'Texto da promoção',
  features: [
    'Característica 1',
    'Característica 2'
  ],
  infoLink: 'https://www.ton.com.br/...',
  buyLink: 'https://ton.com.br/checkout/cart/?...'
}
```

---

## 📱 **RECURSOS**

✅ **Design Responsivo** - Funciona em celulares, tablets e desktops  
✅ **Dados Atualizados** - Sincronizado com www.ton.com.br  
✅ **Links de Afiliado** - Todos os botões direcionam para seus links de venda  
✅ **Tabela Comparativa** - Compare todas as maquininhas  
✅ **Imagens Oficiais** - Imagens direto do CDN da Ton  
✅ **SEO Otimizado** - Meta tags para melhor indexação  

---

## 🐛 **SOLUÇÃO DE PROBLEMAS**

### **Links não funcionam:**
- Verifique se você está usando o arquivo correto (index.html ou index-standalone.html)
- Confirme se o GitHub Pages está ativado

### **Imagens não carregam:**
- As imagens vêm direto do CDN da Ton (Amazon S3)
- Se não carregar, pode ser firewall/bloqueador

### **Layout quebrado:**
- Verifique se você não misturou os arquivos
- Use `index-standalone.html` para evitar problemas

---

## 📧 **SUPORTE**

Se precisar de ajuda para atualizar ou modificar o site:
1. Verifique este README primeiro
2. Consulte os comentários no código
3. Teste localmente antes de fazer upload

---

## 📝 **NOTAS IMPORTANTES**

⚠️ **ATENÇÃO:**
- Os dados foram extraídos do site oficial da Ton em **22/10/2025**
- **Verifique periodicamente** se as taxas mudaram
- Acesse https://www.ton.com.br para confirmar valores atuais
- Este site **NÃO faz scraping automático** - você deve atualizar manualmente

---

## ✅ **CHECKLIST PARA PUBLICAR**

- [ ] Escolhi qual arquivo usar (standalone ou separado)
- [ ] Verifiquei se os links de venda estão corretos
- [ ] Confirmei as taxas no site oficial da Ton
- [ ] Testei o site localmente
- [ ] Fiz upload para o GitHub
- [ ] Ativei o GitHub Pages
- [ ] Testei o site publicado

---

**Criado em:** 22/10/2025  
**Versão:** 1.0.0  
**Status:** ✅ Dados atualizados e corrigidos