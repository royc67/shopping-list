const display = document.getElementById('display')
const inputProduct = document.getElementById('inputProduct')
const addButton = document.getElementById('addButton')

async function getProducts() {
    display.innerHTML = ""
    const newRow = document.createElement('li')
    const idDis = document.createElement('input')    
    idDis.value = "Product ID"; idDis.disabled = true; 
    const nameDis = document.createElement('input')    
    nameDis.value = "ProductName"; nameDis.disabled = true; 
    newRow.appendChild(idDis)
    newRow.appendChild(nameDis)
    display.appendChild(newRow)
    const {data} = await axios.get(`http://localhost:8080/products`)
        data.forEach((product) => {
            makeRow(product.id, product.name)
        });
}

getProducts();
inputProduct.focus();

const makeRow = (id,name) => {
    const newRow = document.createElement('li')
    const idDis = document.createElement('input')    
    idDis.value = id; idDis.disabled = true;
    const nameDis = document.createElement('input')    
    nameDis.value = name; nameDis.disabled = true;
    const editButton = document.createElement('button')
    editButton.innerHTML = "Edit"
    const doneButton = document.createElement('button')
    doneButton.innerHTML = "Done"
    doneButton.style.display = "none";
    editButton.addEventListener('click', (e)=>{
        nameDis.disabled = false;
        editButton.style.display = "none"
        doneButton.style.display = "inline"
        nameDis.focus();
    })
    doneButton.addEventListener('click', (e)=>{
        nameDis.disabled = true;
        editButton.style.display = "inline"
        doneButton.style.display = "none"
        updateProduct(idDis.value, nameDis.value)
        inputProduct.focus();
        
    })
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

function addItem() {
    if (inputProduct.value != "") {
        addProduct(inputProduct.value)
    inputProduct.value = "";
    setTimeout(() =>{ display.innerHTML = ""; getProducts() }, 100)
    }
    inputProduct.focus();
}

addButton.addEventListener('click', () => {addItem()})

inputProduct.addEventListener('keypress', (e)=>{
    if (e.keyCode ==13) 
        addItem();
})

async function deleteProduct(id) {
    await axios.delete(`http://localhost:8080/product/${id}`)
}

async function updateProduct(id,name) {
    await axios.put(`http://localhost:8080/product/${id}`, {id: id, name: name})
}

async function addProduct(name) {
    await axios.post(`http://localhost:8080/product`, {'name': name})
}

async function searchProduct(id) {
    await axios.get(`http://localhost:8080/product/${id}`)
}