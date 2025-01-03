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

    fetch("data1.json")
        .then(response => response.json())
        .then(users => {
            // Kullanıcıyı e-posta adresine göre kontrol et
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                feedback.textContent = "Bu e-posta adresi zaten kayıtlı!";
                feedback.style.display = "block";
                feedback.style.backgroundColor = "#f8d7da";
                feedback.style.color = "#721c24";
            } else {
                // Yeni kullanıcı ekle
                const newUser = { id: users.length + 1, name, surname, email, password };
                users.push(newUser);

                feedback.textContent = "Kayıt başarılı! Ana sayfaya yönlendiriliyorsunuz...";
                feedback.style.display = "block";
                feedback.style.backgroundColor = "#d4edda";
                feedback.style.color = "#155724";

                // JSON dosyasına yeni kullanıcıyı kaydetme işlemi (gerçek uygulamada backend kullanılır)
                console.log("Yeni kullanıcı kaydedildi:", newUser);

                // Kayıt işleminden sonra yönlendirme
                setTimeout(() => {
                    window.location.href = "index.html"; // Ana sayfaya yönlendirme
                }, 2000);
            }
        })
        .catch(error => {
            feedback.textContent = "Bir hata oluştu: " + error.message;
            feedback.style.display = "block";
            feedback.style.backgroundColor = "#f8d7da";
            feedback.style.color = "#721c24";
        });
});
