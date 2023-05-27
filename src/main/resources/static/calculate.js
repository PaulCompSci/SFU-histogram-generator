var grades  = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];


    var canvasElement = document.getElementById("gradeDistribution") ;
    var modal = document.getElementById("modal");
    var modalMessage = document.getElementById("modalMessage");
    var modalButton = document.getElementById("modalButton");

    var config = {
        type: "bar",
        data: {
        labels: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"],
        datasets: [{
            label : "Number of Student",
            data: [1,3 ,3 ,2 ,1 ,4 ,1 ,2 ,3 ,3 ,2 ],
            backgroundColor: [
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 30, 1)",
            "rgba(255, 99, 32, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(255, 206, 86, 1)"
            ]
        }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Grade Distribution", 
                    font: {
                    size: 18, 
                    weight: "bold" 
                    }
                }
                },
            
            aspectRatio: 1, // Adjust the value to change the aspect ratio
            scales: {
                y: {
                beginAtZero: true,
                ticks: {
                    precision: 0, // Display only whole number values
                    stepSize: 1 // Define the interval between ticks (optional)
                }
                }
            }
        }
    };
    
    
    var cookieChart = new Chart(canvasElement , config) ; 



var bound = document.querySelector(".container");   
var valueBounds = bound.getElementsByTagName("input");


//only controlling the lower bound 
for (var i = 0; i < valueBounds.length-1; i++) {
    valueBounds[i].addEventListener('blur', function(event) {

        console.log("this function is working") ;

        var aPlus  = 0 ; 
        var a = 0 ;
        var aMinus = 0 ; 
        var bPlus = 0 ;
        var b = 0 ; 
        var bMinus = 0;
        var cPlus  = 0 ;
        var c   = 0 ;
        var cMinus = 0 ; 
        var d = 0 ; 
        var f = 0 ;
    
    
        lowerBound = [] ; 

        //check for emty spaces 
        for(var i = 0 ; i < valueBounds.length-1 ;i ++){
            if (valueBounds[i].value == ''){
                
                showModal("All lower bounds must be fill")
                event.target.focus() ; 
                return;
            }
        }

        //check if all the input are valid  (check is there any things other than number ? ) 
        for(var i = 0 ; i <valueBounds.length-1; i++) { 
            if (!(isFloat(valueBounds[i].value))){
                showModal("only number are allow ");
                event.target.focus()  ;
                return ;
            }
        }
       
        for(var i = 0 ; i < valueBounds.length-1 ; i++){
            lowerBound.push(parseFloat(valueBounds[i].value)) ; 
        }


        //check fo overlap 
        for(var i = 1 ; i < lowerBound.length-1 ; i++) {
            if(lowerBound[i]  < lowerBound[i+1]){
               
                showModal("please enter a valid score range") ;
                event.target.focus(); // Keep focus on the input box
                lowerBound = [] ;
                return  ;
            }
            if (lowerBound[i] == lowerBound[i+1]){
               
                showModal("Score overlapped");
                event.target.focus();
                lowerBound = []  ;
                return ;
            }
        } 

        if (lowerBound[1] > lowerBound[0]){
            
            showModal("please enter a valid score");
            event.target.focus() ;
            lowerBound = []  ; 
            return ; 
        }
    


        
        for(var i = 0 ; i < grades.length ; i++){ 
            if (grades[i] >= lowerBound[1]&& grades[i] <= lowerBound[0]){

                aPlus ++ ; 
            }
            if (grades[i] >= lowerBound[2] && grades[i] <lowerBound[1]){
                a++ ;
            }
            if (grades[i] >= lowerBound[3] && grades[i] <lowerBound[2]){
                aMinus++ ;
            }
            if (grades[i] >= lowerBound[4] && grades[i] <lowerBound[3]){
                bPlus++ ;
            }
            if (grades[i] >= lowerBound[5] && grades[i] <lowerBound[4]){
                b++ ;
            }
            if (grades[i] >= lowerBound[6] && grades[i] <lowerBound[5]){
                bMinus++ ;
            }
            if (grades[i] >= lowerBound[7] && grades[i] <lowerBound[6]){
                cPlus++ ;
            }
            if (grades[i] >= lowerBound[8] && grades[i] <lowerBound[7]){
                c++ ;
            }
            if (grades[i] >= lowerBound[9] && grades[i] <lowerBound[8]){
                cMinus++ ;
            }
            if (grades[i] >= lowerBound[10] && grades[i] <lowerBound[9]){
               d++ ;
            }
            if (grades[i] >= lowerBound[11] && grades[i] <lowerBound[10]){
                f++ ; 
            }
        }

        cookieChart.data.datasets[0].data = [aPlus, a, aMinus, bPlus, b, bMinus , cPlus, c , cMinus, d , f];
        cookieChart.update() ; 
    
 
  });   
}



