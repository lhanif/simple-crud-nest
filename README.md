## Description

Aplikasi Backend sederhana online shop

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run dev
```

## Run tests

```bash
# e2e tests
$ npm run test:e2e

```

## Why modular pattern ? 
1. Separation of Concerns

Setiap bagian aplikasi — seperti controller, service, dan module — memiliki tanggung jawab terpisah.
Hal ini membuat kode lebih mudah dikembangkan, diuji, dan dikelola tanpa saling bergantung secara berlebihan.

2. Dependency Injection

NestJS menggunakan mekanisme dependency injection bawaan untuk mengelola hubungan antar komponen.
Dengan ini, dependensi seperti service atau repository dapat disuntikkan ke dalam controller dengan mudah dan aman.

3. Testing-Ready Architecture

NestJS menyediakan dukungan penuh untuk unit testing dan end-to-end testing.
Command test, test:e2e, dan test:cov memudahkan penerapan Test-Driven Development (TDD).

4. Aesthetics

Struktur file yang lebih terorganisir akan memberikan kesan rapi dan bersih. Secara teknis, dapat mempermudah proses debugging dan development. Secara psikis, dapat meningkatkan fokus dan mood saat coding.

## Architecture Overview
```bash
[Client Request]
       ↓
   Controller
       ↓
    Service
       ↓
   Repository / Database
       ↓
   Response to Client
```

