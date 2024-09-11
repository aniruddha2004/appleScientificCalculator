let output = document.getElementById("output");
let inv = 0;
let memory = '';
let degreeMode = false;

function calc(arg) {
    if(output.value == '0')
    output.value = '';
    if(arg == '=')
        output.value = evaluate(output.value);
    else if(arg == 'm+'){
        if(memory == '')
            memory+=evaluate(output.value)
        else
            memory+=('+' + evaluate(output.value))
    }
    else if(arg == 'm-'){
        memory+=('-' + evaluate(output.value))
    }
    else if(arg == 'mr'){
        if(output.value == '')
        output.value = evaluate(memory);
    }
    else if(arg == 'mc'){
        memory = '';
    }
    else if(arg == 'd')
    {
        let degreebtn = document.getElementById("degree-btn");
        let radianbtn = document.getElementById("radian-btn");
        degreeMode = true;
        degreebtn.style.display = "none";
        radianbtn.style.display = "flex";
    }
    else if(arg == 'r')
    {
        let degreebtn = document.getElementById("degree-btn");
        let radianbtn = document.getElementById("radian-btn");
        degreeMode = false;
        degreebtn.style.display = "flex";
        radianbtn.style.display = "none";
    }
    else if(arg == 'C')
    output.value = '0';
    else
    output.value += arg;
}

function inverse() {
    let normal = document.getElementsByClassName("normal");
    let inverse = document.getElementsByClassName("inverse");
    let secondarybtn = document.getElementById("secondary");
    if(inv == 0)
    {
        for(let n of normal) {
            n.style.display = "none";
        }
        for(let i of inverse) {
            i.style.display = "flex";
        }
        inv = 1;
    }
    else{
        for(let n of normal) {
            n.style.display = "flex";
        }
        for(let i of inverse) {
            i.style.display = "none";
        }
        inv = 0;
    }
    secondarybtn.classList.toggle("active")
}

function evaluate(equation) {
    equation = equation.replaceAll("÷", "/");
    equation = equation.replaceAll("×", "*");
    equation = equation.replaceAll("^", "**");
    equation = equation.replaceAll("e", "Math.E");
    equation = equation.replaceAll("log", "Math.log10");
    equation = equation.replaceAll("ln", "Math.log");
    if(degreeMode){
        if(inv == 0){
            equation = equation.replaceAll("sin(", "Math.sin(Math.PI/180*");
            equation = equation.replaceAll("cos(", "Math.cos(Math.PI/180*");
            equation = equation.replaceAll("tan(", "Math.tan(Math.PI/180*");
        }
        else {
            equation = equation.replaceAll("asin(", "Math.asin(Math.PI/180*");
            equation = equation.replaceAll("acos(", "Math.acos(Math.PI/180*");
            equation = equation.replaceAll("atan(", "Math.atan(Math.PI/180*");
        }
    }
    else{
        if(inv == 0){
            equation = equation.replaceAll("sin", "Math.sin");
            equation = equation.replaceAll("cos", "Math.cos");
            equation = equation.replaceAll("tan", "Math.tan");
        }
        else {
            equation = equation.replaceAll("asin", "Math.asin");
            equation = equation.replaceAll("acos", "Math.acos");
            equation = equation.replaceAll("atan", "Math.atan");
        }
    }
    equation = equation.replaceAll("π", "Math.PI");
    equation = equation.replaceAll("Rand", "Math.random()");
    equation = equation.replace(/(\d+)!/g, (match, number) => factorial(Number(number)));
    return eval(equation);
}

function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1); // Recursive factorial calculation
}