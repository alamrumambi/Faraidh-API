const Beneficiary = require('./beneficiaryModel');
const dataIndex = require('../helpers/dataIndex');

class Model {
    constructor(ankLk = 0, ccLk = 0, ankPr = 0, ccPr = 0, ayah = 0, kakek = 0, sdrSeibu = 0, sdrKandung = 0, sdrSeayah = 0,
        anLkSdrKandung = 0, anLkSdrSeayah = 0, sdrKandungAyah = 0, sdrSeayahAyah = 0, ankLkSdrKandungAyah = 0, ankLkSdrSeayahAyah = 0,
        sdriKandung = 0, sdriSeayah = 0, ibu = 0, nenek = 0, ibuKakek = 0, suami = 0, istri = 0, mrdekaBudak = 0) {
        this.anak_laki_laki = ankLk,
            this.cucu_laki_laki = ccLk,
            this.anak_perempuan = ankPr,
            this.cucu_perempuan = ccPr,
            this.ayah = ayah,
            this.kakek = kakek,
            this.saudara_saudari_seibu = sdrSeibu,
            this.saudara_kandung = sdrKandung,
            this.saudara_seayah = sdrSeayah,
            this.anak_laki_laki_saudara_kandung = anLkSdrKandung,
            this.anak_laki_laki_saudara_seayah = anLkSdrSeayah,
            this.saudara_kandung_ayah = sdrKandungAyah,
            this.saudara_seayah_ayah = sdrSeayahAyah,
            this.anak_laki_laki_saudara_kandung_ayah = ankLkSdrKandungAyah,
            this.anak_laki_laki_saudara_seayah_ayah = ankLkSdrSeayahAyah,
            this.saudari_kandung = sdriKandung,
            this.saudari_seayah = sdriSeayah,
            this.ibu = ibu,
            this.nenek = nenek,
            this.ibu_kakek = ibuKakek,
            this.suami = suami,
            this.istri = istri,
            this.pria_wanita_yang_memerdekakan_budak = mrdekaBudak
    }

    //main solving
    static solving(body) {
        const {
            anak_laki_laki,
            cucu_laki_laki,
            anak_perempuan,
            cucu_perempuan,
            ayah,
            kakek,
            saudara_saudari_seibu,
            saudara_kandung,
            saudara_seayah,
            anak_laki_laki_saudara_kandung,
            anak_laki_laki_saudara_seayah,
            saudara_kandung_ayah,
            saudara_seayah_ayah,
            anak_laki_laki_saudara_kandung_ayah,
            anak_laki_laki_saudara_seayah_ayah,
            saudari_kandung,
            saudari_seayah,
            ibu,
            nenek,
            ibu_kakek,
            suami,
            istri,
            pria_wanita_yang_memerdekakan_budak
        } = body.ahli_waris;

        if (anak_laki_laki > 0) {
            const kandidatAhliWaris = {
                anak_laki_laki, anak_perempuan, ayah, kakek, suami, istri, ibu, nenek, ibu_kakek
            };
            return this.haveSon(kandidatAhliWaris, body.total_harta);
        }
    }

    //jika punya anak laki-laki
    static haveSon(body, funds) {
        const { anak_laki_laki, anak_perempuan, ayah, kakek, suami, istri, ibu, nenek, ibu_kakek } = body;
        let result = [];

        if (ayah > 0) result.push(new Beneficiary('ayah', '1/6', 1));
        else if (kakek > 0) result.push(new Beneficiary('kakek', '1/6', 1));

        if (suami > 0) result.push(new Beneficiary('suami', '1/4', 1));
        else if (istri > 0) result.push(new Beneficiary('istri', '1/8', istri));

        if (ibu > 0) result.push(new Beneficiary('ibu', '1/6', 1));
        else if (nenek > 0) result.push(new Beneficiary('nenek', '1/6', 1));
        else if (ibu_kakek > 0) result.push(new Beneficiary('ibu_kakek', '1/6', 1));

        let aK, sI, iN;
        for (let i in result) {
            if (result[i].name === 'ayah' || result[i].name === 'kakek') aK = result[i].got;
            else if (result[i].name === 'suami' || result[i].name === 'istri') sI = result[i].got;
            else if (result[i].name === 'ibu' || result[i].name === 'nenek' || result[i].name === 'ibu_kakek') iN = result[i].got;
        }

        if (aK) result[dataIndex(['ayah', 'kakek'], 'name', result)].updateFunds(24 / 6 * funds / 24);
        if (sI) {
            if (dataIndex(['suami'], 'name', result) !== -1) result[dataIndex(['suami'], 'name', result)].updateFunds(24 / 4 * funds / 24);
            else result[dataIndex(['istri'], 'name', result)].updateFunds(24 / 8 * funds / 24);
        }
        if (iN) result[dataIndex(['ibu', 'nenek', 'ibu_kakek'], 'name', result)].updateFunds(24 / 6 * funds / 24);

        for (let i in result) {
            funds -= result[i].funds;
        }

        if (anak_perempuan > 0) {
            result.push(new Beneficiary('anak_laki_laki', '2 kali lipat anak perempuan', anak_laki_laki));
            result.push(new Beneficiary('anak_perempuan', '1/2 bagian anak laki-laki', anak_perempuan));
            result[dataIndex(['anak_laki_laki', 'kakek'], 'name', result)].updateFunds((anak_laki_laki * 2) * funds / ((anak_laki_laki * 2) + anak_perempuan));
            result[dataIndex(['anak_perempuan', 'kakek'], 'name', result)].updateFunds(anak_perempuan * funds / ((anak_laki_laki * 2) + anak_perempuan));
        }
        else {
            result.push(new Beneficiary('anak_laki_laki', 'Sisa pembagian seluruh harta', anak_laki_laki));
            result[dataIndex(['anak_laki_laki', 'kakek'], 'name', result)].updateFunds(funds);
        } 

        return result;
    }
}

module.exports = Model;