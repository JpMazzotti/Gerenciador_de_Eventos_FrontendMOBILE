 Gerenciador de Eventos - Frontend Mobile

Aplicativo mobile feito com **React Native** e **Expo** para gerenciar eventos. Ele se conecta a um **backend** (API) para fazer login, cadastrar administradores e criar/editar/excluir eventos.

> Este repositório é o **frontend** (app). Ele depende de um **backend** rodando na porta `8080` para funcionar.

---

## 📦 Instalação

Abra o terminal na pasta do projeto e rode:

```bash
npm install
Esse comando baixa todas as dependências (bibliotecas) que o projeto precisa.
📱 Como rodar no celular
1. Com o backend rodando, execute:
npx expo start
2. No celular, abra o app Expo Go.
3. Escaneie o QR code que aparece no terminal.
4. Pronto! O app vai abrir no celular.


- ⚠️ O celular e o computador precisam estar no mesmo Wi-Fi.
- Atalhos úteis no terminal:
- a → abre no emulador Android
- i → abre no simulador iOS
- w → abre no navegador (web)
- r → recarrega o app


🌐 Como rodar no navegador (web)
npm run web
O app vai abrir no navegador. As funcionalidades são as mesmas do celular.
🔌 Como o app encontra o backend
O arquivo src/api/config.ts define o endereço da API automaticamente:
const hostUri = Constants.expoConfig?.hostUri
if (hostUri) {
  const host = hostUri.split(':')[0]
  return `http://${host}:8080` // usa o IP do seu computador + porta 8080
}
return 'http://localhost:8080'
Ou seja: o app pega o IP do seu computador (da conexão do Expo) e usa a porta 8080. Por isso o backend precisa estar nessa porta.
Se quiser trocar a porta ou forçar um IP fixo, edite esse arquivo.
Endpoints usados pela API
Método	Rota
POST	/api/auth/login
POST	/api/auth/cadastro
GET	/api/eventos
POST	/api/eventos
PUT	/api/eventos/:id
DELETE	/api/eventos/:id




✨ Funcionalidades
- Login com e-mail e senha
- Opção "Lembrar minha senha" (salva as credenciais no celular via AsyncStorage)
- Cadastro de administrador
- Listar eventos (nome, data, local e imagem)
- Criar evento
- Editar evento (data e local)
- Excluir evento (com confirmação)
- Sessão mantida mesmo fechando o app (token salvo no dispositivo)


📁 Estrutura do projeto
Pasta / Arquivo	Para que serve
src/app/	Rotas do app (telas) usando expo-router
src/app/_layout.tsx	Layout raiz (configura navegação e autenticação)
src/app/index.tsx	Tela de login (/)
src/app/home.tsx	Tela principal com os eventos (/home)
src/app/cadastro.tsx	Tela de cadastro (/cadastro)
src/components/	Componentes reutilizáveis (botão, input, card, modal)
src/pages/	Telas de verdade (lógica + visual)
src/api/	Código que fala com o backend
src/context/	Contexto de autenticação (login/logout globais)
src/storage/	Salvar/ler dados no celular (AsyncStorage)
src/utils/	Utilitários (cores/tema e formatação de datas)
src/types/	Tipos TypeScript usados no projeto



🛠️ Tecnologias
- React Native 0.81
- Expo SDK 54
- Expo Router (navegação por arquivos)
- TypeScript
- AsyncStorage (dados no celular)
