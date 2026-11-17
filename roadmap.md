# OCTA — ajustes institucionais

## Acesso administrativo BlackPix
- [ ] Corrigir distinção entre falha técnica e acesso negado; preservar JWT e consulta de papel com RLS nos três serviços administrativos.
- [ ] Testar sessão real da conta solicitante, executar testes e verificar compilação antes de publicar; não ativar BlackPix/Pix nem alterar pagamentos.

## Correção do webhook BlackPix
- [ ] Conferir implementação de main e substituir endpoint legado por inbox autenticada e idempotente.
- [ ] Verificar banco, variáveis servidor, permissões e persistência antes do HTTP 200; testar erros sanitizados.
- [ ] Publicar correção após verificação de segurança; não confirmar pagamento pelo recebimento.

- [x] Atualizar e-mail e manter telefone em todas as páginas.
- [x] Ocultar endereço, CNPJ e demais dados cadastrais.
- [x] Criar Quem Somos original com o relato fornecido, sem Nossa Jornada.
- [x] Conferir navegação, contatos e visual no computador e celular.

## Ferramentas Grátis
- [x] Identificar as ferramentas da referência e criar versões originais de uso laboratorial com títulos OCTA.
- [x] Integrar menu no computador e celular e criar todas as páginas de ferramentas.
- [x] Implementar cálculos e validações, testar resultados e conferir o uso real.

## Política de Envios
- [x] Criar política nacional original em /envio com identidade OCTA, sem condições comerciais não confirmadas.
- [x] Conferir acesso pelo rodapé, contatos e visual no computador e celular.

## Carrinho e finalização
- [x] Criar carrinho, CEP/endereço, revisão e tela final sem cobranças reais.
- [x] Integrar produtos e testar quantidades, totais, validação e navegação em computador/celular.

## BlackPix — preparação
- [x] Reabrir e concluir a conexão BlackPix no workspace atual, usando o webhook publicado em https://octa-labs-idea-forge.lovable.app/api/public/blackpix-webhook; consulta somente leitura respondeu 200 sem expor dados.
- [x] Exibir no /admin/blackpix cada aviso de webhook verificado e persistido, com status e erro sanitizado, sem segredos, assinaturas, conteúdo bruto ou dados pessoais; três avisos reais conferidos com sessão administrativa.
- [x] Responder ao pedido de execução local com Git: informar a URL do webhook e orientar a conexão/download do repositório, pois nenhuma URL de repositório foi fornecida.
- [x] Acompanhar cadastros, confirmações de e-mail, logins e acessos administrativos sem dados pessoais; quatro eventos registrados, catálogo validado e 16 testes passaram. Confirmação mede retorno autenticado do link; recebimento na coleta depende do uso do site com consentimento.
- [x] Criar chat de suporte com uma conversa por sessão sem histórico persistido, fontes atuais e encaminhamento ao WhatsApp com cópia voluntária da conversa; resposta real sobre envio e encaminhamento testados no computador/celular sem erros, 20 testes passaram. Consulta de pedidos permanece bloqueada.
- [ ] Vincular suporte aos pedidos reais de cada cliente. Bloqueio: não existe fonte de pedidos com vínculo seguro ao usuário nem central externa fornecida; nunca consultar pedidos gerais da BlackPix para visitantes.
- [x] Autorizar a conta indicada pelo solicitante como primeira administradora; e-mail confirmado e permissão administrativa verificados no banco.
- [x] Criar entrada/cadastro por e-mail e senha, recuperação de senha e saída segura, sem perfil ou autorização administrativa automática; oito testes passaram, formulários e bloqueio administrativo verificados no computador/celular, sem erros ou rolagem horizontal.
- [ ] Verificar entrada e saída com conta real e recuperação por e-mail. Bloqueio: aguarda sessão autorizada da conta cadastrada; nenhum envio de recuperação foi realizado.
- [x] Criar análise de status e erros sanitizados com IA, restrita a administradores e sem alterar pagamentos; testes de autorização e filtragem passaram e tela de entrada verificada em computador/celular.
- [ ] Validar análise autenticada com administrador. Bloqueio: conta confirmada e administradora autorizada; aguarda sessão autorizada para executar a análise.
- [x] Registrar avisos verificados em histórico privado e tentativas rejeitadas em logs sanitizados; 19 testes passaram e recebimento assinado foi confirmado no banco sem conteúdo sensível.
- [x] Ativar Lovable Cloud e preparar recebimento de avisos com bloqueio seguro; confirmar rejeição de eventos não verificados e tela Pix bloqueada.
- [x] Implementar e testar assinatura HMAC-SHA256 fornecida pelo usuário, corpo original e tolerância de 300 segundos, sem confirmar pagamentos.
- [x] Configurar segredo do webhook em formulário seguro e verificar rejeição de aviso sem assinatura no site (401).
- [ ] Confirmar criação Pix, formato dos eventos e ambiente de testes. Bloqueio: aguarda documentação privada do painel blackpix.site; GET de pedidos fornecido pelo usuário confirmado com resposta 200.
- [x] Conectar credenciais com segurança e verificar acesso pelo site com consulta de pedidos somente leitura (200), sem expor dados de clientes.
- [ ] Persistir pedidos e preços autorizados, integrar Pix e validar criação/consulta/confirmação sem aprovação fictícia. Bloqueio: contrato de criação e eventos BlackPix, condições finais de frete e teste autorizado.