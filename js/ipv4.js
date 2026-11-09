
function ipv4Page() {
    return `
        <div class="tool-box">
            <h2>IPv4 Calculator</h2>
            <p>Kalkulator alamat IP dan subnetting.</p>

            <label>IP Address</label>
            <input id="ipAddress" placeholder="192.168.1.10">

            <label>CIDR Prefix</label>
            <select id="cidr">
                <option value="24">/24</option>
                <option value="25">/25</option>
                <option value="26">/26</option>
            </select>

            <button onclick="calculateIPv4()">Calculate</button>

            <div id="ipv4Result"></div>
        </div>
    `;
}

function calculateIPv4() {
    const ip = document.getElementById("ipAddress").value.trim();
    const prefix = Number(document.getElementById("cidr").value);

    const parts = ip.split(".");

    if (
        parts.length !== 4 ||
        parts.some(p => !/^\d+$/.test(p) ||
        Number(p) < 0 || Number(p) > 255)
    ) {
        alert("IPv4 Address tidak valid!");
        return;
    }

    const numbers = parts.map(Number);

    const ipNumber = numbers.reduce(
        (result, octet) => result * 256 + octet, 0
    );

    const mask = prefix === 0
        ? 0
        : (0xFFFFFFFF << (32-prefix)) >>> 0;

    const network = (ipNumber & mask) >>> 0;
    const broadcast = (network | (~mask >>> 0)) >>> 0;

    const toIP = number => [
        number >>> 24,
        (number >>> 16) & 255,
        (number >>> 8) & 255,
        number & 255
    ].join(".");

    const subnetMask = toIP(mask);
    const networkIP = toIP(network);
    const broadcastIP = toIP(broadcast);
    const wildcard = toIP((~mask) >>> 0);

    const total = 2 ** (32-prefix);
    const usable = prefix <= 30 ? total - 2 :
                   prefix === 31 ? 2 : 1;

    const firstHost = prefix <= 30
        ? toIP(network + 1)
        : prefix === 31 ? networkIP : networkIP;

    const lastHost = prefix <= 30
        ? toIP(broadcast - 1)
        : toIP(broadcast);

    const result = document.getElementById("ipv4Result");

    result.innerHTML = `
        <div class="result">
            <h3>Hasil Perhitungan</h3>
            <p>IP Address: ${ip}</p>
            <p>CIDR: /${prefix}</p>
            <p>Subnet Mask: ${subnetMask}</p>
            <p>Wildcard Mask: ${wildcard}</p>
            <p>Network Address: ${networkIP}</p>
            <p>Broadcast Address: ${broadcastIP}</p>
            <p>First Host: ${firstHost}</p>
            <p>Last Host: ${lastHost}</p>
            <p>Total Address: ${total}</p>
            <p>Usable Host: ${usable}</p>
            <button onclick="copyIPv4()">Copy IP</button>
        </div>
    `;

    window.currentIPv4 = ip;
}

function copyIPv4() {
    navigator.clipboard.writeText(window.currentIPv4)
        .then(() => alert("IP berhasil disalin!"));
}
