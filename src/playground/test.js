const tablica = [{a:1, b:2, c:3}, {a:4, b:5, c:6}];
// console.log(tablica);

for(value in tablica){
    if(tablica[value].a === 1){
        tablica[value].a = 55;
    }
    
}

console.log(tablica);