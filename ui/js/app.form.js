"use strict";

app.namespace("app.form");

app.form = (function() {
  const get = app.ajax.get;
  const put = app.ajax.postPut;
  const updateForm = app.utilities.updateForm;
  const data = {};
  let dataArr;

  const formObj = {
    url: "/api/config",
    elem: document.getElementsByTagName("form")[0],
    inputs: document.getElementsByTagName("input")
  };

  const submitObj = {
    elem: document.getElementsByClassName("submit-btn")[0]
  };
  submitObj.elem.style.display = "none";
  dataArr = Array.prototype.slice.call(formObj.elem.elements);
  for (let input of formObj.inputs) {
    input.addEventListener("change", event => {
      if (submitObj.elem.style.display === "none") {
        submitObj.elem.style.display = "block";
      }
    });
  }
  submitObj.elem.addEventListener("click", event => {
    dataArr.forEach(element => {
      data[element.name] =
        element.type === "checkbox" ? element.checked : element.value;
    });
    let requestBody = JSON.stringify(data);
    put("PUT", formObj.url, requestBody);
  });
  document.addEventListener("DOMContentLoaded", event => {
    get(formObj.url, updateForm);
  });
})();
