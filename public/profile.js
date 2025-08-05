document.addEventListener("DOMContentLoaded", function () {
  const profileForm = document.querySelector("form");

  // Ambil data dari localStorage saat halaman dimuat
  const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
  if (savedProfile) {
    document.querySelector('input[type="text"]').value = savedProfile.nama;
    document.querySelectorAll('input[type="text"]')[1].value = savedProfile.telp;
    document.querySelectorAll('input[type="text"]')[2].value = savedProfile.alamat;
    document.querySelector('input[type="email"]').value = savedProfile.email;
  }

  profileForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.querySelector('input[type="text"]').value;
    const telp = document.querySelectorAll('input[type="text"]')[1].value;
    const alamat = document.querySelectorAll('input[type="text"]')[2].value;
    const email = document.querySelector('input[type="email"]').value;

    const newProfile = {
      nama,
      telp,
      alamat,
      email,
    };

    localStorage.setItem("userProfile", JSON.stringify(newProfile));
    alert("Profil berhasil disimpan, Olan");
  });
});
