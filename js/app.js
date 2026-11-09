
function dashboardPage() {
    return `
        <div class="welcome">
            <h1>Welcome Back!</h1>
            <p>Kelola dan pelajari jaringan komputer di sini.</p>
        </div>

        <div class="grid">
            <div class="card" onclick="showPage('ipv4')">
                <h3>IPv4 Calculator</h3>
                <p>Perhitungan subnet IPv4.</p>
            </div>

            <div class="card" onclick="showPage('ipv6')">
                <h3>IPv6 Calculator</h3>
                <p>Analisis alamat IPv6.</p>
            </div>

            <div class="card" onclick="showPage('generator')">
                <h3>IP Generator</h3>
                <p>Rekomendasi alamat IP.</p>
            </div>

            <div class="card" onclick="showPage('switching')">
                <h3>Switching Commands</h3>
                <p>Konfigurasi Cisco Switch.</p>
            </div>

            <div class="card" onclick="showPage('routing')">
                <h3>Routing Commands</h3>
                <p>Konfigurasi Cisco Router.</p>
            </div>

            <div class="card" onclick="showPage('learning')">
                <h3>Learning Center</h3>
                <p>Materi pembelajaran jaringan.</p>
            </div>
        </div>
    `;
}

function showPage(page) {
    const content = document.getElementById("content");
    const title = document.getElementById("page-title");

    const titles = {
        dashboard: "Dashboard",
        ipv4: "IPv4 Calculator",
        ipv6: "IPv6 Calculator",
        generator: "IP Generator",
        switching: "Cisco Switching",
        routing: "Cisco Routing",
        learning: "Learning Center"
    };

    // Fungsi halaman dipanggil hanya saat dibutuhkan.
    const renderers = {
        dashboard: () => dashboardPage(),

        ipv4: () =>
            typeof ipv4Page === "function"
                ? ipv4Page()
                : unavailablePage("IPv4 Calculator"),

        ipv6: () =>
            typeof ipv6Page === "function"
                ? ipv6Page()
                : unavailablePage("IPv6 Calculator"),

        generator: () =>
            typeof generatorPage === "function"
                ? generatorPage()
                : unavailablePage("IP Generator"),

        switching: () =>
            typeof switchingPage === "function"
                ? switchingPage()
                : unavailablePage("Switching Commands"),

        routing: () =>
            typeof routingPage === "function"
                ? routingPage()
                : unavailablePage("Routing Commands"),

        learning: () =>
            typeof learningPage === "function"
                ? learningPage()
                : unavailablePage("Learning Center")
    };

    if (!renderers[page]) {
        page = "dashboard";
    }

    title.textContent = titles[page];

    content.innerHTML = renderers[page]();

    document.querySelectorAll(".sidebar a").forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.page === page
        );
    });
}

function unavailablePage(name) {
    return `
        <div class="tool-box">
            <h2>${name}</h2>
            <p>Fitur ini belum dikembangkan.</p>
            <p>Silakan lanjutkan pengembangan modul ini.</p>
        </div>
    `;
}

// Navigasi sidebar
document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        showPage(link.dataset.page);
    });
});

// Dark mode
document.getElementById("theme-toggle")
    .addEventListener("click", () => {
        document.body.classList.toggle("light");
    });

// Halaman awal
showPage("dashboard");
