const list = document.getElementById("studentList")

async function addStudent(){

    let name = document.getElementById("name").value
    let age = document.getElementById("age").value
    if(name=== ""){
    alert("Name cannot be empty")
    return
     }

    if(age === "" || Number(age) < 0){
    alert("Age must be 0 or greater")
    return
    }
    let response = await fetch(
        "http://localhost:3000/students",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                age:Number(age)
            })
        }
    )

    let data = await response.text()

    alert(data)

    document.getElementById("name").value = ""
    document.getElementById("age").value = ""

    viewStudent()
}

async function viewStudent(){

    list.innerHTML = ""

    let response = await fetch(
        "http://localhost:3000/students"
    )

    let students = await response.json()

    students.forEach(function(student){

        let tr = document.createElement("tr")

tr.innerHTML = `
    <td>${student.id}</td>
    <td>${student.name}</td>
    <td>${student.age}</td>
`

        let updateBtn = document.createElement("button")

updateBtn.innerText = "Update"
updateBtn.className = "update-btn"
updateBtn.onclick = async function(){

    let newName = prompt(
        "Enter New Name",
        student.name
    )

    let newAge = prompt(
        "Enter New Age",
        student.age
    )

    await fetch(
        "http://localhost:3000/students/" +
        student.id,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:newName,
                age:Number(newAge)
            })
        }
    )

    viewStudent()
}
        let deleteBtn = document.createElement("button")
        deleteBtn.className = "delete-btn"
        deleteBtn.innerText = "Delete"

        deleteBtn.onclick = async function(){

            await fetch(
                "http://localhost:3000/students/" +
                student.id,
                {
                    method:"DELETE"
                }
            )

            viewStudent()
        }

        let actionTd = document.createElement("td")

        actionTd.appendChild(updateBtn)
        actionTd.appendChild(deleteBtn)

        tr.appendChild(actionTd)

        list.appendChild(tr)
    })
}

viewStudent()