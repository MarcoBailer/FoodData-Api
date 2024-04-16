const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Carregue os dados do arquivo JSON
const rawDataCategorias = fs.readFileSync('./arquivo_base/categorias.json');
const categoriasFormatadas = await JSON.parse(rawDataCategorias);

const rawDataAlimentos = fs.readFileSync('./arquivo_base/alimentos.json');
const alimentosFormatados = await JSON.parse(rawDataAlimentos);

// Abra uma conexão com o banco de dados SQLite
const db = new sqlite3.Database('./src/database/storage/database.sqlite');

db.run(`CREATE TABLE IF NOT EXISTS categorias (
  id INTEGER PRIMARY KEY,
  nome TEXT
)`);

// Crie uma tabela no banco de dados (se ainda não existir)
db.run(`CREATE TABLE IF NOT EXISTS alimentos (
  id INTEGER PRIMARY KEY,
  categoria_id INTEGER,
  grupo TEXT,
  nome TEXT,
  carboidratos REAL,
  proteinas REAL,
  lipidios REAL,
  calorias REAL,
  fibra_alimentar REAL,
  vitaminas TEXT
  minerais TEXT
  createdAt TEXT,
  updatedAt TEXT
)`);


const stmtCategoria = db.prepare('INSERT INTO categorias (id, nome) VALUES (?, ?)');

categoriasFormatadas.forEach((categoria) => {
  stmtCategoria.run(categoria.id, categoria.nome);
});

// Insira os dados na tabela
const stmt = db.prepare('INSERT INTO alimentos (categoria_id, nome, grupo, carboidratos, proteinas, lipidios, calorias, fibra_alimentar, vitaminas, minerais, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

alimentosFormatados.forEach((alimento) => {
  stmt.run(alimento.categoria_id, alimento.nome, alimento.grupo, alimento.carboidratos, alimento.proteinas, alimento.lipidios, alimento.calorias, alimento.fibra_alimentar, alimento.vitaminas, alimento.minerais, alimento.createdAt, alimento.updatedAt);
});

// Finalize o comando de inserção
stmt.finalize();

// Feche a conexão com o banco de dados
db.close();
