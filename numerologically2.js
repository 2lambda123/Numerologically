// FORMAT DATA
    // Lowercase, remove dashes, remove spaces
    // Need to change accents to corresponding characters, remove strange characters
    function formatString(str) {
          var lowerCase = str.toLowerCase();
          var noDashes = lowerCase.replace(/-/g, "");
          return noDashes.trim();
        }

    // Conversion into number as string
    function conversionToNumbers(str) {
        var alphabetKey = {
            "a":"1", "b":"2", "c":"3", "d":"4", "e":"5", "f":"6", "g":"7", "h":"8", "i":"9", "j":"1", "k":"2", "l":"3", "m":"4", "n":"5", "o":"6", "p":"7", "q":"8", "r":"9", "s":"1", "t":"2", "u":"3", "v":"4", "w":"5","x":"6","y":"7","z":"8","_":"7"
        }
        var strLength = str.length;
        var numberStr = "";
        for (i=0;i<strLength;i++) {
            for (letter in alphabetKey) {
                if (letter === str.substr(i,1)) {
                   numberStr += alphabetKey[letter];
                }
            }
        }
        return numberStr;
    }

// CREATE OBJECTS
    // Create AllBirthday object
    function makeAllBirthday() {
        
            var allBirthday = {
            };
        return allBirthday;
    }
    // Create AllNames object
function makeAllNames() {
    var fullBirthday = formatString(document.forms.numerologicalForm["Birthday"].value);
    var firstName   = formatString(document.forms.numerologicalForm["FirstName"].value);
    var middleName  = formatString(document.forms.numerologicalForm["MiddleName"].value);
    var lastName    = formatString(document.forms.numerologicalForm["LastName"].value);
    var birthYear    = fullBirthday.substr(0,4);
    var birthMonth   = fullBirthday.substr(4,2);
    var birthDay     = fullBirthday.substr(6,2);
    var firstNum    = conversionToNumbers(firstName);
    var middleNum   = conversionToNumbers(middleName);
    var lastNum     = conversionToNumbers(lastName);
    var allNames = {
        "birthDay"          : birthDay,
        "birthMonth"        : birthMonth,
        "birthYear"         : birthYear,
        "firstName"         : firstName,
        "middleName"        : middleName,
        "lastName"          : lastName,
        "firstNum"          : firstNum,
        "middleNum"         : middleNum,
        "lastNum"           : lastNum,
        
        // CHART CALCULATION METHODS
        // BIRTHDAY CALCULATIONS
        // Life Path (Birth day + month + year) (not reduced)
        "lifePath"          : function() {
                                    var notReducedBirthDay = notReduce(this.birthDay);
                                    var notReducedBirthMonth = notReduce(this.birthMonth);
                                    var notReducedBirthYear = notReduce(this.birthYear);
                                    var lifePathNumber = notReduce(notReducedBirthDay
                                                                       + notReducedBirthMonth
                                                                       + notReducedBirthYear);
                                    return lifePathNumber;
                              },
        // Challenges (BD-BM,BD-BY,C1-C2,BY-BM) (reduced)
        "challenges"          : function() {
                                    var challengeOne = reduceAll(this.birthDay) - reduceAll(this.birthMonth);
                                    var challengeTwo = reduceAll(this.birthDay) - reduceAll(this.birthYear);
                                    var challengeThree = challengeOne - challengeTwo;
                                    var challengeFour = reduceAll(this.birthYear) - reduceAll(this.birthMonth);
                                    var challengeNumbers = {
                                        "challengeOne"      : challengeOne,
                                        "challengeTwo"      : challengeTwo,
                                        "challengeThree"    : challengeThree,
                                        "challengeFour"     : challengeFour
                                    }
                                    return challengeNumbers;
                                },
        // Pinnacles (BD+BM,BD+BY,C1+C2,BY+BM) (reduced)
        "pinnacles"          : function() {
                                    var pinnacleOne = reduceAll(this.birthDay) + reduceAll(this.birthMonth);
                                    var pinnacleTwo = reduceAll(this.birthDay) + reduceAll(this.birthYear);
                                    var pinnacleThree = pinnacleOne + pinnacleTwo;
                                    var pinnacleFour = reduceAll(this.birthYear) + reduceAll(this.birthMonth);
                                    var pinnacleNumbers = {
                                        "pinnacleOne"      : reduceAll(pinnacleOne),
                                        "pinnacleTwo"      : reduceAll(pinnacleTwo),
                                        "pinnacleThree"    : reduceAll(pinnacleThree),
                                        "pinnacleFour"     : reduceAll(pinnacleFour)
                                    }
                                    return pinnacleNumbers;
                                }
    };
    alert(allNames.pinnacles().pinnacleOne);
}

        // NAME CALCULATIONS
        
            // Expression (Full name)

            // Heart's Desire (vowels in full name)

            // Personality (consonants in full name)

            // Balance (first letter of each name)

            // Subconscious Self (number of different numbers represented in your name)
        
        // MIXTURE CALCULATIONS

            // Maturity (Life Path + Expression)

            // Rational Thought (first name + birth day)

// HELPER FUNCTIONS
    // Addition of a string of numbers
    function addition(str) {
        if (str.length >= 2) {
            string = str.split('');                 
            var sum = 0;                               
            for (i=0;i<str.length;i++) {  
                sum += +str[i];        
            }
            return sum.toString();
        } else {
            return str;
        } 
    }
    
    // Reduce to one digit in all cases
    function reduceAll(str) {
        if (str.length >= 2) {
            var strAdded = addition(str);
            var stringLength = strAdded.toString().length;
            if (stringLength >= 2)
              {
                var prepare = strAdded.toString();
                var reduction = addition(prepare);
                return reduction;
              } else {
                var reduction = strAdded;
                return reduction;
              }
        } else {
            return str;
        } 
    }

    // Reduce to one digit unless 11 or 22
    function notReduce(str) {
        if (str.length >= 2) {
            switch (str) {
                case '22':
                    return '22';
                    break;
                case '11':
                    return '11';
                    break;
                default:
                    strAdded = addition(str);
                    if (strAdded.length >= 2) {
                        var strAdded = notReduce(strAdded);
                    }
                    return strAdded;
                    break;
            }
        } else {
            return str;
        } 
    }

    // Return all vowels or consonants of string
    function returnVowelsOrConsonants(str,vowelsOrConsonants) {
      var strLength = str.length;
      var returnedLetters = "";
      var letter = "";
      if (vowelsOrConsonants === "vowels") {
          for (i=0;i<strLength;i++) {
          letter = str.substr(0+i,1);
              if (letter === "a" || letter === "e" || letter === "i" || letter === "o" || letter === "u" || letter === "_") {
                returnedLetters += letter;
              }
          }
       } else if (vowelsOrConsonants === "consonants") {
           for (i=0;i<strLength;i++) {
          letter = str.substr(0+i,1);
              if (letter !== "a" && letter !== "e" && letter !== "i" && letter !== "o" && letter !== "u" && letter !== "_") {
                returnedLetters += letter;
              }
            }
       } else {
           var returnedLetters = "Please enter 'vowels' or 'consonants'!";
           return returnedLetters;
       }
       return returnedLetters;
    }

// Run
function numerologically() {
    var allBirthday = makeAllBirthday();
    var allNames = makeAllNames();
}