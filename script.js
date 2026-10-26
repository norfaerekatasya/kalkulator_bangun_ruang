const inputUkuran = document.getElementById("inputUkuran");

function tampilkanInput() {
    const bangun = document.getElementById("bangun").value;
    let html = "";

    const data = {
        kubus: [
            ["s", "Panjang sisi"]
        ],
        balok: [
            ["p", "Panjang"],
            ["l", "Lebar"],
            ["t", "Tinggi"]
        ],
        tabung: [
            ["r", "Jari-jari"],
            ["t", "Tinggi"]
        ],
        kerucut: [
            ["r", "Jari-jari"],
            ["t", "Tinggi"],
            ["s", "Garis pelukis"]
        ],
        bola: [
            ["r", "Jari-jari"]
        ],
        prisma: [
            ["a", "Luas alas segitiga"],
            ["k", "Keliling alas segitiga"],
            ["t", "Tinggi prisma"]
        ],
        limas: [
            ["a", "Panjang sisi alas persegi"],
            ["t", "Tinggi limas"],
            ["s", "Tinggi sisi tegak"]
        ],
        limas3: [
            ["a", "Luas alas segitiga"],
            ["t", "Tinggi limas"],
            ["s", "Jumlah luas sisi tegak"]
        ]
    };

    data[bangun].forEach(item => {
        html += `
            <label for="${item[0]}">${item[1]}:</label>
            <input type="number" id="${item[0]}"
            min="0" step="any" placeholder="Masukkan ${item[1].toLowerCase()}">
        `;
    });

    inputUkuran.innerHTML = html;

    document.getElementById("hasil").innerHTML =
        "<h3>Hasil Perhitungan</h3><p>Masukkan ukuran bangun ruang.</p>";
}

function ambil(id) {
    const elemen = document.getElementById(id);
    const nilai = Number(elemen.value);

    if (elemen.value.trim() === "" ||
        !Number.isFinite(nilai) || nilai <= 0) {
        throw new Error("Semua ukuran harus diisi dengan angka lebih dari 0!");
    }

    return nilai;
}

function format(angka) {
    return angka.toLocaleString("id-ID", {
        maximumFractionDigits: 2
    });
}

function hitung() {
    const bangun = document.getElementById("bangun").value;
    const pi = 3.14;

    let nama = "";
    let volume = 0;
    let luas = 0;

    try {
        switch (bangun) {
            case "kubus": {
                const s = ambil("s");
                nama = "Kubus";
                volume = s ** 3;
                luas = 6 * s ** 2;
                break;
            }

            case "balok": {
                const p = ambil("p");
                const l = ambil("l");
                const t = ambil("t");
                nama = "Balok";
                volume = p * l * t;
                luas = 2 * (p*l + p*t + l*t);
                break;
            }

            case "tabung": {
                const r = ambil("r");
                const t = ambil("t");
                nama = "Tabung";
                volume = pi * r ** 2 * t;
                luas = 2 * pi * r * (r + t);
                break;
            }

            case "kerucut": {
                const r = ambil("r");
                const t = ambil("t");
                const s = ambil("s");
                nama = "Kerucut";
                volume = pi * r ** 2 * t / 3;
                luas = pi * r * (r + s);
                break;
            }

            case "bola": {
                const r = ambil("r");
                nama = "Bola";
                volume = 4 / 3 * pi * r ** 3;
                luas = 4 * pi * r ** 2;
                break;
            }

            case "prisma": {
                const a = ambil("a");
                const k = ambil("k");
                const t = ambil("t");
                nama = "Prisma Segitiga";
                volume = a * t;
                luas = 2 * a + k * t;
                break;
            }

            case "limas": {
                const a = ambil("a");
                const t = ambil("t");
                const s = ambil("s");
                nama = "Limas Segiempat";
                volume = a ** 2 * t / 3;
                luas = a ** 2 + 2 * a * s;
                break;
            }

            case "limas3": {
                const a = ambil("a");
                const t = ambil("t");
                const s = ambil("s");
                nama = "Limas Segitiga";
                volume = a * t / 3;
                luas = a + s;
                break;
            }
        }

        const pesan =
            "Bangun Ruang: " + nama +
            "\nVolume: " + format(volume) + " satuan kubik" +
            "\nLuas Permukaan: " + format(luas) + " satuan persegi";

        document.getElementById("hasil").innerHTML = `
            <h3>Hasil Perhitungan</h3>
            <p>
                Bangun ruang: <b>${nama}</b><br>
                Volume: <b>${format(volume)} satuan³</b><br>
                Luas permukaan: <b>${format(luas)} satuan²</b>
            </p>
        `;

        alert(pesan);

    } catch (error) {
        alert(error.message);
    }
}

function resetForm() {
    tampilkanInput();
}

tampilkanInput();
