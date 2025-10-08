var productNameInput = document.querySelector("#productName");
var productPriceInput = document.querySelector("#productPrice");
var productCategoryInput = document.querySelector("#productCategory");
var productDescriptionInput = document.querySelector("#productDescription");
var productImageInput = document.querySelector("#productImage");
var displayProductDiv = document.querySelector("#productList");
var addBtn = document.querySelector("#addBtn");
var updateBtn = document.querySelector("#updateBtn");
var noProductDiv = document.querySelector("#nonProduct");

var productList = JSON.parse(localStorage.getItem("productList")) || [];
displayProduct(productList);

var updateIndex;

function validationInputs(element, msgId) {
  var textInput = element.value;
  var msg = document.getElementById(msgId);
  var regex = {
    productName: /^[a-zA-Z][a-zA-Z0-9 _-]{2,19}$/,
    productPrice: /^\d{2,10}(\.\d{1,2})?$/,
    productCategory: /^(mobile|tv|screens|electronic)$/,
    productDescription: /^[\w\W\s]{4,100}$/,
    productImage: /^.{1,}\.(jpg|jpeg|png|gif|svg)$/,
  };
  if (regex[element.id].test(textInput) === true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.remove("d-block");
    msg.classList.add("d-none");

    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    msg.classList.add("d-block");
    msg.classList.remove("d-none");
    return false;
  }
}
function addProduct() {
  if (
    validationInputs(productNameInput, "msgName") &&
    validationInputs(productPriceInput, "msgPrice") &&
    validationInputs(productCategoryInput, "msgCategory") &&
    validationInputs(productDescriptionInput, "msgDescription") &&
    validationInputs(productImageInput, "msgImage")
  ) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
      image:
        productImageInput.files.length > 0
          ? productImageInput.files[0]?.name
          : "placeholder.png",
    };
    productList.push(product);
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProduct(productList);
    clearInputs();
    Swal.fire({
      icon: "success",
      title: `Your Product ${product.name} has been added`,
      showConfirmButton: false,
      timer: 2000,
    });
    textInfo();
  }
}

function displayProduct(targetArray) {
  var display = "";
  for (var i = 0; i < targetArray.length; i++) {
    display += `
             <div class="col-md-6 col-lg-4 col-xl-3">
              <div class="card product-card h-100 overflow-hidden border-0">
                <img
                  src=./images/${targetArray[i].image}
                  class="w-100 object-fit-cover"
                  height="200px"
                  alt="${targetArray[i].name} "
                />
                <div class="card-body pb-0 h-100">
                  <div
                    class="d-flex justify-content-between align-items-center mb-2"
                  >
                    <h3 class="card-title fs-6 fw-bold pt-2">
                      ${targetArray[i].name} 
                    </h3>
                    <span
                      class="price-tag fw-semibold d-inline-block text-white rounded-4 py-1 px-3"
                      >$ ${targetArray[i].price} </span
                    >
                  </div>
                  <span class="badge">${targetArray[i].category} </span>
                  <p class="card-text text-body-secondary mt-2">
                    ${targetArray[i].description}
                  </p>
                  <div
                    class="card-footer px-0 pt-4 bg-transparent d-flex justify-content-between align-items-end"
                  >
                    <button onclick="changeData(${
                      targetArray.length < productList.length
                        ? targetArray[i].oldIndex
                        : i
                    })" class="btn btn-warning text-white btn-sm">
                      <i class="fas fa-edit me-1"></i> Edit
                    </button>
                    <button onclick="deleteProduct(${
                      targetArray.length < productList.length
                        ? targetArray[i].oldIndex
                        : i
                    })" class="btn btn-danger btn-sm">
                      <i class="fas fa-trash me-1"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
      `;
  }
  displayProductDiv.innerHTML = display;
  localStorage.setItem("productList", JSON.stringify(productList));
  textInfo();
}
function changeData(index) {
  updateIndex = index;

  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].description;
  productImageInput.value = productImageInput.value;
  addBtn.classList.add("d-none");
  updateBtn.classList.replace("d-none", "d-block");
}
function updateProduct() {
  if (
    validationInputs(productNameInput, "msgName") &&
    validationInputs(productPriceInput, "msgPrice") &&
    validationInputs(productCategoryInput, "msgCategory") &&
    validationInputs(productDescriptionInput, "msgDescription") &&
    validationInputs(productImageInput, "msgImage")
  ) {
    productList[updateIndex].name = productNameInput.value;
    productList[updateIndex].price = productPriceInput.value;
    productList[updateIndex].category = productCategoryInput.value;
    productList[updateIndex].description = productDescriptionInput.value;
    productList[updateIndex].image =
      productImageInput.files[0]?.name || "placeholder.png";
    addBtn.classList.replace("d-none", "d-block");
    updateBtn.classList.replace("d-block", "d-none");
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProduct(productList);
    clearInputs();
    Swal.fire({
      icon: "success",
      title: `Your Product ${productList[updateIndex].name} has been updated`,
      showConfirmButton: false,
      timer: 2000,
    });
    textInfo();
  }
}
function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify("productList"));
  displayProduct(productList);
  clearInputs();
  Swal.fire({
    title: "The Product has been deleted",
    icon: "info",
    timer: 2000,
    draggable: true,
  });
  textInfo();
}
function searchInput(searchValue) {
  var filteredProductList = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
      productList[i].oldIndex = i;
      filteredProductList.push(productList[i]);
    }
  }
  displayProduct(filteredProductList);
}
function clearInputs() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
  productImageInput.value = null;
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
  productImageInput.classList.remove("is-valid");
}
function textInfo() {
  if (productList == null || productList.length === 0) {
    noProductDiv.classList.remove("d-none");
    noProductDiv.classList.add("d-block");
  } else {
    noProductDiv.classList.add("d-none");
    noProductDiv.classList.remove("d-block");
  }
}
