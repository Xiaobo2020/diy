window.onload = function () {
  const imgs = document.getElementsByTagName('img');
  const num = imgs.length;
  let loaded = 0;

  function onScroll () {
    // 可见高度
    const viewHeight = document.documentElement.clientHeight;
    // 滚动高度
    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;

    console.log(viewHeight, scrollHeight);
    for (let i = 0; i < num; i++) {
      if (
        imgs[i].getAttribute('data-src') && 
        imgs[i].offsetTop + imgs[i].clientHeight > scrollHeight && 
        imgs[i].offsetTop <= viewHeight + scrollHeight
      ) {
        const src = imgs[i].getAttribute('data-src');
        imgs[i].removeAttribute('data-src');
        imgs[i].setAttribute('src', src);
        loaded++;
        console.log(i, src)
      }
    }
    if (loaded === num) {
      window.removeEventListener('scroll', onScroll);
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
}