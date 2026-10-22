const data =  "https://dummyjson.com/products"


const main = document.getElementById("main")
const isian = document.getElementById("isian")
const submit = document.getElementById("submit")
const inputNama = document.getElementById("inputNama")
const listProduk = document.getElementById("listProduk")
const textTitle = document.getElementById("textTitle")

async function ambilData(namaData){
    try{
        let res = await fetch("https://dummyjson.com/products")

        let fetchData = await res.json()        
        let file = fetchData.products

        console.log(file)
        renderList(file)
        if(namaData != "") render(file, namaData)
    } catch(error){
        console.warn("Fetch data gagal, coba cek kondisi internet")
        textTitle.innerText = "Pengambilan data list gagal, coba cek kondisi internet kau"
    }
}

// load list
window.addEventListener("load", ambilData(""))

//tombol submit, event listener click
submit.addEventListener("click", () => {
    let isiText = inputNama.value.toLowerCase()
    ambilData(isiText.trim())
})

function render(data, namaData){
    isian.innerHTML = "" //reset dulu setiap jalan
    for(let i = 0; i < data.length; i++){
        if(namaData == (data[i].title).toLowerCase()){ // pas ada langsung tempel
            isian.innerHTML = `  
                <div class="card">
                    <div class="card-nama-id">
                        <p class="id">id: ${data[i].id}</p>
                        <p class="nama">${data[i].title}</p>
                    </div>
                    <div class="card-pict"> 
                        <img class="card-pict" src="${data[i].images[0]}" alt="gambar: ${data[i].title}">
                    </div> 
                    <div class="card-desc">
                        <p class="desc">${data[i].description}</p>
                    </div>
                    <div class="card-harga">
                        <p class="harga">$${data[i].price}</p>
                    </div>
                </div>
            `;
            inputNama.value = "" // kosongin lagi setiap submit
            return //trus keluar dari for sama function ny
        }
    }
    // jalan kesini pas for dah beres, yg mana artinya gk ada nama yg sesuai nama ny, validasi input
    console.log("nama tidak ada untuk: ", namaData)
    isian.innerHTML = `
        <div class="card-salah">
            <p>Nama produk "${namaData}" tidak ada, coba cek ulang pengetikan</p>
        </div>
    `;
    inputNama.value = "" // kosongin lg setiap submit
}

function renderList(data){
    listProduk.innerHTML = ""
    for(let i = 0; i < data.length; i++){
        let newDiv = document.createElement("div")
        newDiv.className = "listBox"
        newDiv.innerHTML = `<p>${data[i].title}</p>`
        listProduk.appendChild(newDiv)
    }
}




 