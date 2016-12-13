
let textMetrics = exports = module.exports;
 textMetrics.createMetrics = (text) => {
    obj = {
        totalLetters: getTotalLetters(text),
        totalWords: getTotalWords(text),
        uniqueWords: getUniqueWords(text),
        longWords: getlongWords(text),
        averageWordLength: getaverageWordLength(text),
        textComplexity: textComplexity(text),
        numOfSentences: getnumOfSentences(text),
        wordOccurrences: getwordOccurrences(text)
    }
    
    return obj;
}

let getTotalLetters = (text) => {
    text = text.replace(/[^a-z0-9]/gi,'');
    return text.length;
}

let getTotalWords = (text) => {
    text = text.replace(/\n/g," ").replace(/[^\sa-z0-9]/gi,'');
    let wordCounts = text.split(" ").filter(Boolean).length;
   return wordCounts;
}

let getUniqueWords = (text) => {
    let words = text.replace(/\n/g," ").replace(/[^\sa-z0-9]/gi,'').toLowerCase().split(" ").filter(Boolean);
    let uniqueWords = [];

    for (let i=0; i<=words.length; i++){
        let flag = 0;
        for (let j=0; j<=i; j++){
            if(words[i] === uniqueWords[j]){
                flag = 1;
                break;
            }
        }
        if(flag === 0){
            uniqueWords.push(words[i]);
        }
    }
    return uniqueWords.length;

}

let getlongWords = (text) => {
    let words = text.replace(/[^\sa-z0-9]/gi,'').replace(/\n/g," ").toLowerCase().split(" ");
    let longWordsCount = 0;
    words.forEach(function(word){
        if(word.length >= 6){
            longWordsCount++;
        }
    });
    return longWordsCount;
}

let getaverageWordLength = (text) => {
    return parseFloat((getTotalLetters(text)/getTotalWords(text)).toFixed(2));
}

let getnumOfSentences = (text) => {
    return text.split(/[\.\?\!]/g).filter(Boolean).length;;
}

let textComplexity = (text) => {
    let totalWords = getTotalWords(text);
    let longWords = getlongWords(text);
    let numOfSentences = getnumOfSentences(text);
    
    return parseFloat(((totalWords/numOfSentences) + (longWords * 100)/totalWords).toFixed(2));
}

let getwordOccurrences = (text) =>{
    wordOccurrences = {};
    text = text.replace(/(\r\n|\n|\r)/gm," ");
    let words = text.replace(/[^\sa-z0-9]/gi,'').toLowerCase().split(" ").filter(Boolean);

    words.forEach(function(word){
        if(wordOccurrences.hasOwnProperty(word)){
            wordOccurrences[word] += 1; 
        }
        else
        {
            wordOccurrences[word] = 1;
        }
    });

    return wordOccurrences;
}

