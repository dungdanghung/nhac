// const song = [
//     {
//         name: 'cô gái bàn bên',
//         singer: 'Đen vâu',
//         path: './acssec/ms/music/song1.mp3',
//         img: './acssec/img/img1.jpg'
//     },
//     {
//         name: 'đố em biết anh đang nghĩ gì',
//         singer: 'Đen vâu',
//         path: './acssec/ms/music/song2.mp3',
//         img: './acssec/img/img2.jpg'
//     },
//     {
//         name: 'mười năm',
//         singer: 'Đen vâu',
//         path: './acssec/ms/music/song3.mp3',
//         img: './acssec/img/img3.jpg'
//     },
//     {
//         name: 'hai triệu năm',
//         singer: 'Đen vâu',
//         path: './acssec/ms/music/song4.mp3',
//         img: './acssec/img/img4.jpg'
//     },
//     {
//         name: 'đưa nhau đi trốn',
//         singer: 'Đen vâu',
//         path: './acssec/ms/music/song5.mp3',
//         img: './acssec/img/img5.jpg'
//     },
//     {
//         name: 'Maps',
//         singer: 'Maroon 5',
//         path: './acssec/ms/music/song6.mp3',
//         img: './acssec/img/img6.jpg'
//     }
// ]
var listmusic = document.querySelector('.playlist')
var scrollanh = document.querySelector('.cd')
var tenbaihat = document.querySelector('header h2');
var anhbaihat = document.querySelector('.cd-thumb');
var audio = document.querySelector('audio');
var btnplay = document.querySelector('.btn-toggle-play');
var player = document.querySelector('.player')
var rang = document.querySelector('#progress');
var btnnex = document.querySelector('.btn-next');
var btnpre = document.querySelector('.btn-prev');
var btnrandom = document.querySelector('.btn-random');
var btnrepeat = document.querySelector('.btn-repeat');
var settingplay = 'dungplay'

