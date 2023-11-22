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

    function Select() {
        var results = null;
        return new Promise((resolve, rejects) => {
            const sql = "SELECT P.idPre, P.pregunta, R.respuestas FROM PREGUNTAS P INNER JOIN RESPUESTAS R ON P.idPre =R.idRes";
            con.query(sql, function(error, select) {
                if (error) {
                    rejects(error.message)
                    console.log("ERROR AL HACER LA CONSULTA");
                } else {
                    //results = result

                    resolve(select);
                    setTimeout(function() {

                        console.log("FILTRO");
                        console.log(select);
                    }, 8000);

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
        var results = null;
        return new Promise((resolve, rejects) => {
            con.query("SELECT * FROM PREGUNTAS", function(error, select) {
                if (error) {
                    console.log("ERROR AL HACER SELECT");
                    rejects(error)
                } else {

                    resolve(select);
                    setTimeout(function() {
                        console.log("ALL Preguntas");
                        console.log(select);
                    }, 4000);
                }
            });
        });
        //results = await pro;
        console.log(results);
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
    async function desconexion() {
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
        await conexion();

        await Select();

        await SelectAll();
    };

    async function listo2() {
        var t1 = performance.now;
        Promise.allSettled([conexion(), Select(), SelectAll()]).then(response => console.log(response)).catch(error => console.log(error))
    };

    //listo();

    listo2();