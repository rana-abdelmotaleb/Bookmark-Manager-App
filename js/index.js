// variables
var ContactName = document.getElementById("bookmark");
var ContactURL = document.getElementById("websiteURL");
var tableBody = document.getElementById("tbody")
var updateBtn = document.getElementById("updateBtn")
var submitBtn = document.getElementById("submitBtn")
var contactArray= [];
var updateIndex;
// local storage
if (localStorage.getItem("contactArray") !== null) {
        contactArray=JSON.parse(localStorage.getItem("contactArray"))
    displayContact(contactArray)
}
// 1 / Add Contact
function addContact(){
if (checkExist()) {
  if (validartionName() && validartionURL()) {

    var contactInformation = {
      bookmark: ContactName.value,
      websiteURL: ContactURL.value,
    };

    contactArray.push(contactInformation);
    localStorage.setItem("contactArray", JSON.stringify(contactArray));
    displayContact(contactArray);
  } else {
    let errorMsg = "";
    if (!validartionName()) {
      errorMsg = "Bookmark name must be 3 alphanumeric characters.";
    } else if (!validartionURL()) {
      errorMsg = "Please enter a valid URL (e.g.www.example.com).";
    }

    Swal.fire({
      icon: "error",
      title: "Invalid Input",
      text: errorMsg,
    });
  }
} else {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Please Enter Site Name and Site URL",
  });
}


        
}
// 2 / display contact
function displayContact(array) {
    var count = "";
    for(var i =0 ; i<array.length ; i++){
        count += `
         <tbody class="bg-white ">
          <tr class="">
            <td class="py-2">${i+1}</td>
            <td class="py-2">${array[i].bookmark} </td> 
            <td class="py-2"><button  onclick ="visitContact(${i})" id="visitBtn" class="visitBtn btn btn-primary"> <span><i class="fa-solid fa-eye me-2"></i></span>Visit</button></td>
            <td class="py-2"><button onclick ="deleteContact(${i})" id="deleteBtn" class="deleteBtn btn btn-primary"><span><i class="fa-solid fa-trash me-2"></i></span>Delete</button></td>
            <td class="py-2"><button onclick ="getContactToUpdate(${i})" id="updateBtn" class="updateBtn btn btn-primary"><span><i class="fa-solid fa-trash me-2"></i></span>Update</button></td>

         
         </tr>
        </tbody>
        `
    }
    tableBody.innerHTML=count;
     clearInput()
}
// 3/  delete function
function deleteContact(i) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      // حذف العنصر
      contactArray.splice(i, 1);
      displayContact(contactArray);
      localStorage.setItem("contactArray", JSON.stringify(contactArray));

      // رسالة تأكيد الحذف
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
}

// 3/  visit function
function visitContact(i) {
  let url = contactArray[i].websiteURL;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  window.open(url, "_blank");
}

//   4/  get Contact To Update function
function getContactToUpdate(i){
    ContactName.value = contactArray[i].bookmark
    ContactURL.value = contactArray[i].websiteURL
    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    updateIndex = i;
}
//   5/  Update function
function updateContact() {
  contactArray[updateIndex].bookmark = ContactName.value;
  contactArray[updateIndex].websiteURL = ContactURL.value;

  displayContact(contactArray);
  localStorage.setItem("contactArray", JSON.stringify(contactArray));

  submitBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  clearInput();

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500
  });
}

//   6/  clear input function
function clearInput(){
    ContactName.value=""
    ContactURL.value=""
}
//   7/  check exist function
function checkExist() {
  if (ContactName.value.trim() === "" || ContactURL.value.trim() === "") {
    return false;
  }
  return true;
}
// 8/ validation name function
function validartionName() {
  var regex = /^[A-Za-z0-9]{3,}$/;
  if (regex.test(ContactName.value)) {
    ContactName.classList.replace("is-invalid","is-valid");

    return true

  } else {
  
    ContactName.classList.add("is-invalid");
    return false
  }
}
// 9/ validation url function
function validartionURL() {
 var regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]{2,}\.[a-zA-Z]{2,}$/;
  if (regex.test(ContactURL.value)) {
    ContactURL.classList.replace("is-invalid","is-valid");
    return true

  } else {
  
    ContactURL.classList.add("is-invalid");
    return false 
  }
}