var coustindet = 0;
var html;
const app = {
    kiemtrachay: false,
    israngdom: false,
    isrepeat: false,
    config: JSON.parse(localStorage.getItem(settingplay)) || {},


    song: [
        {
            name: 'cô gái bàn bên',
            singer: 'Đen vâu',
            path: './acssec/ms/music/song1.mp3',
            img: './acssec/img/img1.jpg'
        },
        {
            name: 'đố em biết anh đang nghĩ gì',
            singer: 'Đen vâu',
            path: './acssec/ms/music/song2.mp3',
            img: './acssec/img/img2.jpg'
        },
        {
            name: 'mười năm',
            singer: 'Đen vâu',
            path: './acssec/ms/music/song3.mp3',
            img: './acssec/img/img3.jpg'
        },
        {
            name: 'hai triệu năm',
            singer: 'Đen vâu',
            path: './acssec/ms/music/song4.mp3',
            img: './acssec/img/img4.jpg'
        },
        {
            name: 'đưa nhau đi trốn',
            singer: 'Đen vâu',
            path: './acssec/ms/music/song5.mp3',
            img: './acssec/img/img5.jpg'
        },
        {
            name: 'Maps',
            singer: 'Maroon 5',
            path: './acssec/ms/music/song6.mp3',
            img: './acssec/img/img6.jpg'
        },
        {
          name: 'lưu số em đi',
          singer: 'Huỳnh Văn x Vũ Phụng Tiên',
          path: './acssec/ms/music/song7.mp3',
          img: './acssec/img/img7.jpg'
      },
      {
        name: 'sao anh chưa về',
        singer: 'AMEE ',
        path: './acssec/ms/music/song8.mp3',
        img: './acssec/img/img8.jpg'
    }
     ],
    
     setsetting: function(key,value) {
        this.config[key] = value;
        localStorage.setItem(settingplay , JSON.stringify(this.config));
     },
     renderlist: function () {
        html = this.song.map(function (e , index) {
        return `<div class="song ${index === coustindet ? 'active' : ''}" data = '${index}'>
        <div class="thumb" style="background-image: url('${e.img}')">
        </div>
        <div class="body">
          <h3 class="title">${e.name}</h3>
          <p class="author">${e.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>`                
       })
       listmusic.innerHTML = html.join('')
     },

     getbaidautien: function () {
       return this.song[coustindet];
     },
     
     handlEven: function() {

        var u = scrollanh.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
         u.pause()
        var scrollnew = scrollanh.offsetWidth;
       
        document.onscroll = function () {
        var scrollmd = window.scrollY || document.documentElement.scrollTop;
        var newsc = scrollnew - scrollmd;
        
        scrollanh.style.width = newsc >0 ? newsc + 'px' : 0
        scrollanh.style.opacity= newsc / scrollnew
       }
      
       btnplay.onclick = function ( ) {
        if(app.kiemtrachay)
        {
            audio.pause()
        }
        else
        {
            audio.play()
            
        }
      }
        audio.onplay =function () {
          app.kiemtrachay=true;
          player.classList.add('playing')
          u.play()
        }
        audio.onpause = function () {
          app.kiemtrachay=false;
          player.classList.remove('playing')
          u.pause()
        }
       
       
       audio.ontimeupdate = function () {
        if(audio.duration)
        {
           var a = Math.floor(audio.currentTime / audio.duration *100)
           rang.value = a
        }
       }
       rang.onchange = function (e) {
          var newvalu = Math.floor(audio.duration / 100 * e.target.value)
          audio.currentTime = newvalu
       }
       btnnex.onclick = function () {
        if(app.israngdom)
        {
          app.random()
        }
        else
        {
          app.nextsong();
        }
        
         audio.play()
         app.renderlist();
         app.sculsong();
       }
       btnpre.onclick = function () {
        if(app.israngdom)
        {
          app.random()
        }
        else
        {
          app.presong();
        }
        audio.play()
        app.renderlist()
        app.sculsong();
       }
        
       btnrandom.onclick = function () {
        if(app.israngdom)
          {
            btnrandom.classList.remove('active')
            app.israngdom = false;
          }
           else
           {
            btnrandom.classList.add('active');
            app.israngdom = true;
           }
         app.setsetting("israngdom" , app.israngdom)
       }

       audio.onended = function () {
        if(app.isrepeat)
        {
          app.repeatsong();
        }
        else
        {
          btnnex.click();
        }
         
       }

       btnrepeat.onclick = function () {
         if(app.isrepeat)
         {
           app.isrepeat = false;
           btnrepeat.classList.remove('active');
         }
         else
         {
           app.isrepeat = true;
           btnrepeat.classList.add('active');
         }
         app.setsetting("isrepeat" , app.isrepeat)
       }
       
       listmusic.onclick = function (e) {
         const a =e.target.closest('.song:not(.active)')
        if(a || e.target.closest('.option'))
        {
          if(a && !e.target.closest('.option'))
          {
            var i = a.getAttribute('data');
            coustindet = Number(i);
            app.tainhat();
            audio.play();
            app.renderlist();
          }
        }
       }

     },
      
     
       loadconfig: function() {
         app.israngdom = app.config.israngdom;
         app.isrepeat = app.config.isrepeat;
         btnrandom.classList.toggle('active' , this.israngdom);
         btnrepeat.classList.toggle('active' , this.isrepeat);
       },

      sculsong: function () {
        setTimeout(function () {
           var i = document.querySelector('.song.active');
           i.scrollIntoView({
            behavior: 'smooth',
            block: "nearest"
           }) 
        }, 200)
      },

      
      repeatsong: function () {
         audio.play();
      },

      random: function () {
          var newindex;
          do{
            var newindex = Math.floor(Math.random() *app.song.length)
          }while(newindex === coustindet)
          coustindet = newindex;
          app.tainhat();
          
      },
    
      nextsong : function () {
        coustindet++;
         if(coustindet >= app.song.length)
         {
          coustindet = 0
         }
         app.tainhat();
      },
      presong: function () {
        coustindet--;
        if(coustindet <0)
        {
          coustindet = this.song.length-1;
        }
        this.tainhat();
      },
     tainhat: function () {
       var i = this.getbaidautien();
       tenbaihat.textContent = i.name;
       anhbaihat.style.backgroundImage = `url(${i.img})`
       audio.src = i.path
     },
     
     start: function() {
      this.loadconfig();
      this.handlEven();
      
      this.tainhat();
      this.renderlist();
     }

}

app.start();

