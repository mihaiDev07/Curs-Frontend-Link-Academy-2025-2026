const usersDiv = document.getElementById('users');

const API_URL = 'https://eb229303-2267-4e7f-8a28-a6e3d88f0a52.mock.pstmn.io/info';
// const API_URL = 'https://dummyjson.com/users';

async function getUsers() {

    const response = await fetch(API_URL);

    const data = await response.json();

    displayUsers(data.users.slice(0, 10));
}

function displayUsers(users) {

    usersDiv.innerHTML = '';

    users.forEach(user => {

        usersDiv.innerHTML += `
        
            <div class="card">

                <img src="${user.image}" />

                <div>
                    <h2>${user.firstName} ${user.lastName}</h2>
                    <p>${user.email}</p>

                    <button 
                        class="edit-btn"
                        onclick="editUser(${user.id})"
                    >
                        Edit
                    </button>

                    <button 
                        class="delete-btn"
                        onclick="deleteUser(${user.id})"
                    >
                        Delete
                    </button>

                </div>

            </div>
        
        `;
    });
}

function editUser(id) {

    window.location.href = `edit.html?id=${id}`;
}

async function deleteUser(id) {

    const response = await fetch(
        `https://httpbin.org/delete?id=${id}`,
        {
            method: 'DELETE'
        }
    );

    const data = await response.json();

    console.log('DELETE:', data);

    alert('Utilizator sters (simulare)');
}

getUsers();