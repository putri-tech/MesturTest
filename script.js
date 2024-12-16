// Mendapatkan elemen dari DOM
var inputField = document.getElementById("inputString");
var resultDiv = document.getElementById("result");
var hitungButton = document.getElementById("hitungButton");

// Menambahkan event listener untuk tombol
hitungButton.addEventListener("click", function() {
    var input = inputField.value.split(""); // Memecah input menjadi array karakter
    var tape = input.concat(Array(100).fill("B")); // Membuat pita dengan karakter input dan simbol kosong
    var head = 0; // Posisi kepala
    var state = "q0"; // Status awal
    var frekuensi = {}; // Objek untuk menyimpan frekuensi karakter

    // Tabel transisi
    var transitionTable = {
        "q0": {
            "B": ["halt", "B", "R"], // Jika kepala di simbol kosong, berhenti
            // Untuk setiap karakter, kita akan menulis kembali karakter dan menghitung frekuensinya
        },
        "q1": {
            "B": ["halt", "B", "R"], // Berhenti jika mencapai akhir pita
            // Tambahkan transisi untuk karakter yang berbeda
        }
    };

    // Menambahkan semua karakter ke tabel transisi
    for (let i = 32; i < 127; i++) { // ASCII dari spasi (32) sampai tilde (126)
        let char = String.fromCharCode(i);
        transitionTable["q0"][char] = ["q1", char, "R"]; // Pindah ke status q1 untuk memproses karakter
        transitionTable["q1"][char] = ["q1", char, "R"]; // Tetap di status q1, tulis karakter yang sama, dan gerakkan ke kanan
    }

    // Mesin Turing untuk menghitung frekuensi karakter
    while (state !== "halt") {
        var currentSymbol = tape[head]; // Membaca simbol di pita
        var action = transitionTable[state][currentSymbol]; // Mendapatkan aksi berdasarkan status dan simbol

        if (action) {
            state = action[0]; // Mengubah status
            tape[head] = action[1]; // Menulis simbol baru di pita
            head += (action[2] === "R" ? 1 : -1); // Menggerakkan kepala

            // Menghitung frekuensi karakter
            if (currentSymbol !== "B") { // Menghitung frekuensi jika bukan simbol kosong
                frekuensi[currentSymbol] = (frekuensi[currentSymbol] || 0) + 1;
            }
        } else {
            state = "halt"; // Jika tidak ada aksi, berhenti
        }
    }

    // Menyusun hasil
    var hasil = "";
    for (var karakter in frekuensi) {
        hasil += karakter + ": " + frekuensi[karakter] + "<br>";
    }

    // Menampilkan hasil
    resultDiv.innerHTML = hasil || "Tidak ada karakter yang dimasukkan.";
});