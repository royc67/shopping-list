const display = document.getElementById('display')
const inputProduct = document.getElementById('inputProduct')
const addButton = document.getElementById('addButton')

async function getProducts() {
    display.innerHTML = ""
    const {data} = await axios.get(`http://localhost:8080/products`)
        data.forEach((product) => {
            makeRow(product.id, product.name)
        });
    
}

getProducts();

const makeRow = (id,name) => {
    const newRow = document.createElement('li')
    const idDis = document.createElement('input')    
    idDis.value = id; idDis.disabled = true;
    const nameDis = document.createElement('input')    
    nameDis.value = name; nameDis.disabled = true;
    const editButton = document.createElement('button')
    editButton.innerHTML = "Edit"
    editButton.addEventListener('click', (e)=>{
        
    })
    const doneButton = document.createElement('button')
    doneButton.innerHTML = "Done"
    doneButton.style.display = "none";
    const deleteButton = document.createElement('button')    
    deleteButton.innerHTML = "X";
    deleteButton.addEventListener('click',() => {deleteProduct(id)
        setTimeout(() =>{ display.innerHTML = ""; getProducts() }, 100)
    })

    newRow.appendChild(idDis)
    newRow.appendChild(nameDis)
    newRow.appendChild(editButton)
    newRow.appendChild(doneButton)
    newRow.appendChild(deleteButton)

    display.appendChild(newRow)    
}

async function deleteProduct(id) {
    await axios.delete(`http://localhost:8080/product/${id}`)
}

async function updateProduct(id,name) {
    await axios.put(`http://localhost:8080/product/${id}`, {id: id, name: name})
}

async function addProduct(id,name) {
    await axios.post(`http://localhost:8080/products`, {id: id, name: name})
}

async function searchProduct(id) {
    await axios.get(`http://localhost:8080/product/${id}`)
}