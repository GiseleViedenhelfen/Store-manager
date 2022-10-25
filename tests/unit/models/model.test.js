const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");

const connection = require('../../../models/connect');
const model = require('../../../models/model');

describe('Busca todos os produtos na tabela com a getAll', () => {
  describe('Comportamento quando não há nada na tabela products', () => {
    before(() => {
      const result = [[], []];
      sinon.stub(connection, "execute").resolves(result);
    })
    after(() => {
      connection.execute.restore();
    });
    it('Retorna um array', async () => {
      const result = await model.getAll();
      expect(result).to.be.an('array');
    });
    it("Retorna um array vazio se não tiver nada na tabela products", async () => {
      const result = await model.getAll();
      expect(result).to.be.empty;
    });
  });
  describe('Comportamento quando há itens na tabela products', () => {
    before(() => {
      const result = [[{ name: 'Traje de encolhimento', id: 2 }], []];
      sinon.stub(connection, "execute").resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Retorna um array", async () => {
      const result = await model.getAll();
      expect(result).to.be.an("array");
    });
    it("Retorna o array populado", async () => {
      const result = await model.getAll();
      expect(result).to.be.not.empty;
    });
    it("Retorna o array populado de objeto", async () => {
      const result = await model.getAll();
      const selected = result[0];
      expect(selected).to.be.an("object");
    });
    it("Retorna o objeto dentro do array inclua as chaves id e name", async () => {
      const result = await model.getAll();
      const selected = result[0];
      expect(selected).to.all.keys('id', 'name');
    });
  })
});
describe("Busca todos as vendas na tabela com a getAllSales", () => {
  describe('Comportamento quando não há nada na tabela sales', () => {
 before(() => {
   const result = [[], []];
   sinon.stub(connection, "execute").resolves(result);
 });
 after(() => {
   connection.execute.restore();
 });
     it("Retorna um array", async () => {
       const result = await model.getAllSales();
       expect(result).to.be.an("array");
     });
     it("Retorna um array vazio se não tiver nada na tabela sales", async () => {
       const result = await model.getAllSales();
       expect(result).to.be.empty;
     });
  })
  describe("Comportamento quando há itens na tabela sales", () => {
     before(() => {
       const result = [[{ id: 1, date: '2022-08-16T21:42:02.000Z' }], []];
       sinon.stub(connection, "execute").resolves(result);
     });
     after(() => {
       connection.execute.restore();
     });
     it("Retorna um array", async () => {
       const result = await model.getAllSales();
       expect(result).to.be.an("array");
     });
    it("Retorna o array populado", async () => {
      const result = await model.getAllSales();
      expect(result).to.be.not.empty;
    });
      it("Retorna o array populado de objeto", async () => {
        const result = await model.getAllSales();
        const selected = result[0];
        expect(selected).to.be.an("object");
      });
    it("Retorna o objeto dentro do array inclua as chaves id e date", async () => {
      const result = await model.getAllSales();
      const selected = result[0];
      expect(selected).to.all.keys("id", "date");
    });
  });
});