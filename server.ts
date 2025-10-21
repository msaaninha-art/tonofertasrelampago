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
          title: 'T3 Smart Ton Pro',
          features: ['Máquina de cartão', 'Suporte 24/7', 'Recebimento em 1 dia'],
          slogan: 'A melhor solução para profissionais',
          description: 'Máquina de cartão moderna com tecnologia NFC',
          productId: 'T3 Smart Pro',
          link: 'https://www.ton.com.br/maquininha/t3-smart?srsltid=AfmBOopvPzknvqOchacT2zLzWJ3VZQ-V9DldJiyBwneGjyvYyeykOOpJ',
          sellerLink: 'https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_SMART_POS_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor'
        },
        {
          id: 'plan-1',
          title: 'T3 Smart MEI e PJ',
          features: ['Ideal para MEI', 'Antifraude', 'Consulta de saldo'],
          slogan: 'Perfeito para pequenos negócios',
          description: 'Solução completa para microempreendedores',
          productId: 'T3 Smart MEI e PJ',
          link: 'https://www.ton.com.br/MEI-PJ?srsltid=AfmBOop1oM9Tdu9MRjvqPZFkaXX7Ut39YKS-8eKP2IN41DdPiqJrMW9H',
          sellerLink: 'https://ton.com.br/checkout/cart/?productId=TONMAXMEI_TIER_SMART_POS&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonmaxmei_tier&utm_medium=invite_share&utm_source=revendedor'
        },
        {
          id: 'plan-2',
          title: 'T3 Ton Pró',
          features: ['Melhor taxa', 'Sem taxas de cancelamento', 'Programa de fidelidade'],
          slogan: 'O plano mais completo',
          description: 'Máquina com as melhores funcionalidades',
          productId: 'T3 Ton Pró',
          link: 'https://www.ton.com.br/?srsltid=AfmBOooOBWYonXn3P9sg6lkijb2we1MhxAXBCaVSbHDzEfsXgnC7LGD-',
          sellerLink: 'https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_S920_B&referrer=62F0C435-81C7-40EF-BED6-75E60E7CC922&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor'
        },
        {
          id: 'plan-3',
          title: 'T2 Ton Pró',
          features: ['Melhor taxa', 'Sem taxas de cancelamento', 'Programa de fidelidade'],
          slogan: 'O plano mais completo',
          description: 'Máquina com boas funcionalidades, simples e prática',
          productId: 'T2 Ton Pró',
          link: 'https://www.ton.com.br/?srsltid=AfmBOooOBWYonXn3P9sg6lkijb2we1MhxAXBCaVSbHDzEfsXgnC7LGD-',
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

