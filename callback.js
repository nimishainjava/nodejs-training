const getBlog=() => {
    setTimeout(() => {
        callandwait({
            title: 'welcome to callback demo'
        })
    }, 2000)
}


getBlog((bp) => {
    console.log(bp.title);
})
