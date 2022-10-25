const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");

const service = require("../../../services/service");
const model = require("../../../models/model");

describe("Busca todos os produtos na tabela com a getAll", () => {
  describe("Comportamento quando não há nada na tabela products", () => {
    before(() => {
       const result = [];
      sinon.stub(model, 'getAll').resolves(result);
    });
    after(() => {
      model.getAll.restore();
    });
    it("Retorna um array vazio", async () => {
      const result = await service.getAll();
      expect(result).to.be.an("array");
      expect(result).to.be.empty;
    });
  });
  describe("Comportamento quando há itens na tabela products", () => {
      before(() => {
        const result = [{ name: "Traje de encolhimento", id: 2 }];
        sinon.stub(model, "getAll").resolves(result);
      });
      after(() => {
        model.getAll.restore();
      });
    it("Retorna um array populado", async () => {
      const result = await service.getAll();
      expect(result).to.be.an("array");
      expect(result).to.be.not.empty;
    });
    it("Retorna o array populado de objeto com as chaves id e name", async () => {
      const result = await service.getAll();
      const selected = result[0];
      expect(selected).to.be.an("object");
      expect(selected).to.all.keys("id", "name");
    });
  });
});
describe("Busca todos as vendas na tabela com a getAllSales", () => {
  describe('Comportamento quando não há nada na tabela sales', () => {
 before(() => {
   const result = [];
   sinon.stub(model, "getAllSales").resolves(result);
 });
 after(() => {
   model.getAllSales.restore();
 });
     it("Retorna um array vazio", async () => {
       const result = await service.getAllSales();
       expect(result).to.be.an("array");
       expect(result).to.be.empty;
     });
  });
  describe('Comportamento quando há itens na tabela Sales', () => {
 before(() => {
  const result = [{ id: 1, date: "2022-08-16T21:42:02.000Z" }];
  sinon.stub(model, "getAllSales").resolves(result);
 });
 after(() => {
   model.getAllSales.restore();
 });
  it("Retorna um array populado", async () => {
    const result = await service.getAllSales();
    expect(result).to.be.an("array");
    expect(result).to.be.not.empty;
  });
  it("Retorna o array populado de objeto com as chaves id e date", async () => {
    const result = await service.getAllSales();
    const selected = result[0];
    expect(selected).to.be.an("object");
    expect(selected).to.all.keys("id", "date");
    });
  });
});