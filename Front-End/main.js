const displayDiv = document.getElementById('displayDiv')
const inputProduct = document.getElementById('inputProduct')
const addButton = document.getElementById('addButton')

/*const getShoppingList = async () =>{
    try {
        const {shoppingList} = await axios.get('http://localhost:8080/products')
        console.log(shoppingList)
        //showList(shoppingList);
        displayDiv.innerHTML = shoppingList;
    }
    catch(e){
        alert('Server is Down, Please try again later')
        return e;
    }   
}
*/

async function getProducts() {
    const { data } = await axios.get(`http://localhost:8080/products`)
    data.forEach(element => {
        console.log(element)
        makeRow(element.id, element.amount, element.price)
    });
}
addButton.addEventListener('click', ()=>{getProducts()})

const makeRow = (id,name) => {
// create rows by value
}