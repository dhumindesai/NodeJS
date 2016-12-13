let exportedMethods = {
    getResult(text,str,counts,index) {
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
}

module.exports = exportedMethods;

//console.log(exportedMethods.getResult("Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus augue urna. Nam in turpis sapien. Pellentesque vehicula augue quis vehicula egestas. Phasellus non iaculis justo, eget cursus purus. Ut id ante vel elit maximus ullamcorper a pretium erat. Nullam pharetra rutrum velit, quis commodo felis gravida a. Aliquam justo dolor, blandit sed turpis ultrices, tempus aliquam eros. Nulla sollicitudin, lorem a mattis tincidunt, ligula mi cursus nisi, a laoreet metus erat non libero.","HELLOHELLO",5,7));