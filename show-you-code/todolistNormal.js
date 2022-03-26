const container = document.querySelector("div.container")
let state = "all"
const todolist = [
    {
        done: false,
        content: "hello"
    },
    {
        done: false,
        content: "hello, world"
    },
    {
        done: false,
        content: "hello world china"
    }
]

container.addEventListener("click", e => {
    if (e.target.matches("li > input")) {
        const idx = e.target.dataset.idx
        todolist[idx].done = !todolist[idx].done
        updatePage()
    }
    else if (e.target.matches("li > button")) {
        const idx = e.target.dataset.idx
        todolist.splice(idx, 1)
        updatePage()
    }
    else if (e.target.matches("input.selectAll")) {
        if (todolist.every(it => it.done)) {
            todolist.forEach(it => {it.done = false})
        }
        else {
            todolist.forEach(it => { it.done = true })
        }
        updatePage()
    }
    else if (e.target.matches("label > input")) {
        state = e.target.value
        updatePage()
    }
})

container.addEventListener("keyup", e => {
    if (e.target.matches(".todo-input")) {
        if (e.key === "Enter") {
            const text = e.target.value.trim()
            if (!text) {
                return
            }
            e.target.value = ""
            todolist.push({
                id: todolist.length,
                done: false,
                content: text
            })
            updatePage()
            document.querySelector(".todo-input").focus()
        }
    }
})

updatePage()

function updatePage() {
    container.innerHTML = renderHTML()
}

function renderHTML() {
    return `
        <input type="checkbox" class="selectAll" ${todolist.length && todolist.every(it => it.done) ? "checked": ""}>
        <input type="text" class="todo-input">
        <ul class="${state}">
            ${todolist.map((todoitem, idx) => {
                return `
                    <li class="${todoitem.done ? "completed" : "active"}">
                        <input type="checkbox" data-idx=${idx} ${todoitem.done ? "checked" : ""}>
                        <span>${todoitem.content}</span>
                        <button data-idx=${idx}>x</button>
                    </li>
                `
            }).join("\n")}
        </ul>
        <p>剩余：${todolist.filter(it => !it.done).length}</p>
        <p>
            <label><input type="checkbox" ${state == "active" ? "checked" : ""} name="catorige" value="active">未完成</label>
            <label><input type="checkbox" ${state == "completed" ? "checked" : ""} name="catorige" value="completed">已完成</label>
            <label><input type="checkbox" ${state == "all" ? "checked" : ""} name="catorige" value="all">全部</label>
        </p>
    `
}