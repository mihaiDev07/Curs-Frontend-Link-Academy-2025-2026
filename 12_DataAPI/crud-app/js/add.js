const form = document.getElementById('userForm');

let imageBase64 = '';

const imageInput = document.getElementById('image');

const preview = document.getElementById('preview');

imageInput.addEventListener('change', function () {

    const file = imageInput.files[0];

    const reader = new FileReader();

    reader.onload = function () {

        imageBase64 = reader.result;

        preview.src = imageBase64;
    };

    reader.readAsDataURL(file);
});

form.addEventListener('submit', async function (e) {

    e.preventDefault();

    const user = {

        firstName: document.getElementById('firstName').value,

        lastName: document.getElementById('lastName').value,

        email: document.getElementById('email').value,

        image: imageBase64
    };

    const response = await fetch(
        'https://httpbin.org/post',
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(user)
        }
    );

    const data = await response.json();

    console.log(data);

    alert('Utilizator adaugat!');
});