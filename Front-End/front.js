const display = document.getElementById('display')
const inputProduct = document.getElementById('inputProduct')
const addButton = document.getElementById('addButton')

async function getProducts() {
    const {data} = await axios.get(`http://localhost:8080/products`)
    debugger;
        data.forEach((product) => {
            debugger;
            console.log(product)
            makeRow(product.id, product.name)
        });
    
}
addButton.addEventListener('click', ()=>{getProducts()})

const makeRow = (id,name) => {
    const newRow = document.createElement('li')
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = "X";
    const editButton = document.createElement('button')
    editButton.innerHTML = "Edit"
    newRow.innerHTML = `ID: ${id}   Name: ${name}`
    newRow.appendChild(editButton)
    newRow.appendChild(deleteButton)
    display.appendChild(newRow)
}

async function deleteProducts(id) {
    await axios.delete(`http://localhost:8080/products${id}`)
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