document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.div-grid');

  const options = {
    root: null, // наблюдать за пересечением с областью просмотра
    rootMargin: '0px',
    threshold: 0.8, // когда 10% элемента пересекается с областью просмотра
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('hidden');
      } else {
        entry.target.classList.add('hidden');
        entry.target.classList.remove('visible');
      }
    });
  }, options);

  elements.forEach((element) => {
    element.classList.add('hidden'); // Начальное состояние
    observer.observe(element);
  });
});

const buttons = document.getElementsByClassName('button');
const blockForm = document.getElementsByClassName('form-div')[0];

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    blockForm.style.display = 'flex';
  });
}

const close = document.getElementsByClassName('close')[0];
close.addEventListener('click', () => {
  blockForm.style.display = 'none';
});

const form = document.getElementById('email-form-2');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // предотвращаем стандартную отправку формы

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  const formData = {
    name: name,
    phone: phone,
    message: message,
  };

  sendFormData(formData);
});

function clearForm() {
  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');
  const name2 = document.getElementById('name-2');
  const field = document.getElementById('field');

  name.value = '';
  phone.value = '';
  message.value = '';
  name2.value = '';
  field.value = '';
}

function sendFormData(formData) {
  fetch('http://localhost:3000/sendmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => {
      return response.text().then((text) => {
        if (response.ok) {
          clearForm();
        } else {
          throw new Error('Ошибка отправки сообщения: ' + text);
        }
      });
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    });
}

const appointment = document.getElementById('email-form-3');
appointment.addEventListener('submit', (event) => {
  event.preventDefault(); // предотвращаем стандартную отправку формы

  const name = document.getElementById('name-2').value;
  const phone = document.getElementById('field').value;

  const formData = {
    name: name,
    phone: phone,
  };

  sendFormData(formData);
});

const iconsCards = document.getElementsByClassName('div-block-10');
const linersCards = document.getElementsByClassName('column');

for (let i = 0; i < iconsCards.length; i++) {
  const lineCard = document.getElementsByClassName(`column-${i + 1}`)[0];

  iconsCards[i].addEventListener('click', () => {
    const isCurrentlyVisible = getComputedStyle(lineCard).display === 'flex';

    Array.from(linersCards).forEach((element) => {
      element.style.display = 'none';
    });

    if (!isCurrentlyVisible) {
      lineCard.style.display = 'flex';
    }
  });
}
