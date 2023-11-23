    const { rejects } = require("assert");
    const { error } = require("console");
    const fs = require("fs");

    var mysql = require("mysql2");
    const { resolve } = require("path");

    var con = mysql.createConnection({
        host: "dam.inspedralbes.cat",
        user: "a22kevburcac_user",
        password: "A22kevburcac",
        database: "a22kevburcac_Prueba"
    });

    function delay(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    };

    function Select() {
        return new Promise((resolve, rejects) => {
            const sql = "SELECT P.idPre, P.pregunta, R.respuestas FROM PREGUNTAS P INNER JOIN RESPUESTAS R ON P.idPre =R.idRes";
            con.query(sql, function(error, select) {
                if (error) {
                    rejects(error.message)
                    console.log("ERROR AL HACER LA CONSULTA");
                } else {
                    //results = result


                    delay(4).then(() => {
                        console.log("FILTRO");
                        resolve(select);
                        //console.log(select);
                    })

                    /*
                    //FechaHora("CONSULTA ECHA");
                    for (var i = 0; i < result.length; i++) {
                        const row = result[i];

                        // Print the columns for each row
                        for (const key in row) {
                            if (row.hasOwnProperty(key)) {
                                console.log(`${ key }: ${row[key]}`);
                            };
                        };
                    };*/
                };
            });
        })
    };

    function SelectAll() {
        return new Promise((resolve, rejects) => {
            con.query("SELECT * FROM PREGUNTAS", function(error, select) {
                if (error) {
                    console.log("ERROR AL HACER SELECT");
                    rejects(error)
                } else {

                    delay(4).then(() => {
                        console.log("ALL");
                        resolve(select);
                        //console.log(select);
                    })
                }
            });
        });

    };

    function SelectID() {
        return new Promise((resolve, rejects) => {
            const sql = "SELECT * FROM PREGUNTAS WHERE idPre = 4"
            con.query(sql, function(error, select) {
                if (error) {
                    rejects(error.message);
                } else {

                    delay(4).then(() => {
                        console.log("FILTRO ID");
                        resolve(select);
                        //console.log(select);
                    })
                }
            });
        });
    };

    function SelectPre() {
        return new Promise((resolve, rejects) => {
            const sql = "SELECT P.pregunta,R.respuestas FROM RESPUESTAS R JOIN PREGUNTAS P ON R.idRes=P.idPre WHERE P.idPre=2";

            con.query(sql, function(error, select) {
                if (error) {
                    rejects(error.message);
                } else {

                    delay(4).then(() => {
                        console.log("FILTRO PREGUNTA");
                        resolve(select);
                        //console.log(select);
                    })
                }
            });
        });
    };

    function SelectPalabra() {
        return new Promise((resolve, rejects) => {
            const sql = "SELECT * FROM PREGUNTAS P JOIN RESPUESTAS R ON R.idRes=P.idPre WHERE P.idPre=2 LIKE '%España%' OR P.pregunta LIKE '%España%'";
            con.query(sql, function(error, select) {
                if (error) {
                    rejects(error.message);
                } else {
                    delay(4).then(() => {
                        console.log("FILTRO PALABRA");
                        resolve(select);
                        //console.log(select);
                    })
                }
            })
        })
    };

    function conexion() {
        return new Promise((resolve, rejects) => {
            con.connect(function(error) {
                if (error) {
                    rejects("Conexion fallida")
                        //console.log("Conexion fallida");
                } else {
                    console.log("Conexion Existosa");
                    resolve();
                }
            });
        })
    };
    /*
    function desconexion() {
        return new Promise((resolve, rejects) => {
            con.end(function(error) {
                if (error) {
                    //FechaHora("FALLO AL CERRAR EL ARCHIVO")
                    console.log("FALLO AL CERRAR EL ARCHIVO");
                    rejects("Fallo al cerrar conexion")
                } else {
                    //FechaHora("CONEXION CERRADA")
                    console.log("CONEXION CERRADA");
                    resolve("Conexion cerrada exitosa");
                }
            });
        });
    };
    */
    async function listo() {
        const inicio = performance.now();
        await conexion();

        const result1 = await Select();
        console.log(result1);


        const result2 = await SelectAll();
        console.log(result2);


        const result3 = await SelectID();
        console.log(result3);


        const result4 = await SelectPre();
        console.log(result4);

        const result5 = await SelectPalabra();
        console.log(result5);

        const fin = performance.now();
        console.log(`La función listo tardó ${fin - inicio} milisegundos.`);
    };

    async function listo2() {

        const inicio = performance.now();

        Promise.allSettled([conexion(), Select(), SelectAll(), SelectID(), SelectPre(), SelectPalabra()]).then(response => console.log(response)).catch(error => console.log(error))
        const fin = performance.now();

        console.log(`La función listo2 tardó ${fin - inicio} milisegundos.`);
    };

    listo().finally(() => {
        listo2();
    })