//Intersection Observer API

// This for "anim"
// settings
let options = {
    root: null,
    rootMargin: '-20px 0px',
    threshold: 0.5
}

//callback function
let callback = function(entries, observer) {
    entries.forEach(entry => {
        //если элемент является наблюдаемым
        if (entry.isIntersecting) {
            //давим класс active к нему
            entry.target.classList.add('active');
            //можно отписаться от наблюдения:
            //observer.unobserve(entry.target);
        } else { // удаляем класс active, если элемент не виден
            entry.target.classList.remove('active');
        }
    });
}

//наблюдатель
let observer = new IntersectionObserver(callback, options);

//опрееляем элементы, за которыми наблюдаем
let targets = document.querySelectorAll('.anim')
targets.forEach(target => {
    observer.observe(target);
});



// Fir Countdown
const countdown = document.querySelector('.countdown');
const targetDate = new Date('2025-09-23T12:00:00');
 
function updateCountdown() {
  const now = new Date();
  const remainingTime = targetDate - now;
 
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
 
  document.getElementById('days').innerText = days.toString().padStart(2, '0');
  document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
  document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}
 
// Обновляем счетчик каждую секунду
setInterval(updateCountdown, 1000);


// audio play
const playStopIcon = document.getElementById('playStopIcon');
const audio = document.getElementById('audio');
const play = document.querySelector('.audio-btn__play'),
      stop = document.querySelector('.audio-btn__stop');

window.addEventListener('load', () => {
    if (audio.paused) {
        play.classList.add('btn-hidden'),
        stop.classList.remove('btn-hidden');
    } else {
        play.classList.remove('btn-hidden'),
        stop.classList.add('btn-hidden');
    }
});

playStopIcon.addEventListener('click', function () {
    if (audio.paused) {
        audio.play(),
        play.classList.remove('btn-hidden'),
        stop.classList.add('btn-hidden');
    } else {
        audio.pause(),
        play.classList.add('btn-hidden'),
        stop.classList.remove('btn-hidden');
    }
}
);


// JavaScript отвечает за каждое касание (стилизация кнопки при касании на сенсорном утсройстве (UX))
document.addEventListener('touchstart', function(event) {
    if (event.target && event.target.matches('.button')) {
        event.target.classList.add('button__touch');
    }
});

document.addEventListener('touchend', function(event) {
    if (event.target && event.target.matches('.button')) {
        event.target.classList.remove('button__touch');
    }
});

// Для проверки добавления класса на десктопе
document.addEventListener('click', function(event) {
    if (event.target && event.target.matches('.button')) {
        event.target.classList.add('button__touch');
        setTimeout(function() {
            event.target.classList.remove('button__touch');
        }, 200); // Убираем класс через 200ms
    }
});

    // Логика для чекбокса 'Не пью алкоголь'
    const alcoholNone = document.getElementById('non-alcoholic');
    const alcoholCheckboxes = document.querySelectorAll('input[name="drinking[]"]:not(#non-alcoholic)');
    if (alcoholNone && alcoholCheckboxes.length) {
        alcoholNone.addEventListener('change', function() {
            if (this.checked) {
                alcoholCheckboxes.forEach(cb => {
                    cb.checked = false;
                    cb.disabled = true;
                });
            } else {
                alcoholCheckboxes.forEach(cb => {
                    cb.disabled = false;
                });
            }
        });
        alcoholCheckboxes.forEach(cb => {
            cb.addEventListener('change', function(e) {
                if (alcoholNone.checked) {
                    // Не даём выбрать алкоголь, если выбран 'Не пью алкоголь'
                    e.preventDefault();
                    this.checked = false;
                    return false;
                }
                if (this.checked && alcoholNone.checked) {
                    alcoholNone.checked = false;
                    alcoholCheckboxes.forEach(box => box.disabled = false);
                }
            });
        });
    }




 // Ниже - отправка формы с обраоткой на стороне серврера через send.php
 document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector("button[type='submit']");
  const toast = document.getElementById("form-toast");
  const formData = new FormData(form);

  // Блокируем кнопку и меняем текст на "Отправка..."
  submitBtn.disabled = true;
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Отправка...";

  // --- ВАРИАНТ 1: РЕАЛЬНАЯ ОТПРАВКА НА СЕРВЕР send.php ---
  // fetch("send.php", {
  //   method: "POST",
  //   body: formData
  // })
  // .then(response => response.json())
  // .then(data => {
  //   toast.textContent = data.message;
  //   toast.className = "toast show " + (data.success ? "success" : "error");

  //   if (data.success) {
  //     form.reset();
  //   }

  //   setTimeout(() => {
  //     toast.className = "toast"; // скрыть сообщение
  //   }, 8000);
  // })
  // .catch(() => {
  //   toast.textContent = "Сервер недоступен. Попробуйте позже.";
  //   toast.className = "toast show error";
  //   setTimeout(() => {
  //     toast.className = "toast";
  //   }, 4000);
  // })
  // .finally(() => {
  //   submitBtn.disabled = false;
  //   submitBtn.textContent = originalText;
  // });

  
  // --- ВАРИАНТ 2: ШАБЛОННАЯ ОТПРАВКА (для демонстрации без PHP) ---
  setTimeout(() => {
    toast.textContent = "Спасибо! Ваш ответ получен!";
    toast.className = "toast show success";
    form.reset();

    setTimeout(() => {
      toast.className = "toast"; // скрыть сообщение
    }, 8000);

    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }, 1500);
  
});

  
 //активация карты по клику на нее
 window.onload = function () {
    window.deactivateOverlay = function (el) {
      el.style.pointerEvents = 'none';
    }

    window.activateMap = function (container) {
      const overlay = container.querySelector('.map-overlay');
      if (overlay) {
        overlay.style.pointerEvents = 'none';
      }
    }

    window.deactivateMap = function (container) {
      const overlay = container.querySelector('.map-overlay');
      if (overlay) {
        overlay.style.pointerEvents = 'auto';
      }
    }
  }

  // Preloader
  const img = new Image();
img.src = 'img/bg-textile-beige-horizont.webp'; // путь к вашему фону

img.onload = () => {
  // Когда фон загрузился — убираем затемнение
  document.getElementById('loading-screen').classList.add('loaded');
  document.body.classList.add('loaded');
  document.body.style.overflow = 'auto'; // возвращаем прокрутку
};