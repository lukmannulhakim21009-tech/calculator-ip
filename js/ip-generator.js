function generatorPage() {
    return `
        <div class="tool-box">
            <h2>IP Generator & Subnet Recommender</h2>
            <p>Generate alokasi IP berdasarkan kebutuhan jumlah host.</p>

            <label>Jumlah Host yang Dibutuhkan</label>
            <input id="reqHosts" type="number" min="1" placeholder="Contoh: 50">

            <label>Base Network IPv4</label>
            <input id="baseIp" placeholder="192.168.1.0">

            <button onclick="generateSubnet()">Generate Recommendation</button>

            <div id="generatorResult"></div>
        </div>
    `;
}

function generateSubnet() {
    const hostsNeeded = parseInt(document.getElementById("reqHosts").value);
    const baseIp = document.getElementById("baseIp").value.trim() || "192.168.1.0";

    if (!hostsNeeded || hostsNeeded <= 0) {
        alert("Masukkan jumlah host yang valid!");
        return;
    }

    // Hitung prefix terkecil yang mencukupi
    let hostBits = 0;
    while ((2 ** hostBits - 2) < hostsNeeded) {
        hostBits++;
    }
    
    const prefix = 32 - hostBits;
    const totalAddresses = 2 ** hostBits;
    const usableHosts = totalAddresses - 2;

    const result = document.getElementById("generatorResult");
    result.innerHTML = `
        <div class="result">
            <h3>Rekomendasi Subnet</h3>
            <p><strong>Kebutuhan Host:</strong> ${hostsNeeded}</p>
            <p><strong>Prefix Direkomendasikan:</strong> /${prefix}</p>
            <p><strong>Kapasitas Maksimal Host:</strong> ${usableHosts} usable IP</p>
            <p><strong>Total Alokasi Block IP:</strong> ${totalAddresses} address</p>
            <p><strong>Contoh Skema Alokasi:</strong> ${baseIp}/${prefix}</p>
        </div>
    `;
}