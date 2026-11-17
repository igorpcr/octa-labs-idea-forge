# Auditoria de catálogo para checkout (sem publicação)

Foram extraídos **76 cartões** de produto da rota `src/routes/produtos.tsx`, correspondendo a **76 títulos únicos**. O arquivo `docs/catalog-mapping-review.json` contém propostas de SKU, **não** SKUs autorizados.

## Situação

- O banco `public.octa_demo_catalog` contém somente `kit-pesquisa-bioquimica` (produto fictício de homologação).
- Nenhum produto do catálogo visual foi automaticamente adicionado ao banco ou autorizado para pedidos.
- O carrinho existente extrai título e preço do DOM. **Isso não é uma fonte confiável para cobrança** e não pode ser usado para registrar pedidos.
- Preço, disponibilidade e elegibilidade de transporte devem ser aprovados individualmente, de fonte comercial verificável, e persistidos no servidor.
- Produtos potencialmente sujeitos a controle sanitário ou restrições de transporte ficam em revisão manual. Não presumir que o rótulo "pesquisa" autoriza comercialização ou transporte.

## Próxima implementação bloqueada por validação

1. Confirmar SKU canônico e correspondência explícita para cada cartão.
2. Confirmar preço oficial e disponibilidade no banco, nunca no navegador.
3. Confirmar elegibilidade regulatória e contratual por produto, embalagem e modalidade de frete.
4. Só então implementar endpoint autenticado de pedidos, multi-itens, com cotação validada e idempotência.
5. Criar painel administrativo com autorização no servidor, auditoria e acesso mínimo necessário.

**Pagamentos Pix desativados. Nenhum deploy autorizado.**
