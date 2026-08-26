const form = document.getElementById('editForm');

const params = new URLSearchParams(window.location.search);

const id = params.get('id');

let imageBase64 = '';

const imageInput = document.getElementById('image');

const preview = document.getElementById('preview');

async function getUser() {

    const response = await fetch(
        // `https://dummyjson.com/users/${id}`
        `https://eb229303-2267-4e7f-8a28-a6e3d88f0a52.mock.pstmn.io/info?id=1`
    );

    const user = await response.json();

    document.getElementById('firstName').value = user.name;

    document.getElementById('lastName').value = user.name;

    document.getElementById('email').value = user.email;

    preview.src = user.image;

    imageBase64 = user.image;
}

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

    const updatedUser = {

        firstName: document.getElementById('firstName').value,

        lastName: document.getElementById('lastName').value,

        email: document.getElementById('email').value,

        image: imageBase64
    };

    const response = await fetch(
        `https://httpbin.org/put?id=${id}`,
        {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(updatedUser)
        }
    );

    const data = await response.json();

    console.log(data);

    alert('Utilizator actualizat!');
});

getUser();