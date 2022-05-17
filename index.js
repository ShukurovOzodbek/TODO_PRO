let arr = [

]
let arr2 = [

]
let form = document.forms.todo
let cont = document.querySelector('.cont')  

let input = document.querySelector('.create')


let a = 0

form.onsubmit = (e) => {
    e.preventDefault()

    let todo = {
        id: Math.random(),
        isChecked: '',
        color: 'red',
        isDoned: 'Not Done!',
        box_name: 'box_notdone',
        dir: document.querySelector('.notdone'),
        time: `${new Date().getHours()}:${new Date().getMinutes()}`
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        todo[key] = value
    }); 
    if(input.value === '') {
    }else{
        arr.push(todo)
        a = arr.length
        reload(arr)
    }
    input.value = ''
}

let select = document.querySelector('select');

function reload(array) {
    try{
        document.querySelector('.notdone').innerHTML = ''
    }
    catch(err){
        document.querySelector('.cont').innerHTML = ''
    }

    for (const item of array) {
        let box = document.createElement('div')
        let h3 = document.createElement('h3')
        let time = document.createElement('div')
        let check = document.createElement('div')
        let inp = document.createElement('input')
        let span = document.createElement('span')

        box.classList.add(`${item.box_name}`)
        h3.innerHTML = item.task
        time.innerHTML = item.time
        time.classList.add('time')
        check.classList.add('check')
        inp.type = 'checkbox'
        inp.checked = item.isChecked
        span.innerHTML = item.isDoned
        span.style.color = `${item.color}`
        
        item.dir.append(box)

        box.append(h3, time, check)
        check.append(inp, span)


        inp.onclick = () => {
            if(inp.parentNode.parentNode.parentNode.classList == 'notdone') {
                let idx = arr.findIndex(elem => elem.id == item.id)
    
                let a = arr.splice(idx, 1)
                
                ///
                for (const item2 of a) {
                   arr2.push(item2) 
                }
                for (const item3 of arr2) {
                    item3.isChecked = 'on'
                    item3.isDoned = 'Done!'
                    item3.color = 'green'
                    item3.box_name = 'box_done'
                    item3.dir = document.querySelector('.done')
                }
            }else if(inp.parentNode.parentNode.parentNode.classList == 'done'){
                let idx2 = arr2.findIndex(elem => elem.id == item.id)
    
                let a2 = arr2.splice(idx2, 1)

                ///
                for (const item4 of a2) {
                    arr.push(item4)
                    reload(arr2)
                    reload(arr)
                }
                for (const item3 of arr) {
                    item3.isChecked = ''
                    item3.isDoned = 'Not Done!'
                    item3.color = 'red'
                    item3.box_name = 'box_notdone'
                    item3.dir = document.querySelector('.notdone')
                    reload(arr) 
                    reload(arr2)
                }
            }
            // console.log(inp.parentNode.parentNode.parentNode);
            document.querySelector('.done').innerHTML = ''
            reload(arr2)
            reload(arr)
            let span = document.querySelector('.span')
            span.innerHTML = `Is Done! - ${arr2.length}`
        }
        search()
        let span_not = document.querySelector('.span_not')
        try {
            span_not.innerHTML = `Is not Done! - ${arr.length}`
        } catch (error) {   
            
        }
    }
}
option()

function option() {
    select.onchange = () => {
        switch (select.value) {
            case 'All todo':
                let notdone3 = document.querySelector('.notdone')
                let spx3 = document.querySelector('.span_not')
                let done3 = document.querySelector('.done')
                let sp3 = document.querySelector('.span')
                let line3 = document.querySelector('.line')
                notdone3.style.width = '47%'
                notdone3.style.overflow = 'visible'
                done3.style.overflow = 'visible'
                done3.style.width =  '51%'
                sp3.style.display = 'block'
                sp3.style.transform = 'translate(645px, -35px)'
                line3.style.display = 'block'
                spx3.style.display = 'block'
                break;
            case 'Done':
                let done = document.querySelector('.done')
                let spx = document.querySelector('.span_not')
                let sp = document.querySelector('.span')
                let line = document.querySelector('.line')
                let notdone2 = document.querySelector('.notdone')
                done.style.width = '100009%'
                sp.style.transform = 'translate(89px, -35px)'
                sp.style.display = 'block'
                spx.style.display = 'none'
                line.style.display = 'none'
                notdone2.style.width = '0px'
                notdone2.style.overflow = 'hidden'
                break;
            case 'NotDone': 
                let notdone = document.querySelector('.notdone')
                let spx2 = document.querySelector('.span_not')
                let done2 = document.querySelector('.done')
                let sp2 = document.querySelector('.span')
                let line2 = document.querySelector('.line')
                notdone.style.width = '613%'
                done2.style.overflow = 'hidden'
                done2.style.width =  '0px'
                sp2.style.display = 'none'
                line2.style.display = 'none'
                spx2.style.display = 'block'
                break;
            default:
                break;
        } 
    }
}



function search() {
    let inp = document.querySelector('#search')

    inp.onkeyup = () => {
        let cards = document.querySelectorAll('.box_notdone')
        let search_query = document.getElementById("search").value;
        for (var i = 0; i < cards.length; i++) {
            if(cards[i].innerText.toLowerCase().includes(search_query.toLowerCase())) {
                notdone.prepend(cards[i])
            }
        }
    }
}

let create_inp = document.querySelector('.create_inp')


create_inp.onclick = () => {
    form.style.width = '400px'
    create_inp.hidden = true
    setTimeout(() => {
        form.style.width = '0px'
        create_inp.hidden = false
    }, 10000);
}