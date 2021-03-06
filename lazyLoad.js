const imgs=Array.from(document.querySelectorAll('img'));

const lazyLoad1=function(imgs){
  let count=0;
  const deleteImgs=[];
  const handler=()=>{
    imgs.forEach((img,index)=>{
      const react=img.getBoundingClientRect();
      if(react.top<window.innerHeight){
        img.src=img.dataset.src;
        count++;
        deleteImgs.push(index);
        if(count===imgs.length) document.removeEventListener('scroll',lazyLoad1);
      }
    });
    imgs=imgs.filter((_,index)=>!deleteImgs.includes(index));
  }
  return handler();
}

const lazyLoad2=function(imgs){
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.intersectionRatio>0){
        entry.target.src=dataset.src;
        observer.unobserve(entry.target);
      }
    })
  })
  imgs.forEach(img=>observer.observe(img));
}
