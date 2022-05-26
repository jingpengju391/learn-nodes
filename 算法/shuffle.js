// 

function finite_number(num){
    const arr = []
    for(let i = 0; i< num; i++){
        arr[i] = i + 1
    }

    return arr
}
// Excellent
function fisher_yates_shuffle(arr){
    for(let i = 0; i< arr.length - 1; i++){
        const j = i + Math.floor(Math.random() * (arr.length - i))
        [arr[i],arr[j]] = [arr[j],arr[i]]
    }

    return arr
}
// Poor
function shuffle_simple(arr){
    return arr.sort(() => Math.random() - .5)
}
// Good
function shuffle(arr){
    const m = []
    const N = arr.length * arr.length * arr.length
    for(let i = 0; i< arr.length - 1; i++){
        m[i] = Math.floor(Math.random(1,N))
    }
    return arr.sort((i,j) => m[i] - m[j])
}