function switchingPage() {
    return `
        <div class="tool-box">
            <h2>Cisco Switching Command Generator</h2>
            <p>Generate sintaks CLI konfigurasi Switch Cisco IOS.</p>

            <label>Pilih Jenis Konfigurasi</label>
            <select id="switchTemplate" onchange="updateSwitchForm()">
                <option value="vlan">VLAN & Access Port</option>
                <option value="trunk">Trunking Interface</option>
                <option value="port-security">Port Security (Static & Sticky)</option>
            </select>

            <div id="switchInputs"></div>

            <button onclick="generateSwitchConfig()">Generate Command</button>

            <div class="command" id="switchOutput">! Command akan muncul di sini...</div>
        </div>
    `;
}

function routingPage() {
    return `
        <div class="tool-box">
            <h2>Cisco Routing Command Generator</h2>
            <p>Generate sintaks CLI konfigurasi Router Cisco IOS.</p>

            <label>Pilih Jenis Konfigurasi</label>
            <select id="routerTemplate" onchange="updateRouterForm()">
                <option value="interface">Basic Interface IP Assignment</option>
                <option value="static">Static Routing</option>
                <option value="ospf">OSPF Single Area</option>
                <option value="roas">Router on a Stick (Inter-VLAN)</option>
            </select>

            <div id="routerInputs"></div>

            <button onclick="generateRouterConfig()">Generate Command</button>

            <div class="command" id="routerOutput">! Command akan muncul di sini...</div>
        </div>
    `;
}

// Switching logic
function updateSwitchForm() {
    const type = document.getElementById("switchTemplate").value;
    const container = document.getElementById("switchInputs");

    if (type === "vlan") {
        container.innerHTML = `
            <label>Interface</label><input id="swInt" value="FastEthernet0/1">
            <label>VLAN ID</label><input id="vlanId" type="number" value="10">
            <label>VLAN Name</label><input id="vlanName" value="KANTOR">
        `;
    } else if (type === "trunk") {
        container.innerHTML = `
            <label>Interface</label><input id="swInt" value="GigabitEthernet0/1">
            <label>Allowed VLANs</label><input id="allowedVlans" value="10,20,30">
        `;
    } else if (type === "port-security") {
        container.innerHTML = `
            <label>Interface</label><input id="swInt" value="FastEthernet0/2">
            <label>Max MAC Address</label><input id="maxMac" type="number" value="1">
            <label>MAC Binding</label>
            <select id="macType">
                <option value="sticky">Sticky (Auto Learn)</option>
                <option value="static">Static (Manual MAC)</option>
            </select>
            <label>Violation Mode</label>
            <select id="violation">
                <option value="shutdown">Shutdown (Default)</option>
                <option value="restrict">Restrict (Log & Drop)</option>
                <option value="protect">Protect (Drop Silent)</option>
            </select>
        `;
    }
}

function generateSwitchConfig() {
    const type = document.getElementById("switchTemplate").value;
    const intf = document.getElementById("swInt")?.value || "Fa0/1";
    let cmd = `enable\nconfigure terminal\n`;

    if (type === "vlan") {
        const id = document.getElementById("vlanId").value;
        const name = document.getElementById("vlanName").value;
        cmd += `vlan ${id}\n name ${name}\nexit\ninterface ${intf}\n switchport mode access\n switchport access vlan ${id}\n no shutdown\nend`;
    } else if (type === "trunk") {
        const vlans = document.getElementById("allowedVlans").value;
        cmd += `interface ${intf}\n switchport mode trunk\n switchport trunk allowed vlan ${vlans}\n no shutdown\nend`;
    } else if (type === "port-security") {
        const max = document.getElementById("maxMac").value;
        const macType = document.getElementById("macType").value;
        const violation = document.getElementById("violation").value;

        cmd += `interface ${intf}\n switchport mode access\n switchport port-security\n switchport port-security maximum ${max}\n`;
        cmd += macType === "sticky" ? ` switchport port-security mac-address sticky\n` : ` switchport port-security mac-address 00xx.xxxx.xxxx\n`;
        cmd += ` switchport port-security violation ${violation}\n no shutdown\nend`;
    }

    document.getElementById("switchOutput").textContent = cmd;
}

// Routing logic
function updateRouterForm() {
    const type = document.getElementById("routerTemplate").value;
    const container = document.getElementById("routerInputs");

    if (type === "interface") {
        container.innerHTML = `
            <label>Interface</label><input id="rInt" value="GigabitEthernet0/0">
            <label>IP Address</label><input id="rIp" value="192.168.1.1">
            <label>Subnet Mask</label><input id="rMask" value="255.255.255.0">
        `;
    } else if (type === "static") {
        container.innerHTML = `
            <label>Destination Subnet</label><input id="destIp" value="10.10.10.0">
            <label>Subnet Mask</label><input id="destMask" value="255.255.255.0">
            <label>Next Hop / Exit Int</label><input id="nextHop" value="192.168.1.2">
        `;
    } else if (type === "ospf") {
        container.innerHTML = `
            <label>Process ID</label><input id="ospfId" type="number" value="1">
            <label>Network</label><input id="ospfNet" value="192.168.1.0">
            <label>Wildcard Mask</label><input id="ospfWild" value="0.0.0.255">
            <label>Area</label><input id="ospfArea" type="number" value="0">
        `;
    } else if (type === "roas") {
        container.innerHTML = `
            <label>Physical Interface</label><input id="rInt" value="GigabitEthernet0/0">
            <label>VLAN ID</label><input id="vlanId" type="number" value="10">
            <label>Subinterface IP</label><input id="rIp" value="192.168.10.1">
            <label>Subnet Mask</label><input id="rMask" value="255.255.255.0">
        `;
    }
}

function generateRouterConfig() {
    const type = document.getElementById("routerTemplate").value;
    let cmd = `enable\nconfigure terminal\n`;

    if (type === "interface") {
        const intf = document.getElementById("rInt").value;
        const ip = document.getElementById("rIp").value;
        const mask = document.getElementById("rMask").value;
        cmd += `interface ${intf}\n ip address ${ip} ${mask}\n no shutdown\nend`;
    } else if (type === "static") {
        const dest = document.getElementById("destIp").value;
        const mask = document.getElementById("destMask").value;
        const hop = document.getElementById("nextHop").value;
        cmd += `ip route ${dest} ${mask} ${hop}\nend`;
    } else if (type === "ospf") {
        const id = document.getElementById("ospfId").value;
        const net = document.getElementById("ospfNet").value;
        const wild = document.getElementById("ospfWild").value;
        const area = document.getElementById("ospfArea").value;
        cmd += `router ospf ${id}\n network ${net} ${wild} area ${area}\nend`;
    } else if (type === "roas") {
        const intf = document.getElementById("rInt").value;
        const vlan = document.getElementById("vlanId").value;
        const ip = document.getElementById("rIp").value;
        const mask = document.getElementById("rMask").value;
        cmd += `interface ${intf}\n no shutdown\nexit\ninterface ${intf}.${vlan}\n encapsulation dot1Q ${vlan}\n ip address ${ip} ${mask}\nend`;
    }

    document.getElementById("routerOutput").textContent = cmd;
}

// Initialize dynamic forms when page loads
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        if (document.getElementById("switchTemplate")) updateSwitchForm();
        if (document.getElementById("routerTemplate")) updateRouterForm();
    }, 100);
});