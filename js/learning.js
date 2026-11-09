function learningPage() {
    return `
        <div class="tool-box">
            <h2>Learning Center</h2>
            <p>Materi referensi cepat fundamental jaringan komputer dan konfigurasi Cisco IOS.</p>

            <div style="margin-top:20px;">
                <h3>1. OSI 7 Layers Reference</h3>
                <div class="result">
                    <p><strong>Layer 7 - Application:</strong> HTTP, HTTPS, FTP, SSH, DNS, DHCP</p>
                    <p><strong>Layer 6 - Presentation:</strong> SSL/TLS, ASCII, JPEG, Encryption</p>
                    <p><strong>Layer 5 - Session:</strong> NetBIOS, RPC, Sockets</p>
                    <p><strong>Layer 4 - Transport:</strong> TCP, UDP (Segment)</p>
                    <p><strong>Layer 3 - Network:</strong> IP, ICMP, Routing (Packet)</p>
                    <p><strong>Layer 2 - Data Link:</strong> Ethernet, MAC Address, Switch (Frame)</p>
                    <p><strong>Layer 1 - Physical:</strong> Kabel UTP, Fiber Optic, Hub (Bits)</p>
                </div>
            </div>

            <div style="margin-top:20px;">
                <h3>2. Cisco Port Security Violation Modes</h3>
                <div class="result">
                    <p><strong>Protect:</strong> Membuang paket mencurigakan tanpa memicu log syslog.</p>
                    <p><strong>Restrict:</strong> Membuang paket mencurigakan, menambah violation counter, dan mengirim log syslog.</p>
                    <p><strong>Shutdown:</strong> Mematikan interface secara otomatis (status err-disabled).</p>
                </div>
            </div>

            <div style="margin-top:20px;">
                <h3>3. Verification Commands</h3>
                <div class="command">! Perintah diagnostik Cisco IOS:
show ip interface brief
show vlan brief
show interfaces trunk
show ip route
show port-security interface fa0/1
show cdp neighbors</div>
            </div>
        </div>
    `;
}