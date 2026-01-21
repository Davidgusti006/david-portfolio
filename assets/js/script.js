// Animasi gerakan mouse pada gambar profil
const profilePic = document.querySelector(".profile-pic");

profilePic.addEventListener("mousemove", (e) => {
  const rect = profilePic.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  profilePic.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
});

profilePic.addEventListener("mouseleave", () => {
  profilePic.style.transform = "translate(0, 0)";
});

// ==== Background Particles ====
const canvas = document.getElementById("bgParticles");
const ctx = canvas.getContext("2d");

let particles = [];
let w, h;

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.7,
    dy: (Math.random() - 0.5) * 0.7,
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 200, 255, 0.8)`; // warna neon
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Menunggu sampai seluruh konten HTML dimuat
document.addEventListener("DOMContentLoaded", function () {
  // === FITUR 1: MOBILE MENU TOGGLE ===
  const hamburger = document.querySelector(".hamburger-menu");
  const mobileNav = document.querySelector(".mobile-nav");
  const hamburgerIcon = hamburger.querySelector("i");
  // Ambil semua link di dalam mobile-nav
  const navLinks = document.querySelectorAll(".mobile-nav a");

  // Fungsi untuk membuka/tutup menu
  const toggleMenu = () => {
    mobileNav.classList.toggle("active");

    // Animasi ikon hamburger menjadi 'X' (fa-times)
    if (mobileNav.classList.contains("active")) {
      hamburgerIcon.classList.remove("fa-bars");
      hamburgerIcon.classList.add("fa-times");
    } else {
      hamburgerIcon.classList.remove("fa-times");
      hamburgerIcon.classList.add("fa-bars");
    }
  };

  // Event listener untuk tombol hamburger
  hamburger.addEventListener("click", toggleMenu);

  // Event listener untuk setiap link (agar menu tertutup saat link diklik)
  navLinks.forEach((link) => {
    // Jangan tutup menu jika yang diklik adalah tombol tema
    if (!link.classList.contains("theme-toggle")) {
      link.addEventListener("click", toggleMenu);
    }
  });

  // === FITUR 2: ANIMASI SCROLL (FADE-IN & STAGGER) ===

  // Ambil semua section yang punya kelas .hidden
  const hiddenElements = document.querySelectorAll(".hidden");
  // Ambil semua item keahlian (untuk staggered)
  const skillItems = document.querySelectorAll(".skill-item");

  // Opsi untuk Intersection Observer
  const observerOptions = {
    root: null,
    threshold: 0.1, // Picu saat 10% elemen terlihat
  };

  // Buat Observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // Jika elemen terlihat di layar
      if (entry.isIntersecting) {
        // 1. Tampilkan section-nya (animasi fade-in utama)
        entry.target.classList.add("show");

        // 2. LOGIKA BARU: Cek apakah ini section 'Keahlian'
        if (entry.target.id === "skills") {
          // 3. Terapkan animasi staggered (muncul satu per satu)
          skillItems.forEach((item, index) => {
            // Terapkan delay berdasarkan urutan (index)
            setTimeout(() => {
              // 'in-view' adalah kelas di CSS yang membuatnya terlihat
              item.classList.add("in-view");
            }, 150 * index); // delay 150ms per item
          });
        }

        // 4. Berhenti mengobservasi elemen ini (biar animasi tak terulang)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 5. Jalankan Observer pada setiap section .hidden
  hiddenElements.forEach((el) => {
    observer.observe(el);
  });
});

// ======== FITUR 3: KURSOR KUSTOM ========

document.addEventListener("DOMContentLoaded", function () {
  // Cek dulu apakah kita di perangkat non-touch (desktop)
  const isDesktop = !("ontouchstart" in window || navigator.maxTouchPoints);

  // Hanya jalankan jika di desktop
  if (isDesktop) {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    // 1. Fungsi untuk menggerakkan kursor
    window.addEventListener("mousemove", function (e) {
      const posX = e.clientX;
      const posY = e.clientY;

      // Titik (mengikuti langsung)
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      // Outline (ada delay dari transition CSS)
      cursorOutline.style.left = `${posX}px`;
      cursorOutline.style.top = `${posY}px`;
    });

    // 2. Fungsi untuk animasi hover
    // Pilih SEMUA elemen yang ingin memicu animasi hover
    const hoverElements = document.querySelectorAll("a", "button", ".cta-button", ".project-card", ".service-card", ".skill-item", ".social-links a", ".logo");

    // Fungsi untuk menambah kelas 'hover-grow'
    const addHoverClass = () => {
      cursorDot.classList.add("hover-grow");
      cursorOutline.classList.add("hover-grow");
    };

    // Fungsi untuk menghapus kelas 'hover-grow'
    const removeHoverClass = () => {
      cursorDot.classList.remove("hover-grow");
      cursorOutline.classList.remove("hover-grow");
    };

    // Tambahkan event listener ke semua elemen tersebut
    hoverElements.forEach((el) => {
      el.addEventListener("mouseover", addHoverClass);
      el.addEventListener("mouseout", removeHoverClass);
    });
  }
});

// ======== FITUR 4: CHATBOT ========

document.addEventListener("DOMContentLoaded", function () {
  // Ambil semua elemen yang kita butuhkan
  const chatToggleButton = document.querySelector(".chat-toggle-button");
  const chatWidget = document.querySelector(".chat-widget");
  const chatCloseButton = document.querySelector(".chat-close-button");
  const chatInput = document.querySelector(".chat-input");
  const chatSendButton = document.querySelector(".chat-send-btn");
  const chatBody = document.querySelector(".chat-body");

  // 1. Logika untuk Buka / Tutup Chat Widget
  chatToggleButton.addEventListener("click", () => {
    chatWidget.classList.toggle("show");
  });

  chatCloseButton.addEventListener("click", () => {
    chatWidget.classList.remove("show");
  });

  // 2. Logika untuk Mengirim Pesan
  const sendMessage = () => {
    const userInput = chatInput.value.trim();
    if (userInput === "") return; // Jangan kirim pesan kosong

    // Tampilkan pesan user di chat body
    displayMessage(userInput, "user");

    // Kosongkan input field
    chatInput.value = "";

    // Beri jeda sedikit lalu Bot merespons
    setTimeout(() => {
      botResponse(userInput);
    }, 500); // Jeda 0.5 detik
  };

  // 3. Fungsi untuk menampilkan pesan di UI
  const displayMessage = (message, sender) => {
    // Buat elemen div baru untuk pesan
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender); // sender = 'user' atau 'bot'
    messageElement.textContent = message;

    // Tambahkan pesan ke chat body
    chatBody.appendChild(messageElement);

    // Auto-scroll ke pesan terbaru
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  // 4. Fungsi untuk merespons (LOGIKA "AI" SEDERHANA ADA DI SINI)
  const botResponse = (userInput) => {
    const input = userInput.toLowerCase(); // Ubah input jadi huruf kecil
    let response = "";

    // ===== ATURAN CHATBOT (ANDA BISA UBAH INI) =====

    if (input.includes("halo") || input.includes("hai")) {
      response = "Halo! Senang bisa membantu Anda.";
    } else if (input.includes("siapa kamu")) {
      response = "Saya adalah asisten bot untuk portofolio David. Saya di sini untuk membantu menjawab pertanyaan umum.";
    } else if (input.includes("proyek") || input.includes("karya")) {
      response = "Anda bisa melihat semua proyek David di bagian 'Proyek'. Anda juga bisa menanyakan saya tentang proyek spesifik seperti 'e-commerce' atau 'resize'.";
    } else if (input.includes("e-commerce")) {
      response = "Proyek E-commerce adalah aplikasi toko online yang dibangun dengan React dan Node.js.";
    } else if (input.includes("resize")) {
      response = "Proyek Resize Image adalah alat bantu online untuk mengubah ukuran gambar, dibuat murni dengan JavaScript.";
    } else if (input.includes("edukasi")) {
      response = "Proyek Website Edukasi Telekomunikasi adalah situs informatif yang menjelaskan teknologi jaringan.";
    } else if (input.includes("kontak") || input.includes("email") || input.includes("hubungi")) {
      response = "Anda bisa menghubungi David Guti Firmansyah melalui email di: firmansyahd1908@gmail.com";
    } else if (input.includes("terima kasih")) {
      response = "Sama-sama! Senang bisa membantu.";
    } else {
      // Jawaban default jika tidak ada kata kunci yang cocok
      response = "Maaf, saya tidak mengerti. Anda bisa tanyakan tentang 'proyek' atau 'kontak' David.";
    }

    // Tampilkan respons bot
    displayMessage(response, "bot");
  };

  // Event listener untuk tombol Kirim
  chatSendButton.addEventListener("click", sendMessage);

  // Event listener untuk tombol "Enter" di keyboard
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});

// ======== FITUR 5: ACTIVE NAV LINK ON SCROLL ========

document.addEventListener("DOMContentLoaded", function () {
  // 1. Ambil semua section yang memiliki ID di dalam <main>
  const sections = document.querySelectorAll("main section[id]");

  // 2. Ambil semua link navigasi (desktop dan mobile)
  const allNavLinks = document.querySelectorAll(".nav-links a, .mobile-nav a");

  // 3. Opsi untuk observer
  // threshold 0.6 berarti 60% dari section harus terlihat di layar
  const navObserverOptions = {
    root: null,
    threshold: 0.6,
  };

  // 4. Fungsi callback yang akan dijalankan observer
  const navLinkHighlighter = (entries) => {
    entries.forEach((entry) => {
      // Cek apakah section-nya sedang 'masuk' ke viewport
      if (entry.isIntersecting) {
        // Dapatkan ID dari section yang sedang terlihat (cth: "about")
        const sectionId = entry.target.id;

        // Hapus kelas 'active-link' dari SEMUA link terlebih dahulu
        allNavLinks.forEach((link) => {
          if (!link.classList.contains("theme-toggle")) {
            link.classList.remove("active-link");
          }
        });

        // Tambahkan 'active-link' HANYA ke link yang cocok
        try {
          // Cari link yang href-nya cocok (cth: a[href="#about"])
          const matchingLink = document.querySelector(`.nav-links a[href="#${sectionId}"], .mobile-nav a[href="#${sectionId}"]`);
          matchingLink.classList.add("active-link");
        } catch (e) {
          // Tidak masalah jika tidak ada link yang cocok
        }
      }
    });
  };

  // 5. Buat dan jalankan Observer
  const sectionObserver = new IntersectionObserver(navLinkHighlighter, navObserverOptions);

  // 6. Terapkan observer ke setiap section
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
});

// ======== FITUR 6: LIGHT/DARK MODE TOGGLE (BARU) ========

document.addEventListener("DOMContentLoaded", function () {
  // Ambil semua tombol toggle (desktop dan mobile)
  const themeToggles = document.querySelectorAll(".theme-toggle");
  const body = document.body;

  // Fungsi untuk menerapkan tema
  const applyTheme = (theme) => {
    if (theme === "light") {
      body.classList.add("light-mode");
      // Ubah semua ikon menjadi matahari
      themeToggles.forEach((toggle) => {
        toggle.querySelector("i").classList.remove("fa-moon");
        toggle.querySelector("i").classList.add("fa-sun");
      });
      localStorage.setItem("theme", "light");
    } else {
      body.classList.remove("light-mode");
      // Ubah semua ikon menjadi bulan
      themeToggles.forEach((toggle) => {
        toggle.querySelector("i").classList.remove("fa-sun");
        toggle.querySelector("i").classList.add("fa-moon");
      });
      localStorage.setItem("theme", "dark");
    }
  };

  // Fungsi untuk mengganti tema
  const toggleTheme = (e) => {
    e.preventDefault(); // Mencegah link # beraksi
    const currentTheme = body.classList.contains("light-mode") ? "light" : "dark";
    if (currentTheme === "light") {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
  };

  // Tambahkan event listener ke kedua tombol
  themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", toggleTheme);
  });

  // --- Logika Saat Memuat Halaman ---

  // 1. Cek tema yang tersimpan di localStorage
  const savedTheme = localStorage.getItem("theme");

  // 2. Cek tema preferensi OS
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  if (savedTheme) {
    // Jika ada di localStorage, gunakan itu
    applyTheme(savedTheme);
  } else if (prefersLight) {
    // Jika tidak, tapi OS-nya light, gunakan light
    applyTheme("light");
  } else {
    // Jika tidak, gunakan default (dark)
    applyTheme("dark");
  }
});

// Popup form Saran
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".feedback-form");
  const popup = document.getElementById("popup");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // biar tidak reload

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
      });

      if (response.ok) {
        form.reset();
        popup.style.display = "flex"; // ✅ tampilkan popup
        setTimeout(() => closePopup(), 3000);
      } else {
        alert("❌ Gagal mengirim data. Coba lagi ya!");
      }
    } catch (error) {
      alert("⚠️ Terjadi kesalahan jaringan. Pastikan koneksi stabil.");
      console.error(error);
    }
  });
});

function closePopup() {
  document.getElementById("popup").style.display = "none"; // ✅ tutup popup
}

// ======== FITUR 7: MODAL ZOOM GAMBAR SERTIFIKAT ========

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close-modal");

  if (!modal) return; // cegah error jika modal belum ada di halaman

  // Saat gambar sertifikat diklik → tampilkan modal
  document.querySelectorAll(".cert-card img").forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    });
  });

  // Tutup modal saat tombol X diklik
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Tutup modal saat klik di luar gambar
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