document.getElementById("addGradeButton").addEventListener("click", function() {

   
        var aPlus  = 0 ; 
        var a = 0 ;
        var aMinus = 0 ; 
        var bPlus = 0 ;
        var b = 0 ; 
        var bMinus = 0;
        var cPlus  = 0 ;
        var c   = 0 ;
        var cMinus = 0 ; 
        var d = 0 ; 
        var f = 0 ;


        var value = document.querySelector("#newGrade") ;
        var tempBound = document.querySelector(".container");
        var tempValueBounds = bound.getElementsByTagName("input");
        
        var arrange = [] ; 

        for(var i = 0 ; i < tempValueBounds.length-1 ; i++){
            arrange.push(parseFloat(tempValueBounds[i].value)) ; 
        }
        

        if (value.value === "") {
            showModal("please  enter a value") ;
            return ; 
        }

        if (!(isFloat(value.value))){

            showModal("only number are allow ");
            value.value = "" ; 
            return ;
        }

        var realValue = parseFloat(value.value);

        if (realValue > arrange[0] || realValue  < arrange[arrange.length-1]){
            showModal("your number is out of range") 
            value.value = "" ;
            return ; 
        }
        grades.push(realValue) ; 


        for(var i = 0 ; i < grades.length ; i++){ 

            if (grades[i] >= arrange[1]&& grades[i] <= arrange[0]){
                aPlus ++ ; 
            }
            if (grades[i] >= arrange[2] && grades[i] <arrange[1]){
                a++ ;
            }
            if (grades[i] >= arrange[3] && grades[i] <arrange[2]){
                aMinus++ ;
            }
            if (grades[i] >= arrange[4] && grades[i] <arrange[3]){
                bPlus++ ;
            }
            if (grades[i] >= arrange[5] && grades[i] <arrange[4]){
                b++ ;
            }
            if (grades[i] >= arrange[6] && grades[i] <arrange[5]){
                bMinus++ ;
            }
            if (grades[i] >= arrange[7] && grades[i] <arrange[6]){
                cPlus++ ;
            }
            if (grades[i] >= arrange[8] && grades[i] <arrange[7]){
                c++ ;
            }
            if (grades[i] >= arrange[9] && grades[i] <arrange[8]){
                cMinus++ ;
            }
            if (grades[i] >= arrange[10] && grades[i] <arrange[9]){
               d++ ;
            }
            if (grades[i] >= arrange[11] && grades[i] <arrange[10]){
                f++ ; 
            }
            value.value = "" ;
        }

        cookieChart.data.datasets[0].data = [aPlus, a, aMinus, bPlus, b, bMinus , cPlus, c , cMinus, d , f];
        cookieChart.update() ; 

       
  });

function isFloat(inputString) {
    var floatValue = parseFloat(inputString);
    return !isNaN(floatValue) && isFinite(floatValue) && !/[a-zA-Z]/.test(inputString);
}



modalButton.addEventListener("click", function() {
    closeModal();
  });

  function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
  }
