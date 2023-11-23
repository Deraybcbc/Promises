function delay(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

function Promesa1() {
    return new Promise((resolve, rejects) => {
        delay(4).then(() => {
            resolve("Promesa 1")
        })
    })
};

function Promesa2() {
    return new Promise((resolve, rejects) => {
        delay(4).then(() => {
            resolve("Promesa 2")

        })
    })
};

function Promesa3() {
    return new Promise((resolve, rejects) => {
        delay(4).then(() => {
            resolve("Promesa 3")
        })
    })
};

function Promesa4() {
    return new Promise((resolve, rejects) => {
        delay(4).then(() => {
            resolve("Promesa 4")
        })
    })
};

function Promesa5() {
    return new Promise((resolve, rejects) => {
        delay(4).then(() => {
            resolve("Promesa 5")
        })
    })
};

async function secuencialmente() {
    const result1 = await Promesa1();
    console.log(result1);


    const result2 = await Promesa2();
    console.log(result2);


    const result3 = await Promesa3();
    console.log(result3);


    const result4 = await Promesa4();
    console.log(result4);


    const result5 = await Promesa5();
    console.log(result5);

};

async function paralelo() {
    Promise.allSettled([Promesa1(), Promesa2(), Promesa3(), Promesa4(), Promesa5()]).then(response => console.log(response)).catch(error => console.log(error))
};

secuencialmente();

paralelo();