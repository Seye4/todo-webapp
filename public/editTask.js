const headDOM = document.querySelector(".header")
const editBtn = document.querySelector(".edit-btn")
const formDOM = document.querySelector(".form")
const taskIDDOM = document.querySelector(".taskID")
const taskNameDOM = document.querySelector(".input")
const taskStatusDOM = document.querySelector(".checkBox")
const formFeedBack = document.querySelector('.completed')
const taskCompletedDOM = document.querySelector('.checkBox')

const urlID = window.location.search  
const taskId = new URLSearchParams(urlID).get('id')

let tempTaskName

window.addEventListener('DOMContentLoaded', async function() {
    

    try {
        const {
            data: { task },
            } = await axios.get(`/api/v1/tasks/${taskId}`)
            
            const { completed, _id: taskID, name } = task

            taskIDDOM.textContent = taskID
            taskNameDOM.value = name
            tempTaskName = name
            if (completed) {
                taskStatusDOM.checked = true
            }

    } catch (error) {
        console.log(error);
        taskNameDOM.value = tempTaskName
        formFeedBack.style.display = 'block'
        formFeedBack.innerHTML = `error, please try again`
    }
})

formDOM.addEventListener('submit', async (e) => {
    editBtn.textContent = 'Loading...'
    e.preventDefault()
    try {
      const taskName = taskNameDOM.value
      const taskStatus = taskStatusDOM.checked
  
      const {
        data: { task },
      } = await axios.patch(`/api/v1/tasks/${taskId}`, {
        name: taskName,
        completed: taskStatus,
      })
  
      const { _id: taskID, completed, name } = task
  
      taskIDDOM.textContent = taskID
      taskNameDOM.value = name
      tempTaskName = name
      if (completed) {
        taskCompletedDOM.checked = true
      }
      formFeedBack.style.display = 'block'
      formFeedBack.textContent = `success, edited task`
    } catch (error) {
      console.error(error)
      taskNameDOM.value = tempTaskName
      formFeedBack.style.display = 'block'
      formFeedBack.innerHTML = `error, please try again`
    }
    editBtn.textContent = 'Edit'
    setTimeout(() => {
        formFeedBack.style.visibility = 'none'
    }, 3000)
  })