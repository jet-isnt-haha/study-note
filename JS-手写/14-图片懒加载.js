let imgList = [...document.querySelectorAll('img[data-src]')];
let length = imgList.length;

const imgLazyLoad = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('开始加载');
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.onload = () => {
                        console.log('加载完成');
                        img.removeAttribute('data-src')
                    }
                    img.onerror = () => {
                        console.log('加载失败');
                    };
                    observer.unobserve(img);
                }
            })
        }, {
        threshold: 0.1,
        rootMargin: '50px'
    }
    )
    imgList.forEach(img => {
        observer.observe(img);
    })
}
