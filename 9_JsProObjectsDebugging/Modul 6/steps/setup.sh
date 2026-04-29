#!/bin/bash

# Pasul 1: Inițializare proiect Node.js
git init
npm init -y

# Pasul 2: Instalare Webpack + TypeScript + loadere
npm i -D webpack webpack-cli html-webpack-plugin
npm i -D mini-css-extract-plugin copy-webpack-plugin
npm i -D css-loader postcss-loader sass sass-loader style-loader
npm i -D typescript ts-loader babel-loader
npm i -D @types/bootstrap

# Pasul 3: Instalare dependente runtime
npm i bootstrap bootstrap-icons jquery @popperjs/core autoprefixer

# Pasul 4: Creare directoare
mkdir -p dist
mkdir -p src/assets/scss/fonts src/assets/images
mkdir -p src/js/components src/js/contexts
mkdir -p src/types

# Pasul 5: Copiere fonturi Bootstrap Icons din CDN
curl -o src/assets/scss/fonts/bootstrap-icons.woff https://cdn.jsdelivr.net/npm/bootstrap-icons/font/fonts/bootstrap-icons.woff
curl -o src/assets/scss/fonts/bootstrap-icons.woff2 https://cdn.jsdelivr.net/npm/bootstrap-icons/font/fonts/bootstrap-icons.woff2
curl -o src/assets/scss/fonts/bootstrap-icons.ttf https://cdn.jsdelivr.net/npm/bootstrap-icons/font/fonts/bootstrap-icons.ttf
curl -o src/assets/scss/fonts/bootstrap-icons.svg https://cdn.jsdelivr.net/npm/bootstrap-icons/font/fonts/bootstrap-icons.svg

# Pasul 6: Creare fisiere TypeScript
touch webpack.config.js tsconfig.json
touch src/index.html
touch src/index.ts src/about.ts
touch src/assets/scss/styles.scss
touch src/js/main.ts src/js/nav_sticky.ts
touch src/js/components/Component.ts src/js/components/App.ts src/js/components/About.ts
touch src/js/components/CartItem.ts src/js/components/CartList.ts
touch src/js/components/Footer.ts src/js/components/Header.ts
touch src/js/components/ProductItem.ts src/js/components/ProductList.ts
touch src/js/contexts/CartContext.ts
touch src/types/global.d.ts

# Pasul 7: Configurare Git
touch .gitignore
echo "node_modules/" >> .gitignore
echo "dist/" >> .gitignore

