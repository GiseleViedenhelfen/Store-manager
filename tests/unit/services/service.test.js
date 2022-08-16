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
    it("Retorna um array", async () => {
      const result = await service.getAll();
      expect(result).to.be.an("array");
    });
    it("Retorna um array vazio se não tiver nada na tabela products", async () => {
      const result = await service.getAll();
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
    it("Retorna um array", async () => {
      const result = await service.getAll();
      expect(result).to.be.an("array");
    });
    it("Retorna o array populado", async () => {
      const result = await service.getAll();
      expect(result).to.be.not.empty;
    });
    it("Retorna o array populado de objeto", async () => {
      const result = await service.getAll();
      const selected = result[0];
      expect(selected).to.be.an("object");
    });
    it("Retorna o objeto dentro do array inclua as chaves id e name", async () => {
      const result = await service.getAll();
      const selected = result[0];
      expect(selected).to.all.keys("id", "name");
    });
  });
});