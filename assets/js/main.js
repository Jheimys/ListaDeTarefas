
const Main = {

    tasks: [],

    init: function() {
        this.cacheSelectors() 
        this.bindEvents()
        this.getStorage()
        this.buildTaks()
    },

    cacheSelectors: function() {
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
    },

        
    bindEvents: function() {
        const self = this
        this.$checkButtons.forEach(function(button) {
            button.onclick = self.Events.checkButton_click
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)
        
        this.$removeButtons.forEach(function(button) {
            button.onclick = self.Events.removeButtons_click.bind(self)
        })
    },

    getStorage: function() {
        const tasks = localStorage.getItem('tasks')

        //1° task é o array o 2° task é a constante
        this.tasks = JSON.parse(tasks)
    },

    getTaskHml: function(task) {
        return `
            <li>          
                <div class="check"></div>
                <label class="task">
                        ${task}
                    </label>
                    <button class="remove" data-task="${task}"></button>
            </li>
        `
    },

    buildTaks: function() {
        let html = ''

        this.tasks.forEach(item => {
            html += this.getTaskHml(item.task)
            
        })

        this.$list.innerHTML = html
        this.cacheSelectors() 
        this.bindEvents()
    },

    Events: {
        checkButton_click: function(e) {
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')

            if(isDone) {
                li.classList.remove('done')
            } else {
                li.classList.add('done')
            }
        },

        inputTask_keypress: function(e) {
            const key = e.key
            const value = e.target.value

            if(key == 'Enter'){
                this.$list.innerHTML += this.getTaskHml(value)
                e.target.value = ''
                this.cacheSelectors()
                this.bindEvents()

                const savedTasks = localStorage.getItem('tasks')
                const savedTasksObj = JSON.parse(savedTasks)

                const obj = [
                    {task: value},
                    ...savedTasksObj
                ]

                localStorage.setItem('tasks', JSON.stringify(obj))
            }
        },

        removeButtons_click: function(e) {
            let li = e.target.parentElement
            const value = e.target.dataset['task']
            
            const newTasksState = this.tasks.filter(item => item.task != value)

            localStorage.setItem('tasks', JSON.stringify(newTasksState))
            
            li.classList.add('removed')

            setTimeout(function(){
                li.classList.add('hidden')
            },300)
        }
    }
}

Main.init()
