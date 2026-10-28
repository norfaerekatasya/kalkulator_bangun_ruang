
$(document).ready(function () {

    const dataBangun = {
        kubus: {
            nama: "Kubus",
            input: [["s", "Panjang sisi"]]
        },
        balok: {
            nama: "Balok",
            input: [
                ["p", "Panjang"],
                ["l", "Lebar"],
                ["t", "Tinggi"]
            ]
        },
        tabung: {
            nama: "Tabung",
            input: [
                ["r", "Jari-jari"],
                ["t", "Tinggi"]
            ]
        },
        kerucut: {
            nama: "Kerucut",
            input: [
                ["r", "Jari-jari"],
                ["t", "Tinggi"],
                ["s", "Garis pelukis"]
            ]
        },
        bola: {
            nama: "Bola",
            input: [["r", "Jari-jari"]]
        },
        prisma: {
            nama: "Prisma Segitiga",
            input: [
                ["a", "Luas alas segitiga"],
                ["k", "Keliling alas segitiga"],
                ["t", "Tinggi prisma"]
            ]
        },
        limas: {
            nama: "Limas Segiempat",
            input: [
                ["a", "Panjang sisi alas persegi"],
                ["t", "Tinggi limas"],
                ["s", "Tinggi sisi tegak"]
            ]
        },
        limas3: {
            nama: "Limas Segitiga",
            input: [
                ["a", "Luas alas segitiga"],
                ["t", "Tinggi limas"],
                ["s", "Jumlah luas sisi tegak"]
            ]
        }
    };

    // Membuat input berdasarkan pilihan bangun ruang
    function tampilkanInput() {
        const bangun = $("#bangun").val();
        let html = "";

        dataBangun[bangun].input.forEach(function (item) {
            html += `
                <label for="${item[0]}">${item[1]}:</label>
                <input
                    type="number"
                    id="${item[0]}"
                    min="0"
                    step="any"
                    placeholder="Masukkan ${item[1].toLowerCase()}"
                >
            `;
        });

        $("#inputUkuran").html(html);

        $("#hasil").html(`
            <h3>Hasil Perhitungan</h3>
            <p>Masukkan semua ukuran untuk melihat hasil.</p>
        `);
    }

    // Validasi dan mengambil nilai input
    function ambil(id) {
        const nilaiInput = $("#" + id).val();
        const nilai = Number(nilaiInput);

        if (
            nilaiInput.trim() === "" ||
            !Number.isFinite(nilai) ||
            nilai <= 0
        ) {
            throw new Error(
                "Semua ukuran harus diisi dengan angka lebih dari 0!"
            );
        }

        return nilai;
    }

    // Membulatkan hasil maksimal 2 angka desimal
    function format(angka) {
        return angka.toLocaleString("id-ID", {
            maximumFractionDigits: 2
        });
    }

    // Menghitung luas permukaan dan volume
    function hitung(tampilkanPesan = false) {
        const bangun = $("#bangun").val();
        const pi = Math.PI;

        let volume = 0;
        let luas = 0;

        try {
            switch (bangun) {
                case "kubus": {
                    const s = ambil("s");
                    volume = s ** 3;
                    luas = 6 * s ** 2;
                    break;
                }

                case "balok": {
                    const p = ambil("p");
                    const l = ambil("l");
                    const t = ambil("t");

                    volume = p * l * t;
                    luas = 2 * (p * l + p * t + l * t);
                    break;
                }

                case "tabung": {
                    const r = ambil("r");
                    const t = ambil("t");

                    volume = pi * r ** 2 * t;
                    luas = 2 * pi * r * (r + t);
                    break;
                }

                case "kerucut": {
                    const r = ambil("r");
                    const t = ambil("t");
                    const s = ambil("s");

                    if (s < r) {
                        throw new Error(
                            "Garis pelukis kerucut tidak boleh lebih kecil dari jari-jari."
                        );
                    }

                    volume = pi * r ** 2 * t / 3;
                    luas = pi * r * (r + s);
                    break;
                }

                case "bola": {
                    const r = ambil("r");

                    volume = 4 / 3 * pi * r ** 3;
                    luas = 4 * pi * r ** 2;
                    break;
                }

                case "prisma": {
                    const a = ambil("a");
                    const k = ambil("k");
                    const t = ambil("t");

                    volume = a * t;
                    luas = 2 * a + k * t;
                    break;
                }

                case "limas": {
                    const a = ambil("a");
                    const t = ambil("t");
                    const s = ambil("s");

                    volume = a ** 2 * t / 3;
                    luas = a ** 2 + 2 * a * s;
                    break;
                }

                case "limas3": {
                    const a = ambil("a");
                    const t = ambil("t");
                    const s = ambil("s");

                    volume = a * t / 3;
                    luas = a + s;
                    break;
                }
            }

            // Menampilkan hasil dengan animasi
            $("#hasil").stop(true, true).hide().html(`
                <h3>Hasil Perhitungan</h3>
                <p>Bangun ruang: <b>${dataBangun[bangun].nama}</b></p>
                <p>Volume: <b>${format(volume)} satuan³</b></p>
                <p>Luas permukaan: <b>${format(luas)} satuan²</b></p>
            `).fadeIn(400);

        } catch (error) {
            $("#hasil").stop(true, true).hide().html(`
                <h3>Periksa Input</h3>
                <p>${error.message}</p>
            `).fadeIn(200);

            if (tampilkanPesan) {
                $("#inputUkuran input:invalid").first().trigger("focus");
            }
        }
    }

    // Event jQuery: ganti pilihan bangun ruang
    $("#bangun").on("change", function () {
        tampilkanInput();
    });

    $("#btnHitung").on("click", function () {
        hitung(true);
    });

    $("#inputUkuran").on("input", "input", function () {
        hitung(false);
    });

    $("#btnReset").on("click", function () {
        $("#inputUkuran input").val("");

        $("#hasil").stop(true, true).hide().html(`
            <h3>Hasil Perhitungan</h3>
            <p>Masukkan semua ukuran untuk melihat hasil.</p>
        `).fadeIn(300);
    });

    $("#btnHitung, #btnReset").on("click", function () {
        $(this).stop(true, true)
            .animate({ opacity: 0.6 }, 100)
            .animate({ opacity: 1 }, 200);
    });

    tampilkanInput();

});
