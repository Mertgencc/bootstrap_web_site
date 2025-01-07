document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Formun varsayılan submit işlemini engelle

    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("emailRegister").value.trim();
    const password = document.getElementById("passwordRegister").value.trim();
    const feedback = document.getElementById("registerFeedback");

    feedback.style.display = "none"; // Önceden var olan geri bildirim mesajını gizle

    if (name === "" || surname === "" || email === "" || password === "") {
        feedback.textContent = "Lütfen tüm alanları doldurun!";
        feedback.style.display = "block";
        feedback.style.backgroundColor = "#f8d7da";
        feedback.style.color = "#721c24";
        return;
    }

    if (password.length < 6) {
        feedback.textContent = "Şifre en az 6 karakter olmalıdır!";
        feedback.style.display = "block";
        feedback.style.backgroundColor = "#f8d7da";
        feedback.style.color = "#721c24";
        return;
    }

    // Rastgele bir kullanıcı oluşturmak için aşağıdaki fonksiyon kullanılıyor
    const randomUser = generateRandomUser();

    // Kullanıcıyı e-posta adresine göre kontrol et
    if (randomUser.email === email) {
        feedback.textContent = "Bu e-posta adresi zaten kayıtlı!";
        feedback.style.display = "block";
        feedback.style.backgroundColor = "#f8d7da";
        feedback.style.color = "#721c24";
    } else {
        // Yeni kullanıcıyı JSON verilerine ekle
        const newUser = { id: randomUser.id, name, surname, email, password };
        
        feedback.textContent = "Kayıt başarılı! Ana sayfaya yönlendiriliyorsunuz...";
        feedback.style.display = "block";
        feedback.style.backgroundColor = "#d4edda";
        feedback.style.color = "#155724";

        console.log("Yeni kullanıcı kaydedildi:", newUser);

        // Kayıt işleminden sonra yönlendirme
        setTimeout(() => {
            window.location.href = "index.html"; // Ana sayfaya yönlendirme
        }, 2000);
    }
});

// Rastgele kullanıcı verisi oluşturma fonksiyonu
function generateRandomUser() {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const randomNames = ["Ahmet", "Mehmet", "Zeynep", "Fatma", "Ali", "Ayşe", "Murat", "Emre", "Meryem", "Seda"];
    const randomSurnames = ["Yılmaz", "Kaya", "Demir", "Çelik", "Arslan", "Erdem", "Büyük", "Balcı", "Güzel", "Öztürk"];
    const randomEmails = ["example@mail.com", "user@domain.com", "random@mail.net", "email@example.org"];
    const randomPassword = "password" + Math.floor(Math.random() * 1000);

    return {
        id: randomId,
        name: randomNames[Math.floor(Math.random() * randomNames.length)],
        surname: randomSurnames[Math.floor(Math.random() * randomSurnames.length)],
        email: randomEmails[Math.floor(Math.random() * randomEmails.length)],
        password: randomPassword
    };
}
