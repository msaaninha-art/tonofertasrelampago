import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const mockData = {
  lastFetched: new Date().toISOString(),
  plans: [
    {
      id: 'plan-0',
      title: 'T3 SMART TON PRÓ',
      rate: 'Taxas a partir de 0,99%',
      features: ['Ideal para grandes volumes', 'Conexão 4G e Wi-Fi', 'Bateria de longa duração'],
      slogan: 'Para quem busca alta performance',
      description: 'A máquina mais completa para seu negócio.',
      productId: 'TONPRO_TIER_NOV24_SMART_POS_B',
      link: 'https://ton.com.br/planos-e-taxas',
      sellerLink: 'https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_SMART_POS_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor'
    },
    {
      id: 'plan-1',
      title: 'T3 Smart Ton Max - MEI e PJ',
      rate: 'Taxas a partir de 1,39%',
      features: ['Ideal para MEI e PJ', 'Conexão 4G e Wi-Fi', 'Tela touch'],
      slogan: 'Solução completa para seu negócio',
      description: 'Máquina inteligente para micro e pequenos empreendedores.',
      productId: 'TONMAXMEI_TIER_SMART_POS',
      link: 'https://ton.com.br/planos-e-taxas',
      sellerLink: 'https://ton.com.br/checkout/cart/?productId=TONMAXMEI_TIER_SMART_POS&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonmaxmei_tier&utm_medium=invite_share&utm_source=revendedor'
    },
    {
      id: 'plan-2',
      title: 'T3 Smart Ton Super',
      rate: 'Taxas a partir de 1,69%',
      features: ['Aceita as principais bandeiras', 'Conexão 4G e Wi-Fi', 'Comprovante por SMS'],
      slogan: 'A melhor escolha para o dia a dia',
      description: 'Perfeita para quem busca praticidade e bom preço.',
      productId: 'TONSUPER_SMART_POS',
      link: 'https://ton.com.br/planos-e-taxas',
      sellerLink: 'https://ton.com.br/checkout/cart/?productId=TONSUPER_SMART_POS&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonsuper&utm_medium=invite_share&utm_source=revendedor'
    },
    {
      id: 'plan-3',
      title: 'T3 Ton Max - MEI e PJ',
      rate: 'Taxas a partir de 1,39%',
      features: ['Ideal para MEI e PJ', 'Conexão 4G', 'Sem aluguel'],
      slogan: 'Potência e economia para seu negócio',
      description: 'A máquina ideal para quem busca custo-benefício.',
      productId: 'TONMAXMEI_TIER_S920',
      link: 'https://ton.com.br/planos-e-taxas',
      sellerLink: 'https://ton.com.br/checkout/cart/?productId=TONMAXMEI_TIER_S920&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonmaxmei_tier&utm_medium=invite_share&utm_source=revendedor'
    },
    {
      id: 'plan-4',
      title: 'T3 Ton Pro',
      rate: 'Taxas a partir de 0,99%',
      features: ['Melhores taxas', 'Conexão 4G', 'Bateria de longa duração'],
      slogan: 'Para grandes volumes de vendas',
      description: 'A máquina mais vendida da Ton.',
      productId: 'TONPRO_TIER_NOV24_S920_B',
      link: 'https://ton.com.br/planos-e-taxas',
      sellerLink: 'https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_S920_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor'
    },
    {
      id: 'plan-5',
      title: 'T3 Ton Super',
      rate: 'Taxas a partir de 1,69%',
      features: ['Aceita cartões de crédito e débito', 'Conexão 4G', 'Comprovante impresso'],
      slogan: 'Simples e eficiente para o seu dia a dia',
      description: 'A máquina ideal para quem está começando.',
      productId: 'TONSUPER_S920',
      link: 'https://ton.com.br/planos-e-taxas',
      sellerLink: 'https://ton.com.br/checkout/cart/?productId=TONSUPER_S920&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonsuper&utm_medium=invite_share&utm_source=revendedor'
    },
    {
      id: 'plan-6',
      title: 'T2 Ton Pro',
      rate: 'Taxas a partir de 0,99%',
      features: ['Compacta e potente', 'Conexão Bluetooth', 'Bateria de longa duração'],
      slogan: 'Mobilidade e performance',
      description: 'Perfeita para quem vende em qualquer lugar.',
      productId: 'TONPRO_TIER_NOV24_D195_B',
      link: 'https://ton.com.br/planos-e-taxas',
      sellerLink: 'https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_D195_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor'
    }
  ],
  contacts: {
    phones: ['(11) 3000-0000', '(11) 3000-0001'],
    emails: ['suporte@ton.com.br', 'vendas@ton.com.br'],
    helpLinks: ['https://ton.com.br/ajuda', 'https://api.whatsapp.com/send?phone=5511999999999']
  }
};

app.get('/api/data', (req, res) => {
  mockData.lastFetched = new Date().toISOString();
  res.json(mockData);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

