       let slides = document.getElementsByClassName('carrosslide')
       let index = 0

       setInterval(() => {
                slides[index].style.opacity = '0%'
                index++
                if(index >= slides.length) index = 0
                slides[index].style.opacity = '60%'
       }, 4000)