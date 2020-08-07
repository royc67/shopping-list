const display = document.getElementById('display')
const inputProduct = document.getElementById('inputProduct')
const addButton = document.getElementById('addButton')

async function getProducts() {
    const {data} = await axios.get(`http://localhost:8080/products`)
        data.forEach((product) => {
            console.log(product)
            makeRow(product.id, product.name)
        });
    
}
addButton.addEventListener('click', ()=>{getProducts()})

const makeRow = (id,name) => {
    const newRow = document.createElement('li')
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = "X";
    deleteButton.addEventListener('click', ()=>{
        deleteProduct(id);
        e.target.parentElement.remove();
    })
    const idInput = document.createElement('input')
    const nameInput = document.createElement('input')
    idInput.disabled = true
    idInput.value = id
    idInput.className = id
    nameInput.disabled = true
    nameInput.value = name
    nameInput.className = id
    
    const editButton = document.createElement('button')
    const doneButton = document.createElement('button')
    doneButton.style.display = "none";
    editButton.innerHTML = "Edit"
    const inputs = newRow.getElementsByTagName('input')
    inputs.disabled = false;
    newRow.appendChild(idInput)
    newRow.appendChild(nameInput)
    newRow.appendChild(doneButton)
    newRow.appendChild(editButton)
    newRow.appendChild(deleteButton)
    display.appendChild(newRow)
}


async function deleteProduct(id) {
    await axios.delete(`http://localhost:8080/products/${id}`)
}

async function updateProduct(id,name) {
    await axios.put(`http://localhost:8080/products${id}`, {id: id, name: name})
}

async function addProduct(id,name) {
    await axios.post(`http://localhost:8080/products`, {id: id, name: name})
}

async function searchProduct(id) {
    await axios.get(`http://localhost:8080/products${id}`)
}