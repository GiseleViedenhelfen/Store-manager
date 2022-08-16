const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");

const controller = require("../../../controllers/controller");
const service = require("../../../services/service");

describe("Busca todos os produtos na tabela com a getAll", () => {
  describe("Comportamento quando não há nada na tabela products", () => {
    const response = {};
    const request = {};
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
    const response = {};
    const request = {};
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