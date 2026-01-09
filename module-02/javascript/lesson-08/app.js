console.log("JavaScript Connected!");


// for (start;condition; update) {
//     // block of code
// }



// for (var i = 0; i < 10 ; i++) {
//     console.log(i);    
// }

// var cleanestCities = [
//     "Cheyenne" , "Santa Fe" , "Tucson" , "Great Falls",
//     "Honolulu"
// ];

// var cityToCheck = "Tucson";

// for (var i = 0; i < cleanestCities.length; i++){
//     if(cityToCheck === cleanestCities[i]){
//         console.log("It is one of the cleanest Cities!");  
//         console.log(i);      
//     }else{
//         console.log("Your City Doesn't match");
        
//     }
// };



// Flag!

// var cleanestCities = [
//     "Cheyenne" , "Santa Fe" , "Tucson" , "Great Falls",
//     "Honolulu"
// ];

// var cityToCheck = "asdf";

// var isFound = false;

// for(var i = 0; i < cleanestCities.length; i++){
//     if(cityToCheck === cleanestCities[i]){
//         isFound = true;
//     }
// };

// if(isFound){
//     alert("It is One of the cleanest Cities!")
// }else{
//     alert("It is not on the list!")
// }


// var cleanestCities = [
//     "Cheyenne" , "Santa Fe" , "Tucson" , "Great Falls",
//     "Honolulu"
// ];

// var cityToCheck = "Santa Fe";

// var matchFound = false;

// for(var i = 0; i < cleanestCities.length; i++){
//     if(cityToCheck === cleanestCities[i]){
//         matchFound = true;
//         break;
//     }
// };

// if(matchFound){
//     console.log("It is one of the cleanest City!");
// }else{
//     console.log("It is not on the list!");
    
// }


var students = [
    "Huraira",
    "Bilal",
    "Hammad",
    "Jawad",
    "Hamdan",
    "Hasnain"
];
var name = "asdf";
var isFound = false;

for(var i = 0 ; i < students.length; i++){
    if(name === students[i]){
        isFound = true;
        break;       
    }
}

if(isFound){
    console.log("Student Found!");
    
}else{
    console.log("Not Found");
    
}