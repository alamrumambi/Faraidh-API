class Model {
    constructor (name, got, nop) {
        this.name = name,
        this.got = got,
        this.funds = 0,
        this.numberOfPeople = nop,
        this.perPerson = this.funds/ nop
    }

    updateFunds(value) {
        this.funds = Number(value.toFixed(2));
        this.perPerson = Number((value/ this.numberOfPeople).toFixed(2));
    }
}

module.exports = Model;