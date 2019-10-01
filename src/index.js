const MORSE_TABLE = {
    '.-': 'a',
    '-...': 'b',
    '-.-.': 'c',
    '-..': 'd',
    '.': 'e',
    '..-.': 'f',
    '--.': 'g',
    '....': 'h',
    '..': 'i',
    '.---': 'j',
    '-.-': 'k',
    '.-..': 'l',
    '--': 'm',
    '-.': 'n',
    '---': 'o',
    '.--.': 'p',
    '--.-': 'q',
    '.-.': 'r',
    '...': 's',
    '-': 't',
    '..-': 'u',
    '...-': 'v',
    '.--': 'w',
    '-..-': 'x',
    '-.--': 'y',
    '--..': 'z',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '-----': '0',
};

function decode(expr) {
    // write your solution here
    let encodedWordsArray = expr.split("**********");
    let decodedWordsFromMorze = [];
    let encodedMorzeLetter;
    let escapeIndex;
    let morzeLetter;

    for (let i = 0; i < encodedWordsArray.length; i++) {
        let encodedWordArrayLetters = encodedWordsArray[i].split('').reduce((encodedMorzeLetters, encodedSymbol, index, encodedMorzeWord) => {
            if ((index + 1) % 10 == 0) {
                encodedMorzeLetter = encodedWordsArray[i].slice(index - 10 + 1, index + 1);
                encodedMorzeLetters.push(encodedMorzeLetter)
                return encodedMorzeLetters;
            }
            else { return encodedMorzeLetters }
        }, [])
        
        let decodedMorzeSymbols = encodedWordArrayLetters.reduce((decodedMorzeLettersArray, currentEncodedMorzeLetter, index, currentArrayEncodedLetters) => {
            morzeLetter = currentEncodedMorzeLetter.split('').reduce((finalStringMorzeSymbol, currentEncodedLetter, index, encodedWord) => {
                if (index === escapeIndex || index == 0) { return finalStringMorzeSymbol }

                if (!(encodedWord[index - 1] == '0' && currentEncodedLetter == '0')) {
                    if (encodedWord[index - 1] + currentEncodedLetter == '10') {
                        finalStringMorzeSymbol += '.'
                        escapeIndex = index + 1;
                    }
                    else if (encodedWord[index - 1] + currentEncodedLetter == '11') {
                        finalStringMorzeSymbol += '-'
                        escapeIndex = index + 1;
                    }
                    return finalStringMorzeSymbol;
                } else {return finalStringMorzeSymbol }
            }, '');
            decodedMorzeLettersArray.push(morzeLetter);
            return decodedMorzeLettersArray
        }, [])

        let wordFromMorzeSymbols = decodedMorzeSymbols.reduce((finalWord, letterMorze, index, arrayMorzeLetters) => {
            return finalWord + MORSE_TABLE[letterMorze];
        }, "")

        decodedWordsFromMorze.push(wordFromMorzeSymbols);
    }

    return decodedWordsFromMorze.join(" ") 
}

module.exports = {
    decode
}