// Form gönderildiğinde giriş işlemini kontrol et
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Formun varsayılan gönderim işlemini engelle
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const feedbackElement = document.getElementById('feedback');
    
    // JSON dosyasını fetch ile yükle
    fetch('data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('JSON dosyası yüklenemedi');
        }
        return response.json();
      })
      .then(users => {
        // Kullanıcıyı doğrula
        const user = users.find(user => user.email === email && user.password === password);
  
        if (user) {
          feedbackElement.style.display = 'block';
          feedbackElement.className = 'feedback success';
          feedbackElement.textContent = `Giriş başarılı! Hoş geldiniz, ${user.name}`;
        } else {
          feedbackElement.style.display = 'block';
          feedbackElement.className = 'feedback error';
          feedbackElement.textContent = 'E-posta veya şifre hatalı!';
        }
      })
      .catch(error => {
        console.error('Hata:', error);
        feedbackElement.style.display = 'block';
        feedbackElement.className = 'feedback error';
        feedbackElement.textContent = 'Bir hata oluştu, lütfen tekrar deneyin.';
      });
  });
  