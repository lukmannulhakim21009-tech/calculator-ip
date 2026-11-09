function ipv6Page() {
    return `
        <div class="tool-box">
            <h2>IPv6 Calculator & Analyzer</h2>
            <p>Analisis, kompresi, dan verifikasi alokasi alamat IPv6.</p>

            <label>IPv6 Address</label>
            <input id="ipv6Input" placeholder="fe80::1ff:fe23:4567:890a atau 2001:0db8:0000:0000:0000:0000:0000:0001">

            <label>Prefix Length (CIDR)</label>
            <input id="ipv6Prefix" type="number" min="1" max="128" value="64">

            <button onclick="analyzeIPv6()">Analyze IPv6</button>

            <div id="ipv6Result"></div>
        </div>
    `;
}

function analyzeIPv6() {
    const input = document.getElementById("ipv6Input").value.trim().toLowerCase();
    const prefix = document.getElementById("ipv6Prefix").value;

    if (!input || !validateIPv6(input)) {
        alert("Alamat IPv6 tidak valid!");
        return;
    }

    const expanded = expandIPv6(input);
    const compressed = compressIPv6(expanded);
    const type = getIPv6Type(expanded);

    const result = document.getElementById("ipv6Result");
    result.innerHTML = `
        <div class="result">
            <h3>Hasil Analisis IPv6</h3>
            <p><strong>Compressed Format:</strong> ${compressed}</p>
            <p><strong>Expanded Format:</strong> ${expanded}</p>
            <p><strong>Prefix Length:</strong> /${prefix}</p>
            <p><strong>Address Type:</strong> ${type}</p>
            <p><strong>Total Host Addresses:</strong> 2<sup>${128 - prefix}</sup></p>
        </div>
    `;
}

function validateIPv6(ip) {
    const regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::$|^::1$|^([0-9a-fA-F]{1,4}:){1,7}:|^:((:[0-9a-fA-F]{1,4}){1,7}|:)$|^([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$/;
    return regex.test(ip) || ip.includes("::");
}

function expandIPv6(ip) {
    let sections = ip.split("::");
    let left = sections[0] ? sections[0].split(":") : [];
    let right = sections[1] ? sections[1].split(":") : [];
    
    if (sections.length > 1) {
        let missing = 8 - (left.length + right.length);
        let zeros = Array(missing).fill("0000");
        sections = [...left, ...zeros, ...right];
    } else {
        sections = left;
    }

    return sections.map(s => s.padStart(4, "0")).join(":");
}

function compressIPv6(expandedIp) {
    let sections = expandedIp.split(":").map(s => s.replace(/^0+/, "") || "0");
    let str = ":" + sections.join(":") + ":";
    
    let bestMatch = "";
    let match;
    const zeroSeq = /(?::0)+:/g;
    
    while ((match = zeroSeq.exec(str)) !== null) {
        if (match[0].length > bestMatch.length && match[0].split(":").length > 3) {
            bestMatch = match[0];
        }
    }

    if (bestMatch) {
        str = str.replace(bestMatch, "::");
    }
    
    return str.replace(/^:|:$/g, "");
}

function getIPv6Type(expandedIp) {
    if (expandedIp === "0000:0000:0000:0000:0000:0000:0000:0000") return "Unspecified (::)";
    if (expandedIp === "0000:0000:0000:0000:0000:0000:0000:0001") return "Loopback (::1)";
    if (expandedIp.startsWith("fe80")) return "Link-Local Unicast";
    if (expandedIp.startsWith("fc") || expandedIp.startsWith("fd")) return "Unique Local Unicast";
    if (expandedIp.startsWith("ff")) return "Multicast";
    if (parseInt(expandedIp.substring(0, 4), 16) >= 0x2000 && parseInt(expandedIp.substring(0, 4), 16) <= 0x3fff) {
        return "Global Unicast";
    }
    return "Reserved / Unknown";
}