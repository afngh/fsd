const file = document.getElementById('file')
const btn = document.getElementById('add')

function showFile(){
    console.log(file)
}

btn.addEventListener('click', showFile)