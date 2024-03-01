<!-- TITLE -->
<h1 align="center" color="black">Client Management Service</h1>

<!-- THUMB -->
<p align="center">
        <img src="./doc_thumb.png" width="250px" style="box-shadow: 1px 2px 4px gray;" alt="Logo do Projeto" object-fit="cover">
</p>

<!-- STATUS -->
<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/skGab/Client-management-service.svg)](https://github.com/skGab/Client-management-service/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/skGab/Client-management-service.svg)](https://github.com/skGab/Client-management-service/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<!-- DESCRIPTION -->
<p align="center"> 
        💡 
        Desenvolvimento de um sistema de gestão de clientes, envolvendo a criação de uma API dedicada ao cadastro de clientes e contratos.
  <br> 
</p>

<!-- INTRO -->

## Índice

-   [Tecnologias](#tecnologies)
-   [Introdução & O que o sistema deve fazer](#goal)
-   [Funcionalidades](#features)
-   [Requerimentos de qualidade](#quality)
-   [Instruções de Uso](#glossary)
-   [Autor](#authors)

## Tecnologias <a name="tecnologies"></a>

- Node.js
- Typescript
- NestJS
- Zod (Validação)
- Prisma 

## Objetivo <a name="goal"></a>

  O objetivo deste serviço é complementar uma plataforma que abrange diversas funcionalidades essenciais, incluindo o acompanhamento dos prazos de vencimento dos contratos e a gestão do status do cliente, possibilitando diferenciar entre ativos e inativos, sendo possivel tambem o cadastro de clientes e contratos.

## Funcionalidades <a name="features"></a>

- Cadastro de clientes
- Gestão de vencimento de contratos
- Controle de status de clientes
- Cadastro de novos contratos 

## Requerimentos de qualidade <a name="quality"></a>

- Escalavel
- Performance
- Sustentável

## Instruções de Uso <a name="glossary"></a>
-Rotas para gerenciamento de clientes:

``
GET /clients
GET /clients/findOne/:id
POST /clients/registration
``

<br>

- Rotas para gerenciamento de contratos: 

``
GET /contracts/expiring
GET /contracts/all/:id
GET /contracts/findOne/:id
POST /contracts/registration
``

<br>

- Certifique-se de ter o Node.js instalado em seu sistema. Em seguida, execute o seguinte comando para instalar as dependências do projeto:

``
npm install
``

<br>

- Para iniciar o servidor de desenvolvimento local, utilize o seguinte comando:

``
npm run start:dev
``

O sistema estará disponível em http://localhost:8080/. As alterações no código serão recarregadas automaticamente no navegador durante o desenvolvimento.

<br>

- Para criar a versão final do projeto otimizada para produção, execute o seguinte comando:

``
npm run build
``

Os arquivos finais serão gerados na pasta 'dist'.

<br>

- Após o processo de build, visualize a versão de produção localmente com o seguinte comando:


``
npm run start:prod
``

O sistema estará disponível em http://localhost:8080/ em uma versão otimizada para produção.

<br>

- O projeto utiliza ESLint para análise estática do código e Prettier para formatação. Verifique problemas de linting ou formate o código automaticamente com os seguintes comandos:

``
npm run lint
``

``
npm run format 
``

## Autor <a name="authors"></a>

-   [@Gabriel Assunção](https://github.com/skGab) - Ideia e Construção
