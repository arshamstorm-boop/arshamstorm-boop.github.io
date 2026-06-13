    // auth.js

    // 1. Firebase رو مقداردهی اولیه کن
    // این قسمت رو فقط اگر در جای دیگری Firebase رو مقداردهی اولیه نکرده باشی، لازمه.
    // فرض می‌کنیم که در حال حاضر در فایل دیگری این کار را انجام ندادی.
    import { initializeApp } from 'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js'; // از CDN استفاده می‌کنیم
    import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js'; // از CDN استفاده می‌کنیم

    const firebaseConfig = {
      apiKey: "AIzaSyA8uxWsvCcaj94MNmdlENvXe6DnvI21_u0",
      authDomain: "ars-system-25319.firebaseapp.com",
      projectId: "ars-system-25319",
      storageBucket: "ars-system-25319.firebasestorage.app",
      messagingSenderId: "153129390194",
      appId: "1:153129390194:web:4fdbf3c51221e4345a72eb",
      measurementId: "G-5TDFWW6ZQH"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    // 2. دکمه ورود با گوگل رو پیدا کن و رویداد کلیک رو بهش اضافه کن
    const loginButton = document.getElementById('login-button'); // فرض می‌کنیم یه دکمه با این ID در index.html داری

    if (loginButton) {
      loginButton.addEventListener('click', async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          // ورود موفقیت آمیز بود!
          const user = result.user;
          console.log("کاربر وارد شد:", user);
          // اینجا می‌تونی کاری کنی که بعد از ورود کاربر انجام بشه، مثلاً هدایت به صفحه دیگه
          // window.location.href = '/dashboard.html'; // مثال: هدایت به صفحه داشبورد
        } catch (error) {
          // خطا در ورود
          console.error("خطا در ورود:", error);
          // می‌تونی پیام خطا رو به کاربر نشون بدی
        }
      });
    } else {
      console.error("دکمه ورود با ID 'login-button' پیدا نشد!");
    }

    // 3. وضعیت ورود کاربر رو مدیریت کن (چک کن که کاربر وارد شده یا نه)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // کاربر وارد شده است
        console.log("کاربر در حال حاضر وارد شده است:", user);
        // اینجا می‌تونی UI رو بر اساس اینکه کاربر وارد شده، تغییر بدی
        // مثلاً دکمه ورود رو مخفی کنی و اطلاعات کاربر رو نشون بدی
        if (loginButton) {
          loginButton.style.display = 'none'; // دکمه ورود رو مخفی کن
          // اینجا می‌تونی یه عنصری برای نمایش نام یا عکس کاربر اضافه کنی
          // مثلاً: document.getElementById('user-greeting').innerText = `سلام ${user.displayName}`;
        }
      } else {
        // کاربر وارد نشده است
        console.log("کاربر خارج شده است.");
        // اینجا می‌تونی UI رو برای حالت خروج تنظیم کنی
        // مثلاً دکمه ورود رو دوباره نشون بدی
        if (loginButton) {
          loginButton.style.display = 'block'; // دکمه ورود رو نمایش بده
        }
      }
    });
