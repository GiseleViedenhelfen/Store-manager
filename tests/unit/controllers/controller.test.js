const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");

const controller = require("../../../controllers/controller");
const service = require("../../../services/service");
    const response = {};
const request = {};
const exSale = [
  {
    saleId: 1,
    date: "2022-08-16T23:20:17.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2022-08-16T23:20:17.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2022-08-16T23:20:17.000Z",
    productId: 3,
    quantity: 15,
  },
];
describe("Busca todos os produtos na tabela com a getAll", () => {
  describe("Comportamento quando não há nada na tabela products", () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(service, "getAll").resolves([]);
    });
    after(() => {
      service.getAll.restore();
    });
    it("Retorna o status 200", async () => {
      await controller.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it("Retorna um array vazio se não tiver nada na tabela products", async () => {
      await controller.getAll(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });
  describe("Comportamento quando há itens na tabela products", () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon
        .stub(service, "getAll")
        .resolves([{ name: "Traje de encolhimento", id: 2 }]);
    });
    after(() => {
       service.getAll.restore();
    });
    it("Retorna o status 200", async () => {
        await controller.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it("Retorna o array populado", async () => {
       await controller.getAll(request, response);
       expect(
         response.json.calledWith([{ name: "Traje de encolhimento", id: 2 }])
       ).to.be.equal(true);
    });

  });
});
describe("Busca todos as vendas na tabela com a getAllSales", () => {
  describe("Comportamento quando não há nada na tabela sales", () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(service, "getAllSales").resolves(exSale);
    });
    after(() => {
      service.getAllSales.restore();
    });
    it("Retorna o status 200", async () => {
      await controller.getAllSales(request, response);
      expect(response.json.calledWith(exSale)).to.be.equal(true);
    });
  });
});