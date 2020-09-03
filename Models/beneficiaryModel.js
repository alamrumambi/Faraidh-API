class Penerima_Waris {
    constructor (name, got, nop) {
        this.nama = name,
        this.bagian_hukum_waris = got,
        this.jumlah_orang = nop,
        this.bagian_terhitung = '',
        this.dana_didapat = 0,
        this.dana_per_orang = this.dana_didapat/ nop
    }

    updateFunds(value) {
        this.dana_didapat = Number(value.toFixed(2));
        this.dana_per_orang = Number((value/ this.jumlah_orang).toFixed(2));
    }

    updateCountPart(value) {
        this.bagian_terhitung = value;
    }
}

module.exports = Penerima_Waris;