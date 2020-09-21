

    const form = document.querySelector('#formReport');
    const tableTopOptins = document.getElementById('topOptionsTable');
    const btnDeleteAll= document.getElementById('deleteAll');
    const btnAdd = document.getElementById('addReport');
    let table = document.getElementById('tableReport');
    let tableBody = document.getElementById('tBodyReport');
    let totalReport = document.getElementById('totalReport');
    arrayReports =[];


    let createReport =(report)=>{
        arrayReports.push(report);
        /* const tbodyToAdd = document.getElementById('tbody-hidden').value;
        table.style.display='table';
        document.getElementById("tableReport").insertRow(-1).innerHTML = tbodyToAdd; */
        return report;
    }



    console.log(arrayReports);

    let deleteReport =(e)=>{
    var i = e.parentNode.parentNode.childNodes[0].innerHTML;
    arrayReports.splice(i-1,1);

    if (arrayReports==null || arrayReports.length ==0) {
        table.style.display = 'none';
        tableTopOptins.style.display = 'none';
    }

    saveDB(); 
    console.log(i);
    }




    let  editReport =(e)=>{
        var i = e.parentNode.parentNode.childNodes[0].innerHTML; 
        var item =0; 
        tableBody.innerHTML ='';
        for (var item =0; item<arrayReports.length; item++) {
            if(item ==i-1){
                addElements(arrayReports[item],item+1);
            }else{
                addElementsReadOnly(arrayReports[item],item+1);
            }
        }
    }



    let confirmEdit = (e)=>{
        var i = e.parentNode.parentNode.childNodes[0].innerHTML; 
        var item =0; 
        let report = {
            lugar: document.getElementsByName('lugarTable')[i-1].value, 
            latitud: document.getElementsByName('latitudTable')[i-1].value,
            longitud: document.getElementsByName('longitudTable')[i-1].value,
            fecha: document.getElementsByName('fechaTable')[i-1].value,
            tipoViolacion: document.getElementsByName('tipoViolacionTable')[i-1].value,
            comentario: document.getElementsByName('comentarioTable')[i-1].value,
            correo: document.getElementsByName('correoTable')[i-1].value
        }; 
        tableBody.innerHTML ='';
        for (var item =0; item<arrayReports.length; item++) {
            if(item ==i-1){
               arrayReports[item]= report;
               console.log(arrayReports[item]);
            }
            addElementsReadOnly(arrayReports[item],i);
        }
        saveDB();
    }


    let cancelEdit = (e)=>{
        tableBody.innerHTML ='';
        var i = 0;
        arrayReports.forEach(element =>{
            i++;
            addElementsReadOnly(element,i);
        });
    }


    let saveDB =()=>{
        localStorage.setItem('report',JSON.stringify(arrayReports));
        totalReport.innerHTML = 'Total de reportes: '+arrayReports.length;
        readDB();
    }

    let readDB =()=>{
        tableBody.innerHTML ='';
        arrayReports = JSON.parse(localStorage.getItem('report'));
        if(arrayReports===null){
            arrayReports =[];
        }
        else{
            var i = 0;
            arrayReports.forEach(element => {
                i++;
                addElementsReadOnly(element,i);
            });
            totalReport.innerHTML = 'Total de reportes: '+arrayReports.length;
        }
    }

    

    let addElementsReadOnly = (element, i)=>{
                table.style.display='table';
                tableTopOptins.style.display = 'flex';

                tableBody.innerHTML +=
                `<tr><th scope="col">${i}</th>
                <td><input type="text" value="${element.lugar}"  name="lugarTable" class="form-control form-control-sm " readonly></td>
                <td><input type="number" value="${element.latitud}" name="latitudTable" class="form-control form-control-sm " readonly></td>
                <td><input type="number" value="${element.longitud}" name="longitudTable" class="form-control form-control-sm " readonly></td>
                <td><input type="date" value="${element.fecha}" name="fechaTable" class="form-control form-control-sm " readonly></td>
                <td><input type="text" value="${element.tipoViolacion}" name="tipoViolacionTable" class="form-control form-control-sm " readonly></td>
                <td><input type="text" value="${element.comentario}" name="comentarioTable" class="form-control form-control-sm " readonly></td>
                <td><input type="email" value="${element.correo}" name="correoTable" class="form-control form-control-sm " readonly></td>
                <td><span  onClick="deleteReport(this)" name="edit" class="material-icons icon-delete">delete
                </span><span onClick="editReport(this)" name="edit" class="material-icons icon-edit">edit</span></td></tr>`; 
    }



    let addElements = (element,i)=>{
        table.style.display='table';
        tableTopOptins.style.display = 'flex';

                tableBody.innerHTML +=
                `<tr><th scope="col">${i}</th>
                <td><input type="text" value="${element.lugar}"  name="lugarTable" class="form-control form-control-sm " ></td>
                <td><input type="number" value="${element.latitud}" name="latitudTable" class="form-control form-control-sm " ></td>
                <td><input type="number" value="${element.longitud}" name="longitudTable" class="form-control form-control-sm " ></td>
                <td><input type="date" value="${element.fecha}" name="fechaTable" class="form-control form-control-sm " ></td>
                <td><input type="text" value="${element.tipoViolacion}" name="tipoViolacionTable" class="form-control form-control-sm " ></td>
                <td><input type="text" value="${element.comentario}" name="comentarioTable" class="form-control form-control-sm " ></td>
                <td><input type="email" value="${element.correo}" name="correoTable" class="form-control form-control-sm " ></td>
                <td><span onClick="confirmEdit(this)" name="edit" class="material-icons icon-done">done
                </span><span onClick="cancelEdit(this)" name="edit" class="material-icons icon-cancel">clear</span></td></tr>`;
    }



    /* listeners */

    form.addEventListener('submit',()=>{
        let report = {
            lugar: document.getElementById('lugarForm').value, 
            latitud: document.getElementById('latitudForm').value,
            longitud: document.getElementById('longitudForm').value,
            fecha: document.getElementById('fechaForm').value,
            tipoViolacion: document.getElementById('tipoViolacionForm').value,
            comentario: document.getElementById('comentarioForm').value,
            correo: document.getElementById('correoForm').value
        };
        /* console.log(report); */
        createReport(report);
        saveDB();
        form.reset();
    });

    btnDeleteAll.addEventListener('click',()=>{
        var answer = confirm('Estás seguro que quiere eliminar todos los reportes?');
        if(answer==true){
            arrayReports = [];
            table.style.display = 'none';
            tableTopOptins.style.display = 'none';
        }
        saveDB();
    });



    document.addEventListener('DOMContentLoaded',readDB);

    /* btnAdd.addEventListener('click',addReport); */
    /* btnDelete.addEventListener('click',deleteReport); */