const submitBtn = document.querySelector('.submit-btn')
const taskTitle = document.querySelector('.input')
const taskList = document.querySelector('.todo-list')
const loadingDOM = document.querySelector('.loading')
const errorInfo = document.querySelector('.page-error')
const formFeedBack = document.querySelector('.completed')


const displayTask = async () => {

    try {
        const {
                data: { tasks },
                } = await axios.get('/api/v1/tasks')
                if (tasks.length < 1) {
                    tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
                    loadingDOM.style.visibility = 'hidden'
            return
          }

          const allTasks = tasks.map((task) => {
            const { completed, _id: taskID, name } = task
            return `<ul class="list">
            <div class="list-body">
              <div class="task-detail-info ${completed && 'task-completed'}">
                <span class="material-symbols-outlined"> check_box </span>
                <h3>${name}</h3>
              </div>
              <div class="icons">
              <a href="task.html?id=${taskID}">
              <span class="material-symbols-outlined"> edit_square </span>
            </a>                <span class="material-symbols-outlined delete-btn" data-id="${taskID}"> delete </span>
              </div>
            </div>
          </ul>`
          }).join('')

          taskList.innerHTML = allTasks
      } catch (error) {
        errorInfo.innerHTML =
      '<h5 class="">There was an error, please try later....</h5>'
      }

      loadingDOM.style.visibility = 'hidden'
}

displayTask()

const TaskFunction = () => 
{
    submitBtn.addEventListener('click', function (e){
        e.preventDefault()

        const name = taskTitle.value
        
        axios.post('/api/v1/tasks', { name })
          .then(function (response) {            
            displayTask()
            taskTitle.value = ""

            formFeedBack.style.display = 'block'
            formFeedBack.textContent = `success, task added`
          })
          .catch(function (error) {
            formFeedBack.style.display = 'block'
            formFeedBack.innerHTML = `error, please try again`
          });
        
          setTimeout(() => {
            formFeedBack.style.display = 'none'
          }, 3000)
    })
}

TaskFunction()

taskList.addEventListener('click', async (e) => {
    const element = e.target

    if (element.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = element.dataset.id
    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      displayTask()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})