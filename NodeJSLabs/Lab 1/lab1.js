
////////////////////someOfSquare//////////

let someOfSquares = (num1,num2,num3) => {
    if(num1 === undefined || typeof num1 !== "number"){
        throw `${typeof num1} has been given. Expect a number`
    }
    if(num2 === undefined || typeof num2 !== "number"){
        throw `${typeof num2} has been given. Expect a number`
    }
    if(num3 === undefined || typeof num3 !== "number"){
        throw `${typeof num3} has been given. Expect a number`
    }
    return (Math.pow(num1,2)+Math.pow(num2,2)+Math.pow(num3,2));
}
console.log(someOfSquares(5,6,11));

//////////sayHelloTo/////////////
let sayHelloTo = (firstName, lastName, title) => {

    if(firstName === undefined && lastName === undefined && title === undefined){
        throw "No Names are given."
    }

    else if(lastName === undefined && title === undefined){
            if(typeof firstName !== "string"){
                throw `${typeof firstName} has been given. Expect a string`
            }
            console.log(`Hello ${firstName}`);
    }

    else if(title === undefined){
            if(typeof firstName !== "string"){
                throw `${typeof firstName} has been given. Expect a string`
            }
            if(typeof lastName !== "string"){
                throw `${typeof lastName} has been given. Expect a string`
            }
        console.log(`Hello, ${firstName} ${lastName}. I hope you are having a good day!`);
    }

    else{
            if(typeof firstName !== "string"){
                throw `${typeof firstName} has been given. Expect a string`
            }
            if(typeof lastName !== "string"){
                throw `${typeof lastName} has been given. Expect a string`
            }
            if(typeof title !== "string"){
                throw `${typeof title} has been given. Expect a string`
            }
        console.log(`Hello, ${title} ${firstName} ${lastName}! Have a good evening!`);
    }
}

//sayHelloTo(); 
sayHelloTo("Dhrumin"); 
sayHelloTo("Dhrumin", "Desai"); 
sayHelloTo("Dhrumin", "Desai", "Mr.");


//cupsOfCoffee////////////////////////
let cupsOfCoffee = (howManyCups) => {
    if(howManyCups === undefined || typeof howManyCups !== "number"){
        throw `${typeof howManyCups} has been given. Expect a positive number`
    }
     if(howManyCups <= 0){
        throw `${howManyCups} is given. Positive number is expexted.`
    }

    let ans = "";
    for(howManyCups; howManyCups>1; howManyCups--){
        ans +=`${howManyCups} cups of coffee on the desk! ${howManyCups} cups of coffee!\n`;
        ans += `Pick one up, drink the cup, ${howManyCups-1} cups of coffee on the desk!\n\n`
    }  
    ans+= `1 cup of coffee on the desk! 1 cup of coffee!\n`
    ans+= `Pick it up, drink the cup, no more coffee left on the desk!`

    return ans;
}

console.log(cupsOfCoffee(8)); 


//////////occurrencesOfSubstring(fullString, substring)//
let countOccurrencesOfSubstring = (fullString, substring) => {
    if(fullString === undefined || typeof fullString !== "string"){
        throw `${typeof fullString} has been given. Expect a string`
    }
    if(substring === undefined || typeof substring !== "string"){
        throw `${typeof substring} has been given. Expect a string`
    }
    let fl = fullString.length;
    let sl = substring.length;
    let ans = 0; 

    for(let i = 0; i<=fl-sl; i++){
            if(fullString.substring(i,i+sl) === substring){
                ans += sl;
                i += sl-1;
        }
    }
    return ans;
}

console.log(countOccurrencesOfSubstring("hello world","o"));



///////////////////////randomizeSentences////////////////////
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

let randomizeSentences = (paragraph) => {
    if(paragraph === undefined || typeof paragraph !== "string"){
        throw `${typeof paragraph} has been given. Expect a string`
    }
    
    paragraph = paragraph.replace(/\./g,".#");
    paragraph = paragraph.replace(/\?/g,"?#");
    paragraph = paragraph.replace(/\!/g,"!#");
    lines = paragraph.split(/#/g);
    lines = shuffleArray(lines);
    paragraph = lines.join("");
    return paragraph;
}
console.log(randomizeSentences("Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations."));




