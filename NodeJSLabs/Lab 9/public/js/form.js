(function () {
    let stringMethods = {
       getResult: (text,str,counts,index)=>{
            if (typeof text !== "string" || text == "") throw "Must provide a Text";
            if (typeof str !== "string" || str == "") throw "Must provide a String to replace";
            if (typeof counts !== "number" || isNaN(counts)) throw "Must provide a number in counts area";
            if (counts <1  || counts > 25  ) throw "Must provide a number in counts area between 1 to 25";
            if (typeof index !== "number" || isNaN(index)) throw "Must provide a number in index area";
            if (index <1  || index > 25 ) throw "Must provide a number in index area between 1 to 25";

            let result = "";
            let currentIndex = 0;
            for (let i = 0; i<counts; i++){
                result += text.slice(currentIndex,currentIndex+index)+ str;
                currentIndex += index;
            }
            result += text.slice(currentIndex);
            return result;
        }
    };

    var staticForm = document.getElementById("static-form");

    if (staticForm) {
        // We can store references to our elements; it's better to 
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.
        var text = document.getElementById("txt");
        var str = document.getElementById("str");
        var counts = document.getElementById("counts");
        var index = document.getElementById("index");
        
        var errorContainer = document.getElementById("error-container");
        var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

        var resultContainer = document.getElementById("result-container");
        var resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];

        // We can take advantage of functional scoping; our event listener has access to its outer functional scope
        // This means that these variables are accessible in our callback
        staticForm.addEventListener("submit", function (event) {
            event.preventDefault();

            try {
                // hide containers by default
                errorContainer.classList.add("hidden");
                resultContainer.classList.add("hidden");

                // Values come from inputs as strings, no matter what :(
                var textValue = text.value;
                var strValue = str.value;
                var countsValue = parseInt(counts.value);
                var indexValue = parseInt(index.value);
                console.log(strValue);

                var result = stringMethods.getResult(textValue, strValue,countsValue,indexValue);
                resultTextElement.textContent = result;
                resultContainer.classList.remove("hidden");
            } catch (e) {
                var message = typeof e === "string" ? e : e.message;
                errorTextElement.textContent = e;
                errorContainer.classList.remove("hidden");
            }
        });
    }
})();