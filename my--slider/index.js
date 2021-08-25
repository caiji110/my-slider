class Slider{
    constructor(id,delay=2000){
        this.delay=delay
        this.contanier = document.getElementById(id);
        this.items = this.contanier.querySelectorAll(".slider-list_item, .slider-list_item-selected");
        this.timer = null
        const next = this.contanier.querySelector('.slide-list_next');
        const previous =this.contanier.querySelector('.slide-list_previous');
        //对容器监听slide事件，每当翻页时（派发slide事件，所以可以监听到）改变小圆点的样式
        this.contanier.addEventListener("slide",e=>{
            const {index} = e.detail
            const selectedBtn = this.contanier.querySelector(".slide-list_control-button-selected");
            selectedBtn.className= 'slide-list_control-button';
            const btns = this.contanier.querySelectorAll('.slide-list_control-button')
            btns[index].className = 'slide-list_control-button-selected'
        })
        //向后翻
        if(next){
            next.addEventListener("click",e=> {
                this.stop();
                this.slideNext();
                this.start();
            })
        }
        //向前翻
        if(previous){
            previous.addEventListener("click",e=> {
                this.stop();
                this.slidePrevious();
                this.start();
            })
        }
        //监听小圆点被点击
        const btns = this.contanier.querySelector('.slide-list_control');
        btns.addEventListener("click",e=>{
            const index = e.target.attributes[1].value
            console.log(index);
            this.slideTo(index)
        })

    }
    start(){
        this.stop();
        this.timer = setInterval(()=> {
            this.slideNext()
        },this.delay)
    }
    stop(){
        clearInterval(this.timer)
    }
    getSelectedItem(){
        const selected = this.contanier.querySelector(".slider-list_item-selected");
        return selected
    }
    getSelectedItemIndex(){
        const selectedItem = this.getSelectedItem();
        const SelectedIndex = Array.from(this.items).indexOf(selectedItem);
        return SelectedIndex
    }
    slideTo(index){
        const detail = {index}
        const event = new CustomEvent('slide',{bubbles:true,detail});
        this.contanier.dispatchEvent(event)
        const selectedItem = this.getSelectedItem();
        if(selectedItem)
            selectedItem.className='slider-list_item';
        if(this.items[index])
        this.items[index].className='slider-list_item-selected'
    }
    slideNext(){
        const currentIndex = this.getSelectedItemIndex();
        // this.items[currentIndex].className = 'slider-list_item';
        let nextIdx = this.items[currentIndex+1]?currentIndex+1:0
        this.slideTo(nextIdx);
    }
    slidePrevious(){
        const currentIndex = this.getSelectedItemIndex();
        // this.items[currentIndex].className = 'slider-list_item';
        const preIdx = this.items[currentIndex-1]?currentIndex-1:this.items.length-1;
        this.slideTo(preIdx)
    }
}
const mySlider = new Slider('my-slider');
