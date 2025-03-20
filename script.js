import app from "./firebaseconfig/firebase.js";
import {getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

const database = getDatabase(app);
const programacoesRef = ref(database, "programacoes");

function carregarTabela() {
    onValue(programacoesRef, (snapshot) => {
        const tabela = document.getElementById("tabela-programacao");
        tabela.innerHTML = "";

        const dados = snapshot.val();
        
        if (dados) {
            Object.values(dados).forEach((item) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.horario}</td>
                    <td>${item.quant}</td>
                    <td>${item.sensor}</td>
                    <td>${item.repetir}</td>
                `;
                tabela.appendChild(row);
                console.log("Valor adicionado na tabela")
            });
        } else {
            tabela.innerHTML = "<tr><td colspan='4'>Nenhuma programação encontrada</td></tr>";
        }
    });
}

carregarTabela();
