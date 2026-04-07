# Product Requirement Document (PRD)
## Project: Next-Gen CV Builder (Wizard Model)

---

## 1. Ringkasan Eksekutif
* **Nama Proyek:** CV Builder Wizard
* **Platform:** Web (Responsive Desktop & Mobile)
* **Target:** Pengguna yang membutuhkan CV profesional dengan proses instan.
* **Teknologi Utama:** React.js, Supabase (PostgreSQL), Tailwind CSS.

---

## 2. Alur Kerja Pengguna (User Flow)

### **Langkah 0: Landing Page (Hero Section)**
* **Visual:** Header minimalis, Hero section dengan teks persuasif.
* **Fitur:** Image Slider (menggunakan Swiper.js) yang menampilkan mockup desain CV yang elegan.
* **CTA:** Tombol "Buat CV Sekarang" yang mengarah ke pemilihan template.

### **Langkah 1: Pemilihan Desain (Template Selection)**
* **Fitur:** Grid kartu (cards) yang menampilkan preview visual template (bukan sekadar teks).
* **Interaksi:** User mengklik salah satu desain untuk melanjutkan ke pengisian data.

### **Langkah 2: Pengisian Data (Form Wizard)**
Sistem menggunakan *Step-by-Step form* agar user fokus pada satu bagian dalam satu waktu:
1.  **Informasi Pribadi:** Nama, Email, Telepon, Foto Profil (Upload ke Supabase Storage).
2.  **Pengalaman Kerja:** List dinamis (User bisa menambah/menghapus entri kerja).
3.  **Pendidikan:** Riwayat sekolah/universitas.
4.  **Keahlian:** Input skill dengan indikator level atau teks biasa.

### **Langkah 3: Preview Akhir & Kustomisasi**
* **Live Preview:** Tampilan utuh CV yang terisi data user secara real-time.
* **Kustomisasi:** Opsi ganti warna tema (primary color) dan pilihan font (Serif/Sans-serif).

### **Langkah 4: Unduh & Simpan**
* **Fitur:** Tombol "Download PDF".
* **Sistem:** Generate PDF menggunakan `@react-pdf/renderer` dan simpan data ke database Supabase.

---

## 3. Spesifikasi Teknis & Database

### **Arsitektur Database (Supabase)**
| Tabel | Deskripsi |
| :--- | :--- |
| `profiles` | Data akun (ID, Nama, Avatar URL). |
| `resumes` | Data utama CV (ID, User_ID, Template_ID, Color_Theme). |
| `resume_content` | Menggunakan tipe data **JSONB** untuk menyimpan detail dinamis (Experience, Education, Skills). |

### **Tech Stack**
* **Frontend:** React (Vite) + Tailwind CSS.
* **Backend:** Supabase Auth & PostgreSQL.
* **Animation:** Framer Motion (untuk transisi antar step wizard).
* **PDF Engine:** @react-pdf/renderer.

---

## 4. Kebutuhan Non-Fungsional
* **Keamanan:** Row Level Security (RLS) di Supabase agar data privat.
* **Performa:** Optimasi gambar mockup agar Landing Page memuat dengan cepat (< 2 detik).
* **UX:** Progress bar di bagian atas form untuk menunjukkan sejauh mana user telah mengisi data.

---

## 5. Rencana Rilis (Roadmap)
1.  **MVP (Minimum Viable Product):** Landing page sederhana, 1 template dasar, fungsi download PDF.
2.  **V1.1:** Integrasi Supabase Auth (Simpan & Edit).
3.  **V1.2:** Penambahan variasi template (Modern, Creative, ATS).