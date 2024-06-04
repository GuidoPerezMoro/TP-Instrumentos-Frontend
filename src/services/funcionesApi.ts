export function getAllInstrumentos(){
    return fetch(`http://localhost:3000/Instrumentos`)
            .then(res=>res.json())
            .then(json=>json)
}

export function getOneInstrumento(id:number){
    return fetch(`http://localhost:3000/Instrumentos/${id}`)
            .then(res=>res.json())
            .then(json=>json)
}