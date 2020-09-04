# Faraidh-API v1.0

Faraidh-api is a rest api for determining inheritance rights in accordance with Islamic law.

Basically the properties used in this api use Indonesian language.

There are still many shortcomings in this api, but for the accuracy of determining inheritance rights, the author has tried to make the calculation results in accordance with applicable Islamic law. The author has also tested several case problems to compare whether the results of this api calculation match the results of calculations carried out by experts.

If a calculation error is found in several cases, the authors hope that the user can immediately correct and inform the author to be corrected immediately so that the calculation results from this api are not misleading.

This is the schema flow chart used to build this api ![faraidh_schema](./image/faraidh_schema.png)

List of available endpoints:
​
- `GET /solving`
- `POST /solving`

### GET /solving

GET https://faraidh-api.herokuapp.com/solving

This end point will respond to the format the user will use to request the result of inheritance calculations

Response:

- status: 200
- body:
  ​

```json
{
    "ahli_waris": {
        "anak_laki_laki": 0,
        "cucu_laki_laki": 0,
        "anak_perempuan": 0,
        "cucu_perempuan": 0,
        "ayah": 0,
        "kakek": 0,
        "saudara_saudari_tiri_seibu": 0,
        "saudara_kandung": 0,
        "saudara_tiri_seayah": 0,
        "anak_laki_laki_saudara_kandung": 0,
        "anak_laki_laki_saudara_tiri_seayah": 0,
        "saudara_kandung_ayah": 0,
        "saudara_tiri_seayah_ayah": 0,
        "anak_laki_laki_saudara_kandung_ayah": 0,
        "anak_laki_laki_saudara_tiri_seayah_ayah": 0,
        "saudari_kandung": 0,
        "saudari_seayah": 0,
        "ibu": 0,
        "nenek": 0,
        "ibu_kakek": 0,
        "suami": 0,
        "istri": 0,
        "pria_wanita_yang_memerdekakan_budak": 0
    },
    "total_harta": 0
}
```

### POST /solving

POST https://faraidh-api.herokuapp.com/solving

This end point will respond the result of inheritance calculations

Request:

- data:
  ​

```json
{
    "ahli_waris": {
        "anak_laki_laki": 1,
        "cucu_laki_laki": 2,
        "anak_perempuan": 1,
        "cucu_perempuan": 1,
        "ayah": 0,
        "kakek": 0,
        "saudara_saudari_tiri_seibu": 0,
        "saudara_kandung": 3,
        "saudara_tiri_seayah": 0,
        "anak_laki_laki_saudara_kandung": 10,
        "anak_laki_laki_saudara_tiri_seayah": 0,
        "saudara_kandung_ayah": 0,
        "saudara_tiri_seayah_ayah": 0,
        "anak_laki_laki_saudara_kandung_ayah": 15,
        "anak_laki_laki_saudara_tiri_seayah_ayah": 0,
        "saudari_kandung": 3,
        "saudari_seayah": 0,
        "ibu": 0,
        "nenek": 0,
        "ibu_kakek": 0,
        "suami": 0,
        "istri": 1,
        "pria_wanita_yang_memerdekakan_budak": 0
    },
    "total_harta": 100000
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "penerima_waris": [
        {
            "nama": "anak_laki_laki",
            "bagian_hukum_waris": "2 kali lipat anak perempuan",
            "jumlah_orang": 1,
            "bagian_terhitung": "2/3 dari sisa 7/8",
            "dana_didapat": 58333.33,
            "dana_per_orang": 58333.33
        },
        {
            "nama": "anak_perempuan",
            "bagian_hukum_waris": "1/2 bagian anak laki-laki",
            "jumlah_orang": 1,
            "bagian_terhitung": "1/3 dari sisa 7/8",
            "dana_didapat": 29166.67,
            "dana_per_orang": 29166.67
        },
        {
            "nama": "istri",
            "bagian_hukum_waris": "1/8",
            "jumlah_orang": 1,
            "bagian_terhitung": "1/8",
            "dana_didapat": 12500,
            "dana_per_orang": 12500
        }
    ]
}
```

## Refrences

- Al-Khalafi, ‘Abdul ‘Azhim bin Badawi. 2011. *Al-Wajiz (Edisi Terjemahan)*. Jakarta: As-Sunnah
- Muhammad Abduh Tuasikal, Msc. (2012). *Panduan Ringkas Imlu Waris*. From http://rumaysho.com/waris/panduan-ringkas-ilmu-waris-2502, 22 Mei 2014
- ‘Utsaimin, Muhammad IbnShalih. (2003). *Panduan Praktis Ilmu Waris Menurut  Al-Qur’an dan As-Sunnah yang Shahih*. (Diterjemahkan oleh : Abu Ihsan Al-Atsari). Jakarta: Ibnu Katsir.
