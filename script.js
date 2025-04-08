const form = document.getElementById("form")
const success = document.getElementById("success")

const radios = form.querySelectorAll('input[name="q-type"]')
const checkbox = form.querySelector('input[name="assent"]')

radios.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    document.querySelectorAll(".radio-option").forEach((label) => {
      label.classList.remove("selected")
    })

    const selectedLabel = event.target.closest(".radio-option")
    selectedLabel.classList.add("selected")
  })
})

const spanError = (input) => {
  const errorMessage = input.closest("div").querySelector(".error-message")
  errorMessage.classList.remove("hidden")
  // console.log(errorMessage)
}

const formValidation = (input) => {
  // console.log(input)
  if (input.name === "name" && input.value.trim() === "") {
    input.classList.add("error")
    spanError(input)
  }
  if (input.name === "surname" && input.value.trim() === "") {
    input.classList.add("error")
    spanError(input)
  }
  if (input.name === "message" && input.value.trim() === "") {
    input.classList.add("error")
    spanError(input)
  }
  if (
    input.name === "email" &&
    !input.value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  ) {
    input.classList.add("error")
    spanError(input)
  }
  if (input.name === "q-type") {
    console.log("test")
  }
}

const checkValidation = () => {
  const radioError = form.querySelector("#radio-error")
  const checkError = form.querySelector("#check-error")

  let radioSelected = false

  radios.forEach((radio) => {
    if (radio.checked) {
      radioSelected = true
    }
  })

  if (!radioSelected) {
    radioError.classList.remove("hidden")
  }

  if (!checkbox.checked) {
    checkError.classList.remove("hidden")
  }

  if (!radioSelected || !checkbox.checked) {
    return false
  } else {
    return true
  }
}

const inputs = form.querySelectorAll(
  'input[type="text"], input[type="email"], textarea'
)

inputs.forEach((input) => {
  input.addEventListener("input", () => formValidation(input))
})

const handleSubmit = (event) => {
  event.preventDefault()

  const spans = document.querySelectorAll(".error-message")
  spans.forEach((span) => span.classList.add("hidden"))

  let inputError = false
  inputs.forEach((input) => {
    input.classList.remove("error")
    if (input.value.trim() === "") {
      inputError = true
      formValidation(input)
    }
  })
  checkValidation()
  if (!checkValidation()) {
    inputError = true
  }

  if (!inputError) {
    const values = event.target
    const inputsType = values.elements

    const formData = {}

    for (let input of inputsType) {
      if (input.type === "radio") {
        if (input.checked) {
          formData[input.name] = input.value
        }
      } else if (input.type === "checkbox") {
        formData[input.name] = input.checked
      } else if (input.type !== "submit" && input.name) {
        formData[input.name] = input.value
      }
    }

    success.classList.remove("hidden")
    console.log(formData)
  }
}

form.addEventListener("submit", handleSubmit)
success.addEventListener("click", () => {
  location.reload()
})
